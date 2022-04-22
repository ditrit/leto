<template>
	<div>
		<!-- <EditorContent :editor="rte" />s -->
		<q-page id="gjs"></q-page>
	</div>
</template>

<script>
import { onMounted } from "vue";
import grapesjs from "grapesjs";
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import CKEDITOR from "grapesjs-plugin-ckeditor";
import "grapesjs/dist/css/grapes.min.css";
import "grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.css";
import "grapesjs-preset-webpage";

export default {
	name: "Grapes",
	components: {
		//EditorContent,
	},
	setup() {
		const rte = useEditor({
			content: "<p>I’m running Tiptap with Vue.js. 🎉</p>",
			extensions: [StarterKit],
		});

		onMounted(() => {
			const editor = grapesjs.init({
				container: "#gjs",
				fromElement: true,
				allowScripts: 1,
				width: "1100px",
				storageManager: { autoload: 0 },
				showOffsets: 1,
				panels: { defaults: [] },
				plugins: ["gjs-preset-webpage", "grapesjs-plugin-ckeditor"],
				pluginsOpts: { "gjs-preset-webpage": {} },
			});

			console.log("editor: ", editor);
		});

		return { rte };
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
