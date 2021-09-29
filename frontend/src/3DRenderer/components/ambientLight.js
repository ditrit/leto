import {AmbientLight} from "three";

function createAmbientLight() {
	const ambientLight = new AmbientLight(0xFFFFFF, 1)

	return ambientLight
}

export {createAmbientLight}
