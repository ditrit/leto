import { WebGLRenderer } from 'three';
import {CSS3DRenderer} from "three/examples/jsm/renderers/CSS3DRenderer";

function createRenderer() {
	const renderer = new WebGLRenderer();

	return renderer;
}

export { createRenderer };
