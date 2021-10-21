import {DragControls} from "three/examples/jsm/controls/DragControls";
import {EventEmitter} from "events";


class DragController extends EventEmitter {
	constructor(items, camera, renderer, cameraController) {
		super()
		this.items = items
		this.camera = camera
		this.renderer = renderer
		this.cameraController = cameraController
		this.updateControls()
	}
	get threeItems() {
		return this.items.map(i => i.threeObj)
	}
	updateControls() {
		if (this.dragControls)
			this.dragControls.dispose()
		this.dragControls = new DragControls(this.threeItems, this.camera, this.renderer.domElement)
		this.dragControls.addEventListener('dragstart', (event) => this.onDragStart(event))
		this.dragControls.addEventListener('drag', (event) => this.onDrag(event))
		this.dragControls.addEventListener('dragend', (event) => this.onDragEnd(event))

		console.log('dragControls',this.dragControls, this.dragControls.getObjects())

	}
	onDragStart(event) {
		this.cameraController.orbitControls.enabled = false
this.startPosition = JSON.parse(JSON.stringify(event.object.position))
		console.log('dragStart', event)

	}
	onDrag(event) {
		console.log('dragEvent', event)
		const origItem = this.items.find(c => c.threeObj.uuid === event.object.uuid)
		origItem.threeObj.position.x = event.object.position.x
		origItem.threeObj.position.z = event.object.position.z
		//event.object.parent.position.x = origItem.threeObj.position.x
		//event.object.parent.position.z = origItem.threeObj.position.z
		origItem.threeObj.position.y = origItem.basePosition.y
		event.object.position.y = origItem.basePosition.y
		origItem.grid.updatePlacement()
	}
	onDragEnd(event) {
		this.cameraController.orbitControls.enabled = true
		console.log('dragEnd', event)
		console.log('thisItems', this.items)
		const origItem = this.items.find(c => c.threeObj.uuid === event.object.uuid)
		origItem.threeObj.position.x = event.object.position.x
		origItem.threeObj.position.z = event.object.position.z
	//	event.object.parent.position.x = origItem.threeObj.position.x
	//	event.object.parent.position.z = origItem.threeObj.position.z
		origItem.threeObj.position.y = origItem.basePosition.y
		event.object.position.y = origItem.basePosition.y
		origItem.grid.updatePlacement()
		this.emit('item:dragged', origItem)
		console.log('draggedItem', origItem)
	}
}

export {DragController}
