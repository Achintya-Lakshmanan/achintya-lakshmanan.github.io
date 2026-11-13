"""
Builds the 3D models for the search tree behind the page, with Blender.

    /Applications/Blender.app/Contents/MacOS/Blender -b -P scripts/models/tree.py
    /Applications/Blender.app/Contents/MacOS/Blender -b -P scripts/models/tree.py -- --preview some/folder

It writes two files that belong together, so always commit them together:

    prototypes/tree-site/models/tree.glb               the meshes
    prototypes/tree-site/scenes/subjects/tree.layout.json where every branch of every level is, for the animation

Everything here is written in the page's axes (y up), in the units of one level of the tree with its
decision at the origin. `scenes/subjects/tree.ts` places, tints and animates the pieces.

The meshes:
    limbs_N    the branches of level N, as bevelled Bezier curves that fork off one another
    gems_N     the cut stones at the branch tips of level N, and the halo around each first-ring stone
    core       the crystal at a decision
    cage       the lattice around it
    gimbal_outer, gimbal_inner   the two rings of the gyroscope a decision sits in
    vertebra   a knuckle of the trunk
    platter_glass, platter_frame the dial under a decision
    orbit      the ring drawn for the outermost branches, which only grow in the close view

`limbs_N` and `gems_N` carry one extra value per vertex, `_twig`, which the shader in tree.ts reads:
    x  the vertex's own branch, as a position along a row of texels (one texel per branch, then one for the
       decision), so the shader can look up that branch's light and sway
    y  the branch's parent, the same way
    z  how far along the branch the vertex is, halved: 0 at its start, 0.5 at its tip. Halos are marked with 1.
"""
import json
import math
import random
import sys
from pathlib import Path

import bmesh
import bpy
import numpy as np

ROOT = Path(__file__).resolve().parents[2]
GLB = ROOT / 'prototypes/tree-site/models/tree.glb'
LAYOUT = ROOT / 'prototypes/tree-site/scenes/subjects/tree.layout.json'
TURN = math.pi * 2

LEVELS = 5
# Each ring of a level: branches per parent, distance from the trunk, how far below the decision it hangs, how far
# apart siblings spread (radians), how far a branch may stray up or down, the radius of a branch where it starts,
# the size of the stone at its tip, and how many straight pieces the branch's skeleton has.
RINGS = [
    dict(each=7, radius=0.62, drop=0.08, spread=0.0, stray=0.1, thick=0.044, node=0.088, pieces=3),
    dict(each=3, radius=1.12, drop=0.16, spread=0.27, stray=0.2, thick=0.028, node=0.06, pieces=3),
    dict(each=2, radius=1.62, drop=0.24, spread=0.12, stray=0.26, thick=0.018, node=0.042, pieces=2),
    dict(each=2, radius=2.25, drop=0.32, spread=0.06, stray=0.3, thick=0.012, node=0.032, pieces=2),
]
TAPER = 0.64  # a branch ends this much thinner than it starts
ARCH = 0.18  # how high a branch arches, as a share of its length
PLATTER = 1.76  # radius of the dial under a decision
FLOOR = -0.44  # and how far below the decision it lies


# ── small tools ──────────────────────────────────────────────────────────────────────────────────────────────────

def to_blender(points):
    """The page's axes (y up) to Blender's (z up)."""
    points = np.asarray(points, dtype=np.float64).reshape(-1, 3)
    return np.stack([points[:, 0], -points[:, 2], points[:, 1]], axis=1)


def from_blender(points):
    points = np.asarray(points, dtype=np.float64).reshape(-1, 3)
    return np.stack([points[:, 0], points[:, 2], -points[:, 1]], axis=1)


