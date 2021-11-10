import {QuadraticBezierCurve3, BufferGeometry, Line, LineBasicMaterial, TubeGeometry, MeshBasicMaterial, Mesh, LineCurve, Group, Vector3} from 'three'

class Link {
	constructor(item1, item2 ) {
		this.startItem = item1
		this.endItem = item2
		this.paths = []
		this.updatePoints()


	}
	update() {
		//this.path.needsUpdate = true
		//	this.path.v1 = this.startItem.threeObj.position
		//this.path.v2 = this.endItem.threeObj.position
		//this.threeObj.needsUpdate = true
		this.updatePoints()
		console.log('linkOBJ', this.threeObj)
		for (let pi in this.paths) {
			const path = this.paths[pi]
			path.needsUpdate = true
			//this.threeObj.dispose()
			//this.create3DObject()
			this.threeObj.children[pi].geometry.dispose()
			this.threeObj.children[pi].geometry = new TubeGeometry(path, 128, 0.05, 8, false );

		}
		//const material = new MeshBasicMaterial( { color: 0x0000ff } );
		//this.threeObj = new Mesh(geometry, material)
	}
	updatePoints() {
		//const angle = this.startItem.threeObj.position.angleTo(this.endItem.threeObj.position)
		let xAdjust=0, zAdjust=0
		if (this.startItem.threeObj.position.x >= this.endItem.threeObj.position.x)
			xAdjust = -1
		else if (this.startItem.threeObj.position.x < this.endItem.threeObj.position.x)
			xAdjust = 1

		if (this.startItem.threeObj.position.z >= this.endItem.threeObj.position.z)
			zAdjust = -1
		else if (this.startItem.threeObj.position.z < this.endItem.threeObj.position.z)
			zAdjust = 1

		if (!this.points) {
			this.points = [this.startItem.threeObj.position,
				new Vector3(
					this.startItem.threeObj.position.x + (this.startItem.width * xAdjust),
					Math.max(this.startItem.threeObj.position.y, this.endItem.threeObj.position.y) + (this.startItem.height * (this.startItem.threeObj.position.y !== this.endItem.threeObj.position.y)),
					this.startItem.threeObj.position.z  + (this.startItem.depth * zAdjust)),
				this.endItem.threeObj.position]
		} else {
			this.points[1].x = this.startItem.threeObj.position.x + (this.startItem.width * xAdjust)
			this.points[1].y = Math.max(this.startItem.threeObj.position.y, this.endItem.threeObj.position.y) + (this.startItem.height * (this.startItem.threeObj.position.y !== this.endItem.threeObj.position.y))
			this.points[1].z = this.startItem.threeObj.position.z + (this.startItem.depth * zAdjust)
		}

	}

	generateComponent() {
		/*const material = new LineBasicMaterial( { color: 0x0000ff, linewidth: 10 } );
const geometry = new BufferGeometry().setFromPoints(points)
const line = new Line(geometry, material)*/
		const group = new Group()
		for (let i = 1; i < this.points.length-1; ++i) {
			//const path = new LineCurve(this.points[i - 1], this.points[i])
			const path = new QuadraticBezierCurve3(this.points[i-1], this.points[i], this.points[i+1])
			this.paths.push(path)
			const geometry = new TubeGeometry(path, 128, 0.05, 8, false );
			const material = new MeshBasicMaterial( { color: 0x0000ff } );
			const line = new Mesh(geometry, material)
			group.add(line)

		}

		/*const curve = new THREE.QuadraticBezierCurve3(
			this.startItem.threeObj.position,
			new THREE.Vector3( 20, 15, 0 ),
			this.endItem.threeObj.position
		);*/


		return group
	}

	create3DObject() {
		this.threeObj = this.generateComponent()
	}
}

export {Link}
