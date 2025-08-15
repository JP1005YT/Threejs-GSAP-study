import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

export class ObjectPreset{

    objects = {}

    addLight(posX, posY, posZ, name = null){
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.shadow.mapSize.width = 1048;
        light.shadow.mapSize.height = 1048;
        light.position.set(posX, posY, posZ);
        if(name){
            this.objects[name] = light;
        }else{
            this.objects.light = light;
        }
        return light;
    }

    addSphere(posX, posY, posZ, radius, material, name = null){
        const geometry = new THREE.SphereGeometry(radius, 32, 32);
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(posX, posY, posZ);
        this.objects[name || 'sphere'] = sphere;
        return sphere;
    }

    addCube(posX, posY, posZ, size, material, name = null){
        const geometry = new THREE.BoxGeometry(size, size, size);
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(posX, posY, posZ);
        this.objects[name || 'cube'] = cube;
        return cube;
    }

    addPlane(posX, posY, posZ, width, height, material, name = null , rotationObj = null){
        const geometry = new THREE.PlaneGeometry(width, height);
        if(rotationObj){
            geometry.rotateX(rotationObj.x);
            geometry.rotateY(rotationObj.y);
            geometry.rotateZ(rotationObj.z);
        }else{
            geometry.rotateX(-Math.PI / 2);
        }
        const plane = new THREE.Mesh(geometry, material);
        plane.position.set(posX, posY, posZ);
        this.objects[name || 'plane'] = plane;
        return plane;
    }

    addRetangle(posX, posY, posZ, width, height, material, name = null){
        const geometry = new THREE.PlaneGeometry(width, height);
        const plane = new THREE.Mesh(geometry, material);
        plane.position.set(posX, posY, posZ);
        this.objects[name || 'plane'] = plane;
        return plane;
    }
    addText(text){
        const labelDiv = document.createElement('div');
        labelDiv.className = 'label';
        labelDiv.textContent = text;
        labelDiv.style.color = 'black';
        labelDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        labelDiv.style.padding = '5px 10px';
        labelDiv.style.borderRadius = '5px';
        labelDiv.style.fontFamily = 'Arial';
        labelDiv.style.fontSize = '14px';

        // Criar o objeto 2D do texto
        const label = new CSS2DObject(labelDiv);
        label.position.set(0, 0.5, 1); // Posição do texto acima do modelo
        this.objects.label = label;
        return label;
    }
}