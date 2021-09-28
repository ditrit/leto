import { createCamera } from './components/camera.js';
import { createCube } from './components/cube.js';
import { createScene } from './components/scene.js';

import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';


class Renderer {
	constructor(container) {
		this.camera = createCamera( 70,
			container.clientWidth / container.clientHeight,
			0.01,
			10);
		this.scene = createScene();
		this.renderer = createRenderer();
		container.append(this.renderer.domElement)

		const cube = createCube();
		this.scene.add(cube)
		const resizer = new Resizer(container, this.camera, this.renderer)
	}
	render() {
		this.renderer.render(this.scene, this.camera);
	}
}

export {Renderer}
