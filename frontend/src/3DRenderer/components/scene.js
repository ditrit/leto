import { Color, Scene, AmbientLight, PointLight } from 'three';

function createScene() {
	const scene = new Scene();

	scene.background = new Color("#eeeeee");

	return scene;
}

export { createScene };
