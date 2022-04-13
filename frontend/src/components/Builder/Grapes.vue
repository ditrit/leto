<template>
	<q-page-container>
		<div id="gjs">
			<h4>Grapes Component!</h4>
		</div>
	</q-page-container>
</template>

<script>
import grapesjs from "grapesjs";
export default {
	setup() {
		console.log("grapesjs: ", grapesjs);
		const editor = grapesjs.init({
			// Indicate where to init the editor. You can also pass an HTMLElement
			container: "#gjs",
			// Get the content for the canvas directly from the element
			// As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
			fromElement: true,
			// Size of the editor
			height: "300px",
			width: "auto",
			// Disable the storage manager for the moment
			storageManager: false,
			// Avoid any default panel
			panels: { defaults: [] },
		});

		return { editor };
	},
};
</script>

<style lang="sass">
#gjs
   border: 3px solid #444

.gjs-cv-canvas
  top: 0
  width: 100%
  height: 100%
</style>
