import {BoxBufferGeometry, Mesh,BoxGeometry, MeshBasicMaterial, CanvasTexture, MeshStandardMaterial, Group} from "three";
import {Grid} from "src/3DRenderer/systems/Grid";

class Item {
	constructor(params) {
		this.height = 1
		this.width = 1
		this.depth = 1
		Object.assign(this, params)
		this.links = []
		this.grid = new Grid(/*this.items.filter(i => i.parentId === item.id)*/ [], this, true)
		this.grid.gridSpacing = 1
		this.canvas = document.createElement('canvas');


	}
	updateCanvas() {
		const width = this.width * 500;
		const height = this.height *500;
		this.canvas.width  = width;
		this.canvas.height = height;
		console.log('item color', this.color)
		console.log('item name', this.name)


		const ctx = this.canvas.getContext("2d");
		// Background
		ctx.beginPath();
		ctx.rect(0, 0, width, height);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
		// Label Type
		ctx.font = '70pt Calibri';
		ctx.textAlign = 'left';
		ctx.fillStyle = '#FFFFFF';
		ctx.fillText(this.type, (height/3)+10, height/6, width-(height/3)-120);
		// Label Name
		ctx.font = '90pt Calibri';
		ctx.textAlign = 'center';
		ctx.fillText(this.name, width/2, height/2, width-20);
		// TagColor
		ctx.beginPath();
		ctx.rect(width-100, 0, 100, 100);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
		return new Promise((resolve) => {
			if (!this.logo) return resolve()
			const img = new Image();
			img.src = `textures/logos/${this.logo}`
			img.addEventListener('load', function() {
				ctx.drawImage(img, 0, 0, height, height);
				console.log('img loaded')
				resolve()
			}, false);
		})

	}
	generateTexture() {

		const texture = new CanvasTexture(this.canvas);

		return texture

	}
	generateMaterial() {
		const material = [
			new MeshStandardMaterial({ map: this.texture }),	// Right side
			new MeshStandardMaterial({ map: this.texture }),	// Left side
			new MeshStandardMaterial({ color: this.color }),	// Top side
			new MeshStandardMaterial({ color: this.color }),	// Bottom side
			new MeshStandardMaterial({ map: this.texture }),	// Front side
			new MeshStandardMaterial({ map: this.texture })	// Back side
		];
		return material
	}
	generateComponent(material) {

		//const finalObject = new Group()
		const newComponent = new Mesh(new BoxGeometry(this.width, this.height, this.depth), material)

		//finalObject.add(newComponent)

		//return finalObject
		return newComponent

	}
	isParentOfUUID(uuid) {
		if(this.threeObj.uuid === uuid) return true
		return  this.grid.items.reduce((a, i) => a || i.isParentOfUUID(uuid), false)
	}

	/*get width() {
		return this.grid.width//Math.max(this.grid.width, this.baseWidth)
	}
	get depth() {
		return this.grid.depth//Math.max(this.grid.depth, this.baseDepth)
	}*/
	async resize(newWidth = 1, newDepth = 1) {
		/*if (followGrid) {
			this.width = this.grid.width
			this.depth = this.grid.depth
		}*/
		/*this.width = newWidth
		this.depth = newDepth*/
		this.threeObj.geometry.dispose()
		this.threeObj.geometry = new BoxGeometry(this.width, this.height, this.depth)
		await this.updateCanvas()

		//this.grid.updatePlacement()
		/*const newObj = await this.create3DItem()
		Object.assign(newObj.position, previousPosition)
		this.threeObj.clear()
		this.threeObj.removeFromParent()
		this.threeObj = newObj
		scene.add(this.threeObj)*/

	}
	update(newData) {
		Object.assign(this, newData)
		this.updateCanvas().then(() => {
			console.log('canvas updated')
			if (this.isSelected) {
				this.threeObj.material.forEach(m =>m.emissive.setHex( 0xff0000 ))
			} else {
				this.threeObj.material.forEach(m =>m.emissive.setHex( 0x000000 ))
			}
			this.texture.needsUpdate = true
		})
		//this.threeObj.material
	}
	async create3DItem() {
		await this.updateCanvas()
		this.texture = this.generateTexture()
		const material = this.generateMaterial();

		this.threeObj =  this.generateComponent(material)
		return this.threeObj

	}
}

export {Item}
