// import * as THREE from 'three'
import React, { forwardRef, useMemo } from 'react'
import { useLoader, useUpdate } from 'react-three-fiber'
import { loadDaeAsync, Renderer, THREE, utils } from 'expo-three';
import Fonts from './TEXT/Fonts.js'
import TextMesh from './TEXT/TextMesh';

global.THREE = global.THREE || THREE;

// new THREE.TextGeometry( text, parameters );

const Texts = forwardRef(({ children, vAlign = 'center', hAlign = 'center', size = 1, color = '#000000', ...props }, ref) => {
  // const font = useLoader(THREE.FontLoader, Fonts.neue_haas_unica_pro.medium)
  // const config = useMemo(() => ({ font, size: 40, height: 50 }), [font])
  // const mesh = useUpdate(
  //   self => {
  //     const size = new THREE.Vector3()
  //     self.geometry.computeBoundingBox()
  //     self.geometry.boundingBox.getSize(size)
  //     self.position.x = hAlign === 'center' ? -size.x / 2 : hAlign === 'right' ? 0 : -size.x
  //     self.position.y = vAlign === 'center' ? -size.y / 2 : vAlign === 'top' ? 0 : -size.y
  //   },
  //   [children]
  // )
  const TextAMesh = new TextMesh();
  TextAMesh.material = new THREE.MeshPhongMaterial({ color: 0x056ecf });
  TextAMesh.update({
    text: 'Hey There :)',
    font: require('./TEXT/three_fonts/neue_haas_unica_pro_medium.json'), // This accepts json, THREE.Font, or a uri to remote THREE.Font json
  });
  return (
    <group  {...props} scale={[0.1 * size, 0.1 * size, 0.1]}>
      <TextAMesh >
        {/* <textGeometry attach="geometry" args={'TextGeometry'} /> */}

        {/* <textGeometry attach="geometry" args={[children, config]} /> */}
        {/* <meshNormalMaterial attach="material" /> */}
      </TextAMesh>
    </group>
  )
})

export default Texts
