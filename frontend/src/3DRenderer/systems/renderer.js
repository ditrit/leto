import { WebGLRenderer, PCFSoftShadowMap } from 'three';
import {CSS3DRenderer} from "three/examples/jsm/renderers/CSS3DRenderer";

function createRenderer() {
	const renderer = new WebGLRenderer({
		antialias: true
	});
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = PCFSoftShadowMap;

	return renderer;
}

export { createRenderer };
