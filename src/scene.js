import * as THREE from "three";

import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";

import { objectHandler } from "./object-handler.js";
import { createCamera } from "./camera.js";

export function createScene() {
  // Inicalizar cena
  const gameWindow = document.getElementById("render-target");
  const scene = new THREE.Scene();
  let color = 0x000000;
  scene.background = new THREE.Color(color); // Cor de fundo da cena

  // Inicalizar câmera
  const camera = createCamera(gameWindow);

  // Inicializar objetos
  const objects = objectHandler(scene);

  // Inicializar renderizador
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: "high-performance",
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  renderer.setSize(gameWindow.offsetWidth, gameWindow.offsetHeight);

  const labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
  labelRenderer.domElement.style.position = "absolute";
  labelRenderer.domElement.style.top = "0px";
  labelRenderer.domElement.style.pointerEvents = "none";
  document.body.appendChild(labelRenderer.domElement);

  gameWindow.appendChild(renderer.domElement);

  function draw() {
    objects.update();

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
  }

  function onMouseUp(event) {
    camera.onMouseUp(event);
  }

  function onMouseMove(event) {
    camera.onMouseMove(event);
  }

  function onSwitchCamera(event) {
    camera.onSwitchCamera(event);
  }

  function getCamera() {
    return camera.camera;
  }

  function turnOnCamera() {
    camera.onCam();
    scene.background = new THREE.Color(0xf5deb3);

    const ambientLight = new THREE.DirectionalLight(0xffffff, 1); // Soft white light
    ambientLight.position.set(0, 1, 0);
    const ambientLight2 = new THREE.DirectionalLight(0xffffff, 1); // Soft white light
    ambientLight2.position.set(1, 0, 0);
    const ambientLight3 = new THREE.DirectionalLight(0xffffff, 1); // Soft white light
    ambientLight3.position.set(0, 0, 1);
    scene.add(ambientLight);
    scene.add(ambientLight2);
    scene.add(ambientLight3);
  }
  return {
    start,
    stop,
    onMouseDown,
    onMouseUp,
    onMouseMove,
    onSwitchCamera,
    getCamera,
    turnOnCamera,
  };
}
