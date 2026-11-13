// Shrinks the models Blender wrote: positions and the extra per-vertex values become small whole numbers, and
// the result is packed with meshopt, which three.js unpacks as it loads. Run after scripts/models/tree.py:
//   node scripts/models/pack.mjs
import { statSync } from 'node:fs'
import { NodeIO } from '@gltf-transform/core'
import { EXTMeshoptCompression, KHRMeshQuantization } from '@gltf-transform/extensions'
import { dedup, meshopt, prune } from '@gltf-transform/functions'
import { MeshoptDecoder, MeshoptEncoder } from 'meshoptimizer'

const file = new URL('../../prototypes/tree-site/models/tree.glb', import.meta.url).pathname
await MeshoptDecoder.ready
await MeshoptEncoder.ready
const io = new NodeIO()
  .registerExtensions([EXTMeshoptCompression, KHRMeshQuantization])
  .registerDependencies({ 'meshopt.decoder': MeshoptDecoder, 'meshopt.encoder': MeshoptEncoder })
const before = statSync(file).size
const document = await io.read(file)
await document.transform(
  dedup(),
  prune(),
  // 14 bits place a vertex to within a fifth of a millimetre of a level five units across; 12 bits are plenty
  // for the branch numbers in `_twig`, which only have to land inside the right texel.
  meshopt({ encoder: MeshoptEncoder, level: 'medium', quantizePosition: 14, quantizeGeneric: 12 }),
)
await io.write(file, document)
for (const mesh of document.getRoot().listMeshes()) {
  const primitive = mesh.listPrimitives()[0]
  console.log(mesh.getName().padEnd(16), String(primitive.getAttribute('POSITION').getCount()).padStart(6), 'vertices', primitive.listSemantics().join(' '))
}
console.log('packed', file, before, '→', statSync(file).size, 'bytes')
