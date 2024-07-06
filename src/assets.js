import * as THREE from 'three';

const cube = new THREE.BoxGeometry(1, 1, 1);

// let loader = new THREE.TextureLoader();

// function loadTexture(url) {
//     const tex = loader.load(url);
//     tex.wrapS = THREE.RepeatWrapping;
//     tex.wrapT = THREE.RepeatWrapping;
//     tex.repeat.set(1,1);
//     return tex;
// }

// const textures = {
//     'grass': loadTexture('textures/grass.png'),
//     'road': loadTexture('textures/road.svg'),
//     'industrial': loadTexture('textures/building_office9.png'),
//     'commercial': loadTexture('textures/building_modern.png'),
//     'residential': loadTexture('textures/apartments7.png'),
//     'park': loadTexture('textures/park.svg'),
// };

// function getTopMaterial() {
//     return new THREE.MeshLambertMaterial({ color: 0x0000ff });
// }

// function getSideMaterial(textureName) {
//     return new THREE.MeshLambertMaterial({ map: textures[textureName].clone() });  
// }

const assets = { 
    'grass': (x, y) => {
        const material = new THREE.MeshLambertMaterial({ map: textures.grass});
        const mesh = new THREE.Mesh(geometry, material);
        mesh.scale.set(1, 0.1, 1); 
        mesh.userData = { id: 'grass', x, y };
        mesh.position.set(x, -0.5, y);
        return mesh;
    },

    'demolition': (x, y) => {
        const material = new THREE.MeshLambertMaterial({ color: 0x0000ff });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.userData = { id: 'demolition', x, y };
        mesh.scale.set(1, 0.1, 1); 
        mesh.position.set(x, 0.5, y);
        return mesh;
    },

    'residential': (x, y, data) => {
        const material = new THREE.MeshLambertMaterial({ color: 0x01B4BA });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.userData = { id: 'residential', x, y };
        mesh.scale.set(1, data.height, 1); 
        mesh.position.set(x, data.height / 2, y);
        return mesh;
    },

    'commercial': (x, y, data) => {
        const material = new THREE.MeshLambertMaterial({ color: 0x23A4D5 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.userData = { id: 'commercial', x, y };
        mesh.scale.set(1, data.height, 1); 
        mesh.position.set(x, data.height / 2, y);
        return mesh;
    },

    'park': (x, y, data) => {
        const material = new THREE.MeshLambertMaterial({ color: 0x01B4BA });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.userData = { id: 'park', x, y };
        mesh.scale.set(1, data.height, 1); 
        mesh.position.set(x, data.height / 2, y);
        return mesh;
    },

    'road': (x, y) => {
        const material = new THREE.MeshLambertMaterial({ color: 0x444440 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.userData = { id: 'road', x, y };
        mesh.scale.set(1, 0.1, 1);  
        mesh.position.set(x, 0.05, y);
        return mesh;
    },

    'industrial': (x, y, data) => {
        const material = new THREE.MeshLambertMaterial({ color: 0x51706C });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.userData = { id: 'industrial', x, y };
        mesh.scale.set(1, data.height, 1); 
        mesh.position.set(x, data.height / 2, y);
        return mesh;
    },
};

export function CreateAssetInstance(assetId, x, y, data) {
    if (assetId in assets) {
        return assets[assetId](x, y, data);
    } else {
        console.warn(`Asset Id ${assetId} is not found.`);
        return undefined;
    }
}