class Soup:
    """Vertices and faces gathered from many pieces, with the per-vertex values the shader needs."""

    def __init__(self):
        self.points, self.faces, self.twig = [], [], []
        self.count = 0

    def add(self, points, faces, twig=None):
        points = np.asarray(points, dtype=np.float64).reshape(-1, 3)
        size = len(points)
        self.faces += [[index + self.count for index in face] for face in faces]
        self.points.append(points)
        self.twig.append(np.broadcast_to(np.asarray(twig if twig is not None else (0, 0, 0), dtype=np.float64), (size, 3)))
        self.count += size

    def build(self, name, attributes=False):
        mesh = bpy.data.meshes.new(name)
        mesh.from_pydata(to_blender(np.concatenate(self.points)).tolist(), [], self.faces)
        work = bmesh.new()
        work.from_mesh(mesh)
        bmesh.ops.recalc_face_normals(work, faces=work.faces)
        work.to_mesh(mesh)
        work.free()
        for polygon in mesh.polygons:
            polygon.use_smooth = True  # nothing is split: the page shades facets itself where it wants them
        if attributes:
            mesh.attributes.new('_twig', 'FLOAT_VECTOR', 'POINT').data.foreach_set('vector', np.concatenate(self.twig).ravel())
        thing = bpy.data.objects.new(name, mesh)
        bpy.context.scene.collection.objects.link(thing)
        return thing


def hull(points):
    """The faceted solid around some points: vertices and faces, coplanar triangles merged into facets."""
    work = bmesh.new()
    for point in points:
        work.verts.new(point)
    bmesh.ops.convex_hull(work, input=work.verts)
    bmesh.ops.delete(work, geom=[vert for vert in work.verts if not vert.link_faces], context='VERTS')
    bmesh.ops.dissolve_limit(work, angle_limit=math.radians(0.5), verts=work.verts, edges=work.edges)
    bmesh.ops.recalc_face_normals(work, faces=work.faces)
    work.verts.index_update()
    result = np.array([vert.co[:] for vert in work.verts]), [[vert.index for vert in face.verts] for face in work.faces]
    work.free()
    return result


def cut(tiers):
    """A cut stone from tiers of (radius, height, sides, turned half a step?), around the y axis."""
    points = []
    for radius, height, sides, turned in tiers:
        if radius == 0:
            points.append((0, height, 0))
            continue
        for side in range(sides):
            angle = (side + (0.5 if turned else 0)) / sides * TURN
            points.append((math.cos(angle) * radius, height, math.sin(angle) * radius))
    return hull(points)


def sweep(radius, profile, segments=96, start=0.0, end=TURN):
    """A ring around the y axis: `profile` is a closed outline of (outwards, upwards) offsets from the ring's circle."""
    closed = abs(end - start - TURN) < 1e-6
    steps = segments if closed else segments + 1
    points, faces = [], []
    for step in range(steps):
        angle = start + (end - start) * step / segments
        for out, up in profile:
            points.append((math.cos(angle) * (radius + out), up, math.sin(angle) * (radius + out)))
    size = len(profile)
    for step in range(segments):
        following = (step + 1) % steps
        for corner in range(size):
            faces.append([step * size + corner, step * size + (corner + 1) % size, following * size + (corner + 1) % size, following * size + corner])
    if not closed:
        faces.append(list(range(size)))
        faces.append([(steps - 1) * size + corner for corner in range(size)])
    return np.array(points), faces


def chamfered(half_width, half_height, corner):
    """The outline of a bar with its four edges cut off."""
    w, h, c = half_width, half_height, corner
    return [(w, -h + c), (w, h - c), (w - c, h), (-w + c, h), (-w, h - c), (-w, -h + c), (-w + c, -h), (w - c, -h)]


def lathe(outline, sides):
    """A solid turned around the y axis from (radius, height) pairs, closed at both ends."""
    points, faces = [], []
    for radius, height in outline:
        for side in range(sides):
            angle = side / sides * TURN
            points.append((math.cos(angle) * radius, height, math.sin(angle) * radius))
    for row in range(len(outline) - 1):
        for side in range(sides):
            after = (side + 1) % sides
            faces.append([row * sides + side, row * sides + after, (row + 1) * sides + after, (row + 1) * sides + side])
    faces.append(list(range(sides)))
    faces.append([(len(outline) - 1) * sides + side for side in range(sides)])
    return np.array(points), faces


