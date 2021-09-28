import {BoxBufferGeometry, Mesh, MeshBasicMaterial} from "three";

class Item {
	constructor(params) {
		Object.assign(this, params)
	}
	create3DItem() {
		// create a geometry
		const geometry = new BoxBufferGeometry(2, 2, 2);

		// create a default (white) Basic material
		const material = new MeshBasicMaterial();

		// create a Mesh containing the geometry and material
		const cube = new Mesh(geometry, material);

		return cube;
	}
}

export {Item}
