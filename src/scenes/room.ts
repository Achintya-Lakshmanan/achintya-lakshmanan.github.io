// The room: my desk at night, drawn like a manga panel (flat colour, screentone dots in the shadows, ink lines).
// It is built here from boxes, cylinders and spheres, in Blender's axes (z up), the same room as the concept
// renders in `prototypes/manga/props.py`.
//
// The page drives it. In the hero the whole room is in view. Further down, each chapter of the page is a corner
// of the room, and what is in that corner follows what is being read: the whiteboard shows the research project,
// the monitor the piece of software, the pinboard lights the role. `Tour.tsx` marks what is being read on the tour
// element (`data-chapter`, `data-beat`); this file only reads it.
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { content } from '../data/content'

type Triple = [number, number, number]

// Colours are linear, as in Blender.
const INK: Triple = [0.012, 0.014, 0.02]
const VIOLET: Triple = [0.386, 0.258, 0.955]
const MINT: Triple = [0.195, 0.871, 0.527]
const NIGHT = new THREE.Color('#0A0C10')
const scaled = (colour: Triple, by: number): Triple => [colour[0] * by, colour[1] * by, colour[2] * by]

const clamp = (value: number, low = 0, high = 1) => Math.min(high, Math.max(low, value))
const smooth = (value: number) => value * value * (3 - 2 * value)
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
/** Blender's axes to three's: z up becomes y up. */
const v = (x: number, y: number, z: number) => new THREE.Vector3(x, z, -y)

// ── materials ──────────────────────────────────────────────────────────────────────────────────────────────────

/** Size of a screentone cell, in device pixels. Shared by every toon material. */
const cell = { value: 7 }
/** 0 by day, 1 at night (the dark theme): every toon colour darkens and cools. Shared by every toon material. */
const night = { value: 0 }
/** Where the desk lamp's bulb is, in the camera's view space (kept up to date each frame): at night it lights the desk. */
const lampView = { value: new THREE.Vector3() }

/**
 * Flat `lit` colour where the light is strong. Where it falls away, dots of `shade` grow until they join up,
 * as in a printed screentone. Lighting (and shadow) comes from three's Lambert shading; only its brightness is used.
 */
function toon(lit: Triple, shade: Triple = scaled(lit, 0.18), low = 0.3, high = 0.68) {
  const material = new THREE.MeshLambertMaterial({ color: 0xffffff })
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uLit = { value: new THREE.Color(...lit) }
    shader.uniforms.uShade = { value: new THREE.Color(...shade) }
    shader.uniforms.uLow = { value: low }
    shader.uniforms.uHigh = { value: high }
    shader.uniforms.uCell = cell
    shader.uniforms.uNight = night
    shader.uniforms.uLamp = lampView
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nuniform vec3 uLit;\nuniform vec3 uShade;\nuniform float uLow;\nuniform float uHigh;\nuniform float uCell;\nuniform float uNight;\nuniform vec3 uLamp;')
      .replace('#include <opaque_fragment>', `
        float brightness = dot(outgoingLight, vec3(0.2126, 0.7152, 0.0722));
        float radius = 0.78 * (1.0 - clamp((brightness - uLow) / (uHigh - uLow), 0.0, 1.0));
        vec2 grid = mat2(0.70710678, 0.70710678, -0.70710678, 0.70710678) * (gl_FragCoord.xy / uCell);
        float far = length(fract(grid) - 0.5);
        float soft = fwidth(far) * 0.75;
        // At night the room drops to a dim violet, except round the desk lamp, which keeps the desk in its own light.
        float lamp = 1.0 - smoothstep(0.2, 1.5, distance(-vViewPosition, uLamp));
        lamp = floor(lamp * 3.0 + 0.35) / 3.0; // in bands, like the screentone, not airbrushed
        vec3 lit = mix(uLit, mix(uLit * 0.14 + vec3(0.02, 0.016, 0.06), uLit * 0.95 + vec3(0.05, 0.03, 0.0), lamp), uNight);
        vec3 shade = mix(uShade, mix(uShade * 0.35 + vec3(0.004, 0.003, 0.014), uShade * 0.8, lamp), uNight);
        outgoingLight = mix(shade, lit, smoothstep(radius - soft, radius + soft, far));
        #include <opaque_fragment>`)
  }
  material.customProgramCacheKey = () => 'toon'
  return material
}

const flat = (colour: Triple) => new THREE.MeshBasicMaterial({ color: new THREE.Color(...colour) })

/** For the line pass: each surface's facing, which object it belongs to, and how far away it is. */
const lineMaterial = new THREE.ShaderMaterial({
  vertexShader: `
    attribute float aId;
    varying vec3 vNormal;
    varying float vId;
    varying float vDepth;
    void main() {
      vec4 place = modelViewMatrix * vec4(position, 1.0);
      vNormal = normalize(normalMatrix * normal);
      vId = aId;
      vDepth = -place.z;
      gl_Position = projectionMatrix * place;
    }`,
  fragmentShader: `
    varying vec3 vNormal;
    varying float vId;
    varying float vDepth;
    void main() {
      vec3 facing = normalize(vNormal) * (gl_FrontFacing ? 1.0 : -1.0);
      gl_FragColor = vec4(facing.xy, fract(vId * 0.6180339), vDepth / 60.0);
    }`,
  side: THREE.DoubleSide,
})

/**
 * Draws the colour pass with ink wherever facing, object or depth changes from one pixel to the next. One per room:
 * its textures are that room's own passes (a shared one could be left pointing at a disposed room's, which is black).
 */
const makeInk = () => new THREE.ShaderMaterial({
  uniforms: {
    tColour: { value: null },
    tLines: { value: null },
    uFull: { value: new THREE.Vector2(1, 1) },
    uRect: { value: new THREE.Vector4(0, 0, 1, 1) },
    uStep: { value: 1 },
    uInk: { value: new THREE.Color(...INK) },
  },
  vertexShader: 'varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }',
  fragmentShader: `
    uniform sampler2D tColour;
    uniform sampler2D tLines;
    uniform vec2 uFull;
    uniform vec4 uRect;
    uniform float uStep;
    uniform vec3 uInk;
    varying vec2 vUv;
    // How much two neighbouring pixels differ: in depth (a silhouette), or in facing or object (a line inside a shape).
    float silhouette(vec4 a, vec4 b) {
      float depth = abs(a.w - b.w) / max(min(a.w, b.w), 0.0005);
      return smoothstep(0.025, 0.06, depth);
    }
    float crease(vec4 a, vec4 b) {
      return max(smoothstep(0.25, 0.45, length(a.xy - b.xy)), step(0.0005, abs(a.z - b.z)));
    }
    float differs(vec4 a, vec4 b) { return max(silhouette(a, b), crease(a, b)); }
    vec4 at(vec2 here, vec2 offset) { return texture2D(tLines, (here + offset * uStep) / uFull); }
    vec3 toScreen(vec3 c) {
      return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c));
    }
    void main() {
      vec2 here = uRect.xy + vUv * uRect.zw;
      vec4 centre = texture2D(tLines, here / uFull);
      // The line itself: any difference with a direct neighbour.
      float core = 0.0;
      core = max(core, differs(centre, at(here, vec2(1.0, 0.0))));
      core = max(core, differs(centre, at(here, vec2(-1.0, 0.0))));
      core = max(core, differs(centre, at(here, vec2(0.0, 1.0))));
      core = max(core, differs(centre, at(here, vec2(0.0, -1.0))));
      // Its soft edge, from the diagonals, so lines don't stair-step.
      float fringe = 0.0;
      fringe += differs(centre, at(here, vec2(1.0, 1.0)));
      fringe += differs(centre, at(here, vec2(-1.0, 1.0)));
      fringe += differs(centre, at(here, vec2(1.0, -1.0)));
      fringe += differs(centre, at(here, vec2(-1.0, -1.0)));
      // Outlines are drawn with a heavier pen than the lines inside a shape.
      float outline = 0.0;
      outline = max(outline, silhouette(centre, at(here, vec2(2.0, 0.0))));
      outline = max(outline, silhouette(centre, at(here, vec2(-2.0, 0.0))));
      outline = max(outline, silhouette(centre, at(here, vec2(0.0, 2.0))));
      outline = max(outline, silhouette(centre, at(here, vec2(0.0, -2.0))));
      float edge = clamp(max(core, max(fringe * 0.2, outline * 0.8)), 0.0, 1.0);
      vec3 colour = mix(texture2D(tColour, here / uFull).rgb, uInk, edge);
      gl_FragColor = vec4(toScreen(clamp(colour, 0.0, 1.0)), 1.0);
    }`,
  depthTest: false,
  depthWrite: false,
})

// ── building ───────────────────────────────────────────────────────────────────────────────────────────────────

let nextId = 1
const newId = () => nextId++
/**
 * Every shape carries its own id, so the line pass can outline it even where it touches a neighbour. Shapes given
 * the same `id` read as one piece: no line where they meet.
 */
function tag(geometry: THREE.BufferGeometry, id = newId()) {
  const flatGeometry = geometry.index ? geometry.toNonIndexed() : geometry
  flatGeometry.setAttribute('aId', new THREE.Float32BufferAttribute(new Float32Array(flatGeometry.attributes.position.count).fill(id), 1))
  return flatGeometry
}

const place = (at: Triple, size: Triple = [1, 1, 1], turn: Triple = [0, 0, 0]) =>
  // Blender's XYZ Euler turns about x first, then y, then z, about the fixed axes: three calls that order 'ZYX'.
  new THREE.Matrix4().compose(new THREE.Vector3(...at), new THREE.Quaternion().setFromEuler(new THREE.Euler(...turn, 'ZYX')), new THREE.Vector3(...size))

function box(size: Triple, bevel = 0) {
  return bevel ? new RoundedBoxGeometry(size[0], size[1], size[2], 2, bevel) : new THREE.BoxGeometry(...size)
}

function drum(radius: number, height: number, sides = 40, top = radius) {
  return new THREE.CylinderGeometry(top, radius, height, sides).rotateX(Math.PI / 2) // its axis along z, top up
}

/** Collects static shapes by material, then joins each material's shapes into one mesh. */
class Batch {
  private shapes = new Map<THREE.Material, THREE.BufferGeometry[]>()
  add(material: THREE.Material, geometry: THREE.BufferGeometry, matrix?: THREE.Matrix4, id?: number) {
    if (matrix) geometry.applyMatrix4(matrix)
    const list = this.shapes.get(material) ?? []
    list.push(tag(geometry, id))
    this.shapes.set(material, list)
  }
  block(material: THREE.Material, at: Triple, size: Triple, turn: Triple = [0, 0, 0], bevel = 0, id?: number) {
    this.add(material, box(size, bevel), place(at, [1, 1, 1], turn), id)
  }
  build(parent: THREE.Object3D, shadows = true) {
    for (const [material, list] of this.shapes) {
      const mesh = new THREE.Mesh(mergeGeometries(list), material)
      mesh.castShadow = mesh.receiveShadow = shadows
      parent.add(mesh)
    }
  }
}

/** A single shape that moves or changes on its own. */
function single(parent: THREE.Object3D, material: THREE.Material, geometry: THREE.BufferGeometry, matrix?: THREE.Matrix4) {
  // (A shape already tagged keeps its ids: one made of several pieces, each outlined.)
  const mesh = new THREE.Mesh(geometry.getAttribute('aId') ? geometry : tag(geometry), material)
  if (matrix) matrix.decompose(mesh.position, mesh.quaternion, mesh.scale)
  mesh.castShadow = mesh.receiveShadow = true
  parent.add(mesh)
  return mesh
}

/** A seeded random number, so the books and the hair come out the same every time. */
function seeded(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }
}

const ONE = new THREE.Vector3(1, 1, 1)
const UP = new THREE.Vector3(0, 0, 1)

/** A tapered capsule from `a` to `b`, `from` thick at one end and `to` at the other: an arm, a leg. */
function limb(a: Triple, b: Triple, from: number, to = from) {
  const start = new THREE.Vector3(...a)
  const end = new THREE.Vector3(...b)
  const turn = new THREE.Quaternion().setFromUnitVectors(UP, end.clone().sub(start).normalize())
  const middle = start.clone().add(end).multiplyScalar(0.5)
  return mergeGeometries([
    drum(from, start.distanceTo(end), 24, to).applyMatrix4(new THREE.Matrix4().compose(middle, turn, ONE)),
    new THREE.SphereGeometry(from, 24, 12).translate(...a),
    new THREE.SphereGeometry(to, 24, 12).translate(...b),
  ].map((geometry) => geometry.toNonIndexed()))
}

/** A straight box from `a` to `b`, `width` across and `depth` deep: the links of a monitor arm. */
function link(a: Triple, b: Triple, width: number, depth: number) {
  const start = new THREE.Vector3(...a)
  const end = new THREE.Vector3(...b)
  const turn = new THREE.Quaternion().setFromUnitVectors(UP, end.clone().sub(start).normalize())
  return box([width, depth, start.distanceTo(end)], 0.006).applyMatrix4(new THREE.Matrix4().compose(start.add(end).multiplyScalar(0.5), turn, ONE))
}

/** The keyboard's rows, back to front: each cap is its colour (alpha, modifier, Esc, Enter) and width in keys. */
const repeat = (count: number, cap: string) => Array<string>(count).fill(cap)
const KEYBOARD = [
  ['e1', ...repeat(12, 'a1'), 'm1', 'm1'],
  [...repeat(13, 'a1'), 'm2'],
  ['m1.5', ...repeat(12, 'a1'), 'm1.5'],
  ['m1.75', ...repeat(11, 'a1'), 'n2.25'],
  ['m2.25', ...repeat(10, 'a1'), 'm1.75', 'm1'],
  ['m1.25', 'm1.25', 'm1.25', 'a6.25', ...repeat(5, 'm1')],
]

/** The jacket's outline, turned to make the body: radius against height, from the hips up to the neck. */
const TORSO = [[0.001, 0], [0.15, 0.01], [0.172, 0.06], [0.168, 0.2], [0.158, 0.32], [0.17, 0.45], [0.188, 0.55], [0.19, 0.61], [0.16, 0.67], [0.1, 0.71], [0.065, 0.73], [0.001, 0.735]]

const HEAD_RADIUS = 0.16
/** The head is a little narrower than it is deep, and taller than both. */
const HEAD_SHAPE = new THREE.Vector3(0.92, 1, 1.08)
/** A point on (or off) the head, `radius` from its centre: `around` 0 is the face, ±π/2 the ears; `up` is elevation. */
function onHead(around: number, up: number, radius: number) {
  return new THREE.Vector3(Math.sin(around) * Math.cos(up), Math.cos(around) * Math.cos(up), Math.sin(up)).multiplyScalar(radius).multiply(HEAD_SHAPE)
}

/** A sheet over part of the head, between a `top` and a `bottom` line of elevation: the hair's cap, the beard. */
function shell(from: number, to: number, top: (around: number) => number, bottom: (around: number) => number, radius: (around: number, up: number) => number, columns: number, rows: number) {
  const positions: number[] = []
  const index: number[] = []
  for (let row = 0; row <= rows; row++) {
    for (let column = 0; column <= columns; column++) {
      const around = lerp(from, to, column / columns)
      const up = lerp(top(around), bottom(around), row / rows)
      positions.push(...onHead(around, up, radius(around, up)).toArray())
    }
  }
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const a = row * (columns + 1) + column
      const b = a + columns + 1
      index.push(a, a + 1, b, a + 1, b + 1, b)
    }
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.setIndex(index)
  geometry.computeVertexNormals()
  return geometry
}

