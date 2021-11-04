import {PointLight} from "three";

function createPointLight() {
	const pointLight = new PointLight(0xFFFFFF, 0.3, 1000);
	pointLight.position.set(0, 10, 10);
	return pointLight
}

export {createPointLight}
