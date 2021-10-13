import { createCamera } from './components/camera.js';
import { createCube } from './components/cube.js';
import { createScene } from './components/scene.js';

import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import {createAmbientLight} from "src/3DRenderer/components/ambientLight";
import {createGridHelper} from "src/3DRenderer/components/gridHelper";
import {Grid} from "src/3DRenderer/systems/Grid";
import {EventEmitter} from 'events'

import {Item} from "src/3DRenderer/components/Item";
import {CameraController} from "src/3DRenderer/systems/CameraController";
import {MouseController} from "src/3DRenderer/systems/MouseController";


class Renderer  extends EventEmitter{
	constructor(container) {
		super()
		this.camera = createCamera( 70,
			container.clientWidth / container.clientHeight,
			0.01,
			100);
		this.scene = createScene();
		this.renderer = createRenderer();
		this.items = []
		container.append(this.renderer.domElement)
		const ambientLight = createAmbientLight()
		this.scene.add(ambientLight)
		const gridHelper = createGridHelper
		this.scene.add(gridHelper())
		//	this.addItem(new Item({}))

		//const cube = createCube();
		//	this.scene.add(cube)
		const resizer = new Resizer(container, this.camera, this.renderer)
		const cameraController = new CameraController(this.camera, this.renderer.domElement)
		const mouseController = new MouseController(this.scene, this.renderer, this.camera, this.items)
		mouseController.on('intersect', (event) => this.onClickSelect(event))
	}
	render() {
		//console.log('rendering', this.scene, this.camera)
		this.renderer.render(this.scene, this.camera);
	}
	onClickSelect(object) {
		console.log('onclickSelect', object)
		const item = this.items.find(i => i.threeObj.children.find(c => c.uuid === object.uuid))
		console.log('selectedItem', item)
		this.emit('selected:item', item)
		//item.threeObj.children.forEach(c => c.material.forEach(m =>m.emissive.setHex( 0xff0000 )))

	}
	async addItem(item) {
		console.log('renderer add item', item)
		await item.create3DItem()
		this.scene.add(item.threeObj)
		this.items.push(item)
		if (!item.parentId) {
			this.grid = new Grid(this.items)
		} else {
			const parentItem = this.items.find(i => i.id === item.parentId)
			console.log('parentItem', parentItem)
			item.threeObj.position.x = parentItem.threeObj.position.x
			item.threeObj.position.z = parentItem.threeObj.position.z
			item.threeObj.position.y = parentItem.threeObj.position.y + parentItem.height
		}
	}
	updateItem(item) {
		const rendererItem = this.items.find(i => i.id === item.id)
		if (!rendererItem)
			return this.addItem(item)
		rendererItem.update(item)
		console.log('render scene', this.scene)
	}
}

export {Renderer}
