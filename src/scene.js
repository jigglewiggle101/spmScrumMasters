import * as THREE from 'three';
import { createCamera} from './camera.js';
import { CreateAssetInstance } from './assets.js';


export function createScene() {
  const gameWindow = document.getElementById('render-target');
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87ceeb);

  const camera = createCamera(gameWindow);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(gameWindow.offsetWidth, gameWindow.offsetHeight);
  document.body.appendChild(renderer.domElement);  
  
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let selectedObject = undefined;
  let onObjectSelected = undefined;


  let terrain = [];
  let buildings = [];

  function initialize(city) {
    scene.clear();
    terrain = [];
    buildings = [];
    for (let x = 0; x < city.size; x++) {
      const column = [];
      for (let y = 0; y < city.size; y++) {
        const terrainId = city.data[x][y].terrainId;
        const mesh = CreateAssetInstance(terrainId, x, y);
        scene.add(mesh);
        column.push(mesh);
      }
      terrain.push(column);
      buildings.push([...Array(city.size)]);
    }
    setupLights();
  }

  function update(city) {
    for (let x = 0; x < city.size; x++) {
      for (let y = 0; y < city.size; y++) {
        const tile = city.data[x][y];
        const existingBuildingMesh = buildings[x][y];

        if (!tile.building && existingBuildingMesh) {
          scene.remove(existingBuildingMesh);
          buildings[x][y] = undefined;
        }

        if (tile.building && tile.building.updated) {
          if (existingBuildingMesh) {
            scene.remove(existingBuildingMesh);
          }
          buildings[x][y] = CreateAssetInstance(tile.building.id, x, y, tile.building);
          scene.add(buildings[x][y]);
          tile.building.updated = false;
        }
      }
    }
  }

  
  function setupLights() {
    const lights = [
      new THREE.AmbientLight(0xffffff, 0.2),
      new THREE.DirectionalLight(0xffffff, 0.3),
      new THREE.DirectionalLight(0xffffff, 0.3),
      new THREE.DirectionalLight(0xffffff, 0.3)
    ];

    lights[1].position.set(0, 1, 0);
    lights[2].position.set(1, 1, 0);
    lights[3].position.set(0, 1, 1);

    for (let light of lights) {
      scene.add(light);
    }
  }

  function draw() {
    renderer.render(scene, camera.camera);
  }

  function start() {
    renderer.setAnimationLoop(draw);
  }

  function stop() {
    renderer.setAnimationLoop(null);
  }

  function onMouseDown(event) {

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    let intersections = raycaster.intersectObjects(scene.children, false);

    if (intersections.length > 0) {
      if (selectedObject) selectedObject.material.emissive.setHex(0);
      selectedObject = intersections[0].object;
      selectedObject.material.emissive.setHex(0xff0000);

      if (this.onObjectSelected) {
        this.onObjectSelected(selectedObject);
      }
    }
  }

  function onMouseUp(event) {
   
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    let intersections = raycaster.intersectObjects(scene.children, false);

    if (intersections.length > 0) {
      if (selectedObject) selectedObject.material.emissive.setHex(0);
      selectedObject = intersections[0].object;
      selectedObject.material.emissive.setHex(0xff0000);

      if (this.onObjectSelected) {
        this.onObjectSelected(selectedObject);
      }
    }
  }

  function onMouseMove(event) {
   
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    let intersections = raycaster.intersectObjects(scene.children, false);

    if (intersections.length > 0) {
      if (selectedObject) selectedObject.material.emissive.setHex(0);
      selectedObject = intersections[0].object;
      selectedObject.material.emissive.setHex(0xff0000);

      if (this.onObjectSelected) {
        this.onObjectSelected(selectedObject);
      }
    }
  }


  return {
    initialize,
    update,
    start,
    stop,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onObjectSelected
  };
}