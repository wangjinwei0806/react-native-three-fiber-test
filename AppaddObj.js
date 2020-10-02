import React, { useRef, Suspense, useState, useEffect, useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Canvas, useFrame, useThree,useRender, useLoader, extend } from "react-three-fiber";
import { loadDaeAsync, loadAsync, Renderer, THREE, utils, } from 'expo-three';
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import { useSprings, useSpring, a } from 'react-spring/three'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';


// import arwing  from './assets/arwing.glb';
import { Asset } from 'expo-asset';
// Create an Asset from a resource
import Assets from './Assets';
import LoadGltf from './components/LoadGltf';
// import Gltf from './components/Gltf';
import Sphere from './components/Sphere';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
extend({ OrbitControls });
import img from './assets/flakes.png'

global.THREE = global.THREE || THREE;

function Image() {
  const texture = useLoader(THREE.TextureLoader, img)
  return (
    <mesh>
      <planeBufferGeometry attach="geometry" args={[3, 3]} />
      <meshBasicMaterial attach="material" map={texture} />
    </mesh>
  )
}
function Loading() {
  return (
    <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        transparent
        opacity={0.6}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}

const Male = () => {
  const [model, setModel] = useState(null);

  useEffect(() => {
    THREE.Texture;

    const loadModel = loadAsync(require(`./assets/models/obj/model.obj`));
    // const loadTexture = loadAsync(require(`./assets/models/obj/materials.mtl`));

    // const loadModel = loadAsync(Assets.models.obj.obj);
    // const loadTexture = loadAsync(Assets.models.obj.mtl);
console.warn('obj',Assets.models.obj)
// console.warn('mtl',Assets.models.obj.mtl)

    Promise.all([loadModel,loadedTexture]).then(
      ([loadedModel, loadedTexture]) => {
        loadedModel.traverse((o) => {
          if (o.isMesh) {
            o.material.map = loadedTexture;
          }
        });

        loadedModel.position.y = -95;

        setModel(loadedModel);
      },
    );
  }, []);

  return model ? <primitive object={model} dispose={null} /> : null;
};

const Camera = (props) => {
  const ref = useRef();
  const {setDefaultCamera} = useThree();

  useEffect(() => setDefaultCamera(ref.current), []);
  useFrame(() => ref.current.updateMatrixWorld());

  return (
    <perspectiveCamera
      ref={ref}
      fov={45}
      near={1}
      far={2000}
      position={[0, 0, 250]}
      {...props}
    />
  );
};

// async function setupModels() {

//   const model = Assets.models.gltf.robot;

//   const gltf = await ExpoTHREE.loadAsync(model['robot.glb']);
//   const object = gltf.scene;


//   if (!object) {
//     throw new Error('Failed to load model!');
//   }

//   this.mixer = new THREE.AnimationMixer(object);
//   this.actions = {};

//   gltf.animations.forEach(animation => {
//     if(animation.name == 'Walking') {
//       let action = this.mixer.clipAction(animation);
//       action.play();
//     }
//   });

//   ExpoTHREE.utils.scaleLongestSideToSize(object, 3);
//   this.scene.add(object);
// }


// const ModelObj = () => {
//   const asset = Asset.fromModule(require('./assets/models/obj/model.obj'));
//   asset.downloadAsync();
//   const model = useRef()
// let rot = 0
// // const obj = useMemo(() => new OBJLoader().load(url), [url])
// const obj = useMemo(() => new OBJLoader().load(asset.localUri), [asset.localUri])
//   useRender(() => {
//       const rad = 5 * Math.sin(THREEMath.degToRad(rot += 0.3))
//       model.current.rotation.set(rad, rad, 0)
// })
//   return <primitive object={obj} ref={model} />
// }
const ModelObj = () => {
  const url =`https://gist.github.com/talentlessguy/948f2837693165ff65ab348bb78bc5ef`
  const model = useRef()
let rot = 0

const obj = useMemo(() => new OBJLoader().load(url), [url])

  useRender(() => {
      const rad = 5 * Math.sin(THREEMath.degToRad(rot += 0.3))
      model.current.rotation.set(rad, rad, 0)
})
  return <primitive object={obj} ref={model} />
}

const Chair = () => {
  const { nodes } = useLoader(GLTFLoader, `./assets/arwing.glb`);
  console.log("nodes", nodes);
  return (
    <mesh geometry={nodes.Default.geometry}>
      <meshStandardMaterial attach="material"
        color="white"
        roughness={0.3}
        metalness={0.3} />
    </mesh>
  );
};
async function ArWing() {
  console.log("useLoader", useLoader(GLTFLoader, model));

  const model = Assets.models.gltf.robot;
  // const gltf = await ExpoTHREE.loadAsync(model['robot.glb']);
  const nodes = useLoader(GLTFLoader, model);
  // const scene = useLoader(GLTFLoader, model);
  // console.log("scene", scene);
  // useFrame will run outside of react in animation frames to optimize updates.
  useFrame(() => {
    group.current.rotation.y += 0.004;
  });
  return (
    <group>
      {/* <mesh visible geometry={nodes.Default.geometry}> */}
      <mesh visible geometry={nodes.Default.geometry}>
        <meshStandardMaterial
          attach="material"
          color="white"
          roughness={0.3}
          metalness={0.3}
        />
      </mesh>
    </group>
  );
}
const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls class.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls

  const {
    camera,
    gl: { domElement }
  } = useThree();

  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  useFrame(state => controls.current.update());
  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      enableZoom={false}
      maxAzimuthAngle={Math.PI / 4}
      maxPolarAngle={Math.PI}
      minAzimuthAngle={-Math.PI / 4}
      minPolarAngle={0}
    />
  );
};

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

