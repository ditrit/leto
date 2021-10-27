class Resizer {
	constructor(container, camera, renderer) {
		this.container = container
		this.camera = camera
		this.renderer = renderer
		this.update()
	}
	update() {
		// Set the camera's aspect ratio
		this.camera.aspect = this.container.clientWidth / this.container.clientHeight;

		this.camera.updateProjectionMatrix()

		// update the size of the renderer AND the canvas
		this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);

		// set the pixel ratio (for mobile devices)
		this.renderer.setPixelRatio(window.devicePixelRatio);
	}
}

export { Resizer };
