import { PerspectiveCamera, OrthographicCamera } from 'three';

function createCamera(width= 35, height =	1,near =	0.1, far =	3000) {
	//const camera = new PerspectiveCamera(fov, aspect, near, far	);
	const camera = new OrthographicCamera(width / -2, width / 2, height / 2, height / -2, near, far)

	camera.position.set(0, 0, 1);

	return camera;
}

export { createCamera };
