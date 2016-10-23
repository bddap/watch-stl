// function log(a) {
//   process.stdout.write(a + '\n')
// }

const {three, addTestCube, camera, scene, fitToParent, renderForever, renderOnce, renderer}
  = require('three-default')({parent:document.body})
const fs = require('fs')
const stl = require('stl')

let mesh = new three.Object3D()

fs.readFile(nw.App.argv[0], (err, data) => {
  err && console.error(err)

  const facets = stl.toObject(data).facets
  const triangles = facets.map(facet => facet.verts)
  const normals = facets.map(facet => [facet.normal,facet.normal,facet.normal]) //make a normal for each vetex because MeshLambertMaterial uses normal in the vertex shader

  const vertices = new Float32Array( flatten(flatten(triangles)) )
  const normal = new Float32Array( flatten(flatten(normals)) )
  const geometry = new three.BufferGeometry();
  geometry.addAttribute( 'position', new three.BufferAttribute( vertices, 3 ) )
  geometry.addAttribute( 'normal', new three.BufferAttribute( normal, 3 ) )
  mesh = new three.Mesh( geometry, new three.MeshLambertMaterial( { color: 0xffffff } ) )

  scene.add(mesh)
})

function flatten(lss) {
  return [].concat(...lss)
}

function updateForever(t) {
  requestAnimationFrame(updateForever)
  mesh.rotation.y = t / 1000
  renderOnce()
}
updateForever()
camera.position.z = 200
scene.rotation.x = 1

scene.add(new three.AmbientLight(0x555555, 0.5));
const dlight = new three.DirectionalLight( 0xffffff, 0.7 );
dlight.position.set( 0.1, 1, 1 );
scene.add( dlight );

// TODO: watch file
// TODO: load color from binary stl if possible
// TODO: move camera to fit bounding box (THREE has a bounding box function)
// TODO: center target by checking bounding box
// TODO: veiwer controls (https://github.com/Jam3/three-orbit-viewer may be useful)