function Gltf() {
  const gltf = useLoader(GLTFLoader, `./assets/models/gltf/robot.glb`)
  console.warn("QAQ", gltf)
  return <primitive object={gltf.scene} position={[-3.6, 0, 0]} />
}

export default function App() {
  const [{ top, mouse }, set] = useSpring(() => ({ top: 0, mouse: [0, 0] }))
  return (
    <View style={styles.container}>
      <Canvas shadowMap camera={{ position: [0, 0, 35], fov: 15 }} onCreated={({ gl, scene }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping
        gl.outputEncoding = THREE.sRGBEncoding
        scene.background = new THREE.Color('#373737')
        //scene.background.convertSRGBToLinear()
      }}>
        
        <ambientLight intensity={0.9} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          {/* <Male /> */}
          <ModelObj/>
        </Suspense>
        <CameraControls />
        <Lights />
        <directionalLight intensity={0.5} />
        <Suspense fallback={null}>
          <Image position={[-4, 1, -2]} />
        </Suspense>
        <Suspense fallback={null}>{<Gltf />}</Suspense>
        <ambientLight intensity={0.5} />
        <spotLight intensity={0.8} position={[300, 300, 400]} />
        <Suspense fallback={null}>
          <Gltf position={[-5, 0, 1]} rotation={[0, -0.8, 0]} />
          {/* <LoadGltf position={[-5, 0, 1]} rotation={[0, -0.8, 0]} /> */}
        </Suspense >
        <Suspense fallback={null}>
          <Sphere position={[-3.6, 0, 0]} />
          {/* <Chair position={[-1.2, 1, 0]}  /> */}
        </Suspense >
        <Box position={[-2.6, 0, 0]} />

        <Box position={[-1.2, 0, 0]} />
      </Canvas>
    </View>
  );
  return (
    <View style={styles.container}>
      <Canvas style={{ background: "#171717" }}>
        <directionalLight intensity={0.5} />
        <Suspense fallback={<Loading />}>
          <ArWing />
        </Suspense>
      </Canvas>
    </View>
  );
  return (
    <View style={styles.container}>
      {/* <Canvas shadowMap camera={{ position: [0, 0, 100], fov: 100 }}> */}
      <Canvas shadowMap camera={{ position: [0, 0, 10], fov: 100 }}>

        <Box position={[-1.2, 0, 0]} />
        <Lights />
        <directionalLight intensity={0.5} />
        <Suspense fallback={<Loading />}>
          <ArWing />
        </Suspense>
        {/* <Content /> */}
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
