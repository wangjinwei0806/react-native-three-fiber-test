import React, { useRef, Suspense, useState, useEffect, useCallback, useMemo } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableHighlight
} from 'react-native';

import { Canvas, useFrame, useThree } from "react-three-fiber";
import { loadDaeAsync, Renderer, THREE, utils } from 'expo-three';
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import { useSprings, useSpring, a } from 'react-spring/three'
import MotionSlider from 'react-native-motion-slider';

const { width, height } = Dimensions.get('window');

global.THREE = global.THREE || THREE;

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

let randomHex = () => {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
let setHex = (rgb) => {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += rgb;
  }
  return color;
};


export default function App() {
  const [Color, setColor] = useState(randomHex());

  const [{ top, mouse }, set] = useSpring(() => ({ top: 0, mouse: [0, 0] }))
  const onClick = () => {
    console.log("clicked ");
    setColor(randomHex());
  }

  return (
    <View style={styles.container}>
      <View style={[
        styles.container,
        { backgroundColor: Color },
      ]}>
        <Canvas shadowMap camera={{ position: [0, 0, 100], fov: 100 }}>
          <Box position={[-1.2, 0, 0]} />
          <Lights />
          <Content />
        </Canvas>
      </View>
      <View style={styles.overlay}>

        <Text style={styles.welcome}>
          Welcome to the React Native Playground!
        </Text>
        {/* <MotionSlider
          title={'Choose the desired temperature'}
          min={0}
          max={100}
          value={25.8}
          decimalPlaces={1}
          units={'º'}
          // backgroundColor={['rgb(3, 169, 244)', 'rgb(255, 152, 0)', 'rgb(255, 87, 34)']}
          backgroundColor={['rgb(3, 169, 244)', 'rgb(255, 152, 0)', 'rgb(255, 87, 34)', 'rgb(127,140,8)', 'rgb(86,156,7)', 'rgb(5,182,125)', 'rgb(4,187,203)', 'rgb(34,4,217)', 'rgb(133,1,206)', 'rgb(231,1,181)', 'rgb(255,0,11)']}
          // valueBackgroundColor={(value) => console.log(value)}
          onValueChanged={(value) => console.log(value)}
          onPressIn={() => console.log('Pressed in')}
          onPressOut={() => console.log('Pressed out')}
          onDrag={() => console.log('Dragging')}
        /> */}
        <MotionSlider
          title={'Choose the desired color'}
          min={0}
          max={100}
          value={80}
          decimalPlaces={1}
          units={'º'}
          backgroundColor={['rgb(0, 0, 0)', 'rgb(255, 0, 0)']}
          onValueChanged={(value) => {
            onClick
            console.log(value)
          }}
          onPressIn={() => console.log('Pressed in')}
          onPressOut={() => console.log('Pressed out')}
          onDrag={() => console.log('Dragging')}
        />
        <MotionSlider
          title={'Choose the desired color'}
          min={0}
          max={100}
          value={80}
          decimalPlaces={1}
          units={'º'}
          backgroundColor={['rgb(0, 0, 0)', 'rgb(0, 255, 0)']}
          onValueChanged={(value) => console.log(value)}
          onPressIn={() => console.log('Pressed in')}
          onPressOut={() => console.log('Pressed out')}
          onDrag={() => console.log('Dragging')}
        />
        <MotionSlider
          title={'Choose the desired color'}
          min={0}
          max={100}
          value={80}
          decimalPlaces={1}
          units={'º'}
          backgroundColor={['rgb(0, 0, 0)', 'rgb(0, 0,255)']}
          onValueChanged={(value) => console.log(value)}
          onPressIn={() => console.log('Pressed in')}
          onPressOut={() => console.log('Pressed out')}
          onDrag={() => console.log('Dragging')}
        />
        <TouchableHighlight
          onPress={onClick}
         ><View><Text>Tap to change the background</Text></View>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: randomHex(),

    // backgroundColor: "red",
  },
  overlay: {
    position: 'absolute',
    // flex: 1,
    marginTop: height * 0.5,
    height: height * 0.5,
    width: width,
    // backgroundColor: "rgba(44, 52, 200, 0.5)",
    backgroundColor: 'transparent',
    // opacity: 0.5,
  }
});
