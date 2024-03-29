import {
	BoxBufferGeometry,
	Mesh,
	BoxGeometry,
	MeshBasicMaterial,
	Sprite,
	SpriteMaterial,
	CanvasTexture,
	ShaderMaterial,
	MeshStandardMaterial,
	Group,
	ImageLoader,
	Color,
} from "three";
import { Grid } from "src/3DRenderer/systems/Grid";
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";

class Item {
	constructor(params) {
		this.height = 0.4;
		//this.width = 1
		//this.depth = 1
		this.baseColor = params.color;
		delete params.color;
		Object.assign(this, params);
		this.links = [];

		this.grid = new Grid(
			/*this.items.filter(i => i.parentId === item.id)*/ [],
			this,
			true
		);
		this.grid.gridSpacing = 1;
		this.img = null;
		this.sideCanvas = document.createElement("canvas");
		this.topCanvas = document.createElement("canvas");

		const loader = new ImageLoader();
		loader.load(this.logo, (image) => {
			this.img = image;
			this.updateTexture();
		});
	}

	get color() {
		if (this.nature === "service") return new Color("#2cab4c");
		if (this.nature === "concrete") return new Color("#dedede");
		if (this.nature === "abstract") return new Color("#ffffff");

		return new Color(this.baseColor);
	}
	get colorHex() {
		return `#${this.color.getHexString()}`;
	}

