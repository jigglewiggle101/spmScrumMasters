// This file is responsible for creating the game object and setting up the game loop.
import { createScene } from './scene.js';
import { createCity } from './city.js';
import buildings from './building.js';

export default function createGame() {
  let activeToolId = '';
  const scene = createScene();
  const city = createCity(20);

  scene.initialise(city);

  scene.onObjectSelected = (selectedObject) => {
    let { x, y } = selectedObject.userData;
    const tile = city.data[x][y];

    if (activeToolId === 'demolition') {
      tile.buildings = undefined;
      scene.update(city);
    } else if (!tile.buildings) {
      tile.building = activeToolId;
      scene.update(city);
    }
  };

  document.addEventListener('mousedown', scene.onMouseDown.bind(scene), false);
  document.addEventListener('mousemove', scene.onMouseMove.bind(scene), false);
  document.addEventListener('mouseup', scene.onMouseUp.bind(scene), false);
  document.addEventListener('contextmenu', (event) => event.preventDefault(), false);

  const game = {
    update() {
      city.update();
      scene.update(city);
    },
    setActiveToolId(toolId) {
      activeToolId = toolId;
    }
  };

  // Start update interval
  setInterval(() => {
    game.update();
  }, 1000);

  scene.start();

  return game;
}
