import * as THREE from 'three';
export function MeshLoader(){
    
    function TextureLoader(){
        return {
            granite : new THREE.TextureLoader().load('models/textures/granite.jpg', function (texture) {
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(50, 50);
            }),
            piso : new THREE.TextureLoader().load('models/textures/piso.jpg', function (texture) {
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(5, 5);
            })
        }
    }

    function NMapLoader(){
        return {
        }
    }


    return {
        MeshLoader,
        glass : new THREE.MeshPhysicalMaterial({
            metalness: 0.1,
            roughness: 0.1,
            envMapIntensity: 0.9,
            clearcoat: 1,
            transparent: true,
            transmission: .95,
            opacity: 1,
            reflectivity: 1,
        }),
        baseCinza : new THREE.MeshPhysicalMaterial({
            color: 0x00ff00
        }),
        ex : new THREE.MeshPhysicalMaterial({
            // map : TextureLoader().dogday,
            // normalMap : NMapLoader().dogday,
            // roughness: 0.5,          
            // metalness: 0.1
        }),
        granito : new THREE.MeshPhysicalMaterial({
            map: TextureLoader().granite,
        }),
        piso : new THREE.MeshPhysicalMaterial({
            map: TextureLoader().piso,
        }),
        wirefire : new THREE.MeshPhysicalMaterial({
            color: new THREE.Color(0xff0000),
            wireframe: true
        }),
        firetexture : new THREE.TextureLoader().load(
            "models/textures/fire.png"
        ),
        baseVerde : new THREE.MeshBasicMaterial( {
             color: 0x00ff00 
        } ),
        baseVermelho : new THREE.MeshBasicMaterial( {
             color: 0xff0000 
        } ),
        baseAzul : new THREE.MeshBasicMaterial( {
             color: 0x0000ff 
        } ),
    }
}