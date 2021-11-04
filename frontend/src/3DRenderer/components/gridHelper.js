import {GridHelper} from "three";

function createGridHelper() {
	const gridHelper = new GridHelper(200, 200)
	gridHelper.position.y = -0.5
	return gridHelper
}

export {createGridHelper}
