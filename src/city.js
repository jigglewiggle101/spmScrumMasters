export function createCity(size) {
  const data = [];

  function initialize() {
    for (let x = 0; x < size; x++) {
      const column = [];
      for (let y = 0; y < size; y++) {
        const tile = createTile(x, y);
        column.push(tile);
      }
      data.push(column);
    }
  }

  function update() {
    console.log('update city');
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        data[x][y].update();
      }
    }
  }

  initialize();

  return {
    update,
    size,
    data,
  };
}

function createTile(x, y) {
  return {
    x,
    y,
    terrainId: 'grass',
    buildingId: undefined,
    update() {
      const random = Math.random();
      if (random < 0.01) {
        if (this.buildingId === undefined) {
          this.buildingId = 'building-1';
        } else if (this.buildingId === 'building-1') {
          this.buildingId = 'building-2';
        } else if (this.buildingId === 'building-2') {
          this.buildingId = 'building-3';
        }
      }
    },
  };
}