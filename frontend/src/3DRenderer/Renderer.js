import { createCamera } from './components/camera.js';
import { createCube } from './components/cube.js';
import { createScene } from './components/scene.js';

import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import {createAmbientLight} from "src/3DRenderer/components/ambientLight";
import {createPointLight} from "src/3DRenderer/components/pointLight";
import {createGridHelper} from "src/3DRenderer/components/gridHelper";
import {Grid} from "src/3DRenderer/systems/Grid";
import {EventEmitter} from 'events'

import {Item} from "src/3DRenderer/components/Item";
import {CameraController} from "src/3DRenderer/systems/CameraController";
import {MouseController} from "src/3DRenderer/systems/MouseController";
import {DragController} from "src/3DRenderer/systems/DragController"


class Renderer  extends EventEmitter{
	constructor(container) {
		super()
		this.camera = createCamera( 70,
			container.clientWidth / container.clientHeight,
			0.01,
			1000);
		this.scene = createScene();
		this.renderer = createRenderer();
		this.items = []
		this.needsLinkUpdate = true
		this.links =[]
		this.sizeChart = {
			0: {width:1,depth:1}
		}
		this.itemCountChart = {}
		container.append(this.renderer.domElement)
		const ambientLight = createAmbientLight()
		this.scene.add(ambientLight)
		const pointLight = createPointLight()
		this.scene.add(pointLight)
		const gridHelper = createGridHelper
		this.scene.add(gridHelper())
		//	this.addItem(new Item({}))

		//const cube = createCube();
		//	this.scene.add(cube)

		this.grid = new Grid()
		const resizer = new Resizer(container, this.camera, this.renderer)
		this.cameraController = new CameraController(this.camera, this.renderer.domElement)
		this.dragController = new DragController(this)

		const mouseController = new MouseController(this.scene, this.renderer, this.camera, this.items)
		mouseController.on('intersect', (event) => this.onClickSelect(event))
		mouseController.on('link', (event) => this.onClickLink(event))
		window.addEventListener('resize', () => resizer.update())

	}
	updateCellSizeChart() {
		const zLevels = new Set(this.items.map(i => i.threeObj.position.y))
		console.log('zlevels', zLevels, this.items.map(i => i.threeObj.position.y))
		const maxLevel = Math.max(...zLevels) + 1
		console.log('max', maxLevel)
		this.sizeChart[maxLevel] = {
			width: 2,
			depth: 2
		}
		for (let l = maxLevel - 1; l >= -1; --l) {

			/*this.sizeChart[l] = {
				width: -l + (maxLevel + this.sizeChart[l + 1].width),
				depth: -l + (maxLevel + this.sizeChart[l + 1].depth),
			}*/

			let nbObj
			if (l === -1) {
				 nbObj =  Math.floor(Math.sqrt(this.itemCountChart[l]))
			} else {
				 nbObj =  this.itemCountChart[l]
			}
			const nbLane = nbObj
			const objWidth = this.sizeChart[l + 1].width
			const laneWidth = maxLevel - l
			const width = nbObj * objWidth + nbLane * laneWidth

			this.sizeChart[l] = {
				width: width,
				depth: laneWidth * 3,
				laneWidth: laneWidth
				//width: (Math.ceil(Math.sqrt(this.itemCountChart[l])) + 1)*(this.sizeChart[l + 1].width + 1),
				//depth: (Math.ceil(Math.sqrt(this.itemCountChart[l])) + 1)*(this.sizeChart[l + 1].depth + 1)
			}
			console.log('sizechart',l, this.sizeChart[l], this.sizeChart[l+1])
			//this.sizeChart[l].depth= Math.ceil(this.itemCountChart[l] / this.sizeChart[l].width) + 1
			//this.sizeChart[l].depth = (Math.ceil(this.sizeChart[l].width / (Math.floor(Math.sqrt(this.itemCountChart[l])) + 1)))* this.sizeChart[l + 1].depth



			//	width:(-l + (maxLevel)) * (Math.ceil(Math.sqrt(this.itemCountChart[l + 1] ? this.itemCountChart[l + 1] : 1))),
			//		depth:(-l + (maxLevel)) * ((this.itemCountChart[l + 1] ? this.itemCountChart[l + 1] : 1) / Math.ceil(Math.sqrt(this.itemCountChart[l + 1] ? this.itemCountChart[l + 1] : 1))),}
		}
		/*for (let zlevel of zLevels) {
			if (!this.sizeChart.hasOwnProperty(zlevel)) {
				this.sizeChart[zlevel] = {width:1,depth:1}
			}
			const items = this.items.filter(i => i.threeObj.position.y === zlevel)
			const maxWidth = Math.max(...items.map(i => i.grid.width))
			const maxDepth = Math.max(...items.map(i => i.grid.depth))
			this.sizeChart[zlevel].width = maxWidth//Math.max(this.sizeChart[zlevel].width, maxWidth)
			this.sizeChart[zlevel].depth = maxDepth//Math.max(this.sizeChart[zlevel].depth, maxDepth)

		}*/
	}
	async render() {
		//console.log('rendering', this.scene, this.camera)
		if (this.grid.needsUpdate) {

			console.log('updating grid positions')

			//this.grid.updatePlacement()

			this.itemCountChart = {}
			this.grid.buildItemCountChart(this.itemCountChart)
	//		this.updateCellSizeChart()
			console.log('itemcountchart', this.itemCountChart, this.sizeChart)
			this.grid.updateBlockSize(this.sizeChart, this.itemCountChart)
			this.grid.updatePlacement()

			this.items.forEach(i => i.resize())


			this.grid.needsUpdate = false
			console.log('grid new block sizes', this.grid)

		}
		if (this.needsLinkUpdate) {
			this.needsLinkUpdate = false
			this.links.forEach(l => l.update())
		}

		this.renderer.render(this.scene, this.camera);
	}
	onClickSelect(object) {
		console.log('onclickSelect', object)
		const item = this.items.find(c => c.threeObj.uuid === object.uuid)
		console.log('selectedItem', item)
		this.emit('item:selected', item)
		//item.threeObj.children.forEach(c => c.material.forEach(m =>m.emissive.setHex( 0xff0000 )))

	}
	onClickLink(object) {
		const item = this.items.find(c => c.threeObj.uuid === object.uuid)
		this.emit('item:link', item)
	}
	addLink(link) {
		link.create3DObject()
		this.scene.add(link.threeObj)
		this.links.push(link)
		this.needsLinkUpdate = false
	}

