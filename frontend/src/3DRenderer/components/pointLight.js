import {PointLight, DirectionalLight} from "three";

function createPointLight() {
	const pointLight = new DirectionalLight( 0xffffff, 1 )
	//const pointLight = new PointLight(0xFFFFFF, 0.3, 1000);
	pointLight.position.set(100, 100, 100);
	pointLight.castShadow = true
	pointLight.shadow.mapSize.width = 512; // default
	pointLight.shadow.mapSize.height = 512; // default
	pointLight.shadow.camera.near = 0.5; // default
	pointLight.shadow.camera.far = 500; // defaul
	return pointLight
}

export {createPointLight}
