import {DragControls} from "three/examples/jsm/controls/DragControls";
import {EventEmitter} from "events";
import {Raycaster, Vector3} from "three";

class DragController extends EventEmitter {
	constructor(parentRendrer) {
		super()
		this.items = parentRendrer.items
		this.camera = parentRendrer.camera
		this.renderer = parentRendrer.renderer
		this.cameraController = parentRendrer.cameraController
		this.parentRenderer = parentRendrer
		this.raycaster = new Raycaster()
		this.downVector = new Vector3(0, -1, 0)
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
		this.startTime = Date.now()
		console.log('dragStart', event)

	}

	//Cast multiple rays to check if the origin item is overlapping with something
	findDownwardsIntersections(origin, items) {
		let positions = [
			{x:origin.threeObj.position.x, z: origin.threeObj.position.z},
			//cast from object midpoints
			{x:origin.threeObj.position.x - origin.width / 4, z: origin.threeObj.position.z - origin.depth / 4},
			{x:origin.threeObj.position.x + origin.width / 4, z: origin.threeObj.position.z - origin.depth / 4},
			{x:origin.threeObj.position.x - origin.width / 4, z: origin.threeObj.position.z + origin.depth / 4},
			{x:origin.threeObj.position.x + origin.width / 4, z: origin.threeObj.position.z + origin.depth / 4},
			//cast from object edges
			{x:origin.threeObj.position.x - origin.width / 2, z: origin.threeObj.position.z - origin.depth / 2},
			{x:origin.threeObj.position.x + origin.width / 2, z: origin.threeObj.position.z - origin.depth / 2},
			{x:origin.threeObj.position.x - origin.width / 2, z: origin.threeObj.position.z + origin.depth / 2},
			{x:origin.threeObj.position.x + origin.width / 2, z: origin.threeObj.position.z + origin.depth / 2},

		]
		for (let position of positions) {
			this.raycaster.set(new Vector3(position.x, 1000, position.z), this.downVector)
			const downwardsIntersects = this.raycaster.intersectObjects(items)
			if (downwardsIntersects.length > 0) return downwardsIntersects
		}
		return []
	}
	onDrag(event) {
		console.log('dragEvent', event)
		if (Date.now() - this.startTime < 200) return
		const origItem = this.items.find(c => c.threeObj.uuid === event.object.uuid)
		origItem.threeObj.position.x = event.object.position.x
		origItem.threeObj.position.z = event.object.position.z
		const downwardsIntersects = this.findDownwardsIntersections(origItem, this.threeItems.filter(i => !origItem.isParentOfUUID(i.uuid) ))
		console.log('down intersects', downwardsIntersects)
		if (downwardsIntersects.length > 0) {
			const minDistance = Math.min(...downwardsIntersects.map(d => d.distance))
			const objectToStackOnto = downwardsIntersects.find(d => d.distance === minDistance)
			origItem.threeObj.position.y = objectToStackOnto.object.position.y + origItem.height
		} else {
			origItem.threeObj.position.y = 0
			//event.object.position.y = origItem
		}
		/*origItem.threeObj.position.y = origItem.basePosition.y
		event.object.position.y = origItem.basePosition.y*/
		this.parentRenderer.needsLinkUpdate = true
		origItem.grid.updatePlacement()
	}
	onDragEnd(event) {
		const endTime = Date.now()
		this.cameraController.orbitControls.enabled = true
		if (endTime - this.startTime < 200) return

		console.log('dragEnd', event)
		console.log('thisItems', this.items)
		const origItem = this.items.find(c => c.threeObj.uuid === event.object.uuid)
		origItem.threeObj.position.x = event.object.position.x
		origItem.threeObj.position.z = event.object.position.z
		const downwardsIntersects = this.findDownwardsIntersections(origItem, this.threeItems.filter(i => !origItem.isParentOfUUID(i.uuid) ))
		console.log('down intersects', downwardsIntersects)
		if (downwardsIntersects.length > 0) {
			const minDistance = Math.min(...downwardsIntersects.map(d => d.distance))
			const objectToStackOnto = downwardsIntersects.find(d => d.distance === minDistance)
			origItem.threeObj.position.y = objectToStackOnto.object.position.y + origItem.height
			const parentItem = this.items.find(i => i.threeObj.uuid === objectToStackOnto.object.uuid)
			this.parentRenderer.emit('item:updateParent', {itemId:origItem.id, parentId:parentItem.id})
		} else {
			origItem.threeObj.position.y = 0
			this.parentRenderer.emit('item:updateParent', {itemId:origItem.id, parentId:null})
			//event.object.position.y = origItem
		}
	//	this.parentRenderer.grid.needsUpdate = true
	//	this.needsLinkUpdate = true
		/*this.parentRenderer.needsLinkUpdate = true
		origItem.grid.updatePlacement()
		this.emit('item:dragged', origItem)
		console.log('draggedItem', origItem)*/
	}
}

export {DragController}
