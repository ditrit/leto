<template>
	<div>
		<!-- <EditorContent :editor="rte" />s -->
		<q-page id="gjs"></q-page>
	</div>
</template>

<script>
import grapesjs from "grapesjs";
import webpage from "grapesjs-preset-webpage";
import "grapesjs/dist/css/grapes.min.css";
import "grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.css";
import CKEDITOR from "grapesjs-plugin-ckeditor";

export default {
	name: "Grapes",
	components: {},
	mounted() {
		const editor = grapesjs.init({
			container: "#gjs",
			fromElement: true,
			allowScripts: 1,
			width: "1100px",
			storageManager: { autoload: 0 },
			showOffsets: 1,
			panels: { defaults: [] },
			plugins: [CKEDITOR, webpage],
			pluginsOpts: {
				"gjs-preset-webpage": {},
				CKEDITOR: {},
			},
		});
		console.log("editor: ", editor);
		console.log("CKEDITOR: ", CKEDITOR);
	},
};
</script>

<style lang="sass">
#gjs
   border: 2px solid $primary

.gjs-editor-cont
  margin: 45px 0 45px 45px

.gjs-cv-canvas
  top: 0
  width: 100%
  height: 100%
</style>
