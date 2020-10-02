export default {
  "flakes": require(`./assets/flakes.png`),
  // "icons": {
  // 	"android.png": require(`./assets/icons/android.png`),
  // 	"expo.png": require(`./assets/icons/expo.png`),
  // 	"ios.png": require(`./assets/icons/ios.png`),
  // 	"splash.png": require(`./assets/icons/splash.png`)
  // },
  // "skybox": {
  // 	"nx.jpg": require(`./assets/skybox/nx.jpg`),
  // 	"ny.jpg": require(`./assets/skybox/ny.jpg`),
  // 	"px.jpg": require(`./assets/skybox/px.jpg`),
  // 	"nz.jpg": require(`./assets/skybox/nz.jpg`),
  // 	"py.jpg": require(`./assets/skybox/py.jpg`),
  // 	"pz.jpg": require(`./assets/skybox/pz.jpg`)
  // },
  // "images": {
  // 	"lava": {
  // 		"cloud.png": require(`./assets/images/lava/cloud.png`),
  // 		"lavatile.jpg": require(`./assets/images/lava/lavatile.jpg`)
  // 	}
  // },
  "models": {
    "fbx": {
      "samba": {
        "dancing.fbx": require(`./assets/models/fbx/dancing.fbx`)
      }
    },
    "gltf": {
      "robot": {
        "robot.glb": require(`./assets/models/gltf/robot.glb`)
      }
    },
    // "collada": {
    // 	"elf": {
    // 		"Body_tex_003.jpg": require(`./assets/models/collada/elf/Body_tex_003.jpg`),
    // 		"Face_tex_002_toObj.jpg": require(`./assets/models/collada/elf/Face_tex_002_toObj.jpg`),
    // 		"ce.jpg": require(`./assets/models/collada/elf/ce.jpg`),
    // 		"Hair_tex_001.jpg": require(`./assets/models/collada/elf/Hair_tex_001.jpg`),
    // 		"elf.dae": require(`./assets/models/collada/elf/elf.dae`)
    // 	},
    // 	"stormtrooper": {
    // 		"Stormtrooper_D.jpg": require(`./assets/models/collada/stormtrooper/Stormtrooper_D.jpg`),
    // 		"stormtrooper.dae": require(`./assets/models/collada/stormtrooper/stormtrooper.dae`)
    // 	}
    // },
    "obj": {
      "mtl": require(`./assets/models/obj/materials.mtl`),
      "obj": require(`./assets/models/obj/model.obj`)
    },
  }
};