def box(centre, size):
    centre, size = np.asarray(centre, dtype=np.float64), np.asarray(size, dtype=np.float64) / 2
    corners = np.array([[x, y, z] for x in (-1, 1) for y in (-1, 1) for z in (-1, 1)]) * size + centre
    return corners, [[0, 1, 3, 2], [4, 6, 7, 5], [0, 4, 5, 1], [2, 3, 7, 6], [0, 2, 6, 4], [1, 5, 7, 3]]


def turned(points, angle, axis='y'):
    """Points turned about an axis through the origin."""
    points = np.asarray(points, dtype=np.float64)
    c, s = math.cos(angle), math.sin(angle)
    matrix = {
        'x': [[1, 0, 0], [0, c, -s], [0, s, c]],
        'y': [[c, 0, s], [0, 1, 0], [-s, 0, c]],
        'z': [[c, -s, 0], [s, c, 0], [0, 0, 1]],
    }[axis]
    return points @ np.array(matrix).T


def evaluated(thing):
    """A mesh object's points (in the page's axes) and faces after its modifiers."""
    graph = bpy.context.evaluated_depsgraph_get()
    mesh = bpy.data.meshes.new_from_object(thing.evaluated_get(graph))
    points = np.empty(len(mesh.vertices) * 3)
    mesh.vertices.foreach_get('co', points)
    faces = [list(polygon.vertices) for polygon in mesh.polygons]
    bpy.data.meshes.remove(mesh)
    return from_blender(points), faces


def temporary(name, points, edges, faces):
    mesh = bpy.data.meshes.new(name)
    mesh.from_pydata(to_blender(points).tolist(), edges, faces)
    thing = bpy.data.objects.new(name, mesh)
    bpy.context.scene.collection.objects.link(thing)
    return thing


def discard(thing):
    mesh = thing.data
    bpy.data.objects.remove(thing)
    bpy.data.meshes.remove(mesh)


# ── where the branches are ───────────────────────────────────────────────────────────────────────────────────────

def plan(rng):
    """The branches of one level: for each, its ring, its parent (-1 for the decision), its angle around the trunk,
    how far it has strayed up or down, a random number of its own, and one shared by its whole family."""
    twigs = []

    def grow(ring, parent, around, rise, family):
        each, spread, stray = RINGS[ring]['each'], RINGS[ring]['spread'], RINGS[ring]['stray']
        for k in range(each):
            if ring == 0:
                angle = (k + rng.random() * 0.5) / each * TURN
            else:
                angle = around + (k - (each - 1) / 2) * spread + (rng.random() - 0.5) * spread * 0.5
            twig = dict(ring=ring, parent=parent, angle=angle, rise=rise * 0.8 + (rng.random() - 0.5) * 2 * stray, seed=rng.random())
            # Over the dial a branch stays clear of the glass; past its rim it may hang a little lower.
            twig['rise'] = max(twig['rise'], FLOOR + RINGS[ring]['drop'] + (0.12 if RINGS[ring]['radius'] < PLATTER else -0.2))
            twig['family'] = rng.random() if ring == 0 else family
            twigs.append(twig)
            if ring < len(RINGS) - 1:
                grow(ring + 1, len(twigs) - 1, angle, twig['rise'], twig['family'])

    grow(0, -1, 0.0, 0.0, 0.0)
    for twig in twigs:
        ring = RINGS[twig['ring']]
        twig['tip'] = np.array([math.cos(twig['angle']) * ring['radius'], twig['rise'] - ring['drop'], math.sin(twig['angle']) * ring['radius']])
    return twigs


def along(start, end, t):
    """A point on the arched branch from one point to another. tree.ts sends its sparks along the same curve."""
    point = start + (end - start) * t
    point[1] += 2 * t * (1 - t) * np.linalg.norm(end - start) * ARCH
    return point


