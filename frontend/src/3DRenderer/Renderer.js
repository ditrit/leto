import { createCamera } from './components/camera.js';
import { createCube } from './components/cube.js';
import { createScene } from './components/scene.js';

import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import {createAmbientLight} from "src/3DRenderer/components/ambientLight";
import {Item} from "src/3DRenderer/components/Item";


class Renderer {
	constructor(container) {
		this.camera = createCamera( 70,
			container.clientWidth / container.clientHeight,
			0.01,
			10);
		this.scene = createScene();
		this.renderer = createRenderer();
		this.items = []
		container.append(this.renderer.domElement)
		const ambientLight = createAmbientLight()
		this.scene.add(ambientLight)
	//	this.addItem(new Item({}))

		//const cube = createCube();
	//	this.scene.add(cube)
		const resizer = new Resizer(container, this.camera, this.renderer)
	}
	render() {
		this.renderer.render(this.scene, this.camera);
	}
	addItem(item) {
		console.log('renderer add item', item)
		const newSceneItem = item.create3DItem()
		this.scene.add(newSceneItem)
		this.items.push(newSceneItem)

	}
}

export {Renderer}
