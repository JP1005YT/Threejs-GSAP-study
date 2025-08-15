import * as THREE from 'three';

import { Fire } from './../libs/Fire.js';

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
    // objectPresenter.addLight(1, 1, -2);
    
    var fireTex = new THREE.TextureLoader().load(
        "./../models/textures/fire.png"
    );
    
    var wireframeMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0xffffff),
        wireframe: true,
    });
    
    var fire = new Fire(fireTex, new THREE.Color(0xff0000));
    
    var wireframe = new THREE.Mesh(fire.geometry, wireframeMat.clone());
    fire.add(wireframe);
    wireframe.visible = false;
    fire.scale.set(3, 5, 3);
    fire.position.set(-4.4, 14.26, 10.6);
    objectPresenter.addPointLight(-4.4, 14.26, 10.6, 0xff0000, 1);

    scene.add(fire);

    

    // Valores radianos
    //object.rotation.x = Math.PI / 4;  -> 45° (π/4 radianos)
    //object.rotation.y = Math.PI / 2;  -> 90° (π/2 radianos)
    //object.rotation.z = Math.PI;      -> 180° (π radianos)

    Object.keys(objectPresenter.objects).forEach(key => {
        scene.add(objectPresenter.objects[key]);
    });

     var controller = {
        speed: 1.0,
        magnitude: 3.8,
        lacunarity: 10,
        gain: 0.0,
        noiseScaleX: 5,
        noiseScaleY: 5,
        noiseScaleZ: 5,
        wireframe: false,
      };

      fire.material.uniforms.magnitude.value = controller.magnitude;
        fire.material.uniforms.lacunarity.value = controller.lacunarity;
        fire.material.uniforms.gain.value = controller.gain;
        fire.material.uniforms.noiseScale.value = new THREE.Vector4(
            controller.noiseScaleX,
            controller.noiseScaleY,
            controller.noiseScaleZ,
            0.3
        );

      const clock = new THREE.Clock();

      function update() {
          let objects = objectPresenter.objects;
          
          if (pot) {
            //   pot.rotation.y += 0.003;
            }

        var t = clock.getElapsedTime() * controller.speed;
        fire.update(t);
    }

    return {
        objectHandler,
        update,
        eventTest: function () {
            console.log(objectPresenter.objects);
        }
    };
}