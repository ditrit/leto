import {AmbientLight} from "three";

function createAmbientLight() {
	const ambientLight = new AmbientLight(0xFFFFFF, 0.4)


	return ambientLight
}

export {createAmbientLight}
