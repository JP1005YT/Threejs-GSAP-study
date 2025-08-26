import * as THREE from "three";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import { ModelsLoader } from "./models-loader";
import { MeshLoader } from "./meshs";
import { ObjectPreset } from "./object-presets";

export function objectHandler(scene) {
  const loader = new GLTFLoader();
  const objectPresenter = new ObjectPreset();
  let pot;
  let fire, fire2;

  ModelsLoader(scene, "caveira").then((loadedCaveira) => {});
  ModelsLoader(scene, "queixo").then((loadedCaveira) => {
    pot = loadedCaveira;
  });

  // objectPresenter.addLight(1, 1, 5 , 'luz2');

  fire = objectPresenter.addFire(MeshLoader().firetexture, -4.4, 15.26, 10.6);
  fire2 = objectPresenter.addFire(
    MeshLoader().firetexture,
    4.4,
    15.26,
    10.5,
    "fire2"
  );
  objectPresenter.addPointLight(-4.4, 14.26, 10.6, 0x00ff00, 30);
  objectPresenter.addPointLight(4.4, 14.26, 10.5, 0x00ff00, 30, "luz2");
  objectPresenter.addPointLight(0, 5.79, 17, 0x00ff00, 30, "luz3");

  // Valores radianos
  //object.rotation.x = Math.PI / 4;  -> 45° (π/4 radianos)
  //object.rotation.y = Math.PI / 2;  -> 90° (π/2 radianos)
  //object.rotation.z = Math.PI;      -> 180° (π radianos)

  Object.keys(objectPresenter.objects).forEach((key) => {
    scene.add(objectPresenter.objects[key]);
  });

  const clock = new THREE.Clock();

  let invert = false;
  let isActive = false;

  setInterval(() => {
    if (Math.random() > 0.9) {
      isActive = true;
    }
  }, 1000);

  function update() {
    let objects = objectPresenter.objects;
    if (pot) {
      if (isActive) {
        if (!invert) {
          pot.rotation.x += 0.001;
          if (pot.rotation.x > Math.PI / 32) {
            invert = true;
          }
        } else {
          pot.rotation.x -= 0.001;
          if (pot.rotation.x < 0) {
            isActive = false;
            invert = false;
          }
        }
      }
    }

    var t = clock.getElapsedTime() * 1;
    fire.update(t);
    fire2.update(t);
  }

  return {
    objectHandler,
    update,
    eventTest: function () {
      console.log(objectPresenter.objects);
    },
  };
}
