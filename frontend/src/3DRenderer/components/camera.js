import { PerspectiveCamera } from 'three';

function createCamera(fov= 35, aspect =	1,near =	0.1, far =	100) {
	const camera = new PerspectiveCamera(fov, aspect, near, far	);

	camera.position.set(0, 0, 10);

	return camera;
}

export { createCamera };
