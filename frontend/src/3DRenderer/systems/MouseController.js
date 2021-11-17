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
		renderer.domElement.addEventListener('pointerdown', (event) => this.onclick(event,this), false)
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
		//console.log('intersects', intersects, mousePos)
		if (intersects.length > 0) {
			switch (event.button) {
				case 0:
					this.emit('intersect', intersects[0].object)
					break;
				case 2:
					this.emit('link', intersects[0].object)
					break;

			}
		}

	}
}

export {MouseController}
