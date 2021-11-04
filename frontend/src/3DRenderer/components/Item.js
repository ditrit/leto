import {BoxBufferGeometry, Mesh,BoxGeometry, MeshBasicMaterial, CanvasTexture, MeshStandardMaterial, Group, ImageLoader} from "three";
import {Grid} from "src/3DRenderer/systems/Grid";
import {CSS3DObject} from 'three/examples/jsm/renderers/CSS3DRenderer'

class Item {
	constructor(params) {
		this.height = 1
		//this.width = 1
		//this.depth = 1
		Object.assign(this, params)
		this.links = []
		this.grid = new Grid(/*this.items.filter(i => i.parentId === item.id)*/ [], this, true)
		this.grid.gridSpacing = 1
		this.img = null
		this.sideCanvas = document.createElement('canvas');
		this.topCanvas = document.createElement('canvas');

		const loader = new ImageLoader()
		loader.load(this.logo, (image) => {
			this.img = image
			this.updateTexture()
		})




	}
	get width() {
		return this.grid.width
	}
	get depth() {
		return this.grid.depth
	}
	updateCanvas() {
		const width = this.width * 500;
		const cellWidth = this.grid.cellWidth * 500
		const cellDepth = this.grid.cellDepth * 500
		const height = this.height * 500;
		const depth = this.depth * 500
		this.topCanvas.width = width
		this.topCanvas.height = depth
		this.sideCanvas.width  = width;
		this.sideCanvas.height = height;
		console.log('item color', this.color)
		console.log('item name', this.name)





		// use the image, e.g. draw part of it on a sideCanvas
		let ctx = this.sideCanvas.getContext("2d");

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
		ctx.fillText(this.type, (height)+10, height/6, width-(height/3)-120);
		// Label Name
		ctx.font = '90pt Calibri';
		ctx.textAlign = 'center';
		ctx.fillText(this.name, width/2, height/2, width-20);
		// TagColor
		/*ctx.beginPath();
		ctx.rect(width-100, 0, 100, 100);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath()*/



		const tOrigin = {
			x: (this.width - (this.grid.cellWidth + this.grid.gridSpacing / 2)) * 500,
			y: 0
		}

		const tctx = this.topCanvas.getContext('2d')

		// Background
		tctx.beginPath();
		tctx.rect(0, 0, width, depth);
		tctx.fillStyle = this.color;
		tctx.fill();
		tctx.closePath();

		tctx.font = '70pt Calibri';
		tctx.textAlign = 'left';
		tctx.fillStyle = '#FFFFFF';
		tctx.fillText(`type: ${this.type}`, (height)+10, 10, this.grid.cellWidth * 500);
		tctx.font = '90pt Calibri';
		tctx.fillText(`name: ${this.name}`, (height)+10, depth, this.grid.cellWidth * 500);




		if (this.img) {
			ctx.drawImage(this.img, 0,0, height, height);
			tctx.drawImage(this.img, 0,0, height, height);
		}










		/*return new Promise((resolve) => {
			if (!this.logo) return resolve()
			const img = new Image();
			img.src = this.logo
			img.addEventListener('load', function() {
				ctx.drawImage(img, 0, 0, height, height);
				console.log('img loaded')
				resolve()
			}, false);
		})*/

	}
	generateTexture(canvas) {

		const texture = new CanvasTexture(canvas);

		return texture

	}
	generateMaterial() {
		const material = [
			new MeshStandardMaterial({  /*map: this.sideTexture*/color: this.color }),	// Right side
			new MeshStandardMaterial({  /*map: this.sideTexture*/color: this.color }),	// Left side
			new MeshStandardMaterial({ /*color: this.color*/map: this.topTexture }),	// Top side
			new MeshStandardMaterial({ color: this.color }),	// Bottom side
			new MeshStandardMaterial({ map: this.sideTexture}),	// Front side
			new MeshStandardMaterial({ map: this.sideTexture})	// Back side
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
		this.updateTexture()

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
		console.log('sideCanvas updated')
		if (this.isSelected) {
			this.threeObj.material.forEach(m =>m.emissive.setHex( 0xff0000 ))
		} else {
			this.threeObj.material.forEach(m =>m.emissive.setHex( 0x000000 ))
		}
		this.updateTexture()
		//this.threeObj.material
	}
	updateTexture() {
		this.updateCanvas()
		this.sideTexture.needsUpdate = true
		this.topTexture.needsUpdate = true
	}
	createInfoCard() {
		const element = document.createElement( 'div' );
		element.className = 'element';
		element.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';
		this.infoCard = new CSS3DObject(element)
		this.infoCard.position.x = 0
		this.infoCard.position.y = 0
		this.infoCard.position.z = 0
		return this.infoCard
	}
	async create3DItem() {
		this.updateCanvas()
		this.sideTexture = this.generateTexture(this.sideCanvas)
		this.topTexture = this.generateTexture(this.topCanvas)
		const material = this.generateMaterial();

		this.threeObj =  this.generateComponent(material)
		return this.threeObj

	}
}

export {Item}
