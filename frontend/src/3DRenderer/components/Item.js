import {BoxBufferGeometry, Mesh,BoxGeometry, MeshBasicMaterial, CanvasTexture, MeshStandardMaterial, Group} from "three";

class Item {
	constructor(params) {
		Object.assign(this, params)
		const width = this.width * 500;
		const height = this.height *500;
		this.links = []
		this.canvas = document.createElement('canvas');
		this.canvas.width  = width;
		this.canvas.height = height;

	}
	updateCanvas() {
		const width = this.width * 500;
		const height = this.height *500;
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
				ctx.drawImage(img, 0, 0, height/3, height/3);
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

		const finalObject = new Group()
		const newComponent = new Mesh(new BoxGeometry(this.width, this.height, this.depth), material)

		finalObject.add(newComponent)

		return finalObject

	}
	update(newData) {
		Object.assign(this, newData)
		this.updateCanvas().then(() => {
			console.log('canvas updated')
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
