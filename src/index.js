import '../style/base.css';

import THREE from 'three';
import altspace from 'altspace';

import ChangeColorBehavior from './behaviors/change-color.js';
import ChangePropertiesBehavior from './behaviors/change-properties.js';

const sim = altspace.utilities.Simulation();
const config = { authorId: 'AltspaceVR', appId: 'SpinningCube' };

const CUBE_SCALE = 149;


function createCube() {
  const geometry = new THREE.BoxGeometry(1, 1.5, 1);
  const img = new THREE.MeshLambertMaterial({
      map:THREE.ImageUtils.loadTexture('image/head.jpg')
  });

  const cube = new THREE.Mesh(geometry, img);

  cube.scale.multiplyScalar(CUBE_SCALE);
  cube.addBehaviors(
    altspace.utilities.behaviors.Object3DSync(),
    altspace.utilities.behaviors.Spin({ speed: 0.0015 }),
    new ChangeColorBehavior(),
    new ChangePropertiesBehavior({
      material: new THREE.MeshLambertMaterial({
          map:THREE.ImageUtils.loadTexture('image/pig.jpg')
      }),
      geometry: new THREE.BoxGeometry(1.8, 1, 1.8)
    })
  );
  sim.scene.add(cube);
  return cube;
}

altspace.utilities.sync.connect(config).then((connection) => {
  const sceneSync = altspace.utilities.behaviors.SceneSync(connection.instance, {
    instantiators: {
      Cube: createCube,
    },
    ready: (firstInstance) => {
      if (firstInstance) {
        sceneSync.instantiate('Cube');
      }
    },
  });
  sim.scene.addBehavior(sceneSync);
});