/** A lock of hair along `points` (round the head's centre, at the origin): flat, and tapering to a point. */
function strand(points: THREE.Vector3[], width: number, root = 1) {
  const curve = new THREE.CatmullRomCurve3(points)
  const steps = 14
  const sides = 6
  const positions: number[] = []
  const index: number[] = []
  for (let step = 0; step <= steps; step++) {
    const t = step / steps
    const at = curve.getPoint(t)
    const along = curve.getTangent(t)
    const out = at.clone().addScaledVector(along, -at.dot(along)).normalize()
    const across = new THREE.Vector3().crossVectors(along, out).normalize()
    const radius = width * lerp(root, 1, smooth(Math.min(1, t / 0.35))) * (1 - t) ** 0.6 + 0.0005
    for (let side = 0; side < sides; side++) {
      const angle = (side / sides) * Math.PI * 2
      positions.push(...at.clone().addScaledVector(across, Math.cos(angle) * radius).addScaledVector(out, Math.sin(angle) * radius * 0.4).toArray())
    }
  }
  for (let step = 0; step < steps; step++) {
    for (let side = 0; side < sides; side++) {
      const a = step * sides + side
      const b = step * sides + ((side + 1) % sides)
      index.push(a, a + sides, b, b, a + sides, b + sides)
    }
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.setIndex(index)
  geometry.computeVertexNormals()
  return geometry
}

/**
 * My hair, as it is now: short and dark, close at the back and sides, with height at the front and the top, pushed
 * up and back. Then a short beard, round the jaw and up to the sideburns. Both centred on the head.
 */
function haircut(random: () => number) {
  const hairline = (around: number) =>
    -0.04 + 0.75 * Math.cos(around) - 0.16 * Math.cos(2 * around) - 0.3 * Math.exp(-(((Math.abs(around) - 1.33) / 0.14) ** 2))
  const height = (around: number, up: number) =>
    HEAD_RADIUS + 0.008 + 0.032 * Math.max(0, Math.sin(up)) ** 2 * (0.55 + 0.45 * Math.cos(around)) + 0.003 * Math.sin(around * 11 + up * 6)
  const pieces = [shell(-Math.PI, Math.PI, () => Math.PI / 2 - 0.001, hairline, height, 56, 18)]
  // Clumps, as hair grows: out from the crown at the back of the top, over the head to the hairline. At the front
  // they lift into a short quiff; at the sides and the nape they end in points.
  // The crown is at the back, off to one side, so the locks sweep across rather than radiate.
  const crown = new THREE.Vector3(Math.sin(Math.PI - 0.5) * Math.cos(1.0), Math.cos(Math.PI - 0.5) * Math.cos(1.0), Math.sin(1.0))
  const clumps = 30
  for (let clump = 0; clump < clumps; clump++) {
    const around = -Math.PI + ((clump + 0.5 + (random() - 0.5) * 0.5) / clumps) * Math.PI * 2
    const front = Math.abs(around) < 0.85
    const edge = hairline(around) + (front ? 0.06 : 0.03)
    const end = new THREE.Vector3(Math.sin(around) * Math.cos(edge), Math.cos(around) * Math.cos(edge), Math.sin(edge))
    const turn = crown.angleTo(end)
    const axis = new THREE.Vector3().crossVectors(crown, end).normalize()
    const points: THREE.Vector3[] = []
    for (let step = 0; step <= 6; step++) {
      const t = step / 6
      const unit = crown.clone().applyAxisAngle(axis, turn * t)
      const at = Math.atan2(unit.x, unit.y)
      const up = Math.asin(clamp(unit.z, -1, 1))
      // Alternate clumps lie a little higher, so where neighbours overlap one is cleanly on top.
      const layer = clump % 2 ? 0.003 : 0.009
      points.push(onHead(at, up, height(at, up) + layer + (front ? 0.018 * t * t : 0.006 * Math.sin(Math.PI * t))))
    }
    if (front) points.push(points[6].clone().multiplyScalar(1.06).add(new THREE.Vector3(0, 0, 0.012)))
    pieces.push(strand(points, (front ? 0.032 : 0.028) + random() * 0.005, 0.3))
  }
  const sideburn = 1.42
  const beard = shell(-sideburn, sideburn,
    (around) => -0.42 + 0.48 * (Math.abs(around) / sideburn) ** 2,
    (around) => -1.15 + 0.3 * (Math.abs(around) / sideburn) ** 2,
    () => HEAD_RADIUS + 0.007, 28, 8)
  // Neighbouring clumps are inked as one lock, so the ink draws a few big locks rather than every strand.
  const locks = Array.from({ length: 7 }, () => newId())
  return { hair: mergeGeometries(pieces.map((piece, index) => tag(piece, index ? locks[Math.floor(((index - 1) / clumps) * locks.length)] : newId()))), beard }
}

/** Glasses: two rims, a bridge, and the arms back to the ears. Centred on the head. */
function glasses() {
  const front = HEAD_RADIUS * 0.98
  const pieces: THREE.BufferGeometry[] = [box([0.03, 0.004, 0.004]).translate(0, front, 0.012)]
  for (const side of [-1, 1]) {
    pieces.push(new THREE.TorusGeometry(0.035, 0.004, 6, 24).scale(1.25, 1, 1).rotateX(Math.PI / 2).translate(side * 0.062, front - 0.004, 0.005))
    pieces.push(box([0.004, 0.16, 0.006]).translate(side * 0.152, 0.07, 0.01))
  }
  return mergeGeometries(pieces.map((geometry) => geometry.toNonIndexed()))
}

// ── pictures drawn for the room ────────────────────────────────────────────────────────────────────────────────

const FONT = { display: '"Anton", "Impact", sans-serif', sans: '"IBM Plex Sans", system-ui, sans-serif', mono: '"IBM Plex Mono", ui-monospace, monospace' }
const COLOURS = { ink: '#0D0D0F', paper: '#F7F6F1', violet: '#5B3CC4', mint: '#0B7F55', muted: '#55555C' }

function canvasTexture(width: number, height: number, draw: (context: CanvasRenderingContext2D) => void) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')
  if (context) draw(context)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 4
  return texture
}

/** Fills lines of `text` no wider than `width`, starting at (x, y); returns where the next line would go. */
function wrap(context: CanvasRenderingContext2D, text: string, x: number, y: number, width: number, height: number) {
  let line = ''
  for (const word of text.split(' ')) {
    const tried = line ? line + ' ' + word : word
    if (context.measureText(tried).width > width && line) {
      context.fillText(line, x, y)
      line = word
      y += height
    } else line = tried
  }
  if (line) context.fillText(line, x, y)
  return y + height
}

interface Board { id: string; title: string; lines: string; foot: string }

/** What the whiteboard says while each research card is being read. */
const BOARDS: Record<string, Board> = {
  ...Object.fromEntries(content.research.current.map((project) => [project.id, { id: project.id, title: project.name, lines: project.question, foot: project.status }])),
  publication: { id: 'publication', title: 'Secure code, repaired', lines: 'A model fixes its own C and C++ with compiler errors, CodeQL and KLEE in the loop.', foot: content.research.publication.venue + ' · ' + content.research.publication.year },
  haze: { id: 'haze', title: 'Haze removal', lines: 'Restoring photos taken through thick, uneven haze.', foot: content.research.earlier.kicker },
}

/** The land, very roughly, as [lon, lat] outlines: enough for a map drawn in marker. */
const LAND: [number, number][][] = [
  // North and Central America
  [[-165, 62], [-160, 70], [-140, 70], [-120, 70], [-100, 70], [-85, 68], [-80, 63], [-88, 57], [-80, 52], [-78, 58], [-65, 60], [-58, 52], [-66, 45], [-70, 42], [-75, 38], [-76, 35], [-81, 31], [-80, 25], [-82, 28], [-85, 30], [-90, 29], [-97, 27], [-97, 22], [-92, 18], [-88, 15], [-83, 10], [-79, 8], [-82, 8], [-86, 12], [-92, 15], [-100, 17], [-106, 23], [-110, 30], [-115, 32], [-118, 34], [-122, 37], [-124, 42], [-124, 48], [-130, 54], [-138, 59], [-150, 60], [-158, 57]],
  // Greenland
  [[-52, 61], [-43, 60], [-32, 67], [-22, 71], [-20, 78], [-60, 79], [-68, 76], [-56, 70]],
  // South America
  [[-80, 9], [-75, 11], [-62, 10], [-50, 0], [-35, -5], [-38, -13], [-40, -22], [-48, -28], [-58, -38], [-65, -41], [-73, -42], [-72, -30], [-71, -18], [-76, -14], [-81, -5], [-80, 0], [-78, 7]],
  // Europe and Asia
  [[-9, 39], [-9, 43], [-2, 43.5], [-4, 48], [2, 51], [5, 53], [8, 55], [10, 57], [5, 58], [5, 62], [15, 68], [25, 71], [40, 68], [60, 70], [80, 73], [100, 76], [140, 72], [160, 70], [170, 66], [160, 60], [150, 59], [140, 55], [135, 48], [130, 42], [127, 39], [126, 35], [122, 31], [121, 28], [118, 24], [110, 21], [108, 16], [109, 12], [105, 9], [103, 10], [100, 13], [102, 6], [104, 1.5], [101, 3], [98, 8], [98, 16], [94, 17], [92, 22], [88, 22], [85, 20], [80, 15], [80, 10], [77, 8], [73, 16], [72, 21], [68, 24], [62, 25], [57, 26], [56, 24], [59, 22], [55, 17], [44, 12], [43, 15], [39, 22], [35, 28], [34, 32], [36, 36], [30, 36], [26, 38], [26, 40], [22, 40], [24, 37], [21, 37], [19, 41], [16, 41], [18, 40], [16, 38], [12, 44], [10, 44], [3, 43], [0, 39], [-6, 36]],
  // Africa
  [[-17, 21], [-10, 30], [-6, 36], [10, 37], [20, 32], [32, 31], [35, 28], [43, 12], [51, 12], [40, -2], [40, -15], [35, -25], [28, -33], [19, -35], [15, -27], [12, -15], [13, -5], [9, 3], [-5, 5], [-13, 8], [-17, 14]],
  // Great Britain, Japan, Sri Lanka, Madagascar
  [[-5, 50], [1, 51], [0, 53], [-2, 56], [-5, 58], [-6, 56], [-3, 54], [-5, 52]],
  [[130, 31], [132, 34], [135, 34], [140, 35], [141, 38], [142, 41], [140, 42], [139, 38], [136, 36], [132, 35], [130, 33]],
  [[140, 42], [145, 43], [144, 45], [141, 45]],
  [[80, 9.8], [81.8, 7.5], [80.6, 6], [79.8, 8]],
  [[44, -25], [50, -15], [49, -12], [44, -17]],
  // Sumatra, Borneo, Java, the Philippines, Australia
  [[95, 5.5], [106, -6], [104, -5.5], [98, 1]],
  [[109, 1.5], [117, 7], [119, 1], [116, -4], [110, -3]],
  [[105.5, -6], [115, -8], [114, -8.7], [106, -7]],
  [[120, 18], [122, 18], [126, 7], [125, 6], [121, 12]],
  [[114, -22], [122, -17], [130, -12], [137, -12], [142, -11], [146, -19], [153, -25], [151, -34], [140, -38], [131, -31], [115, -34]],
]

