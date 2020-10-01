import React, { useRef, Suspense, useState, useEffect, useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import { loadDaeAsync, Renderer, THREE, utils } from 'expo-three';
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
// import { useSprings, a } from '@react-spring/three'
import { useSprings, useSpring, a } from 'react-spring/three'

// import Text from './Text'
// import Texts from './Texts'

global.THREE = global.THREE || THREE;



// function Jumbo() {
//   // const ref = useRef()
//   // useFrame(({ clock }) => (ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z = Math.sin(clock.getElapsedTime()) * 0.3))
//   return (
//     <group /* ref={ref} */>
//       <Text hAlign="left" position={[8, 4.2, 0]} children="ITHOME" />
//       <Text hAlign="left" position={[8, 0, 0]} children="DAYUAN" />
//       <Text hAlign="left" position={[15, -4.2, 0]} children="APP" />
//       <Text hAlign="left" position={[3, -8, 0]} children="15" size={3} />
//       <Text hAlign="left" position={[15, -11, 0]} children="DAY" />
//     </group>
//   )
// }
// function Number({ mouse, hover }) {

//   return (
//     <Suspense fallback={null}>
//       <group >
//         <Texts
//           size={100}
//           onPointerOver={() => hover(true)}
//           onPointerOut={() => hover(false)}>
//           4
//         </Texts>
//       </group>
//     </Suspense>
//   )
// }


const number = 35
const colors = ['#A2CCB6', '#FCEEB5', '#EE786E', '#e0feff', 'lightpink', 'lightblue']
const random = i => {
  const r = Math.random()
  return {
    position: [100 - Math.random() * 200, 100 - Math.random() * 200, i * 1.5],
    color: colors[Math.round(Math.random() * (colors.length - 1))],
    scale: [1 + r * 14, 1 + r * 14, 1],
    rotation: [0, 0, THREE.Math.degToRad(Math.round(Math.random()) * 45)]
  }
}

const data = new Array(number).fill().map(() => {
  return {
    color: colors[Math.round(Math.random() * (colors.length - 1))],
    args: [0.1 + Math.random() * 9, 0.1 + Math.random() * 9, 10]
  }
})
function Content() {
  const [springs, set] = useSprings(number, i => ({
    from: random(i),
    ...random(i),
    config: { mass: 20, tension: 150, friction: 50 }
  }))
  useEffect(() => void setInterval(() => set(i => ({ ...random(i), delay: i * 40 })), 3000), [])
  return data.map((d, index) => (
    <a.mesh key={index} {...springs[index]} castShadow receiveShadow>
      <boxBufferGeometry attach="geometry" args={d.args} />
      <a.meshStandardMaterial attach="material" color={springs[index].color} roughness={0.75} metalness={0.5} />
    </a.mesh>
  ))
}

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    if (mesh && mesh.current) {
      mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial
        attach="material"
        color={hovered ? "hotpink" : "orange"}
      />
    </mesh>
  );
}
function Lights() {
  return (
    <group>
      <pointLight intensity={0.3} />
      <ambientLight intensity={2} />
      <spotLight
        castShadow
        intensity={0.2}
        angle={Math.PI / 7}
        position={[150, 150, 250]}
        penumbra={1}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
    </group>
  )
}
// function Dodecahedron({ time, ...props }) {
//   return (
//     <mesh {...props}>
//       {/* <Html scaleFactor={10}>
//         <div class="content">
//           Suspense <br />
//           {time}ms
//         </div>
//       </Html> */}
//     </mesh>
//   )
// }

export default function App() {
  const [{ top, mouse }, set] = useSpring(() => ({ top: 0, mouse: [0, 0] }))
  return (
    <View style={styles.container}>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[0, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
    </View>
  );
  return (
    <View style={styles.container}>
      {/* <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas> */}

      <Canvas shadowMap camera={{ position: [0, 0, 100], fov: 100 }}>
        {/* <Dodecahedron time={50000} position={[-2, 0, 0]} /> */}
        {/* <Number  />

      <Suspense fallback={null}>
        <Jumbo />
      </Suspense> */}
        {/* <Scene top={top} mouse={mouse} /> */}
        <Box position={[-1.2, 0, 0]} />
        <Lights />
        <Content />
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  canvas: {
    //   position: absolute,
    // top: 0,
    // pointer-events: none;
  }
});
