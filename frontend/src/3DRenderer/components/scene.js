import { Color, Scene, AmbientLight, PointLight } from 'three';

function createScene() {
	const scene = new Scene();

	scene.background = new Color(0xefefef);

	return scene;
}

export { createScene };
