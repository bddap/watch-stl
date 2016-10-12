// const w = nw.Window.get()
// w.showDevTools()

const {three, addTestCube, camera, scene, fitToParent, renderForever, renderOnce, renderer}
  = require('three-default')({parent:document.body})
const fs = require('fs')
const stl = require('stl')

fs.readFile(nw.App.argv[0], (err, data) => {
  err && console.error(err)

  const facets = stl.toObject(data).facets
  const triangles = facets.map(facet => facet.verts)

  var vertices = new Float32Array( flatten(flatten(triangles)) )
  var geometry = new three.BufferGeometry();
  geometry.addAttribute( 'position', new three.BufferAttribute( vertices, 3 ) )
  var mesh = new three.Mesh( geometry )

  scene.add(mesh)
})

function flatten(lss) {
  return [].concat(...lss)
}

function updateForever(t) {
  requestAnimationFrame(updateForever)
  scene.rotation.y = t / 1000
  renderOnce()
}
updateForever()
camera.position.z = 200
scene.rotation.x = 1

// TODO: const normals = facets.map(facet => facet.normal)
// TODO: light
// TODO: watch file
// TODO: load color from binary stl if possible
// TODO: move camera to fit bounding box (THREE has a bounding box function)
// TODO: center target by checking bounding box
// TODO: veiwer controls (https://github.com/Jam3/three-orbit-viewer may be useful)