/** The idle whiteboard: a world map in marker, worked like a case, with red string out from home to each pin. */
function travelMap(context: CanvasRenderingContext2D) {
  const { home, now, places } = content.travel
  // The map's window on the world: the Americas to Japan, the Arctic to southern Australia, at one scale both ways.
  const WEST = -104
  const NORTH = 70
  const SCALE = 3.95
  const TOP = 150
  const at = ([lon, lat]: readonly number[]): [number, number] => [24 + (lon - WEST) * SCALE, TOP + (NORTH - lat) * SCALE]
  context.lineCap = 'round'
  context.lineJoin = 'round'
  context.save()
  context.beginPath()
  context.rect(16, TOP - 8, 992, 600 - TOP)
  context.clip()
  // The land: a pale wash, outlined.
  context.fillStyle = '#E8E3F6'
  context.strokeStyle = '#9A93B8'
  context.lineWidth = 3
  for (const shape of LAND) {
    context.beginPath()
    shape.forEach((point, k) => (k ? context.lineTo(...at(point)) : context.moveTo(...at(point))))
    context.closePath()
    context.fill()
    context.stroke()
  }
  context.restore()
  // The title, and a sticky note on the case.
  context.fillStyle = COLOURS.violet
  context.font = `400 76px ${FONT.display}`
  context.fillText("WHERE I'VE BEEN", 40, 30)
  context.strokeStyle = COLOURS.mint
  context.lineWidth = 7
  context.beginPath()
  for (let x = 0; x <= 470; x += 8) context.lineTo(40 + x, 122 + Math.sin(x / 26) * 5)
  context.stroke()
  context.save()
  context.translate(842, 66)
  context.rotate(0.05)
  context.fillStyle = '#C9F5DF'
  context.fillRect(-120, -40, 240, 80)
  context.fillStyle = COLOURS.ink
  context.font = `600 24px ${FONT.mono}`
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillText(`${places.length + 2} countries`, 0, -12)
  context.font = `500 20px ${FONT.mono}`
  context.fillText('1 ball of string', 0, 18)
  context.restore()
  // The string, sagging a little, from home to each of the others, and across the three in Europe.
  const RED = '#D6342C'
  const string = (a: [number, number], b: [number, number]) => {
    const sag = Math.hypot(b[0] - a[0], b[1] - a[1]) * 0.08
    context.beginPath()
    context.moveTo(...a)
    context.quadraticCurveTo((a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + sag, ...b)
    context.stroke()
  }
  const origin = at(home.at)
  context.strokeStyle = RED
  context.lineWidth = 3
  for (const place of [now, ...places]) string(origin, at(place.at))
  const europe = places.filter((place) => ['France', 'Switzerland', 'Germany'].includes(place.name)).map((place) => at(place.at))
  europe.forEach((point, k) => string(point, europe[(k + 1) % europe.length]))
  // The pins: red heads with a glint, a shadow on the board; home and now bigger, and named in marker.
  const pin = ([x, y]: [number, number], size: number) => {
    context.fillStyle = 'rgba(13, 13, 15, 0.22)'
    context.beginPath()
    context.arc(x + 3, y + 4, size, 0, Math.PI * 2)
    context.fill()
    context.fillStyle = '#E0443A'
    context.strokeStyle = COLOURS.ink
    context.lineWidth = 2.5
    context.beginPath()
    context.arc(x, y, size, 0, Math.PI * 2)
    context.fill()
    context.stroke()
    context.fillStyle = '#FFD2CC'
    context.beginPath()
    context.arc(x - size * 0.35, y - size * 0.35, size * 0.28, 0, Math.PI * 2)
    context.fill()
  }
  // A wipe of paper behind each name (in the font and alignment already set), so the string never runs through it.
  const backed = (text: string, x: number, y: number, size: number) => {
    const width = context.measureText(text).width
    const left = context.textAlign === 'right' ? x - width : context.textAlign === 'center' ? x - width / 2 : x
    context.fillStyle = 'rgba(247, 246, 241, 0.85)'
    context.fillRect(left - 3, y - size * 0.6, width + 6, size * 1.2)
  }
  context.textBaseline = 'middle'
  context.fillStyle = COLOURS.ink
  for (const place of places) {
    const [x, y] = at(place.at)
    pin([x, y], 7)
    context.font = `600 17px ${FONT.mono}`
    const label = place.name.toUpperCase()
    context.textAlign = place.label.endsWith('left') ? 'right' : place.label === 'right' ? 'left' : 'center'
    const offsets: Record<string, [number, number]> = { left: [-15, 0], right: [14, 0], above: [0, -19], below: [0, 19], 'above-left': [-2, -18] }
    const [dx, dy] = offsets[place.label] ?? [12, 0]
    backed(label, x + dx, y + dy, 17)
    context.fillStyle = COLOURS.ink
    context.fillText(label, x + dx, y + dy)
  }
  // Home's name goes to its left, out over the sea, clear of the pins round it; State College's goes under it.
  for (const [place, dx, dy] of [[home, -24, 2], [now, 0, 30]] as const) {
    const [x, y] = at(place.at)
    pin([x, y], 11)
    context.font = `400 30px ${FONT.display}`
    context.textAlign = dx ? 'right' : 'center'
    backed(place.name.toUpperCase(), x + dx, y + dy, 30)
    context.fillStyle = COLOURS.violet
    context.fillText(place.name.toUpperCase(), x + dx, y + dy)
  }
  context.textAlign = 'left'
  context.textBaseline = 'top'
}

function whiteboard(board?: Board) {
  return canvasTexture(1024, 600, (context) => {
    context.fillStyle = COLOURS.paper
    context.fillRect(0, 0, 1024, 600)
    context.textBaseline = 'top'
    if (!board) {
      // Between projects: a map of where I've been, worked like a case: a pin in each place, red string out from home.
      travelMap(context)
      return
    }
    // Written up in marker: the title, underlined, the question beside a doodle of it, and a sticky note.
    context.lineCap = 'round'
    context.lineJoin = 'round'
    context.fillStyle = COLOURS.violet
    context.font = `400 96px ${FONT.display}`
    const title = board.title.toUpperCase()
    context.fillText(title, 56, 40)
    const titleWidth = Math.min(900, context.measureText(title).width)
    context.strokeStyle = COLOURS.mint
    context.lineWidth = 8
    context.beginPath()
    for (let x = 0; x <= titleWidth; x += 8) context.lineTo(56 + x, 152 + Math.sin(x / 26) * 5)
    context.stroke()
    context.fillStyle = COLOURS.ink
    context.font = `600 44px ${FONT.sans}`
    wrap(context, board.lines, 60, 196, 560, 58)
    doodle(context, board.id, 820, 305)
    // The sticky note, a little crooked.
    context.save()
    context.translate(60, 470)
    context.rotate(-0.025)
    context.font = `600 28px ${FONT.mono}`
    const noteWidth = context.measureText(board.foot).width + 48
    context.fillStyle = '#C9F5DF'
    context.fillRect(0, 0, noteWidth, 74)
    context.fillStyle = 'rgba(13, 13, 15, 0.12)'
    context.fillRect(0, 66, noteWidth, 8)
    context.fillStyle = COLOURS.ink
    context.fillText(board.foot, 24, 22)
    context.restore()
  })
}

/** A quick marker sketch of what each project is about, centred on (x, y): not a diagram of how it works. */
function doodle(context: CanvasRenderingContext2D, id: string, x: number, y: number) {
  const line = (colour: string, width: number, points: number[][]) => {
    context.strokeStyle = colour
    context.lineWidth = width
    context.beginPath()
    points.forEach(([px, py], index) => (index ? context.lineTo(x + px, y + py) : context.moveTo(x + px, y + py)))
    context.stroke()
  }
  const ring = (colour: string, width: number, cx: number, cy: number, r: number, from = 0, to = Math.PI * 2) => {
    context.strokeStyle = colour
    context.lineWidth = width
    context.beginPath()
    context.arc(x + cx, y + cy, r, from, to)
    context.stroke()
  }
  const { ink, violet, mint } = COLOURS
  if (id === 'aura') {
    // A city, its people, and the water coming up.
    for (const [left, width, height] of [[-150, 60, 150], [-84, 50, 200], [-28, 70, 120], [48, 56, 175], [110, 44, 105]]) {
      line(ink, 6, [[left, 90], [left, 90 - height], [left + width, 90 - height], [left + width, 90]])
      for (let wy = 90 - height + 22; wy < 70; wy += 34) line(violet, 5, [[left + 14, wy], [left + 22, wy]])
    }
    for (const px of [-120, -50, 80]) {
      ring(ink, 5, px, 104, 9)
      line(ink, 5, [[px, 113], [px, 138]])
      line(ink, 5, [[px - 12, 124], [px, 118], [px + 12, 124]])
    }
    for (const wy of [150, 172]) line(mint, 7, Array.from({ length: 23 }, (_, k) => [-170 + k * 15, wy + Math.sin(k * 1.3) * 7]))
  } else if (id === 'steering') {
    // A wheel, being turned.
    ring(ink, 9, 0, 0, 120)
    ring(ink, 7, 0, 0, 26)
    for (const angle of [Math.PI / 2, Math.PI * 1.17, Math.PI * 1.83]) line(ink, 8, [[Math.cos(angle) * 26, Math.sin(angle) * 26], [Math.cos(angle) * 118, Math.sin(angle) * 118]])
    ring(violet, 7, 0, 0, 150, -2.6, -0.9)
    const tip = -0.9
    line(violet, 7, [[Math.cos(tip) * 150 - 24, Math.sin(tip) * 150 - 6], [Math.cos(tip) * 150, Math.sin(tip) * 150], [Math.cos(tip) * 150 - 2, Math.sin(tip) * 150 - 26]])
  } else if (id === 'secure-dpo') {
    // Two answers to the same prompt: one chosen, one not.
    for (const [left, good] of [[-160, true], [20, false]] as const) {
      line(ink, 6, [[left, -110], [left + 140, -110], [left + 140, 60], [left, 60], [left, -110]])
      for (let k = 0; k < 4; k++) line(k % 2 ? violet : ink, 5, [[left + 20 + (k % 2) * 20, -80 + k * 30], [left + 100 - k * 8, -80 + k * 30]])
      if (good) line(mint, 11, [[left + 34, 110], [left + 62, 138], [left + 112, 82]])
      else for (const sign of [1, -1]) line(ink, 9, [[left + 40, 110 - sign * 26], [left + 100, 110 + sign * 26]])
    }
  } else if (id === 'publication') {
    // A bug, caught.
    context.strokeStyle = ink
    context.lineWidth = 7
    context.beginPath()
    context.ellipse(x, y + 10, 62, 86, 0, 0, Math.PI * 2)
    context.stroke()
    ring(ink, 7, 0, -94, 30)
    line(ink, 5, [[0, -76], [0, 96]])
    for (const side of [-1, 1]) {
      for (const ly of [-30, 14, 58]) line(ink, 6, [[side * 60, ly], [side * 104, ly - 16], [side * 124, ly + 8]])
      line(ink, 5, [[side * 12, -120], [side * 30, -150]])
    }
    ring(violet, 9, 0, 0, 160)
    line(violet, 9, [[-113, -113], [113, 113]])
  } else if (id === 'haze') {
    // Hills under a sun that the haze has nearly hidden.
    ring(violet, 7, 30, -40, 56)
    line(ink, 7, [[-170, 120], [-70, 10], [10, 80], [80, 0], [170, 120]])
    for (const [wy, width] of [[-70, 300], [-30, 340], [10, 300], [50, 260]]) {
      line(mint, 6, Array.from({ length: 13 }, (_, k) => [-width / 2 + (k * width) / 12, wy + Math.sin(k * 1.5) * 6]))
    }
  }
}

/** The left monitor: a terminal running Claude Code, partway through building this room. */
function claudeScreen() {
  const mono = (weight: number, size: number) => `${weight} ${size}px ${FONT.mono}`
  const CLAY = '#D97757'
  return canvasTexture(1024, 600, (context) => {
    context.fillStyle = '#141413'
    context.fillRect(0, 0, 1024, 600)
    context.fillStyle = '#26262A'
    context.fillRect(0, 0, 1024, 40)
    ;['#55555C', '#55555C', '#55555C'].forEach((colour, k) => {
      context.fillStyle = colour
      context.beginPath()
      context.arc(26 + k * 26, 20, 7, 0, Math.PI * 2)
      context.fill()
    })
    context.textBaseline = 'middle'
    context.fillStyle = '#9A9AA2'
    context.font = mono(500, 18)
    context.textAlign = 'center'
    context.fillText('~/portfolio — claude', 512, 21)
    context.textAlign = 'left'
    // The welcome box.
    context.strokeStyle = CLAY
    context.lineWidth = 2.5
    context.beginPath()
    context.roundRect(28, 62, 600, 118, 10)
    context.stroke()
    context.fillStyle = CLAY
    context.font = mono(700, 28)
    context.fillText('✻', 50, 98)
    context.fillStyle = '#F3F0E8'
    context.fillText('Welcome to Claude Code!', 88, 98)
    context.fillStyle = '#8A8A92'
    context.font = mono(500, 20)
    context.fillText('/help for help', 88, 134)
    context.fillText('cwd: ~/portfolio', 88, 160)
    // What I asked, and what it did.
    context.font = mono(500, 22)
    context.fillStyle = '#B9B9C0'
    context.fillText('> put two monitors on a gas-spring arm', 32, 218)
    context.fillStyle = '#7AF0C0'
    context.fillText('⏺', 32, 260)
    context.fillStyle = '#F3F0E8'
    context.font = mono(700, 22)
    context.fillText('Update(src/scenes/room.ts)', 62, 260)
    context.fillStyle = '#8A8A92'
    context.font = mono(500, 20)
    context.fillText('⎿  24 additions, 9 removals', 62, 294)
    const diff: [string, string][] = [
      ['-', 'const CURVE = 1.6'],
      ['+', 'const ARM_Z = DESK + 0.19'],
      ['+', 'const elbow = [POLE.x + side * 0.36, …]'],
      ['+', 'batch.add(piston, limb(elbow, head, 0.007))'],
    ]
    diff.forEach(([sign, code], k) => {
      const y = 330 + k * 32
      context.fillStyle = sign === '+' ? '#173A2A' : '#3E1C22'
      context.fillRect(62, y - 15, 700, 30)
      context.fillStyle = sign === '+' ? '#7AF0C0' : '#F37A7A'
      context.font = mono(500, 19)
      context.fillText(`${sign} ${code}`, 74, y)
    })
    context.fillStyle = CLAY
    context.font = mono(500, 22)
    context.fillText('✻ Swinging the elbows out… (esc to interrupt)', 32, 468)
    // The prompt, waiting.
    context.strokeStyle = '#55555C'
    context.lineWidth = 2
    context.beginPath()
    context.roundRect(28, 520, 968, 58, 8)
    context.stroke()
    context.fillStyle = '#B9B9C0'
    context.fillText('>', 48, 550)
    context.fillStyle = '#F3F0E8'
    context.fillRect(76, 536, 13, 28)
  })
}

/**
 * The laptop's desktop: a wallpaper, a dock, and NotchNest's panel hanging from the notch, the way the app opens.
 * The screen is 0.52 by 0.323; the notch is 108 by 39 pixels of it, at the top in the middle.
 */
function laptopScreen(panel: HTMLImageElement) {
  return canvasTexture(1024, 636, (context) => {
    const sky = context.createLinearGradient(0, 0, 0, 636)
    sky.addColorStop(0, '#2A2458')
    sky.addColorStop(0.6, '#5B4FC4')
    sky.addColorStop(1, '#8FD8C0')
    context.fillStyle = sky
    context.fillRect(0, 0, 1024, 636)
    // Two soft hills, so it reads as a wallpaper.
    context.fillStyle = 'rgba(20, 18, 48, 0.35)'
    context.beginPath()
    context.moveTo(0, 636)
    for (let x = 0; x <= 1024; x += 16) context.lineTo(x, 470 + Math.sin(x / 150) * 40)
    context.lineTo(1024, 636)
    context.fill()
    context.fillStyle = 'rgba(20, 18, 48, 0.55)'
    context.beginPath()
    context.moveTo(0, 636)
    for (let x = 0; x <= 1024; x += 16) context.lineTo(x, 540 + Math.sin(x / 90 + 2) * 26)
    context.lineTo(1024, 636)
    context.fill()
    // The menu bar, black round the notch as on a MacBook.
    context.fillStyle = 'rgba(8, 8, 14, 0.85)'
    context.fillRect(0, 0, 1024, 39)
    context.fillStyle = 'rgba(255, 255, 255, 0.75)'
    for (const [x, w] of [[22, 46], [86, 30], [130, 38], [182, 34], [818, 20], [852, 20], [890, 112]]) context.fillRect(x, 15, w, 9)
    // The dock.
    context.fillStyle = 'rgba(255, 255, 255, 0.22)'
    context.beginPath()
    context.roundRect(352, 572, 320, 52, 16)
    context.fill()
    const tiles = ['#7AF0C0', '#A78BFA', '#F3F0E8', '#FFB86B', '#6EA8FE', '#F37A7A']
    tiles.forEach((colour, k) => {
      context.fillStyle = colour
      context.beginPath()
      context.roundRect(366 + k * 50, 580, 38, 38, 9)
      context.fill()
    })
    // NotchNest, opened out of the notch: black, flush with the top, rounded below, flared where it meets the bar.
    const width = 600
    const height = Math.round((width * panel.height) / panel.width)
    const left = (1024 - width) / 2
    context.fillStyle = '#000'
    context.beginPath()
    context.moveTo(left - 22, 0)
    context.quadraticCurveTo(left - 2, 0, left - 2, 20)
    context.lineTo(left - 2, height + 16)
    context.quadraticCurveTo(left - 2, height + 46, left + 28, height + 46)
    context.lineTo(left + width - 28, height + 46)
    context.quadraticCurveTo(left + width + 2, height + 46, left + width + 2, height + 16)
    context.lineTo(left + width + 2, 20)
    context.quadraticCurveTo(left + width + 2, 0, left + width + 22, 0)
    context.fill()
    context.drawImage(panel, left, 38, width, height)
  })
}

/**
 * What is on the monitor when nobody is reading about the projects: a little runner of my own. A robot runs right;
 * bugs sit on the path; it jumps each one just as it gets there and takes the coin over it, and each coin is ten
 * points. Everything is worked out from how far it has run, so it never misses. Drawn at low resolution and shown with
 * nearest filtering, so it reads as pixel art; `draw(time)` moves it on.
 */
function gameScreen() {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 144
  const context = canvas.getContext('2d')
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.magFilter = THREE.NearestFilter
  texture.minFilter = THREE.NearestFilter
  texture.generateMipmaps = false
  const SPEED = 64 // pixels a second
  const SPACING = 100
  const JITTER = [0, 22, -12, 34]
  const RUNNER = 64 // where the robot runs, across the screen
  const REACH = 26 // how far before and after a bug the jump starts and lands
  const HEIGHT = 30
  const GROUND = 118
  const bugAt = (k: number) => k * SPACING + JITTER[((k % 4) + 4) % 4] + 140
  const draw = (time: number) => {
    if (!context) return
    const c = context
    const px = (x: number, y: number, w: number, h: number, colour: string) => { c.fillStyle = colour; c.fillRect(Math.round(x), Math.round(y), w, h) }
    const run = time * SPEED
    const robot = run + RUNNER
    // Sky, stars, and two layers of hills going by slower than the ground.
    px(0, 0, 256, 144, '#17123A')
    px(0, 60, 256, 84, '#221A52')
    for (let k = 0; k < 18; k++) px((k * 53 + 7) % 256, 18 + ((k * 29) % 40), 1, 1, k % 3 ? '#8E83D8' : '#F3F0E8')
    for (let x = 0; x < 256; x += 2) {
      const far = 78 + Math.sin((x + run * 0.2) / 23) * 8 + Math.sin((x + run * 0.2) / 9) * 3
      px(x, far, 2, 144 - far, '#3A2E86')
    }
    for (let x = 0; x < 256; x += 2) {
      const near = 96 + Math.sin((x + run * 0.5) / 31) * 6
      px(x, near, 2, 144 - near, '#4B3CB0')
    }
    // The ground, in tiles going by at the robot's speed.
    for (let x = -16; x < 272; x += 16) {
      const left = x - (run % 16)
      px(left, GROUND, 16, 26, '#0B7F55')
      px(left, GROUND, 16, 4, '#3DDC97')
      px(left + 4, GROUND + 10, 3, 3, '#086444')
      px(left + 11, GROUND + 18, 3, 3, '#086444')
    }
    // The bugs on the path, each with its coin over it until the robot takes it.
    let passed = 0
    let lift = 0
    let since = Infinity
    const first = Math.floor((run - 40) / SPACING) - 2
    for (let k = Math.max(0, first); k < first + 6; k++) {
      const at = bugAt(k)
      const x = at - run
      const ahead = at - robot
      if (ahead < 0) { passed = k + 1; since = Math.min(since, -ahead) }
      if (Math.abs(ahead) < REACH) lift = HEIGHT * (1 - (ahead / REACH) ** 2)
      if (x < -16 || x > 272) continue
      // A bug: a coral shell split down the back, a dark head, legs that scuttle.
      const step = Math.floor(time * 8 + k) % 2
      px(x - 7, GROUND - 11, 14, 9, '#FF7A6B')
      px(x - 5, GROUND - 13, 10, 2, '#FF7A6B')
      px(x, GROUND - 13, 1, 11, '#7A2A2A')
      px(x - 10, GROUND - 9, 4, 5, '#2A1430')
      px(x - 10, GROUND - 8, 1, 1, '#F3F0E8')
      px(x - 7 + step, GROUND - 2, 2, 2, '#2A1430')
      px(x - 1 - step, GROUND - 2, 2, 2, '#2A1430')
      px(x + 5 + step, GROUND - 2, 2, 2, '#2A1430')
      if (ahead > 0) {
        const bob = Math.round(Math.sin(time * 5 + k))
        const top = GROUND - 20 - HEIGHT - 8 + bob
        px(x - 3, top, 7, 9, '#C98A1E')
        px(x - 2, top + 1, 5, 7, '#FFD98A')
        px(x, top + 2, 1, 5, '#FFF6DA')
      }
    }
    // The robot: a mint visor, legs going on the ground and tucked in the air.
    const y = GROUND - 20 - lift
    const stride = lift > 0 ? 2 : Math.floor(run / 6) % 2
    px(RUNNER - 5 + 1, y + 14, 3, stride === 2 ? 3 : 6 - stride * 2, '#F3F0E8')
    px(RUNNER - 5 + 7, y + 14, 3, stride === 2 ? 3 : 4 + stride * 2, '#F3F0E8')
    px(RUNNER - 5, y + 4, 11, 11, '#F3F0E8')
    px(RUNNER - 4, y, 9, 5, '#F3F0E8')
    px(RUNNER - 1, y + 1, 6, 3, '#3DDC97')
    px(RUNNER - 3, y + 8, 7, 2, '#5B3CC4')
    px(RUNNER, y - 3, 1, 3, '#F3F0E8')
    px(RUNNER - 1, y - 4, 3, 1, '#FFD98A')
    c.font = `bold 9px ${FONT.mono}`
    c.textBaseline = 'top'
    // "+10" floats up off each coin taken.
    if (since < 24) {
      c.fillStyle = '#FFD98A'
      c.fillText('+10', RUNNER - 6, GROUND - 70 - since * 0.6)
    }
    // The score and the coins, from the bugs got past.
    c.fillStyle = '#F3F0E8'
    c.fillText('SCORE ' + String(passed * 10).padStart(5, '0'), 8, 6)
    px(198, 5, 6, 8, '#C98A1E')
    px(199, 6, 4, 6, '#FFD98A')
    c.fillStyle = '#FFD98A'
    c.fillText('x' + String(passed).padStart(3, '0'), 208, 6)
    texture.needsUpdate = true
  }
  draw(0)
  return { texture, draw }
}

/** One pinboard card per role, oldest first along the string. */
const ROLES = [...content.experience].reverse()
const PIN: Record<string, Triple> = { research: VIOLET, industry: MINT, teaching: [0.9, 0.88, 0.84] }

function roleCard(role: (typeof ROLES)[number]) {
  return canvasTexture(320, 240, (context) => {
    context.fillStyle = COLOURS.paper
    context.fillRect(0, 0, 320, 240)
    context.fillStyle = role.category === 'research' ? COLOURS.violet : role.category === 'industry' ? '#3DDC97' : COLOURS.ink
    context.fillRect(0, 0, 320, 18)
    context.textBaseline = 'top'
    context.fillStyle = COLOURS.muted
    context.font = `500 22px ${FONT.mono}`
    context.fillText(role.start.slice(0, 4), 22, 40)
    context.fillStyle = COLOURS.ink
    context.font = `400 44px ${FONT.display}`
    const y = wrap(context, role.short.toUpperCase(), 22, 76, 280, 48)
    context.fillStyle = COLOURS.muted
    context.font = `500 22px ${FONT.sans}`
    wrap(context, role.title, 22, y + 6, 280, 28)
  })
}

/** The night seen through the closed window from inside: sky, stars, the city, and the searchlight already up. */
function nightOutside() {
  const random = seeded(5)
  return canvasTexture(512, 512, (context) => {
    const sky = context.createLinearGradient(0, 0, 0, 512)
    sky.addColorStop(0, '#05060E')
    sky.addColorStop(1, '#2A2459')
    context.fillStyle = sky
    context.fillRect(0, 0, 512, 512)
    context.fillStyle = '#E9E6F6'
    for (let star = 0; star < 40; star++) context.fillRect(random() * 512, random() * 330, 3, 3)
    context.fillStyle = '#FFF0BF'
    context.beginPath()
    context.ellipse(350, 120, 46, 30, 0, 0, Math.PI * 2)
    context.fill()
    let x = 0
    while (x < 512) {
      const width = 40 + random() * 70
      const top = 340 + random() * 110
      context.fillStyle = '#0B0D1C'
      context.fillRect(x, top, width - 6, 512 - top)
      for (let wy = top + 14; wy < 500; wy += 26) for (let wx = x + 8; wx < x + width - 18; wx += 18) {
        if (random() < 0.25) {
          context.fillStyle = random() < 0.85 ? '#F2B65A' : '#A9B6E8'
          context.fillRect(wx, wy, 7, 10)
        }
      }
      x += width
    }
  })
}

// ── where the camera goes ──────────────────────────────────────────────────────────────────────────────────────

interface Shot { at: THREE.Vector3; look: THREE.Vector3; fov: number }
/** `fov` is the field of view across the stage's shorter side, in degrees. */
const shot = (at: Triple, look: Triple, fov: number): Shot => ({ at: v(...at), look: v(...look), fov })

const OVERVIEW_LOOK: Triple = [0, 0.45, 1.05]
const OVERVIEW_FOV = 24
const OVERVIEW_DISTANCE = 3.2 / Math.tan(THREE.MathUtils.degToRad(OVERVIEW_FOV / 2))
const OVERVIEW_DIRECTION = v(7.5, -7.55, 5.15).normalize()

const SHOTS = {
  research: shot([0.15, -0.75, 1.75], [-2.17, -0.1, 1.68], 42),
  monitor: shot([1.25, 0.66, 1.62], [0.26, 1.92, 1.28], 44),
  // Close on the right-hand screen, while a project on it is read.
  project: shot([0.9, 1.04, 1.43], [0.64, 1.9, 1.31], 40),
  laptop: shot([1.56, 0.95, 1.32], [1.16, 1.75, 0.96], 40),
  pinboard: shot([-0.95, 0.05, 1.98], [-1.0, 2.18, 1.98], 46),
  // Out of the window, into the night sky over the city.
  sky: shot([1.25, 3.6, 1.95], [0.4, 12, 4.8], 50),
  // Outside, looking back in at the open window.
  outside: shot([2.9, 5.0, 3.09], [1.0, 2.0, 1.6], 30),
}

/** Where each corner's tag sits from its corner, in pixels: Engineering out on the floor left of the chair (its dot on
 * the end of the desk, so its leader never crosses me), Contact down the wall below the window. On a phone, Engineering
 * goes on the floor left of the chair and Contact below the plant. */
const TAG_OFFSETS: [number, number][] = [[0, 0], [-175, 105], [0, 0], [0, 0], [10, 100]]
const TAG_OFFSETS_PHONE: [number, number][] = [[0, 0], [-95, 48], [0, 0], [0, 0], [0, 125]]

/** The desk lamp's bulb, under its shade. */
const LAMP_BULB = v(-0.49, 1.71, 1.2)

/** The way through the window: moves between the room and outside bend through here. */
const GATEWAY = v(1.25, 1.3, 1.9)
/** Whether a point (in three's axes) is outside, beyond the back wall. */
const outdoors = (point: THREE.Vector3) => point.z < -2.3
/** Outside, the camera swings out away from the building rather than out into the room. */
const YARD_DIRECTION = v(0.3, 1, 0.4).normalize()

/** What the searchlight is on while each About beat is read. */
const LIGHT: Record<string, string> = { 'about-intro': 'me', education: 'where I studied', recognition: 'awards', skills: 'what I work with' }

/** What the frame's caption says while each beat is being read. */
function captionFor(chapter: number, beat: string) {
  if (chapter === 0) {
    const board = BOARDS[beat]
    return board ? 'On the whiteboard: ' + board.title : 'The whiteboard'
  }
  if (chapter === 1) {
    const project = content.software.find((item) => item.id === beat)
    if (!project) return 'The desk'
    return (beat === 'notchnest' ? 'On the laptop: ' : 'On the monitor: ') + project.title
  }
  if (chapter === 2) {
    const role = ROLES.find((item) => item.id === beat)
    return role ? 'On the pinboard: ' + role.short : 'The pinboard, oldest on the left'
  }
  if (chapter === 3) return LIGHT[beat] ? 'In the light: ' + LIGHT[beat] : 'Out the window: the searchlight'
  return 'Outside, looking in'
}

/** How far the light's glow reaches beyond its core, as a multiple of the core's size. */
const HALO = 1.5

/** Smooth 3D value noise, and a few octaves of it, for haze and dust in the light. */
const NOISE = `
  float hash(vec3 p) { return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }
  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i), hash(i + vec3(1, 0, 0)), f.x), mix(hash(i + vec3(0, 1, 0)), hash(i + vec3(1, 1, 0)), f.x), f.y),
      mix(mix(hash(i + vec3(0, 0, 1)), hash(i + vec3(1, 0, 1)), f.x), mix(hash(i + vec3(0, 1, 1)), hash(i + vec3(1, 1, 1)), f.x), f.y),
      f.z);
  }
  float fbm(vec3 p) {
    float total = 0.0;
    float amount = 0.5;
    for (int i = 0; i < 4; i++) { total += amount * noise(p); p *= 2.03; amount *= 0.5; }
    return total / 0.9375;
  }`

// ── the scene ──────────────────────────────────────────────────────────────────────────────────────────────────

export interface RoomOptions {
  /** The hero section, and its panel of text: the room is framed in the space beside it. */
  hero: HTMLElement
  intro: HTMLElement
  /** The tour carries `data-chapter` (-1 in the hero) and `data-beat`; its column of chapters sits beside the room. */
  tour: HTMLElement
  column: HTMLElement
  /** One section per chapter. Each is marked `is-arrived` once the camera has reached its corner. */
  sections: HTMLElement[]
  header: HTMLElement
  /** A tag for each corner, shown beside it in the hero, and a caption saying what is on show in the tour. */
  tags: HTMLElement[]
  caption: HTMLElement
  /** Whether the room animates on its own; the camera always follows the page. */
  running: boolean
  reducedMotion: boolean
}

export interface Room {
  setRunning(running: boolean): void
  dispose(): void
}

function loadTexture(path: string) {
  return new THREE.TextureLoader().loadAsync(path).then((texture) => {
    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = 4
    return texture
  })
}

/** Crops a picture to fill a screen of `aspect`, keeping its `anchor` (0 bottom/left to 1 top/right) in view. */
function cover(texture: THREE.Texture, aspect: number, anchor = 0.5) {
  const image = texture.image as { width: number; height: number }
  const own = image.width / image.height
  if (own > aspect) {
    texture.repeat.set(aspect / own, 1)
    texture.offset.set((1 - aspect / own) * anchor, 0)
  } else {
    texture.repeat.set(1, own / aspect)
    texture.offset.set(0, (1 - own / aspect) * anchor)
  }
  return texture
}

/** Hands the main thread back for a moment, so building the room never holds up a scroll or a tap for long. */
const pause = () => new Promise<void>((resolve) => setTimeout(resolve, 0))

export async function createRoom(canvas: HTMLCanvasElement, options: RoomOptions): Promise<Room> {
  const { hero, intro, tour, column, sections, header, tags, caption, reducedMotion } = options
  let running = options.running

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'high-performance' })
  renderer.autoClear = false
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.shadowMap.autoUpdate = false

  await Promise.all([
    document.fonts.load(`400 64px ${FONT.display}`),
    document.fonts.load(`600 40px ${FONT.sans}`),
    document.fonts.load(`500 24px ${FONT.mono}`),
  ]).catch(() => {})
  const [dashboard, notchnest] = await Promise.all([
    loadTexture('/projects/chillysos-heat.webp').then((texture) => cover(texture, 0.58 / 0.34, 1)),
    loadTexture('/projects/notchnest-music.webp').then((texture) => laptopScreen(texture.image as HTMLImageElement)),
  ])
  // Krypton's own screens, from its repository: the dashboard, a prediction, and an IP traced to a map. Not waited
  // for: they are a chapter away, and until they come the monitor keeps ChillySOS up.
  const krypton: THREE.Texture[] = []
  let disposed = false
  Promise.all(['home', 'prediction', 'iptrack'].map((name) => loadTexture(`/projects/krypton-${name}.webp`).then((texture) => cover(texture, 0.58 / 0.34, 1))))
    .then((list) => (disposed ? list.forEach((texture) => texture.dispose()) : krypton.push(...list)))
    .catch(() => {})

  const scene = new THREE.Scene()
  const world = new THREE.Group()
  world.rotation.x = -Math.PI / 2 // build in Blender's axes
  scene.add(world)
  scene.add(new THREE.AmbientLight(0xffffff, 0.6 * Math.PI))
  const sun = new THREE.DirectionalLight(0xffffff, 1.02 * Math.PI)
  sun.position.copy(v(0.439, -0.627, 0.643).multiplyScalar(8))
  sun.castShadow = true
  sun.shadow.mapSize.set(2048, 2048)
  Object.assign(sun.shadow.camera, { left: -3.6, right: 3.6, top: 3.6, bottom: -3.6, near: 1, far: 18 })
  sun.shadow.bias = -0.0004
  sun.shadow.normalBias = 0.015
  scene.add(sun)

  const rand = seeded(11)
  const wall = toon([0.9, 0.89, 0.86], [0.08, 0.085, 0.1], 0.2, 0.55)
  const floor = toon([0.66, 0.64, 0.6], [0.07, 0.075, 0.09])
  const wood = toon([0.78, 0.75, 0.7], [0.07, 0.075, 0.09])
  const dark = toon([0.2, 0.21, 0.24], [0.03, 0.033, 0.04], 0.4, 0.8)
  const paper = toon([0.97, 0.97, 0.95], [0.12, 0.13, 0.15])
  const ink = flat(INK)
  const violet = toon(VIOLET, scaled(VIOLET, 0.25))
  const mint = toon(MINT, scaled(MINT, 0.25))
  // What I wear: a pale blue zip jacket, dark jeans, blue trainers.
  const jacket = toon([0.47, 0.66, 0.88], [0.07, 0.11, 0.2], 0.3, 0.7)
  const jeans = toon([0.07, 0.08, 0.13], [0.012, 0.014, 0.025], 0.35, 0.8)
  const shoe = toon([0.16, 0.26, 0.78], [0.03, 0.04, 0.13])
  const skin = toon([0.78, 0.6, 0.47], [0.2, 0.13, 0.1], 0.25, 0.6)
  // Window frames: dark, with only a little tone, which turns to noise this close.
  const frame = toon([0.2, 0.21, 0.24], [0.03, 0.033, 0.04], 0.12, 0.4)
  const hair = toon([0.15, 0.15, 0.19], [0.02, 0.02, 0.03], 0.45, 0.85)
  // A short beard: lighter than the hair, so it reads as stubble rather than a mask.
  const stubble = toon([0.36, 0.31, 0.29], [0.1, 0.08, 0.07], 0.3, 0.7)
  const batch = new Batch()

  // The room: a floor and two walls, cut away towards the viewer.
  batch.block(floor, [0, 0, -0.05], [4.4, 4.4, 0.1])
  // The back wall is built round the window's opening (x 0.78 to 1.72, z 1.4 to 2.3), in pieces that read as one.
  const backWall = newId()
  batch.block(wall, [-0.71, 2.25, 1.45], [2.98, 0.1, 3.0], [0, 0, 0], 0, backWall)
  batch.block(wall, [1.96, 2.25, 1.45], [0.48, 0.1, 3.0], [0, 0, 0], 0, backWall)
  batch.block(wall, [1.25, 2.25, 0.675], [0.94, 0.1, 1.45], [0, 0, 0], 0, backWall)
  batch.block(wall, [1.25, 2.25, 2.625], [0.94, 0.1, 0.65], [0, 0, 0], 0, backWall)
  batch.block(wall, [-2.25, 0, 1.45], [0.1, 4.4, 3.0])
  batch.add(violet, drum(1.0, 0.012, 64).scale(1.2, 0.85, 1), place([0.3, 0.8, 0.006]))

  const sphere = (radius: number) => new THREE.SphereGeometry(radius, 32, 16)

  await pause()
  // 02 Engineering: the desk, a long mat across it, a project on the monitor and NotchNest on the laptop.
  batch.block(wood, [0.35, 1.72, 0.76], [2.1, 0.85, 0.06], [0, 0, 0], 0.01)
  for (const x of [-0.62, 1.32]) batch.block(wood, [x, 1.72, 0.37], [0.06, 0.78, 0.74])
  const DESK = 0.79
  const MAT = DESK + 0.006
  // The mat: dark, edged in violet, from the mouse's end of the desk to under the laptop.
  batch.block(violet, [0.47, 1.505, DESK + 0.002], [1.8, 0.41, 0.004])
  batch.block(toon([0.11, 0.11, 0.15], [0.02, 0.02, 0.03]), [0.47, 1.505, DESK + 0.004], [1.78, 0.39, 0.004])

  // Two monitors on a dual arm clamped to the back of the desk, turned in a little towards the chair. The right one has
  // the game and the projects on it; the left one, an editor. (Their outer edges clear the lamp and the laptop.)
  const SCREEN = { width: 0.6, height: 0.36, turn: 0.15, z: 1.32 }
  const POLE = { x: 0.25, y: 2.1 }
  const ARM_Z = DESK + 0.19
  const piston = toon([0.56, 0.57, 0.61], [0.08, 0.085, 0.1], 0.3, 0.7)
  const monitors = [-1, 1].map((side) => {
    const turn = -side * SCREEN.turn
    const inner = POLE.x + side * 0.01
    const at: Triple = [inner + side * (SCREEN.width / 2) * Math.cos(turn), 1.94 + (SCREEN.width / 2) * Math.sin(turn) * side, SCREEN.z]
    return { side, at, matrix: place(at, [1, 1, 1], [0, 0, turn]) }
  })
  for (const { side, at, matrix } of monitors) {
    batch.add(dark, box([SCREEN.width, 0.024, SCREEN.height], 0.006), matrix)
    batch.add(dark, box([0.12, 0.012, 0.12]).translate(0, 0.018, 0), matrix)
    batch.add(mint, box([0.02, 0.003, 0.005]).translate(SCREEN.width / 2 - 0.05, -0.013, -SCREEN.height / 2 + 0.008), matrix)
    // A gas-spring arm: a flat link out from the top of the pole to the elbow, then the spring link, a boxy beam with
    // its piston underneath, rising forward to the tilt head on the monitor's back.
    const shoulder: Triple = [POLE.x, POLE.y, ARM_Z]
    const elbow: Triple = [POLE.x + side * 0.36, POLE.y - 0.01, ARM_Z]
    const head: Triple = [at[0], at[1] + 0.07, SCREEN.z - 0.03]
    batch.add(dark, link(shoulder, elbow, 0.05, 0.026))
    batch.add(dark, drum(0.026, 0.05), place(elbow))
    batch.add(dark, link(elbow, head, 0.045, 0.034))
    batch.add(piston, limb([elbow[0], elbow[1] - 0.008, elbow[2] - 0.03], [head[0], head[1] - 0.004, head[2] - 0.045], 0.007))
    batch.add(dark, box([0.05, 0.05, 0.05], 0.008), place(head))
    batch.add(dark, limb(head, [at[0], at[1] + 0.03, SCREEN.z], 0.012))
  }
  // The pole, short, with both arms off its top, and its clamp.
  batch.add(dark, drum(0.018, ARM_Z - DESK + 0.03), place([POLE.x, POLE.y, (ARM_Z + DESK) / 2 + 0.015]))
  batch.add(dark, drum(0.024, 0.04), place([POLE.x, POLE.y, ARM_Z]))
  batch.block(dark, [POLE.x, POLE.y + 0.01, DESK + 0.02], [0.07, 0.09, 0.04], [0, 0, 0], 0.006)
  batch.block(dark, [POLE.x, POLE.y + 0.035, DESK - 0.05], [0.05, 0.03, 0.1], [0, 0, 0], 0.006)
  // A light bar clipped to the top of the right one.
  const right = monitors[1].matrix
  batch.add(dark, drum(0.012, 0.36).rotateY(Math.PI / 2).translate(0, 0.004, SCREEN.height / 2 + 0.017), right)
  batch.add(paper, box([0.32, 0.006, 0.004]).translate(0, -0.006, SCREEN.height / 2 + 0.005), right)
  const screen = () => new THREE.PlaneGeometry(SCREEN.width - 0.02, SCREEN.height - 0.02).rotateX(Math.PI / 2).translate(0, -0.0125, 0.002)
  const monitorMaterial = new THREE.MeshBasicMaterial({ map: dashboard })
  single(world, monitorMaterial, screen(), right)
  const editor = claudeScreen()
  single(world, new THREE.MeshBasicMaterial({ map: editor }), screen(), monitors[0].matrix)

  // The laptop: a silver MacBook, open on NotchNest, with the notch the app drops down from. (Clear of the curved
  // monitor, whose ends come forward over the desk.)
  const LAPTOP_X = 1.18
  const aluminium = toon([0.74, 0.75, 0.78], [0.1, 0.105, 0.12], 0.3, 0.72)
  batch.block(aluminium, [LAPTOP_X, 1.55, MAT + 0.008], [0.55, 0.38, 0.016], [0, 0, 0], 0.006)
  const laptopKeys = newId()
  for (let row = 0; row < 5; row++) {
    for (let k = 0; k < 12; k++) batch.block(dark, [LAPTOP_X - 0.198 + k * 0.036, 1.685 - row * 0.032, MAT + 0.0165], [0.026, 0.022, 0.002], [0, 0, 0], 0, laptopKeys)
  }
  batch.block(toon([0.64, 0.65, 0.68], [0.09, 0.095, 0.11]), [LAPTOP_X, 1.45, MAT + 0.0162], [0.2, 0.11, 0.001])
  // The lid turns back about its hinge; its pieces are placed in its own frame (y out of the back, z up the screen).
  const lid = place([LAPTOP_X, 1.735, MAT + 0.016], [1, 1, 1], [-0.25, 0, 0])
  const onLid = (at: Triple, turn: Triple = [0, 0, 0]) => lid.clone().multiply(place(at, [1, 1, 1], turn))
  batch.add(aluminium, box([0.55, 0.008, 0.36], 0.003), onLid([0, 0.004, 0.18]))
  batch.add(ink, box([0.54, 0.001, 0.35]), onLid([0, -0.0005, 0.18]))
  batch.add(ink, box([0.055, 0.002, 0.02]), onLid([0, -0.0025, 0.328]))
  // The screen, up to the notch's lower edge, with NotchNest open out of the notch.
  single(world, new THREE.MeshBasicMaterial({ map: notchnest }), new THREE.PlaneGeometry(0.52, 0.323), onLid([0, -0.0015, 0.1765], [Math.PI / 2, 0, 0]))

  // The keyboard: a 75% board, light caps on a dark case, the modifiers darker, Esc and Enter picked out.
  const KEY = 0.038
  const BOARD = { x: 0.25, y: 1.465 }
  batch.block(dark, [BOARD.x, BOARD.y, MAT + 0.011], [0.6, 0.235, 0.022], [0, 0, 0], 0.008)
  const capColours: Record<string, THREE.Material> = { a: paper, m: toon([0.45, 0.46, 0.5], [0.06, 0.065, 0.08]), e: mint, n: violet }
  const hands = [BOARD.x - 0.12, BOARD.x + 0.12]
  const keys: { mesh: THREE.Mesh; z: number }[] = []
  KEYBOARD.forEach((row, index) => {
    let x = BOARD.x - 7.5 * KEY
    const y = BOARD.y + (2.5 - index) * KEY
    for (const cap of row) {
      const width = Number(cap.slice(1)) * KEY
      const at: Triple = [x + width / 2, y, MAT + 0.028]
      const shape = box([width - 0.006, KEY - 0.006, 0.012], 0.003)
      // The keys under my fingers move on their own; the rest are joined up with the desk.
      if ((index === 2 || index === 3) && cap[0] === 'a' && hands.some((hand) => Math.abs(at[0] - hand) < 0.08)) {
        keys.push({ mesh: single(world, capColours[cap[0]], shape, place(at)), z: at[2] })
      } else batch.add(capColours[cap[0]], shape, place(at))
      x += width
    }
  })
  // The mouse, beside it on the mat.
  batch.add(dark, sphere(1), place([0.66, 1.43, MAT], [0.033, 0.056, 0.022]))
  batch.add(mint, drum(0.008, 0.005).rotateY(Math.PI / 2), place([0.66, 1.455, MAT + 0.0195]))
  // A mug, off the end of the mat, and the lamp.
  batch.add(paper, drum(0.06, 0.13), place([-0.55, 1.5, 0.855]))
  batch.add(paper, new THREE.TorusGeometry(0.035, 0.01, 8, 20), place([-0.61, 1.5, 0.86], [1, 1, 1], [Math.PI / 2, 0, 0]))
  // An architect's lamp on the far end of the desk: a weighted base, two arms with a joint between, and a shade
  // turned down over the mug, with its bulb showing.
  const lampBase: Triple = [-0.62, 1.98, 0.8]
  const lampElbow: Triple = [-0.6, 2.03, 1.2]
  const lampHead: Triple = [-0.5, 1.75, 1.3]
  batch.add(dark, drum(0.075, 0.025), place([lampBase[0], lampBase[1], DESK + 0.0125]))
  batch.add(violet, limb([lampBase[0], lampBase[1], DESK + 0.025], lampElbow, 0.012))
  batch.add(violet, limb(lampElbow, lampHead, 0.011))
  batch.add(dark, sphere(0.022), place(lampElbow))
  const lampAim = new THREE.Vector3(0.144, -0.361, -0.92).normalize()
  const lampTurn = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, -1), lampAim)
  const lampAt = (along: number) => new THREE.Vector3(...lampHead).addScaledVector(lampAim, along)
  batch.add(violet, drum(0.095, 0.13, 40, 0.035), new THREE.Matrix4().compose(lampAt(0.05), lampTurn, ONE))
  batch.add(paper, sphere(0.032), place(lampAt(0.11).toArray() as Triple))

  // Me: seen from behind, at the keyboard, headphones on.
  batch.add(dark, drum(0.24, 0.07), place([0.25, 0.75, 0.45]))
  batch.block(dark, [0.25, 0.5, 0.85], [0.5, 0.06, 0.7], [-0.12, 0, 0], 0.04)
  batch.add(dark, drum(0.03, 0.4), place([0.25, 0.75, 0.24]))
  for (let spoke = 0; spoke < 5; spoke++) {
    const angle = (spoke * Math.PI * 2) / 5
    batch.block(dark, [0.25 + Math.cos(angle) * 0.18, 0.75 + Math.sin(angle) * 0.18, 0.05], [0.36, 0.05, 0.04], [0, 0, angle])
  }
  // Legs, sitting: jeans down to a pair of trainers under the desk. They stay still, so they join the room.
  batch.add(jeans, sphere(1), place([0.25, 0.79, 0.57], [0.2, 0.15, 0.1]))
  for (const side of [-1, 1]) {
    const hip: Triple = [0.25 + side * 0.1, 0.84, 0.56]
    const knee: Triple = [0.25 + side * 0.12, 1.24, 0.58]
    const ankle: Triple = [0.25 + side * 0.13, 1.3, 0.1]
    batch.add(jeans, limb(hip, knee, 0.085, 0.07))
    batch.add(jeans, limb(knee, ankle, 0.066, 0.05))
    batch.block(shoe, [ankle[0], 1.34, 0.05], [0.095, 0.2, 0.07], [0, 0, 0], 0.03)
    batch.block(paper, [ankle[0], 1.34, 0.014], [0.1, 0.21, 0.028], [0, 0, 0], 0.012)
  }
  const body = new THREE.Group()
  body.position.set(0.25, 0.82, 0.7)
  world.add(body)
  const local = (at: Triple): Triple => [at[0] - 0.25, at[1] - 0.82, at[2] - 0.7]
  // The jacket: a body turned on a lathe, leaning in towards the screen, with a stand-up collar.
  const torso = new THREE.LatheGeometry(TORSO.map(([radius, height]) => new THREE.Vector2(radius, height)), 40, Math.PI).rotateX(Math.PI / 2).scale(1.18, 0.8, 1)
  // The jacket is one piece: no seam where the arms meet the body, only its outline.
  const jacketId = newId()
  single(body, jacket, tag(torso, jacketId), place(local([0.25, 0.8, 0.5]), [1, 1, 1], [-0.15, 0, 0]))
  single(body, jacket, drum(0.09, 0.07, 32, 0.077), place(local([0.25, 0.905, 1.235]), [1, 1, 1], [-0.15, 0, 0]))
  single(body, skin, limb(local([0.25, 0.9, 1.2]), local([0.25, 0.93, 1.33]), 0.052))
  // Arms: down from the shoulders, out at the elbows, in to the keys.
  const typing: { mesh: THREE.Mesh; z: number }[] = []
  hands.forEach((handX, index) => {
    const side = index ? 1 : -1
    const shoulder: Triple = [0.25 + side * 0.2, 0.89, 1.09]
    const elbow: Triple = [0.25 + side * 0.25, 1.06, 0.88]
    const wrist: Triple = [handX - side * 0.005, 1.38, MAT + 0.05]
    single(body, jacket, tag(limb(local(shoulder), local(elbow), 0.064, 0.056), jacketId))
    single(body, jacket, tag(limb(local(elbow), local(wrist), 0.055, 0.046), jacketId))
    const hand = single(body, skin, sphere(1), place(local([handX, 1.445, MAT + 0.045]), [0.042, 0.065, 0.02], [0.15, 0, side * 0.12]))
    typing.push({ mesh: hand, z: hand.position.z })
  })
  // The head turns about the neck, so its pieces are placed around that point.
  const neck: Triple = [0.25, 0.92, 1.3]
  const head = new THREE.Group()
  head.position.set(...local(neck))
  body.add(head)
  const fromNeck = (at: Triple): Triple => [at[0] - neck[0], at[1] - neck[1], at[2] - neck[2]]
  const centre: Triple = [0.25, 0.95, 1.44]
  single(head, skin, sphere(HEAD_RADIUS), place(fromNeck(centre), HEAD_SHAPE.toArray()))
  const hairDo = haircut(seeded(5))
  single(head, hair, hairDo.hair.translate(...fromNeck(centre)))
  single(head, stubble, hairDo.beard.translate(...fromNeck(centre)))
  single(head, ink, glasses().translate(...fromNeck(centre)))
  // Headphones: a band over the top, a cup on each ear.
  const ear = (side: number): Triple => [centre[0] + side * 0.186, centre[1] - 0.01, centre[2] - 0.01]
  single(head, mint, new THREE.TorusGeometry(0.18, 0.016, 10, 40, Math.PI), place(fromNeck([centre[0], centre[1] - 0.01, centre[2] - 0.01]), [1, 1.3, 1], [Math.PI / 2, 0, 0]))
  for (const side of [-1, 1]) {
    single(head, mint, drum(0.068, 0.05), place(fromNeck(ear(side)), [1, 1, 1], [0, Math.PI / 2, 0]))
    single(head, dark, drum(0.06, 0.02), place(fromNeck([centre[0] + side * 0.155, centre[1] - 0.01, centre[2] - 0.01]), [1, 1, 1], [0, Math.PI / 2, 0]))
  }

  await pause()
  // 01 Research: the whiteboard, and the papers on the shelf.
  batch.block(paper, [-2.18, -0.1, 1.7], [0.04, 1.5, 0.9], [0, 0, 0], 0.01)
  batch.block(dark, [-2.17, -0.1, 1.22], [0.08, 1.5, 0.04])
  // The map is up from the start; each project's board is written up the first time it is needed.
  const boards = new Map<string, THREE.Texture>([['', whiteboard()]])
  const boardFor = (id: string) => {
    const board = Object.hasOwn(BOARDS, id) ? BOARDS[id as keyof typeof BOARDS] : undefined
    if (!board) return boards.get('') ?? null
    if (!boards.has(id)) boards.set(id, whiteboard(board))
    return boards.get(id) ?? null
  }
  const boardMaterial = new THREE.MeshBasicMaterial({ map: boards.get('') })
  single(world, boardMaterial, new THREE.PlaneGeometry(1.42, 0.83), place([-2.157, -0.1, 1.7], [1, 1, 1], [Math.PI / 2, 0, Math.PI / 2]))
  batch.block(wood, [-2.15, 1.45, 1.05], [0.03, 1.05, 2.1])
  for (const side of [-1, 1]) batch.block(wood, [-1.95, 1.45 + side * 0.51, 1.05], [0.42, 0.03, 2.1])
  batch.block(wood, [-1.95, 1.45, 2.11], [0.42, 1.05, 0.03])
  for (let level = 0; level < 5; level++) {
    const z = 0.15 + level * 0.42
    batch.block(wall, [-1.9, 1.45, z], [0.36, 0.97, 0.03])
    let y = 1.02
    while (y < 1.85) {
      const width = 0.04 + rand() * 0.05
      const height = 0.22 + rand() * 0.12
      const colour = rand() < 0.18 ? violet : rand() < 0.1 ? mint : rand() < 0.6 ? paper : dark
      batch.block(colour, [-1.9, y + width / 2, z + 0.015 + height / 2], [0.28, width, height])
      y += width + 0.006
    }
  }

  await pause()
  // 03 Experience: a card per role, pinned in time order and joined by a string, on a framed cork board.
  const cork = toon([0.56, 0.5, 0.41], [0.12, 0.1, 0.08], 0.3, 0.75)
  batch.block(cork, [-0.95, 2.19, 1.98], [1.6, 0.06, 0.78])
  for (const z of [1.565, 2.395]) batch.block(dark, [-0.95, 2.185, z], [1.7, 0.07, 0.05])
  for (const x of [-1.775, -0.125]) batch.block(dark, [x, 2.185, 1.98], [0.05, 0.07, 0.88])
  // A few blank scraps and a sticky note, in the gaps between the rows.
  for (const [x, z, w, h, turn, colour] of [[-1.48, 2.3, 0.09, 0.06, 0.08, paper], [-1.02, 2.31, 0.07, 0.05, -0.12, paper], [-0.62, 1.66, 0.08, 0.06, 0.1, paper], [-0.3, 2.29, 0.06, 0.06, -0.06, mint]] as const) {
    batch.block(colour, [x, 2.158, z], [w, 0.002, h], [0, turn, 0])
    // A line of handwriting on each, so they read as notes.
    batch.block(violet, [x, 2.1565, z + h * 0.12], [w * 0.65, 0.001, 0.005], [0, turn, 0])
    batch.block(violet, [x - w * 0.08, 2.1565, z - h * 0.18], [w * 0.45, 0.001, 0.005], [0, turn, 0])
  }
  const cards = ROLES.map((role, index) => {
    const x = -1.58 + index * 0.145
    const z = index % 2 ? 1.84 : 2.12
    const tilt = (rand() - 0.5) * 0.2
    const group = new THREE.Group()
    group.position.set(x, 2.155, z)
    group.rotation.set(0, tilt, 0)
    world.add(group)
    const backing = single(group, flat(role.category === 'industry' ? MINT : VIOLET), new THREE.PlaneGeometry(0.18, 0.135), place([0.014, 0.004, -0.014], [1, 1, 1], [Math.PI / 2, 0, 0]))
    backing.visible = false
    const face = new THREE.MeshBasicMaterial({ map: roleCard(role) })
    single(group, face, new THREE.PlaneGeometry(0.18, 0.135), place([0, 0, 0], [1, 1, 1], [Math.PI / 2, 0, 0]))
    // The pin is the card's own, so it comes forward with the card when that card is lit.
    single(group, toon(PIN[role.category] ?? VIOLET), drum(0.014, 0.02), place([0, -0.02, 0.055], [1, 1, 1], [Math.PI / 2, 0, 0]))
    return { id: role.id, side: role.category === 'industry' ? 'industry' : 'academic', x, z, group, backing, face, lift: 0, shown: 1 }
  })
  for (let index = 1; index < cards.length; index++) {
    const a = cards[index - 1]
    const b = cards[index]
    const length = Math.hypot(b.x - a.x, b.z - a.z)
    // (Behind the cards, so it runs pin to pin across the gaps and never across a card's face.)
    batch.block(ink, [(a.x + b.x) / 2, 2.1585, (a.z + b.z) / 2 + 0.055], [length, 0.003, 0.006], [0, -Math.atan2(b.z - a.z, b.x - a.x), 0])
  }

  // A keyboard on a stand, for when I'm not at the desk.
  batch.block(dark, [1.62, -0.55, 0.78], [0.38, 1.4, 0.09], [0, 0, 0], 0.01)
  for (let k = 0; k < 24; k++) batch.block(paper, [1.56, -1.2 + k * 0.056, 0.83], [0.24, 0.05, 0.02])
  for (let k = 0; k < 24; k++) if (k % 7 !== 2 && k % 7 !== 6) batch.block(dark, [1.6, -1.2 + k * 0.056 + 0.028, 0.85], [0.15, 0.03, 0.03])
  for (const side of [-1, 1]) batch.block(dark, [1.62, -0.55 + side * 0.25, 0.38], [0.05, 0.05, 0.8], [side * 0.5, 0, 0])
  batch.block(violet, [1.68, -0.55, 0.84], [0.05, 0.3, 0.01])

  // 04 About: the window. Its frame runs through the wall; its two casements swing outward into the night.
  for (const x of [0.78, 1.72]) batch.block(frame, [x, 2.25, 1.85], [0.06, 0.18, 0.96])
  for (const z of [1.4, 2.3]) batch.block(frame, [1.25, 2.25, z], [1.0, 0.18, 0.06])
  batch.block(wood, [1.25, 2.13, 1.39], [1.06, 0.1, 0.035])
  const casement = (side: 1 | -1) => {
    // Hinged on its outer edge: x runs from the hinge across the opening (side 1 rightwards, -1 leftwards).
    const bars = [
      place([side * 0.02, 0, 0]), place([side * 0.42, 0, 0]),
    ].map((matrix) => box([0.04, 0.035, 0.84]).applyMatrix4(matrix))
    for (const z of [-0.4, 0, 0.4]) bars.push(box([0.44, 0.035, 0.04]).applyMatrix4(place([side * 0.22, 0, z])))
    const hinge = new THREE.Group()
    hinge.position.set(side === 1 ? 0.81 : 1.69, 2.335, 1.85)
    world.add(hinge)
    single(hinge, frame, mergeGeometries(bars))
    return hinge
  }
  const casements = [casement(1), casement(-1)]
  // Through the closed window: a picture of what is out there, until the camera goes out to the real thing.
  const backdrop = single(world, new THREE.MeshBasicMaterial({ map: nightOutside() }), new THREE.PlaneGeometry(1.1, 1.1), place([1.25, 2.4, 1.85], [1, 1, 1], [Math.PI / 2, 0, 0]))

  // 05 Contact: a paper plane, on its way out of the window.
  // A folded dart: two wings off a spine, and a keel under it. Each face is its own piece, so the folds are inked.
  const nose = [0, 0.085, 0]
  const spine = [0, -0.075, 0]
  const faces = [
    [nose, spine, [-0.058, -0.075, 0.014]], [nose, [0.058, -0.075, 0.014], spine],
    [nose, [0, -0.075, -0.03], spine], [nose, spine, [0, -0.075, -0.03]],
  ].map((points) => {
    const face = new THREE.BufferGeometry()
    face.setAttribute('position', new THREE.Float32BufferAttribute(points.flat(), 3))
    face.computeVertexNormals()
    return tag(face)
  })
  const plane = single(world, toon(MINT, scaled(MINT, 0.25)), mergeGeometries(faces))
  plane.material.side = THREE.DoubleSide
  // It waits on the windowsill.
  const planeHome = new THREE.Vector3(1.48, 2.1, 1.445)
  const planeTurn = new THREE.Euler(0.04, 0, 0.45, 'ZYX')
  // Its way out: from the desk, through the window (the control point), out towards whoever is outside.
  const flightPath = [planeHome, new THREE.Vector3(1.45, 2.75, 1.6), new THREE.Vector3(1.5, 3.9, 2.05)]

  // A plant, because every desk has one.
  batch.add(paper, drum(0.15, 0.36, 40, 0.12), place([1.78, 1.55, 0.18]))
  for (let leaf = 0; leaf < 9; leaf++) {
    const angle = leaf * 2.4
    const tilt = 0.4 + (leaf % 3) * 0.25
    const direction = new THREE.Vector3(Math.cos(angle) * Math.sin(tilt), Math.sin(angle) * Math.sin(tilt), Math.cos(tilt))
    const turn = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), direction)
    batch.add(mint, sphere(0.08), new THREE.Matrix4().compose(new THREE.Vector3(1.78, 1.55, 0.4).addScaledVector(direction, 0.2), turn, new THREE.Vector3(0.6, 0.6, 2.2)))
  }
  batch.build(world)

  await pause()
  // ── outside: only drawn once the window is open ──
  // Built in Blender's axes (the building and the city), and in three's (the sky, and the light, which follow the camera).
  const yardWorld = new THREE.Group()
  const yardScene = new THREE.Group()
  world.add(yardWorld)
  scene.add(yardScene)
  const yard = new Batch()
  const yardRandom = seeded(23)
  // The outside of my building, with the window cut out of it, and the neighbours' windows.
  const brick = flat([0.016, 0.018, 0.04])
  const facade = newId()
  // Mine is the top floor: the roof is just above the window.
  yard.block(brick, [-3.61, 2.31, -0.3], [8.78, 0.02, 7.4], [0, 0, 0], 0, facade)
  yard.block(brick, [7.86, 2.31, -0.3], [12.28, 0.02, 7.4], [0, 0, 0], 0, facade)
  yard.block(brick, [1.25, 2.31, -1.3], [0.94, 0.02, 5.4], [0, 0, 0], 0, facade)
  yard.block(brick, [1.25, 2.31, 2.85], [0.94, 0.02, 1.1], [0, 0, 0], 0, facade)
  // A ledge along the floor below, the parapet along the roof, and a sill under my window.
  const ledge = flat([0.03, 0.034, 0.07])
  yard.block(ledge, [4, 2.36, -0.2], [20, 0.1, 0.1])
  yard.block(ledge, [4, 2.38, 3.4], [20, 0.16, 0.14])
  yard.block(frame, [1.25, 2.4, 1.35], [1.14, 0.2, 0.05])
  // The neighbours' lights are kept low: my window is the one to look at.
  const warm = flat([0.62, 0.38, 0.13])
  const cool = flat([0.36, 0.41, 0.62])
  const unlit = flat([0.004, 0.005, 0.012])
  for (const [x, z] of [[-2.6, 1.85], [-4.6, 1.85], [3.6, 1.85], [5.6, 1.85], [7.6, 1.85], [-2.6, -1.6], [1.25, -1.6], [3.6, -1.6], [5.6, -1.6]]) {
    // (The ones either side of mine stay dark, so mine is the lit window in Contact.)
    const lit = Math.abs(x - 1.25) < 4.5 && z > 0 ? 1 : yardRandom()
    yard.block(lit < 0.45 ? warm : lit < 0.6 ? cool : unlit, [x, 2.33, z], [0.9, 0.03, 0.9])
    yard.block(ink, [x, 2.35, z], [0.04, 0.02, 0.9])
    yard.block(ink, [x, 2.35, z + 0.1], [0.9, 0.02, 0.04])
    // Framed like mine, with a sill.
    for (const dz of [-0.475, 0.475]) yard.block(frame, [x, 2.36, z + dz], [1.0, 0.06, 0.05])
    for (const dx of [-0.475, 0.475]) yard.block(frame, [x + dx, 2.36, z], [0.05, 0.06, 1.0])
    yard.block(frame, [x, 2.4, z - 0.52], [1.08, 0.14, 0.04])
  }
  // Brick courses between the floors, and a drainpipe down the wall.
  for (const z of [-0.65, 0.75, 2.75]) yard.block(ledge, [3, 2.335, z], [22, 0.05, 0.035])
  yard.add(frame, drum(0.045, 9.4), place([2.45, 2.38, -1.3]))
  for (const z of [-4, -1.5, 1, 3]) yard.block(frame, [2.45, 2.345, z], [0.14, 0.05, 0.03])
  // Seen from outside, the room needs the two walls it is drawn without, or the window would look out the other side.
  const closing = new THREE.Group()
  world.add(closing)
  const closed = new Batch()
  closed.block(wall, [0, -2.25, 1.45], [4.6, 0.1, 3.0])
  closed.block(wall, [2.25, 0, 1.45], [0.1, 4.4, 3.0])
  closed.block(wall, [0, 0, 2.97], [4.6, 4.6, 0.06])
  closed.build(closing, false)
  closing.visible = false
  // The city: a near row and a far row of blocks, a few windows still lit, each window inked round.
  const near = flat([0.012, 0.014, 0.032])
  const far = flat([0.006, 0.007, 0.018])
  const BASE = -12
  const building = (x: number, y: number, width: number, depth: number, top: number, material: THREE.Material, density: number) => {
    const id = newId()
    yard.block(material, [x, y + depth / 2, (top + BASE) / 2], [width, depth, top - BASE], [0, 0, 0], 0, id)
    const columns = Math.max(1, Math.floor((width - 0.3) / 0.5))
    for (let wz = top - 0.55; wz > -6; wz -= 0.75) {
      for (let column = 0; column < columns; column++) {
        if (yardRandom() > density) continue
        const wx = x - ((columns - 1) * 0.5) / 2 + column * 0.5
        yard.block(yardRandom() < 0.85 ? warm : cool, [wx, y - 0.01, wz], [0.22, 0.02, 0.32])
      }
    }
  }
  // The searchlight's roof, just out in front and standing above the near row, which stays low in the frame.
  // (Placed so it stands clear of the caption in the lower left, about a third of the way across the free space.)
  const LAMP: Triple = [0.4, 10.4, 2.15]
  const LAMP_ROOF = LAMP[2] - 0.55
  building(LAMP[0], 9.6, 2.8, 2.4, LAMP_ROOF, near, 0.2)
  for (let x = -18; x < 20;) {
    const width = 1.6 + yardRandom() * 2.2
    // (A wider gap on the side away from the beam, so nothing stands up behind the lamp.)
    if (x + width > LAMP[0] - 2.6 && x < LAMP[0] + 1.55) { x = LAMP[0] + 1.55; continue }
    building(x + width / 2, 9 + yardRandom() * 2.5, width, 2.5, -3 + yardRandom() * 2.6, near, 0.22)
    x += width + 0.15 + yardRandom() * 0.6
  }
  for (let x = -44; x < 46;) {
    const width = 2.5 + yardRandom() * 2.5
    // (Kept low where it would stand right behind the searchlight, as seen from my window; and none tall enough to reach
    // up behind the light in the sky, which is nearer than this row and would paint over its top.)
    const top = Math.min(3.6, 0.5 + yardRandom() * 7)
    building(x + width / 2, 20 + yardRandom() * 5, width, 4, Math.abs(x + width / 2 + 1.05) < 2 ? Math.min(top, 1.2) : top, far, 0.14)
    x += width + 0.3 + yardRandom()
  }
  // The searchlight on that roof: a plinth, and a head that turns to whatever it lights.
  yard.add(dark, drum(0.32, 0.08), place([LAMP[0], LAMP[1], LAMP_ROOF + 0.04]))
  yard.add(dark, drum(0.09, 0.45), place([LAMP[0], LAMP[1], LAMP_ROOF + 0.3]))
  yard.build(yardWorld, false)
  const lamp = new THREE.Group()
  lamp.position.copy(v(...LAMP))
  yardScene.add(lamp)
  single(lamp, dark, drum(0.24, 0.5, 40, 0.28)).castShadow = false
  single(lamp, dark, new THREE.TorusGeometry(0.28, 0.035, 10, 40), place([0, 0, 0.25])).castShadow = false
  single(lamp, flat([1.0, 0.92, 0.7]), new THREE.CircleGeometry(0.25, 40), place([0, 0, 0.252])).castShadow = false
  const lens = new THREE.Vector3(0, 0, 0.26)

  // The sky: night overhead, lighter down at the city's horizon, and stars.
  const skyAt = v(1.25, 2.3, 1.85)
  const sky = new THREE.Mesh(tag(new THREE.SphereGeometry(45, 48, 24)), new THREE.ShaderMaterial({
    uniforms: { uTop: { value: new THREE.Color('#05060E') }, uHorizon: { value: new THREE.Color('#2A2459') }, uLow: { value: new THREE.Color('#0A0B16') } },
    vertexShader: 'varying vec3 vDir; void main() { vDir = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: `
      uniform vec3 uTop;
      uniform vec3 uHorizon;
      uniform vec3 uLow;
      varying vec3 vDir;
      void main() {
        float h = normalize(vDir).y;
        vec3 c = h > 0.0 ? mix(uHorizon, uTop, pow(smoothstep(0.0, 0.7, h), 0.6)) : mix(uHorizon, uLow, smoothstep(0.0, 0.12, -h));
        gl_FragColor = vec4(c, 1.0);
      }`,
    side: THREE.BackSide,
  }))
  sky.position.copy(skyAt)
  yardScene.add(sky)
  const starPlaces: number[] = []
  for (let star = 0; star < 420; star++) {
    const direction = new THREE.Vector3(yardRandom() * 2 - 1, 0.04 + yardRandom() ** 0.7, yardRandom() * 2 - 1).normalize().multiplyScalar(40)
    starPlaces.push(direction.x, direction.y, direction.z)
  }
  ;[[0, 280, 1.6], [280, 420, 2.6]].forEach(([from, to, pixels]) => {
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(starPlaces.slice(from * 3, to * 3), 3))
    const points = new THREE.Points(geometry, new THREE.PointsMaterial({ color: new THREE.Color('#E9E6F6'), size: pixels, sizeAttenuation: false }))
    points.position.copy(skyAt)
    points.layers.set(1) // not in the line pass
    yardScene.add(points)
  })

  // The light: where the beam meets the haze up in the sky, behind whatever About card is being read. A hot, even
  // core (the card sits inside it), a soft rim, a glow spilling round it, and haze drifting across it. It is drawn
  // after everything else, behind the rooftops (the sky shot is aimed high enough that the cards clear them): in the
  // line pass on its own (layer 2), where it draws exactly what the sky behind it would, so it has no outline; in the
  // colour pass last.
  const skyId = sky.geometry.getAttribute('aId').getX(0)
  const signal = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.ShaderMaterial({
    uniforms: {
      uOpacity: { value: 0 },
      uFlicker: { value: 1 },
      uTime: { value: 0 },
      uMode: { value: 0 },
      uCore: { value: 1 / HALO },
      uLight: { value: new THREE.Color('#FFF6DA') },
      uWarm: { value: new THREE.Color('#FFD98A') },
      uSkyId: { value: skyId },
      uSkyCentre: { value: new THREE.Vector3() },
      uSkyRadius: { value: 45 },
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vView;
      void main() {
        vUv = uv;
        vec4 place = modelViewMatrix * vec4(position, 1.0);
        vView = place.xyz;
        gl_Position = projectionMatrix * place;
      }`,
    fragmentShader: `
      uniform float uOpacity;
      uniform float uFlicker;
      uniform float uTime;
      uniform float uMode;
      uniform float uCore;
      uniform vec3 uLight;
      uniform vec3 uWarm;
      uniform float uSkyId;
      uniform vec3 uSkyCentre;
      uniform float uSkyRadius;
      varying vec2 vUv;
      varying vec3 vView;
      ${NOISE}
      void main() {
        vec2 p = (vUv * 2.0 - 1.0) / uCore; // 1 at the edge of the core
        float r = length(p);
        if (uMode > 0.5) {
          // The line pass: what the inside of the sky dome would write here, from where the camera's ray meets it.
          if (r > 1.04 || uOpacity < 0.3) discard;
          vec3 d = normalize(vView);
          float b = dot(d, uSkyCentre);
          float t = b + sqrt(max(b * b - dot(uSkyCentre, uSkyCentre) + uSkyRadius * uSkyRadius, 0.0));
          vec3 facing = -(d * t - uSkyCentre) / uSkyRadius;
          gl_FragColor = vec4(facing.xy, fract(uSkyId * 0.6180339), t * -d.z / 60.0);
          return;
        }
        float core = 1.0 - smoothstep(0.94, 1.05, r);
        // The glow dies away well inside the plane's edge (the screen brings out even faint light on a dark sky).
        float glow = exp(-max(r - 0.96, 0.0) * 3.5) * 0.13 * (1.0 - core) * smoothstep(1.0, 0.7, length(vUv * 2.0 - 1.0));
        float haze = fbm(vec3(p * 1.7, uTime * 0.05));
        vec3 colour = mix(uWarm, uLight, smoothstep(1.05, 0.15, r)) * mix(0.86, 1.0, haze) * (1.0 + 0.06 * (1.0 - r * r));
        // Premultiplied: the core covers the sky, the glow adds to it.
        gl_FragColor = vec4(colour * (core + glow * haze) * uOpacity * uFlicker, core * uOpacity);
      }`,
    transparent: true,
    depthWrite: false,
    blending: THREE.CustomBlending,
    blendSrc: THREE.OneFactor,
    blendDst: THREE.OneMinusSrcAlphaFactor,
  }))
  signal.layers.set(2)
  signal.renderOrder = 10
  yardScene.add(signal)
  const signalUniforms = (signal.material as THREE.ShaderMaterial).uniforms
  // The beam, from the lamp's glass to the light: thick near the lamp and thinning out, brightest where you look
  // straight through it, with dust drifting up it.
  // (A unit cylinder, opened out into a cone in the shader: from the glass's radius at the lamp to `uEnd` at the light.)
  const beam = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 1, 64, 24, true).translate(0, 0.5, 0), new THREE.ShaderMaterial({
    uniforms: { uOpacity: { value: 0 }, uTime: { value: 0 }, uLength: { value: 1 }, uEnd: { value: 1 }, uColour: { value: new THREE.Color('#FFE7AE') } },
    vertexShader: `
      uniform float uLength;
      uniform float uEnd;
      varying vec3 vNormal;
      varying vec3 vView;
      varying vec3 vLocal;
      void main() {
        float radius = mix(0.22, uEnd, position.y);
        vec3 shaped = vec3(position.x * radius, position.y * uLength, position.z * radius);
        vec4 place = modelViewMatrix * vec4(shaped, 1.0);
        // The cone's side leans out as it goes: its normal leans back to match.
        vec3 slope = normalize(vec3(normal.x, -(uEnd - 0.22) / uLength, normal.z));
        vNormal = normalize(normalMatrix * slope);
        vView = normalize(-place.xyz);
        vLocal = position;
        gl_Position = projectionMatrix * place;
      }`,
    fragmentShader: `
      uniform float uOpacity;
      uniform float uTime;
      uniform vec3 uColour;
      varying vec3 vNormal;
      varying vec3 vView;
      varying vec3 vLocal;
      ${NOISE}
      void main() {
        float facing = pow(abs(dot(normalize(vNormal), normalize(vView))), 1.6);
        float along = vLocal.y;
        float dust = fbm(vec3(vLocal.x * 2.5, along * 9.0 - uTime * 0.35, vLocal.z * 2.5));
        // (It fades out over its last stretch, so it ends in the pool rather than past it.)
        float strength = mix(1.1, 0.24, sqrt(along)) * mix(0.55, 1.3, dust) * (1.0 - smoothstep(0.82, 0.97, along));
        gl_FragColor = vec4(uColour, uOpacity * facing * strength);
      }`,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
  }))
  beam.layers.set(1)
  beam.frustumCulled = false // its shape is made in the shader, so its box can't be trusted
  yardScene.add(beam)
  // Glare at the lamp's glass.
  const glare = new THREE.Sprite(new THREE.SpriteMaterial({
    map: canvasTexture(128, 128, (context) => {
      const light = context.createRadialGradient(64, 64, 0, 64, 64, 64)
      light.addColorStop(0, 'rgba(255, 248, 225, 1)')
      light.addColorStop(0.18, 'rgba(255, 232, 170, 0.75)')
      light.addColorStop(0.5, 'rgba(255, 210, 130, 0.18)')
      light.addColorStop(1, 'rgba(255, 200, 120, 0)')
      context.fillStyle = light
      context.fillRect(0, 0, 128, 128)
    }),
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }))
  glare.layers.set(1)
  glare.scale.setScalar(1.6)
  yardScene.add(glare)
  yardWorld.visible = yardScene.visible = false

  // What the pointer can land on in the hero: one box around each chapter's corner.
  const pickables = ([
    [[-2.0, 0.6, 1.3], [0.6, 3.0, 2.2]],
    [[0.35, 1.7, 1.0], [2.1, 0.9, 1.4]],
    [[-1.0, 2.1, 1.98], [1.4, 0.2, 0.8]],
    [[1.25, 2.2, 1.85], [1.0, 0.3, 1.0]],
    [[planeHome.x, planeHome.y, planeHome.z], [0.4, 0.4, 0.35]],
  ] as [Triple, Triple][]).map(([at, size], chapter) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), new THREE.MeshBasicMaterial())
    mesh.position.set(...at)
    mesh.visible = false
    mesh.userData.chapter = chapter
    world.add(mesh)
    return mesh
  })
  const leaders = tags.map((tag) => {
    const leader = document.createElement('span')
    leader.className = 'room-leader'
    leader.setAttribute('aria-hidden', 'true')
    tag.before(leader)
    return leader
  })
  const anchors = [v(-2.16, -0.1, 2.25), v(-0.62, 1.55, DESK + 0.01), v(-1.0, 2.18, 2.45), v(1.25, 2.19, 2.45), v(planeHome.x, planeHome.y, planeHome.z + 0.22)]
  const game = gameScreen()
  let gameDrawn = -1
  scene.updateMatrixWorld(true)

  await pause()
  // ── passes ──
  const camera = new THREE.PerspectiveCamera(OVERVIEW_FOV, 1, 0.05, 60)
  const lines = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter })
  const colour = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, samples: 4 })
  const inkMaterial = makeInk()
  const inkScene = new THREE.Scene()
  inkScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), inkMaterial))
  const inkCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
  inkMaterial.uniforms.tColour.value = colour.texture
  inkMaterial.uniforms.tLines.value = lines.texture

  const size = { width: 1, height: 1, ratio: 1 }
  // When the page last did something (scrolled, pointer moved, resized, changed theme). Otherwise the room draws at
  // half rate, or not at all while paused.
  let stirred = performance.now()
  const stir = () => { stirred = performance.now() }
  const themeWatcher = new MutationObserver(stir)
  themeWatcher.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] })
  window.addEventListener('scroll', stir, { passive: true })
  const resize = () => {
    // The canvas fills the screen; its own size is the one to trust (a phone's toolbar changes it without a resize).
    const width = Math.max(1, canvas.clientWidth || window.innerWidth)
    const height = Math.max(1, canvas.clientHeight || window.innerHeight)
    // At most 1.5 device pixels per CSS pixel: the ink and the dots are drawn per pixel, so they stay crisp, and on a
    // retina screen that is under 60% of the pixels to fill.
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5)
    // Setting a canvas's size wipes it, so only when something has really changed.
    if (width === size.width && height === size.height && ratio === size.ratio) return
    Object.assign(size, { width, height, ratio })
    stir()
    renderer.setPixelRatio(size.ratio)
    renderer.setSize(size.width, size.height, false)
    const pixels = new THREE.Vector2()
    renderer.getDrawingBufferSize(pixels)
    lines.setSize(pixels.x, pixels.y)
    colour.setSize(pixels.x, pixels.y)
    inkMaterial.uniforms.uFull.value.copy(pixels)
    inkMaterial.uniforms.uRect.value.set(0, 0, pixels.x, pixels.y)
    inkMaterial.uniforms.uStep.value = Math.max(1, Math.round(size.ratio * 0.75))
    cell.value = 6.5 * size.ratio
  }
  const watcher = new ResizeObserver(resize)
  watcher.observe(canvas)
  resize()

  // ── the pointer, over the room in the hero ──
  const pointer = new THREE.Vector2()
  let pointing = false
  let hot = -1
  const raycaster = new THREE.Raycaster()
  const onMove = (event: PointerEvent) => {
    pointer.set((event.clientX / size.width) * 2 - 1, -((event.clientY / size.height) * 2 - 1))
    pointing = event.pointerType === 'mouse'
    stir()
  }
  const onLeave = () => { pointing = false }
  // The canvas is behind the page, so a click on the room arrives on whatever empty part of the page covers it.
  const onClick = (event: MouseEvent) => {
    const where = event.target as HTMLElement | null
    if (hot < 0 || !where || where.closest('a, button, .panel, .card, .site-header')) return
    tags[hot]?.click()
  }
  window.addEventListener('pointermove', onMove)
  document.documentElement.addEventListener('pointerleave', onLeave)
  window.addEventListener('click', onClick)
  const lightTag = (index: number) => tags.forEach((item, at) => item.classList.toggle('is-hot', at === index))
  const tagListeners = tags.map((item, index) => {
    const on = () => lightTag(index)
    const off = () => lightTag(hot)
    item.addEventListener('pointerenter', on)
    item.addEventListener('focus', on)
    item.addEventListener('pointerleave', off)
    item.addEventListener('blur', off)
    return { item, on, off }
  })

  // ── the camera's moves: from wherever it is to the next shot, swinging out into the room and back in ──
  const overview = shot([0, 0, 0], OVERVIEW_LOOK, OVERVIEW_FOV)
  overview.at.copy(OVERVIEW_DIRECTION).multiplyScalar(OVERVIEW_DISTANCE).add(overview.look)
  const current = { at: overview.at.clone(), look: overview.look.clone(), fov: overview.fov }
  const from = { at: overview.at.clone(), look: overview.look.clone(), fov: overview.fov }
  const move = { to: overview, key: 'top', chapter: -1, t: 1, duration: 1, reach: 0, through: false, outward: OVERVIEW_DIRECTION }
  const aim = (key: string, chapter: number, next: Shot) => {
    if (key === move.key) return
    // Another beat in the same shot: nothing to move.
    if (next === move.to) return Object.assign(move, { key, chapter })
    from.at.copy(current.at)
    from.look.copy(current.look)
    from.fov = current.fov
    const distance = from.at.distanceTo(next.at) + from.look.distanceTo(next.look) * 0.5
    // In or out of the room, the camera goes through the window instead of swinging round.
    const through = outdoors(from.at) !== outdoors(next.at)
    Object.assign(move, {
      to: next, key, chapter, t: 0, through,
      duration: reducedMotion ? 0.001 : through ? clamp(1.3 + distance * 0.12, 1.6, 2.4) : clamp(0.7 + distance * 0.32, 0.7, 2.1),
      reach: through ? 0 : Math.min(1.4, distance * 0.28),
      outward: outdoors(next.at) ? YARD_DIRECTION : OVERVIEW_DIRECTION,
    })
  }
  const shotFor = (chapter: number, beat: string): Shot => {
    if (chapter === 1) return beat === 'notchnest' ? SHOTS.laptop : beat === 'engineering' ? SHOTS.monitor : SHOTS.project
    if (chapter === 2) {
      const card = cards.find((item) => item.id === beat)
      if (!card) return SHOTS.pinboard
      return { at: SHOTS.pinboard.at.clone().lerp(v(card.x, 0.6, card.z), 0.3), look: SHOTS.pinboard.look.clone().lerp(v(card.x, 2.18, card.z), 0.5), fov: 40 }
    }
    if (chapter === 3) return SHOTS.sky
    if (chapter === 4) return SHOTS.outside
    return SHOTS.research
  }
  /** The About cards the searchlight can find, by beat. */
  /** The About cards the searchlight can find, by beat. */
  const lightable = new Map([...(sections[3]?.querySelectorAll<HTMLElement>('.card[data-beat]') ?? [])].map((element) => [element.dataset.beat ?? '', element]))
  const light = { x: 0, y: 0, rx: 1, ry: 1, power: 0 }
  const forward = new THREE.Vector3()
  const ray = new THREE.Vector3()
  const curve = (points: THREE.Vector3[], t: number, into: THREE.Vector3) => {
    // A quadratic Bézier: from the first point to the last, bent towards the middle one.
    const [a, b, c] = points
    return into.set(0, 0, 0).addScaledVector(a, (1 - t) ** 2).addScaledVector(b, 2 * t * (1 - t)).addScaledVector(c, t * t)
  }
  const passage = [new THREE.Vector3(), GATEWAY, new THREE.Vector3()]

  // ── the loop ──
  const point = new THREE.Vector3()
  const paperColour = new THREE.Color('#F3F0E8')
  let clock = 0
  let flight = 0 // seconds since the plane last left
  let open = 0 // how far the window is open
  let shownBeat = ''
  let kryptonSince = 0
  let shownCaption = ''
  let last = performance.now()
  let request = 0
  let started = false
  let frames = 0
  let shownHot = -1

  const draw = (time: number) => {
    request = requestAnimationFrame(draw)
    // Once nothing is moving but the room's own small motions, the scene is drawn every other frame (while paused, not
    // at all). In between, only the cheap last pass runs again over the previous drawing: some browsers show a frame
    // nothing was drawn in as black.
    // After a while with nothing happening (someone reading), only one frame in six.
    const settled = started && move.t >= 1 && time - stirred > 900
    if (settled && (!running || frames++ % (time - stirred > 6000 ? 6 : 2))) {
      renderer.setRenderTarget(null)
      renderer.render(inkScene, inkCamera)
      return
    }
    const step = Math.min(0.05, (time - last) / 1000)
    last = time
    if (running) clock += step
    const ease = (rate: number) => (reducedMotion ? 1 : 1 - Math.exp(-step * rate))
    const W = size.width
    const H = size.height

    // ── what is being read ──
    const chapter = Number(tour.dataset.chapter ?? -1)
    const beat = tour.dataset.beat ?? 'top'
    if (beat !== shownBeat) {
      shownBeat = beat
      boardMaterial.map = boardFor(chapter === 0 ? beat : '')
      // The projects are on the monitor while the chapter about them is read; the rest of the time, a game.
      monitorMaterial.map = chapter !== 1 ? game.texture : beat === 'krypton' ? (krypton[0] ?? dashboard) : dashboard
      kryptonSince = clock
      if (chapter === 4) flight = 0
    }
    // Krypton's screens take turns, a few seconds each (not with reduced motion: it stays on the dashboard).
    if (beat === 'krypton' && chapter === 1 && krypton.length) monitorMaterial.map = reducedMotion ? krypton[0] : krypton[Math.floor((clock - kryptonSince) / 4) % krypton.length]
    // The game is the room's at rest: in the other chapters it is turned down, so it doesn't pull the eye.
    monitorMaterial.color.setScalar(monitorMaterial.map === game.texture && chapter >= 0 ? 0.5 : 1)
    // The game plays on at a dozen frames a second, as long as it is on the screen.
    if (monitorMaterial.map === game.texture && running && Math.floor(clock * 12) !== gameDrawn) {
      gameDrawn = Math.floor(clock * 12)
      game.draw(clock)
    }
    aim(chapter < 0 ? 'top' : chapter + ':' + beat, chapter, chapter < 0 ? overview : shotFor(chapter, beat))
    const words = chapter < 0 ? '' : captionFor(chapter, beat)
    if (words !== shownCaption) caption.textContent = shownCaption = words
    caption.classList.toggle('is-shown', words !== '')

    // ── the move itself ──
    move.t = Math.min(1, move.t + step / move.duration)
    const s = move.t < 0.5 ? 4 * move.t ** 3 : 1 - (-2 * move.t + 2) ** 3 / 2
    if (move.through) {
      passage[0].copy(from.at)
      passage[2].copy(move.to.at)
      curve(passage, s, current.at)
    } else current.at.lerpVectors(from.at, move.to.at, s).addScaledVector(move.outward, Math.sin(Math.PI * s) * move.reach)
    current.look.lerpVectors(from.look, move.to.look, s)
    current.fov = lerp(from.fov, move.to.fov, s)
    if (move.t >= 1 && move.chapter >= 0) sections[move.chapter]?.classList.add('is-arrived')

    // ── framing: the room sits in the space the text leaves free ──
    const top = header.offsetHeight
    const heroBox = hero.getBoundingClientRect()
    const opened = smooth(clamp(((H - heroBox.bottom) / Math.max(1, H - top)) * 1.2))
    let fx: number, fy: number, short: number
    if (W >= 900) {
      const introRight = intro.getBoundingClientRect().right
      const columnLeft = column.getBoundingClientRect().left
      fx = lerp((introRight + W) / 2, columnLeft / 2, opened) / W
      fy = (top + H) / 2 / H
      short = Math.min(lerp(W - introRight, columnLeft, opened), H - top)
    } else {
      const introTop = Math.max(top + 120, intro.getBoundingClientRect().top)
      fx = 0.5
      // On a phone the cards cover the lower part of the screen, so the corner on show sits above them.
      fy = lerp((top + introTop) / 2, (top + H * 0.62) / 2, opened) / H
      short = Math.min(W, lerp(introTop - top, H * 0.62 - top, opened))
    }
    camera.position.copy(current.at)
    if (chapter < 0 && pointing) camera.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), pointer.x * 0.06)
    camera.fov = THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(current.fov / 2)) * H / Math.max(1, short)))
    camera.aspect = W / H
    camera.setViewOffset(W, H, (0.5 - fx) * W, (0.5 - fy) * H, W, H)
    camera.lookAt(current.look)
    camera.updateMatrixWorld()
    lampView.value.copy(LAMP_BULB).applyMatrix4(camera.matrixWorldInverse)

    // ── things that move ──
    // In the dark theme it is night in the room too.
    night.value = lerp(night.value, document.documentElement.dataset.theme === 'dark' ? 1 : 0, reducedMotion ? 1 : ease(4))
    head.rotation.set(Math.sin(clock * 2.3) * 0.05, 0, Math.sin(clock * 1.15) * 0.04)
    body.scale.setScalar(1 + Math.sin(clock * 1.4) * 0.008)
    const tapping = running && chapter === 1
    keys.forEach((key, index) => { key.mesh.position.z = key.z - (tapping && Math.sin(clock * 14 + index * 2.1) > 0.6 ? 0.004 : 0) })
    typing.forEach((hand, index) => { hand.mesh.position.z = hand.z + (tapping ? Math.max(0, Math.sin(clock * 9 + index * 1.7)) * 0.008 : 0) })
    // The Experience filter: the roles it leaves out fade back into the cork.
    const filter = sections[2]?.dataset.filter ?? 'all'
    cards.forEach((item) => {
      const lit = item.id === beat && chapter === 2
      item.lift = lerp(item.lift, lit ? 1 : 0, ease(8))
      item.group.position.y = 2.155 - item.lift * 0.03
      item.group.scale.setScalar(1 + item.lift * 0.12)
      item.backing.visible = item.lift > 0.05
      item.shown = lerp(item.shown, filter === 'all' || filter === item.side ? 1 : 0, ease(6))
      item.face.color.setScalar(0.35 + 0.65 * item.shown)
    })
    // From About on, the window is open and the outside is drawn; it stays so until the camera is back in the room.
    const away = chapter >= 3 || outdoors(current.at)
    yardWorld.visible = yardScene.visible = away
    backdrop.visible = !away
    closing.visible = outdoors(current.at)
    open = lerp(open, away ? 1 : 0, ease(2.6))
    casements[0].rotation.z = smooth(open) * 1.75
    casements[1].rotation.z = -smooth(open) * 1.75
    // In Contact, the plane leaves through the window towards you, over and over.
    // It only shows where it is the subject: on the sill in the whole room, and flying out in Contact.
    plane.visible = chapter < 0 || chapter === 4
    const flying = chapter === 4 && move.t >= 1
    if (running && flying) flight += step
    else if (!flying) flight = 0
    if (flying) {
      const t = smooth(clamp((flight % 4.2) / 3))
      curve(flightPath, t, plane.position)
      const [a, b, c] = flightPath
      point.subVectors(b, a).multiplyScalar(1 - t).addScaledVector(ray.subVectors(c, b), t).normalize()
      plane.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), point)
      plane.rotateY(Math.sin(clock * 2.2) * 0.25)
      plane.scale.setScalar(Math.max(0.001, 1 - smooth(clamp((t - 0.84) / 0.16))))
    } else {
      plane.position.copy(planeHome)
      plane.rotation.copy(planeTurn)
      plane.scale.setScalar(1)
    }

    // ── the searchlight: once the camera is out it comes on, and finds each About card as it is read ──
    const lit = chapter === 3 && move.to === SHOTS.sky && move.t >= 1
    light.power = lerp(light.power, lit ? 1 : 0, ease(lit ? 3 : 9))
    const card = chapter === 3 ? lightable.get(beat) : undefined
    let target: [number, number, number, number]
    if (card) {
      // An ellipse round the card: only a little taller than it, so it spills onto its neighbours as little as
      // possible, and as wide as that takes to get its corners in.
      const rect = card.getBoundingClientRect()
      // (Its corners sit a little inside the core, clear of the soft rim.)
      const ry = rect.height / 2 + 56
      const rx = rect.width / 2 / Math.sqrt(1 - (rect.height / 2 / ry) ** 2)
      target = [rect.left + rect.width / 2, rect.top + rect.height / 2, Math.min(W * 0.85, rx * 1.08), ry * 1.08]
    } else {
      // Between cards it searches the open sky beside the text (on a phone, mid-screen: the top of the screen still
      // has the last chapter's cards going by).
      const radius = Math.min(short * 0.2, W * 0.22)
      const sweep = running ? clock : 0
      target = [
        fx * W + Math.sin(sweep * 0.45) * Math.min(short, W) * 0.22,
        (W >= 900 ? fy * H - radius * 0.4 : H * 0.42) + Math.cos(sweep * 0.31) * radius * 0.5,
        radius * 1.45, radius,
      ]
    }
    const follow = light.power < 0.05 ? 1 : ease(card ? 5 : 2.5)
    light.x = lerp(light.x, target[0], follow)
    light.y = lerp(light.y, target[1], follow)
    light.rx = lerp(light.rx, target[2], follow)
    light.ry = lerp(light.ry, target[3], follow)
    signal.visible = beam.visible = glare.visible = light.power > 0.01
    if (signal.visible) {
      // A real lamp's light is never quite steady.
      const flicker = running ? 0.965 + 0.035 * Math.sin(clock * 11.3) * Math.sin(clock * 6.7 + 1.3) : 1
      // Up at a fixed distance, behind the point on screen it lights, facing the camera.
      const DISTANCE = 14
      camera.getWorldDirection(forward)
      ray.set((light.x / W) * 2 - 1, -((light.y / H) * 2 - 1), 0.5).unproject(camera).sub(camera.position).normalize()
      signal.position.copy(camera.position).addScaledVector(ray, DISTANCE / Math.max(0.2, ray.dot(forward)))
      signal.quaternion.copy(camera.quaternion)
      const perPixel = (2 * DISTANCE * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))) / H
      const grow = (0.6 + 0.4 * light.power) * perPixel
      signal.scale.set(2 * light.rx * grow * HALO, 2 * light.ry * grow * HALO, 1)
      signalUniforms.uOpacity.value = light.power
      signalUniforms.uFlicker.value = flicker
      signalUniforms.uTime.value = clock
      signalUniforms.uSkyCentre.value.copy(sky.position).applyMatrix4(camera.matrixWorldInverse)
      // The lamp turns to it, and the beam runs from the lamp's glass to it.
      lamp.lookAt(signal.position)
      lamp.updateMatrixWorld()
      const start = lamp.localToWorld(point.copy(lens))
      glare.position.copy(start)
      glare.material.opacity = light.power * flicker
      ray.subVectors(signal.position, start)
      beam.position.copy(start)
      beam.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), ray.clone().normalize())
      const beamUniforms = (beam.material as THREE.ShaderMaterial).uniforms
      beamUniforms.uEnd.value = ((light.rx + light.ry) / 2) * grow
      beamUniforms.uLength.value = ray.length()
      beamUniforms.uOpacity.value = light.power * flicker
      beamUniforms.uTime.value = clock
    }

    // ── a tag beside each corner, while the whole room is in view ──
    hot = -1
    if (pointing && chapter < 0) {
      raycaster.setFromCamera(pointer, camera)
      const hit = raycaster.intersectObjects(pickables, false)[0]
      if (hit) hot = hit.object.userData.chapter as number
    }
    if (hot !== shownHot) document.body.style.cursor = (shownHot = hot) >= 0 ? 'pointer' : ''
    const tagsShown = chapter < 0 ? 1 - smooth(clamp(opened * 2.5)) : 0
    // Each tag sits above its corner, centred on it. Where two would overlap (a narrow screen), the lower one moves down
    // below the other, so that no two can be tapped at once.
    // Some sit off to one side, on a leader, so as not to cover what they name.
    const phone = W < 600
    const reach = phone ? 1 : Math.min(1, W / 1440)
    const spots = tags.map((item, index) => {
      point.copy(anchors[index]).project(camera)
      const width = item.offsetWidth, height = item.offsetHeight
      const ax = (point.x * 0.5 + 0.5) * W, ay = (-point.y * 0.5 + 0.5) * H
      const [dx, dy] = (phone ? TAG_OFFSETS_PHONE : TAG_OFFSETS)[index] ?? [0, 0]
      return { index, width, height, ax, ay, left: ax + dx * reach - width / 2, top: ay + dy * reach - height }
    }).sort((a, b) => a.top - b.top)
    const GAP = 10
    spots.forEach((spot, k) => {
      spot.left = clamp(spot.left, 8, Math.max(8, W - spot.width - 8))
      for (let pass = 0; pass < spots.length; pass++) {
        const under = spots.slice(0, k).find((other) => spot.left < other.left + other.width + GAP && other.left < spot.left + spot.width + GAP
          && spot.top < other.top + other.height + GAP && other.top < spot.top + spot.height + GAP)
        if (!under) break
        spot.top = under.top + under.height + GAP
      }
    })
    spots.forEach(({ index, left, top, width, height, ax, ay }) => {
      const item = tags[index]
      item.style.transform = `translate(${left.toFixed(1)}px, ${top.toFixed(1)}px)`
      // The leader runs from the thing to the nearest point of its tag.
      const leader = leaders[index]
      const tx = clamp(ax, left, left + width) - ax, ty = clamp(ay, top, top + height) - ay
      const length = Math.hypot(tx, ty)
      // (On a phone the end of the desk is drawn right behind me, so Engineering's tag goes without a leader there.)
      const led = length > 18 && tagsShown > 0.02 && !(phone && index === 1)
      leader.style.visibility = led ? 'visible' : 'hidden'
      if (led) {
        leader.style.width = `${length.toFixed(1)}px`
        leader.style.transform = `translate(${ax.toFixed(1)}px, ${ay.toFixed(1)}px) rotate(${Math.atan2(ty, tx).toFixed(4)}rad)`
        leader.style.opacity = tagsShown.toFixed(3)
      }
      item.style.opacity = tagsShown.toFixed(3)
      item.style.visibility = tagsShown > 0.02 ? 'visible' : 'hidden'
      item.classList.toggle('is-hot', index === hot)
    })

    // ── draw: the line pass, the colour pass, then the two together onto the screen ──
    // The stars and the beam have no outline: they are left out of the line pass. The light (layer 2) goes over the
    // top of it, drawn on its own after everything else. (Only here: the colour target is multisampled, and a second
    // render into it may find the first one discarded, so there it is drawn in the same render, last, untested.)
    camera.layers.set(0)
    scene.overrideMaterial = lineMaterial
    renderer.setClearColor(0x000000, 1)
    renderer.setRenderTarget(lines)
    renderer.clear()
    renderer.render(scene, camera)
    if (signal.visible) {
      camera.layers.set(2)
      scene.overrideMaterial = null
      // (Written as it is, not blended: these are facings and depths, not colours.)
      const signalMaterial = signal.material as THREE.ShaderMaterial
      signalUniforms.uMode.value = 1
      signalMaterial.blending = THREE.NoBlending
      renderer.render(scene, camera)
      signalUniforms.uMode.value = 0
      signalMaterial.blending = THREE.CustomBlending
    }
    scene.overrideMaterial = null
    camera.layers.set(0)
    camera.layers.enable(1)
    camera.layers.enable(2)
    // Shadows only fall in the room: out in the sky, with the room behind the camera, they are left as they were.
    renderer.shadowMap.needsUpdate = !outdoors(current.at) || chapter === 4
    renderer.setClearColor(document.documentElement.dataset.theme === 'dark' ? NIGHT : paperColour, 1)
    renderer.setRenderTarget(colour)
    renderer.clear()
    renderer.render(scene, camera)
    renderer.setRenderTarget(null)
    renderer.render(inkScene, inkCamera)
    if (!started) {
      started = true
      document.documentElement.classList.add('room-live')
    }
  }
  request = requestAnimationFrame(draw)
  return {
    setRunning(next) {
      running = next
      stir()
    },
    dispose() {
      cancelAnimationFrame(request)
      watcher.disconnect()
      themeWatcher.disconnect()
      window.removeEventListener('scroll', stir)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('click', onClick)
      tagListeners.forEach(({ item, on, off }) => {
        item.removeEventListener('pointerenter', on)
        item.removeEventListener('focus', on)
        item.removeEventListener('pointerleave', off)
        item.removeEventListener('blur', off)
      })
      document.body.style.cursor = ''
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points || object instanceof THREE.Sprite) {
          object.geometry.dispose()
          const material = object.material as THREE.MeshBasicMaterial
          material.map?.dispose()
          material.dispose()
        }
      })
      boards.forEach((texture) => texture.dispose())
      disposed = true
      krypton.forEach((texture) => texture.dispose())
      game.texture.dispose()
      leaders.forEach((leader) => leader.remove())
      dashboard.dispose()
      editor.dispose()
      notchnest.dispose()
      lines.dispose()
      colour.dispose()
      inkMaterial.dispose()
      renderer.dispose()
    },
  }
}
