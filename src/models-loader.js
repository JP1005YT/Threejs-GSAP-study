import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function ModelsLoader(scene ,modelName , material) {
    const loader = new GLTFLoader();

    return new Promise((resolve, reject) => {
        loader.load(`models/${modelName}.glb`, function (gltf) {
            gltf.scene.traverse(function (child) {
                if (child.isMesh) {
                    if(material){
                        child.material = material;
                    }
                }
            });

            const object = gltf.scene;
            scene.add(object);

            resolve(object);
        }, undefined, undefined, reject);
    });
}