	get width() {
		return this.grid.width;
	}
	get depth() {
		return this.grid.depth;
	}
	updateCanvas() {
		const width = 0.99 * this.width * 1500;
		/*const cellWidth = (this.grid.baseWidth + this.grid.gridSpacing) * 500;
		const cellDepth = cellWidth / 3;*/
		const height =  width / 3;
		//this.topCanvas.width = cellWidth;
		//this.topCanvas.height = this.topCanvas.width / 3;
		this.topCanvas.width = width;
		this.topCanvas.height = height;
		/*this.sideCanvas.width = width;
		this.sideCanvas.height = height;*/
		console.log("item color", this.color, this.colorHex);
		console.log("item name", this.name);

		// use the image, e.g. draw part of it on a sideCanvas
		//let ctx = this.sideCanvas.getContext("2d");

		// Background

		// Label Type
		/*ctx.font = '70pt Calibri';
		ctx.textAlign = 'left';
		ctx.fillStyle = '#FFFFFF';
		ctx.fillText(this.type, (height)+10, height/6, width-(height/3)-120);
		// Label Name
		ctx.font = '90pt Calibri';
		ctx.textAlign = 'center';
		ctx.fillText(this.name, width/2, height/2, width-20);*/
		// TagColor
		/*ctx.beginPath();
		ctx.rect(width-100, 0, 100, 100);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath()*/



		const tctx = this.topCanvas.getContext("2d");

		// Background

		/*tctx.beginPath();
		tctx.rect(0, 0, width, height);
		tctx.fillStyle = this.colorHex;
		tctx.fill();
		tctx.closePath();*/

		//tctx.shadowOffsetX = 5;
		//tctx.shadowOffsetY = 5;
		//tctx.shadowBlur = 2;
		//tctx.shadowColor = "rgba(0, 0, 0, 0.5)";
		/*tctx.beginPath()
		tctx.rect(0, 0, cellWidth, depth);
		tctx.fillStyle = "rgba(0, 0, 0, .1)";
		tctx.stroke()
		tctx.fillStyle = "rgba(0, 0, 0, .05)";

		tctx.fill();
		tctx.closePath()*/
		/*tctx.beginPath();
		tctx.rect(0, 0, width - 2, height - 2);
		tctx.fillStyle = this.colorHex;
		tctx.fill();
		tctx.closePath();*/
		const imageHeight = Math.min(width / 4, 0.75 * height)
		const imageWidth = width / 4
		const tOrigin = {
			x: width / 4,
			y: 0,
		};

		tctx.textAlign = "left";
		tctx.fillStyle = "#000000";
		tctx.font = "bold 550px Helvetica";
		tctx.fillText(this.type, 30,  1.30 * imageHeight);
		//tctx.font = '90pt Calibri';
		tctx.font = "550px Helvetica";
		tctx.fillText(this.name, imageWidth + 60, height / 3, (2 * width) / 3);

		if (this.img) {
			//	ctx.drawImage(this.img, 0,0, height, height);
			tctx.drawImage(this.img, 6, 5, imageWidth, imageHeight);
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
		texture.anisotropy = this.anisotropy;

		return texture;
	}
	generateMaterial() {
		//const material = [
		//new MeshStandardMaterial({ color: this.color/*map: this.sideTexture*//*color: this.color*/ }),	// Right side
		//	new MeshStandardMaterial({ color: this.color/*map: this.sideTexture*//*color: this.color*/ }),	// Left side
		//	new MeshStandardMaterial({color: this.color/*map: this.sideTexture*/}),	// Top side
		//	new MeshStandardMaterial({color: this.color/*map: this.sideTexture */}),	// Bottom side
		//	new MeshStandardMaterial({color: this.color/*map: this.sideTexture*/}),	// Front side
		//	new MeshStandardMaterial({color: this.color/*map: this.sideTexture*/})	// Back side
		//	];*/

		const vertexShader = `
    varying vec2 vUv;
    void main()	{
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `;
		console.log("item color", this.color, this.color.toArray());
		const fragmentShader = `
		//#extension GL_OES_standard_derivatives : enable
		precision mediump float;
    varying vec2 vUv;
    uniform float thickness;
    uniform vec3 uColor;

    float edgeFactor(vec2 p){
    	vec2 grid = abs(fract(p - 0.5) - 0.5) / fwidth(p) / thickness;
  		return min(min(grid.x, grid.y), 1.0);
    }

    void main() {

      float a = edgeFactor(vUv);

      vec3 c = mix( vec3(0),uColor,  a);

      gl_FragColor = vec4(c, 1.0);
    }
  `;
		const material = new ShaderMaterial({
			uniforms: {
				uColor: { type: "c", value: this.color },
				thickness: {
					value: 1.5,
				},
			},
			vertexShader: vertexShader,
			fragmentShader: fragmentShader,
		});
		return material;
	}
	generateComponent(material) {
		//const finalObject = new Group()
		const newComponent = new Mesh(
			new BoxGeometry(this.width, this.height, this.depth),
			material
		);

		//finalObject.add(newComponent)

		//return finalObject
		return newComponent;
	}
	isParentOfUUID(uuid) {
		if (this.threeObj.uuid === uuid) return true;
		return this.grid.items.reduce((a, i) => a || i.isParentOfUUID(uuid), false);
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
		this.threeObj.geometry.dispose();
		this.threeObj.geometry = new BoxGeometry(
			this.width,
			this.height,
			this.depth
		);
		this.updateTexture();

		//this.grid.updatePlacement()
		/*const newObj = await this.create3DItem()
		Object.assign(newObj.position, previousPosition)
		this.threeObj.clear()
		this.threeObj.removeFromParent()
		this.threeObj = newObj
		scene.add(this.threeObj)*/
	}
	update(newData) {
		Object.assign(this, newData);
		console.log("sideCanvas updated");
		if (this.isSelected) {
			//this.threeObj.material.forEach(m =>m.emissive.setHex( 0xff0000 ))
			//	this.sprite.material.emissive.setHex( 0xff0000 )
		} else {
			//this.threeObj.material.forEach(m =>m.emissive.setHex( 0x000000 ))
			//this.sprite.material.emissive.setHex( 0x000000 )
		}
		this.updateTexture();
		//this.threeObj.material
	}
	updateTexture() {
		this.updateCanvas();
		this.sideTexture.needsUpdate = true;
		this.topTexture.needsUpdate = true;
	}
	createInfoCard() {
		const element = document.createElement("div");
		element.className = "element";
		element.style.backgroundColor =
			"rgba(0,127,127," + (Math.random() * 0.5 + 0.25) + ")";
		this.infoCard = new CSS3DObject(element);
		this.infoCard.position.x = 0;
		this.infoCard.position.y = 0;
		this.infoCard.position.z = 0;
		return this.infoCard;
	}
	createSprite() {
		const material = new SpriteMaterial({ map: this.topTexture });
		return new Sprite(material);
	}
	updateSpritePosition() {
		this.sprite.position.y = this.threeObj.position.y + this.grid.baseWidth / 3;
		this.sprite.position.z = this.threeObj.position.z - this.depth / 2 +  1.01 * (this.grid.baseWidth / 3 / 2);
		this.sprite.position.x = this.threeObj.position.x
		this.sprite.scale.set(this.grid.width, this.grid.baseWidth / 3, 1);
	}
	async create3DItem(renderer) {
		this.anisotropy = renderer.getMaxAnisotropy();
		this.updateCanvas();
		this.sideTexture = this.generateTexture(this.sideCanvas);
		this.topTexture = this.generateTexture(this.topCanvas);
		const material = this.generateMaterial();
		this.sprite = this.createSprite();

		this.threeObj = this.generateComponent(material);
		this.threeObj.castShadow = true;
		this.threeObj.recieveShadow = true;

		this.updateSpritePosition();

		return this.threeObj;
	}
}

export { Item };
