import * as THREE from 'three';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { ModelsLoader } from './models-loader';
import { MeshLoader } from './meshs';
import { ObjectPreset } from './object-presets';

export function objectHandler(scene) {
    const loader = new GLTFLoader();
    const objectPresenter = new ObjectPreset();
    let pot; // Variável para armazenar o objeto pot


    ModelsLoader(scene, 'caveira').then((loadedCaveira) => {
        pot = loadedCaveira
        objectPresenter.addObject(loadedCaveira);
    });

    objectPresenter.addLight(1, 1, 5 , 'luz2');
    objectPresenter.addLight(1, 1, -2);

    // var fire = new THREE.Fire(MeshLoader().firetexture, new THREE.Color(0xff0000));

    // var wireframe = new THREE.Mesh(fire.geometry, MeshLoader().wirefire.clone());
    // fire.add(wireframe);
    // wireframe.visible = false;

    // scene.add(fire)
    

    // Valores radianos
    //object.rotation.x = Math.PI / 4;  -> 45° (π/4 radianos)
    //object.rotation.y = Math.PI / 2;  -> 90° (π/2 radianos)
    //object.rotation.z = Math.PI;      -> 180° (π radianos)

    Object.keys(objectPresenter.objects).forEach(key => {
        scene.add(objectPresenter.objects[key]);
    });

    function update() {
        let objects = objectPresenter.objects;

        if (pot) {
            pot.rotation.y += 0.003;
        }
    }

    return {
        objectHandler,
        update,
        eventTest: function () {
            console.log(objectPresenter.objects);
        }
    };
}