# ── the pieces of a level ────────────────────────────────────────────────────────────────────────────────────────

def grow_limbs(name, twigs):
    """The branches as bevelled Bezier curves. One child of every branch carries its parent's curve on, so a limb
    runs smoothly from the decision to a leaf and the others fork off it."""
    width = len(twigs) + 1  # the last texel of a level's row belongs to the decision itself
    origin = np.zeros(3)
    children = {}
    for index, twig in enumerate(twigs):
        children.setdefault(twig['parent'], []).append(index)
    heir = {index: kids[len(kids) // 2] for index, kids in children.items() if index >= 0}
    heirs = set(heir.values())

    # A knot is a point a curve passes through: where, how thick, and which ring's branch it is on.
    pieces, chains = [], []
    for index, twig in enumerate(twigs):
        if index in heirs:
            continue
        start = origin if twig['parent'] < 0 else twigs[twig['parent']]['tip']
        knots = [dict(point=start, radius=0.058 if twig['parent'] < 0 else RINGS[twig['ring']]['thick'], ring=twig['ring'])]
        current = index
        while current is not None:
            ring = RINGS[twigs[current]['ring']]
            before = start
            for piece in range(ring['pieces']):
                t = (piece + 1) / ring['pieces']
                point = along(start, twigs[current]['tip'], t)
                knots.append(dict(point=point, radius=ring['thick'] * (1 + (TAPER - 1) * t), ring=twigs[current]['ring']))
                pieces.append((before, point, current, piece / ring['pieces'], t))
                before = point
            start = twigs[current]['tip']
            current = heir.get(current)
        # Handles that make the curve pass smoothly through every knot.
        for place, knot in enumerate(knots):
            ahead = knots[min(place + 1, len(knots) - 1)]['point']
            behind = knots[max(place - 1, 0)]['point']
            knot['lean'] = (ahead - behind) / (6 if 0 < place < len(knots) - 1 else 3)
        chains.append(knots)

    # Thick limbs are drawn rounder and finer than thin ones: (rings, sides = 4 + 2 x bevel, steps between knots).
    surface, faces = [], []
    for rings, bevel, steps in (((0,), 2, 3), ((1,), 1, 3), ((2,), 1, 3), ((3,), 0, 3)):
        curve = bpy.data.curves.new(name + '_curve', 'CURVE')
        curve.dimensions = '3D'
        curve.bevel_depth, curve.bevel_resolution, curve.resolution_u, curve.use_fill_caps = 1.0, bevel, steps, True
        for knots in chains:
            # The stretch of this chain on these rings, with the knot before it so the pieces join up.
            inside = [place for place, knot in enumerate(knots) if place > 0 and knot['ring'] in rings]
            if not inside:
                continue
            stretch = knots[inside[0] - 1:inside[-1] + 1]
            spline = curve.splines.new('BEZIER')
            spline.bezier_points.add(len(stretch) - 1)
            for bezier, knot in zip(spline.bezier_points, stretch):
                bezier.handle_left_type = bezier.handle_right_type = 'FREE'
                bezier.co = to_blender(knot['point'])[0]
                bezier.handle_left = to_blender(knot['point'] - knot['lean'])[0]
                bezier.handle_right = to_blender(knot['point'] + knot['lean'])[0]
                bezier.radius = knot['radius']
        thing = bpy.data.objects.new(name + '_curve', curve)
        bpy.context.scene.collection.objects.link(thing)
        points, polygons = evaluated(thing)
        bpy.data.objects.remove(thing)
        bpy.data.curves.remove(curve)
        offset = sum(len(part) for part in surface)
        surface.append(points)
        faces += [[index + offset for index in polygon] for polygon in polygons]
    surface = np.concatenate(surface)

    # Which branch each vertex of the surface belongs to, and how far along it: the nearest piece of skeleton.
    starts = np.array([piece[0] for piece in pieces])
    ends = np.array([piece[1] for piece in pieces])
    spans = ends - starts
    share = np.clip(np.einsum('vsk,sk->vs', surface[:, None, :] - starts[None], spans) / np.einsum('sk,sk->s', spans, spans), 0, 1)
    distance = np.linalg.norm(surface[:, None, :] - (starts[None] + share[..., None] * spans[None]), axis=2)
    nearest = distance.argmin(axis=1)
    owner = np.array([piece[2] for piece in pieces])[nearest]
    low = np.array([piece[3] for piece in pieces])[nearest]
    high = np.array([piece[4] for piece in pieces])[nearest]
    t = low + (high - low) * share[np.arange(len(surface)), nearest]

    parents = np.array([twig['parent'] if twig['parent'] >= 0 else len(twigs) for twig in twigs])
    soup = Soup()
    soup.add(surface, faces)
    soup.twig = [np.stack([(owner + 0.5) / width, (parents[owner] + 0.5) / width, t / 2], axis=1)]
    return soup.build(name, attributes=True)


def stones():
    """One cut for each ring, largest first, each about one unit across."""
    brilliant = cut([(0.56, 0.44, 8, False), (0.8, 0.29, 8, True), (1, 0.1, 16, False), (1, 0.0, 16, False), (0.52, -0.44, 8, True), (0, -0.84, 1, False)])
    shard = cut([(0, 1.25, 1, False), (0.5, 0.72, 6, False), (0.86, 0.1, 6, True), (0.6, -0.5, 6, False), (0, -0.95, 1, False)])
    drop = cut([(0, 1.15, 1, False), (0.8, 0.0, 5, False), (0, -0.85, 1, False)])
    bud = cut([(0, 1.0, 1, False), (0.85, 0.0, 4, False), (0, -1.0, 1, False)])
    return [brilliant, shard, drop, bud]


def set_stones(name, twigs, rng):
    """A cut stone at every branch tip, and a halo around each stone of the first ring."""
    width = len(twigs) + 1
    cuts = stones()
    halo_outline = [(0.07, 0.0), (-0.035, 0.1), (-0.035, -0.1)]
    soup = Soup()
    for index, twig in enumerate(twigs):
        ring = RINGS[twig['ring']]
        size = ring['node'] * (0.8 + twig['seed'] * 0.4)
        parent = twig['parent'] if twig['parent'] >= 0 else len(twigs)
        values = ((index + 0.5) / width, (parent + 0.5) / width, 0.5)
        lean, roll, facing = rng.uniform(0, 0.5), rng.uniform(0, TURN), rng.uniform(0, TURN)
        points, faces = cuts[twig['ring']]
        points = turned(turned(turned(points, roll, 'y'), lean, 'x'), facing, 'y') * size + twig['tip']
        soup.add(points, faces, twig=values)
        if twig['ring'] == 0:
            points, faces = sweep(1.72, halo_outline, 44)
            points = turned(turned(points, rng.uniform(0.1, 0.42), 'x'), rng.uniform(0, TURN), 'y') * size + twig['tip']
            soup.add(points, faces, twig=(values[0], values[1], 1.0))
    return soup.build(name, attributes=True)


# ── the pieces every level shares ────────────────────────────────────────────────────────────────────────────────

def make_core():
    """The crystal at a decision: a tall double-ended cut, about 0.2 in radius."""
    points, faces = cut([
        (0, 1.32, 1, False), (0.42, 0.98, 6, False), (0.84, 0.4, 6, True), (1, 0.06, 12, False),
        (1, -0.06, 12, False), (0.84, -0.4, 6, True), (0.42, -0.98, 6, False), (0, -1.32, 1, False),
    ])
    soup = Soup()
    soup.add(points * 0.17, faces)
    return soup.build('core')


def make_cage():
    """A lattice of struts around the crystal: an icosahedron with its corners cut off, drawn as a frame."""
    work = bmesh.new()
    bmesh.ops.create_icosphere(work, subdivisions=1, radius=0.29)
    bmesh.ops.bevel(work, geom=list(work.verts), offset=0.1, affect='VERTICES', offset_type='OFFSET')
    mesh = bpy.data.meshes.new('cage_frame')
    work.to_mesh(mesh)
    work.free()
    frame = bpy.data.objects.new('cage_frame', mesh)
    bpy.context.scene.collection.objects.link(frame)
    wire = frame.modifiers.new('Wireframe', 'WIREFRAME')
    wire.thickness = 0.011
    wire.use_even_offset = True
    wire.use_boundary = True
    wire.use_replace = True
    points, faces = evaluated(frame)
    discard(frame)
    soup = Soup()
    soup.add(points, faces)
    return soup.build('cage')


def make_gimbals():
    """The two rings of the gyroscope. The outer one turns about the trunk (y); the inner one hangs inside it on
    two pins along x, and turns about them. Both lie in the xy plane, so tree.ts only has to turn them."""
    upright = lambda points: turned(points, math.pi / 2, 'x')  # a ring around y, stood up into the xy plane
    outer = Soup()
    outer.add(upright(sweep(0.43, chamfered(0.011, 0.02, 0.005), 96)[0]), sweep(0.43, chamfered(0.011, 0.02, 0.005), 96)[1])
    for sign in (-1, 1):
        # Bearings where the trunk passes through, and where the inner ring's pins sit.
        points, faces = lathe([(0.02, -0.03), (0.034, -0.022), (0.034, 0.022), (0.02, 0.03)], 8)
        outer.add(points + [0, sign * 0.43, 0], faces)
        outer.add(turned(points, math.pi / 2, 'z') + [sign * 0.43, 0, 0], faces)
    # Notches around the ring, like the marks on a dial.
    for mark in range(24):
        if mark % 6 == 0:
            continue
        angle = mark / 24 * TURN
        points, faces = box((0.43, 0, 0), (0.03, 0.008, 0.05))
        outer.add(turned(points, angle, 'z'), faces)
    inner = Soup()
    points, faces = sweep(0.35, chamfered(0.009, 0.016, 0.004), 96)
    inner.add(upright(points), faces)
    for sign in (-1, 1):
        points, faces = lathe([(0.009, -0.045), (0.009, 0.045)], 8)
        inner.add(turned(points, math.pi / 2, 'z') + [sign * 0.39, 0, 0], faces)
        points, faces = lathe([(0.012, -0.012), (0.022, -0.006), (0.022, 0.006), (0.012, 0.012)], 8)
        inner.add(points + [0, sign * 0.35, 0], faces)
    return outer.build('gimbal_outer'), inner.build('gimbal_inner')


def make_vertebra():
    """A knuckle of the trunk: an eight-sided collar with a waist."""
    soup = Soup()
    soup.add(*lathe([(0.026, -0.05), (0.046, -0.036), (0.046, -0.014), (0.062, -0.008), (0.062, 0.008), (0.046, 0.014), (0.046, 0.036), (0.026, 0.05)], 8))
    return soup.build('vertebra')


def make_platter():
    """The dial under a decision: a glass disc, and on it a rim with tick marks, a circle under each ring of
    branches, spokes, and a collar where the trunk passes through."""
    glass = Soup()
    glass.add(*lathe([(PLATTER - 0.012, -0.022), (PLATTER, -0.012), (PLATTER, -0.004), (PLATTER - 0.006, 0.0)], 96))
    frame = Soup()
    frame.add(*sweep(PLATTER, chamfered(0.02, 0.016, 0.007), 128))
    frame.add(*sweep(PLATTER - 0.075, chamfered(0.004, 0.006, 0.002), 128))
    for ring in RINGS[:-1]:
        frame.add(*sweep(ring['radius'], chamfered(0.006, 0.007, 0.003), 96))
    frame.add(*sweep(0.15, chamfered(0.016, 0.014, 0.006), 48))
    frame.add(*sweep(0.3, chamfered(0.004, 0.005, 0.002), 48))
    for mark in range(120):
        long = mark % 10 == 0
        medium = mark % 5 == 0
        length = 0.11 if long else 0.07 if medium else 0.04
        points, faces = box((PLATTER - 0.02 - length / 2, 0.004, 0), (length, 0.008, 0.012 if long else 0.007))
        frame.add(turned(points, mark / 120 * TURN, 'y'), faces)
    for spoke in range(12):
        inner, outer = (0.165, PLATTER - 0.02) if spoke % 2 == 0 else (RINGS[1]['radius'], RINGS[2]['radius'])
        points, faces = box(((inner + outer) / 2, 0.0, 0), (outer - inner, 0.006, 0.006))
        frame.add(turned(points, spoke / 12 * TURN, 'y'), faces)
    # Short arcs between the circles, in every other sector, like the bands of a chart.
    for sector in range(12):
        if sector % 2:
            continue
        start = (sector + 0.12) / 12 * TURN
        end = (sector + 0.88) / 12 * TURN
        frame.add(*sweep((RINGS[0]['radius'] + RINGS[1]['radius']) / 2, chamfered(0.003, 0.004, 0.0015), 12, start, end))
        frame.add(*sweep((RINGS[2]['radius'] + PLATTER) / 2 - 0.03, chamfered(0.003, 0.004, 0.0015), 12, start + TURN / 12, end + TURN / 12))
    return glass.build('platter_glass'), frame.build('platter_frame')


def make_orbit():
    """The circle under the outermost branches, with a bead every so often."""
    radius = RINGS[-1]['radius']
    soup = Soup()
    soup.add(*sweep(radius, chamfered(0.005, 0.006, 0.002), 128))
    for mark in range(24):
        points, faces = box((radius, 0, 0), (0.03, 0.016, 0.012))
        soup.add(turned(points, mark / 24 * TURN, 'y'), faces)
    return soup.build('orbit')


# ── a look at the result ─────────────────────────────────────────────────────────────────────────────────────────

def preview(folder, things):
    """Renders a couple of pictures, for checking the models by eye. Nothing the page uses."""
    scene = bpy.context.scene
    scene.render.engine = 'BLENDER_EEVEE'
    scene.render.resolution_x, scene.render.resolution_y = 1400, 900
    world = bpy.data.worlds.new('preview')
    world.use_nodes = True
    world.node_tree.nodes['Background'].inputs[0].default_value = (0.012, 0.014, 0.02, 1)
    scene.world = world

    def material(name, colour, metallic, roughness, emission=0.0):
        made = bpy.data.materials.new(name)
        made.use_nodes = True
        shader = made.node_tree.nodes['Principled BSDF']
        shader.inputs['Base Color'].default_value = (*colour, 1)
        shader.inputs['Metallic'].default_value = metallic
        shader.inputs['Roughness'].default_value = roughness
        if emission:
            shader.inputs['Emission Color'].default_value = (*colour, 1)
            shader.inputs['Emission Strength'].default_value = emission
        return made

    mint, violet = (0.2, 0.85, 0.55), (0.4, 0.28, 0.95)
    looks = {
        'limbs': material('limbs', violet, 0.2, 0.35), 'gems': material('gems', mint, 0.5, 0.12),
        'core': material('core', mint, 0.5, 0.1, 0.4), 'cage': material('cage', violet, 0.6, 0.3),
        'gimbal': material('gimbal', (0.6, 0.62, 0.7), 0.9, 0.25), 'vertebra': material('vertebra', (0.5, 0.52, 0.6), 0.9, 0.3),
        'platter_glass': material('glass', (0.1, 0.1, 0.2), 0.0, 0.1), 'platter_frame': material('frame', violet, 0.7, 0.3, 0.3),
        'orbit': material('orbit', violet, 0.7, 0.3, 0.3),
    }
    for thing in things:
        key = next(key for key in looks if thing.name.startswith(key))
        thing.data.materials.append(looks[key])
        if key in ('gems', 'core', 'cage', 'gimbal', 'vertebra', 'platter_frame', 'orbit'):
            for polygon in thing.data.polygons:
                polygon.use_smooth = False
    by_name = {thing.name: thing for thing in things}
    for name, thing in by_name.items():
        level = name.split('_')[-1]
        thing.hide_render = level.isdigit() and level != '0'
    by_name['platter_glass'].location.z = by_name['platter_frame'].location.z = by_name['orbit'].location.z = FLOOR
    by_name['vertebra'].location.z = 0.7

    for place, energy in (((4, -4, 6), 1500), ((-5, 2, 3), 700), ((1, 5, 2), 500)):
        lamp = bpy.data.objects.new('lamp', bpy.data.lights.new('lamp', 'AREA'))
        lamp.data.energy, lamp.data.size = energy, 4
        lamp.location = place
        lamp.rotation_euler = (np.array(place) * -1 / np.linalg.norm(place)).tolist()
        scene.collection.objects.link(lamp)
        aim = lamp.constraints.new('TRACK_TO')
        aim.target = by_name['core']
    camera = bpy.data.objects.new('camera', bpy.data.cameras.new('camera'))
    camera.data.lens = 60
    scene.collection.objects.link(camera)
    scene.camera = camera
    target = bpy.data.objects.new('target', None)
    scene.collection.objects.link(target)
    aim = camera.constraints.new('TRACK_TO')
    aim.target = target
    Path(folder).mkdir(parents=True, exist_ok=True)
    shots = (('level', (0, -5.6, 4.4), (0, 0, 0)), ('hub', (0.9, -1.5, 0.9), (0, 0, 0)), ('edge', (2.6, -2.2, 0.35), (0, 0, 0)), ('twigs', (2.0, -1.2, 2.2), (1.7, 0.3, -0.2)))
    for name, place, look in shots:
        camera.location = place
        target.location = look
        scene.render.filepath = str(Path(folder) / name) + '.png'
        bpy.ops.render.render(write_still=True)


# ── build ────────────────────────────────────────────────────────────────────────────────────────────────────────

def main():
    arguments = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
    bpy.ops.wm.read_factory_settings(use_empty=True)
    rng = random.Random(23)
    levels = [plan(rng) for _ in range(LEVELS)]
    things = []
    for index, twigs in enumerate(levels):
        things.append(grow_limbs('limbs_%d' % index, twigs))
        things.append(set_stones('gems_%d' % index, twigs, rng))
    things += [make_core(), make_cage(), *make_gimbals(), make_vertebra(), *make_platter(), make_orbit()]

    GLB.parent.mkdir(parents=True, exist_ok=True)
    bpy.ops.export_scene.gltf(
        filepath=str(GLB), export_format='GLB', export_yup=True, export_apply=True,
        export_normals=False, export_texcoords=False, export_materials='NONE', export_attributes=True,
        export_animations=False, export_cameras=False, export_lights=False, export_extras=False,
    )
    rounded = lambda value: round(float(value), 4)
    LAYOUT.write_text(json.dumps({
        'note': 'Written by scripts/models/tree.py together with prototypes/tree-site/models/tree.glb. Do not edit by hand.',
        'rings': [{key: ring[key] for key in ('each', 'radius', 'drop', 'node')} for ring in RINGS],
        'arch': ARCH, 'platter': PLATTER, 'floor': FLOOR,
        # Per branch: ring, parent, angle, rise, seed, family.
        'levels': [[value for twig in twigs for value in (twig['ring'], twig['parent'], rounded(twig['angle']), rounded(twig['rise']), rounded(twig['seed']), rounded(twig['family']))] for twigs in levels],
    }, separators=(',', ':')) + '\n')
    for thing in things:
        print('%-16s %6d vertices %6d faces' % (thing.name, len(thing.data.vertices), len(thing.data.polygons)))
    print('wrote', GLB, GLB.stat().st_size, 'bytes')
    if '--preview' in arguments:
        preview(arguments[arguments.index('--preview') + 1], things)


main()
