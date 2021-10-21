import {Raycaster} from "three";
import {EventEmitter} from 'events'

class MouseController extends EventEmitter{
	constructor(scene, renderer, camera, items) {
		super()
		this.scene = scene
		this.camera = camera
		this.items = items
		this.renderer = renderer
		this.raycaster = new Raycaster()
		renderer.domElement.addEventListener('click', (event) => this.onclick(event,this), false)
	}
	onclick(event, self) {
	//	event.preventDefault()
		console.log("renderer clicked", event, this)
		const mousePos = {
			x:  (event.layerX / event.target.scrollWidth) * 2 - 1,
			y: -(event.layerY / event.target.scrollHeight) * 2 + 1
		}
		this.raycaster.setFromCamera(mousePos, this.camera)
		const intersects = this.raycaster.intersectObjects(this.items.map(i => i.threeObj), true)
		console.log('intersects', intersects, mousePos)
		if (intersects.length > 0) {
			this.emit('intersect', intersects[0].object)
		}

	}
}

export {MouseController}
