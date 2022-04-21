<template>
	<q-page id="gjs"></q-page>
</template>

<script>
import { onMounted } from "vue";
import grapesjs from "grapesjs";
import tipTap from "@tiptap/core";
import tipTapStarter from "@tiptap/starter-kit";
import "grapesjs/dist/css/grapes.min.css";
import "grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.css";
import "grapesjs-preset-webpage";
console.log("tipTap: ", tipTap);

export default {
	name: "Grapes",
	setup() {
		onMounted(() => {
			const editor = grapesjs.init({
				container: "#gjs",
				fromElement: true,
				width: "1100px",
				storageManager: { autoload: 0 },
				showOffsets: 1,
				panels: { defaults: [] },
				plugins: ["gjs-preset-webpage", "@tiptap/core", "@tiptap/starter-kit"],
				pluginsOpts: { "gjs-preset-webpage": {} },
			});
			console.log("editor: ", editor.editor.attributes.RichTextEditor);

			return editor;
		});

		return { tipTap, tipTapStarter };
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
