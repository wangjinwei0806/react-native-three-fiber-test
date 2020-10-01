import React, { useMemo } from 'react'
import { useLoader, useUpdate } from 'react-three-fiber'
import { loadDaeAsync, Renderer, THREE, utils } from 'expo-three';
// import moduleName from 'NotoSansCJKMun.json'
global.THREE = global.THREE || THREE;


export default function({ children, vAlign = 'center', hAlign = 'center', size = 1, color = '#000000', ...props }) {
  const font = useLoader(THREE.FontLoader, '/NotoSansCJKMun.json')
  const config = useMemo(
    () => ({ font, size: 40, height: 30, curveSegments: 32, bevelEnabled: true, bevelThickness: 6, bevelSize: 2.5, bevelOffset: 0, bevelSegments: 8 }),
    [font]
  )
  const mesh = useUpdate(
    self => {
      const size = new THREE.Vector3()
      self.geometry.computeBoundingBox()
      self.geometry.boundingBox.getSize(size)
      self.position.x = hAlign === 'center' ? -size.x / 2 : hAlign === 'right' ? 0 : -size.x
      self.position.y = vAlign === 'center' ? -size.y / 2 : vAlign === 'top' ? 0 : -size.y
    },
    [children]
  )
//   const textMesh = new TextMesh();
// textMesh.material = new THREE.MeshPhongMaterial({ color: 0x056ecf });
// textMesh.update({
//   text: 'Hey There :)',
//   font: require('./three_fonts/neue_haas_unica_pro_medium.json'), // This accepts json, THREE.Font, or a uri to remote THREE.Font json
// });
  return (
    <group {...props} scale={[0.1 * size, 0.1 * size, 0.1]}>
      <mesh ref={mesh}>
        <TextBufferGeometry attach="geometry" args={[children, config]} />
        <meshNormalMaterial attach="geometry" />
        <boxBufferGeometry attach="geometry" args={[10, 10, 10]} />
      </mesh>
    </group>
  )
}
