import { createCamera } from './camera.js'; // Import the CreateCamera function from camera.js
import * as THREE from 'three'; // Import the three.js
import { CreateAssetInstance } from './assets.js';  // Import the CreateAssetInstance function from assets.js

export function createScene() {
// Initial scene setup
  const gameWindow = document.getElementById('render-target');
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x777777);

  const camera = createCamera(gameWindow);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(gameWindow.offsetWidth, gameWindow.offsetHeight);
  gameWindow.appendChild(renderer.domElement);

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let selectedObject = undefined;

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
       const currentBuildingId = buildings[x][y]?.userData?.id; 
       const newBuildingId = city.data[x][y].buildingId;

        // If player removes a building, remove it from the scene
       if (!newBuildingId && currentBuildingId) {
          scene.remove(buildings[x][y]); // Corrected: use 'scene.remove'
          buildings[x][y] = undefined;
        }

          // If the data model has changed, update the mesh
       if (newBuildingId !== currentBuildingId) {
          scene.remove(buildings[x][y]); // Remove the old mesh
          buildings[x][y] = CreateAssetInstance(newBuildingId, x, y); // Create the new mesh
          scene.add(buildings[x][y]); // Add the new mesh to the scene
         }
        }
      }
    }
  
  
    
    function setupLights () {
      const light = [
        new THREE.AmbientLight(0xffffff, 0.2),
        new THREE.DirectionalLight(0xffffff, 0.3),
        new THREE.DirectionalLight(0xffffff, 0.3),
        new THREE.DirectionalLight(0xffffff, 0.3)
      ];
      light[1].position.set(0, 1, 0);
      light[2].position.set(1, 1, 0);
      light[3].position.set(0, 1, 1);

      scene.add(...light);
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
        camera.onMouseDown(event);

        mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
        mouse.y = (event.clientY / renderer.domElement.clientHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera.camera);

        let intersections = raycaster.intersectObjects(scene.children, false);

        if (intersections.length > 0) {
            if (selectedObject) selectedObject.material.emissive.setHex(0);
            selectedObject = intersections[0].object;
            selectedObject.material.emissive.setHex(0x555555);
            console.log(selectedObject.userData);  
        }
    }

    function onMouseUp(event) {
        camera.onMouseUp(event);
    }

    function onMouseMove(event) {
        camera.onMouseMove(event);
        }

      return{
        initialize,
        update,
        start,
        stop,
        onMouseDown,
        onMouseUp,
        onMouseMove
      }
  }
