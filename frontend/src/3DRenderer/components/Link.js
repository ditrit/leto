import {QuadraticBezierCurve3, BufferGeometry, Line, LineBasicMaterial, TubeGeometry, MeshBasicMaterial, Mesh, LineCurve} from 'three'

class Link {
	constructor(item1, item2, path=[]) {
		this.startItem = item1
		this.endItem = item2

	}
	update() {
		this.path.needsUpdate = true
	//	this.path.v1 = this.startItem.threeObj.position
		//this.path.v2 = this.endItem.threeObj.position
		//this.threeObj.needsUpdate = true
		this.threeObj.geometry.dispose()
		this.threeObj.geometry = new TubeGeometry(this.path, 20, 0.05, 8, true );
		//const material = new MeshBasicMaterial( { color: 0x0000ff } );
		//this.threeObj = new Mesh(geometry, material)
	}

	generateComponent() {
		const points = [
			this.startItem.threeObj.position,
			this.endItem.threeObj.position
		]
		/*const material = new LineBasicMaterial( { color: 0x0000ff, linewidth: 10 } );
		const geometry = new BufferGeometry().setFromPoints(points)
		const line = new Line(geometry, material)*/
		this.path = new LineCurve(this.startItem.threeObj.position, this.endItem.threeObj.position)
		const geometry = new TubeGeometry(this.path, 20, 0.05, 8, true );
		const material = new MeshBasicMaterial( { color: 0x0000ff } );
		const line = new Mesh(geometry, material)

		/*const curve = new THREE.QuadraticBezierCurve3(
			this.startItem.threeObj.position,
			new THREE.Vector3( 20, 15, 0 ),
			this.endItem.threeObj.position
		);*/


		return line
	}

	create3DObject() {
		this.threeObj = this.generateComponent()
	}
}

export {Link}
