import * as THREE from 'three';
import { createCamera } from './camera.js';
import { createAssetInstance } from './asset.js';
import { createCity } from './city.js';

export function createScene() {
  const gameWindow = document.getElementById('render-target');
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87ceeb);

  const camera = createCamera(gameWindow);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(gameWindow.offsetWidth, gameWindow.offsetHeight);
  document.body.appendChild(renderer.domElement);

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
        const mesh = createAssetInstance(terrainId);
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
        const currentBuilding = city.data[x][y].building;
        const newBuilding = city.data[x][y].building;

        if (!newBuilding && currentBuilding) {
            scene.remove(buildings[x][y]);
            buildings[x][y] = undefined;
          }

          if (!newBuilding && currentBuilding) {
            scene.remove(buildings[x][y]);
            buildings[x][y] = createAssetInstance(newBuilding, x,y);
            scene.add(buildings[x][y]);
          }
        }
      }
    }
  

  function setupLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
    directionalLight.position.set(10, 10, 10);
    scene.add(ambientLight, directionalLight);
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
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    let intersections = raycaster.intersectObjects(scene.children);

    if (intersections.length > 0) {
      const selectedObject = intersections[0].object;
      onObjectSelected(selectedObject);
    }
  }

  function onMouseUp(event) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

     let intersections = raycaster.intersectObjects(scene.children);

    if (intersections.length > 0) {
      const selectedObject = intersections[0].object;
      onObjectSelected(selectedObject);
    }
  }

  function onMouseMove(event) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    let intersections = raycaster.intersectObjects(scene.children);
    if (intersections.length > 0) {
      const selectedObject = intersections[0].object;
      onObjectSelected(selectedObject);
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
  };

}