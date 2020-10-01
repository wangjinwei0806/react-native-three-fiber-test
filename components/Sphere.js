// import * as THREE from 'three'
import React, { useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree, useLoader, extend } from "react-three-fiber";
import Assets from '../Assets';

global.THREE = global.THREE || THREE;

export default function Sphere(props) {
  const mesh = useRef();
  const [active, setActive] = useState(false);
  const png = Assets.flakes;
  const texture = useLoader(THREE.TextureLoader,png)

  // const texture = useLoader(THREE.TextureLoader, '/flakes.png')
  const normalMap = useMemo(() => {
    const clone = texture.clone(true)
    clone.needsUpdate = true
    return clone
  }, [texture])
  useFrame(() => {
    if (mesh && mesh.current) {
      mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
    }
  });
  const [hovered, set] = useState(false)
  useEffect(() => void (document.body.style.cursor = hovered ? 'pointer' : 'auto'), [hovered])
  return (

    <mesh {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={(e) => setActive(!active)}
      onPointerOver={() => set(true)}
      onPointerOut={() => set(false)}>
      <sphereBufferGeometry attach="geometry" args={[1.5, 64, 64]} />
      <meshPhysicalMaterial
        attach="material"
        clearcoat={1.0}
        clearcoatRoughness={0}
        metalness={0.9}
        roughness={0.1}
        color={hovered ? 'red' : 'blue'}
        normalMap={normalMap}
        normalScale={[0.3, 0.3]}
        normalMap-wrapS={THREE.RepeatWrapping}
        normalMap-wrapT={THREE.RepeatWrapping}
        normalMap-repeat={[20, 20]}
      //normalMap-anisotropy={16}
      />
    </mesh>
  )
}