	updateLink(link) {
		const rendererLink = this.links.find(i => i.id === link.id)
		if (!rendererLink)
			return this.addLink(link)
		rendererLink.update(link)
	}
	async addItem(item) {
		console.log('renderer add item', item)

		let gridToUpdate, parentItem

		if (!item.parentId) {
			gridToUpdate = this.grid

		} else {
			parentItem = this.items.find(i => i.id === item.parentId)
			item.parentItem = parentItem
			if (!parentItem || !parentItem.threeObj) return
			gridToUpdate = parentItem.grid
			console.log('parentItem', parentItem)

			/*item.threeObj.position.x = parentItem.threeObj.position.x
			item.threeObj.position.z = parentItem.threeObj.position.z
			item.threeObj.position.y = parentItem.threeObj.position.y + parentItem.height*/
		}

		if (parentItem)
			await parentItem.resize()


		item.baseWidth = gridToUpdate.cellWidth
		item.baseDepth = gridToUpdate.cellDepth

		await item.create3DItem()
		item.createInfoCard()
		this.scene.add(item.threeObj)
		this.scene.add(item.infoCard)
		this.items.push(item)
		//this.dragController.items.push(item)
		this.dragController.updateControls()
		console.log('updated drag controls? ', this.dragController, this.dragController.dragControls.getObjects())
		gridToUpdate.placeItemOnGrid(item)
		console.log('post-update grid', gridToUpdate)
		this.grid.needsUpdate = true
		this.needsLinkUpdate = true


	}
	updateItem(item) {
		const rendererItem = this.items.find(i => i.id === item.id)
		if (!rendererItem)
			return this.addItem(item)
		if (item.parentWasUpdated) {
			this.grid.needsUpdate = true
			this.needsLinkUpdate = true
			const newParent = this.items.find(i => i.id === item.parentId)
			if (newParent) {
				newParent.grid.placeItemOnGrid(rendererItem)
			} else {
				this.grid.placeItemOnGrid(rendererItem)
			}
			item.parentWasUpdated = false
		}
		rendererItem.update(item)
		console.log('render scene', this.scene)
	}
}

export {Renderer}
