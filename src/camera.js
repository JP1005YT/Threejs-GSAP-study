import * as THREE from 'three';

export function createCamera(gameWindow){
    const DEG2RAD = Math.PI / 180;
    const LEFT_MOUSE_BUTTON = 0;
    const MIDDLE_MOUSE_BUTTON = 1;
    const RIGHT_MOUSE_BUTTON = 2;

    const MIN_CAMERA_RADIUS = 0;
    const MAX_CAMERA_RADIUS = 100;
    const MIN_CAMERA_ELEVATION = 1;
    const MAX_CAMERA_ELEVATION = 360;
    const ROTATION_SENSITIVITY = 0.5;
    const ZOOM_SENSITIVITY = 0.02;
    const PAN_SENSITIVITY = -0.01;

    const Y_AXIS = new THREE.Vector3(0,1,0);

    const camera = new THREE.PerspectiveCamera( 75, gameWindow.offsetWidth / gameWindow.offsetHeight, 0.1, 1000 );
    let cameraOrigin = new THREE.Vector3();
    let cameraRadius = 4;
    let cameraAzimuth = 0;
    let cameraElevation = 0;
    let isLeftMouseDown = false;
    let isRightMouseDown = false;
    let isMiddleMouseDown = false;
    let preMouseX = 0;
    let preMouseY = 0;
    let camON = false;
    updateCameraPosition();

    function onMouseDown(event){
        if(event.button === LEFT_MOUSE_BUTTON){
            isLeftMouseDown = true;
        }
        if(event.button === RIGHT_MOUSE_BUTTON){
            isRightMouseDown = true;
        }
        if(event.button === MIDDLE_MOUSE_BUTTON){
            isMiddleMouseDown = true;
        }
    }

    function onMouseUp(event){
        if(event.button === LEFT_MOUSE_BUTTON){
            isLeftMouseDown = false;
        }
        if(event.button === RIGHT_MOUSE_BUTTON){
            isRightMouseDown = false;
        }
        if(event.button === MIDDLE_MOUSE_BUTTON){
            isMiddleMouseDown = false;
        }
    }

    function onMouseMove(event){


        const deltaX = (event.clientX - preMouseX);
        const deltaY = (event.clientY - preMouseY);

        if(camON){
            // Rotação da câmera
            if(isLeftMouseDown){
                cameraAzimuth += (deltaX * ROTATION_SENSITIVITY);
                cameraElevation += (deltaY * ROTATION_SENSITIVITY);
                cameraElevation = Math.min(MAX_CAMERA_ELEVATION, Math.max(MIN_CAMERA_ELEVATION, cameraElevation));
                updateCameraPosition();
            }

            // Zoom da camera
            if(isRightMouseDown){
                cameraRadius += (deltaY * ZOOM_SENSITIVITY);
                cameraRadius = Math.min(MAX_CAMERA_RADIUS, Math.max(MIN_CAMERA_RADIUS, cameraRadius));
                updateCameraPosition();
            }

            // Translação da câmera
            if(isMiddleMouseDown){
                const forward = new THREE.Vector3(0,0,1).applyAxisAngle(Y_AXIS, cameraAzimuth * DEG2RAD);
                const left = new THREE.Vector3(1,0,0).applyAxisAngle(Y_AXIS, cameraAzimuth * DEG2RAD);
                cameraOrigin.add(forward.multiplyScalar(PAN_SENSITIVITY * deltaY));
                cameraOrigin.add(left.multiplyScalar(PAN_SENSITIVITY * deltaX));
                updateCameraPosition();
            }
        }

        preMouseX = event.clientX;
        preMouseY = event.clientY;
    }

    function onSwitchCamera(event){
        let {posX,posY,posZ, lookX, lookY , lookZ} = event
        camera.position.x = posX
        camera.position.y = posY
        camera.position.z = posZ
        cameraRadius = 10;
        cameraAzimuth = 0;

        camera.lookAt(new THREE.Vector3(lookX,lookY,lookZ))
    }

    function updateCameraPosition(){
        camera.position.x = cameraRadius * Math.sin(cameraAzimuth * DEG2RAD) * Math.sin(cameraElevation * DEG2RAD);
        camera.position.y = cameraRadius * Math.cos(cameraElevation * DEG2RAD);
        camera.position.z = cameraRadius * Math.cos(cameraAzimuth * DEG2RAD) * Math.sin(cameraElevation * DEG2RAD);
        camera.position.add(cameraOrigin);

        // console.log(camera)
        camera.lookAt(cameraOrigin);
        camera.updateMatrix();
    }

    function onCam(){
        camON = true
    }

    return {
        camera,
        onMouseDown,
        onMouseUp,
        onMouseMove,
        onSwitchCamera,
        onCam
    }
}