import * as THREE from 'three';

import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

import { objectHandler } from './object-handler';
import { createCamera } from './camera';

export function createScene(){
  // Inicalizar cena
  const gameWindow = document.getElementById('render-target')
  const scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x000000 ); // Cor de fundo da cena

  // Inicalizar câmera
  const camera = createCamera(gameWindow);

  // Inicializar objetos
  const objects = objectHandler(scene);

  // Inicializar renderizador
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: 'high-performance',
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  
  renderer.setSize( gameWindow.offsetWidth, gameWindow.offsetHeight );

  const labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
  labelRenderer.domElement.style.position = 'absolute';
  labelRenderer.domElement.style.top = '0px';
  labelRenderer.domElement.style.pointerEvents = 'none';
  document.body.appendChild(labelRenderer.domElement);

  gameWindow.appendChild( renderer.domElement );

  function draw(){
    objects.update();

    renderer.render( scene, camera.camera );
  }

  function start(){
    renderer.setAnimationLoop( draw );
  }

  function stop(){
    renderer.setAnimationLoop( null );
  }

  function onMouseDown(event){
    camera.onMouseDown(event);
  }

  function onMouseUp(event){
    camera.onMouseUp(event);
  }

  function onMouseMove(event){
    camera.onMouseMove(event);
  }

  function onSwitchCamera(event){
    camera.onSwitchCamera(event);
  }

  function getCamera(){
    return camera.camera;
  }

  function turnOnCamera(){
    camera.onCam();
  }
  return {
    start,
    stop,
    onMouseDown,
    onMouseUp,
    onMouseMove,
    onSwitchCamera,
    getCamera,
    turnOnCamera
  }
}