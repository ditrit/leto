import {BoxBufferGeometry, Mesh,BoxGeometry, MeshBasicMaterial, CanvasTexture, MeshStandardMaterial, Group} from "three";

class Item {
	constructor(params) {
		Object.assign(this, params)
		this.links = []
	}
	generateTexture() {
		const width = this.width * 500;
		const height = this.height *500;
		console.log('item color', this.color)

		const canvas = document.createElement('canvas');
		canvas.width  = width;
		canvas.height = height;
		const ctx = canvas.getContext("2d");
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
		const texture = new CanvasTexture(canvas);

		const material = [
			new MeshStandardMaterial({ map: texture }),	// Right side
			new MeshStandardMaterial({ map: texture }),	// Left side
			new MeshStandardMaterial({ color: this.color }),	// Top side
			new MeshStandardMaterial({ color: this.color }),	// Bottom side
			new MeshStandardMaterial({ map: texture }),	// Front side
			new MeshStandardMaterial({ map: texture })	// Back side
		];
		return material
		// Logo - disabled for now
		/*const img = new Image();   // Crée un nouvel élément Image
		img.addEventListener('load', function() {
			ctx.drawImage(img, 0, 0, height/3, height/3);


			if(action === 'createComponent')
				generateComponent(componentType, material);
			else if(action === 'updateTexture')
				regenerateTexture(component, material);

		}, false);
		img.src = './public/textures/logos/'+logo;*/
	}
	generateComponent(material) {

		const finalObject = new Group()
		const newComponent = new Mesh(new BoxGeometry(this.width, this.height, this.depth), material)

		finalObject.add(newComponent)

		return finalObject

	}
	create3DItem() {
		const material = this.generateTexture();
		return this.generateComponent(material)

	}
}

export {Item}
