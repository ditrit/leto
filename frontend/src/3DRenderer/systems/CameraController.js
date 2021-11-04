import {MOUSE, Vector3} from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

class CameraController {
	constructor(camera, domElement) {
		const orbitControls = new OrbitControls(camera, domElement)
		orbitControls.mouseButtons = {
			LEFT: MOUSE.ROTATE,
			MIDDLE: MOUSE.DOLLY,
			RIGHT: MOUSE.PAN
		}
		orbitControls.keys = {
			LEFT: 'ArrowLeft', //left arrow
			UP: 'ArrowUp', // up arrow
			RIGHT: 'ArrowRight', // right arrow
			BOTTOM: 'ArrowDown' // down arrow
		}
		//orbitControls.enablePan = false;
		orbitControls.enableDamping = false;
		orbitControls.minDistance = 1;
		orbitControls.maxDistance = 500000;
		orbitControls.target = new Vector3(0, 1, 0);
		orbitControls.update();
		this.orbitControls = orbitControls

	}
}
export {CameraController}
