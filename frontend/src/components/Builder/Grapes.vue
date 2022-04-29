<template>
	<div>
		<section id="gjs"></section>
		<section id="block"></section>
	</div>
</template>

<script>
import { ref, onMounted } from "vue";
import grapesjs from "grapesjs";
import "ckeditor4";
import ritchTextEditor from "grapesjs-plugin-ckeditor";
import blocks from "grapesjs-blocks-basic";
import "grapesjs/dist/css/grapes.min.css";

export default {
	name: "Grapes",
	components: {},

	setup() {
		const editor = ref(null);
		const initGrapes = () => {
			editor.value = grapesjs.init({
				container: "#gjs",
				fromElement: true,
				allowScripts: 1,
				width: "1100px",
				storageManager: false,
				showOffsets: 1,
				plugins: [blocks],
				pluginsOpts: { blocks: {} },
			});
			editor.value.BlockManager.add("#block", {
				content: {
					tagName: "div",
					draggable: true,
					attributes: { class: "block_1" },
					components: [
						{
							tagName: "span",
							content: "<b>Some static content</b>",
						},
						{
							tagName: "div",
							components: "<span>HTML at some point</span>",
						},
					],
				},
			});
		};
		onMounted(() => {
			initGrapes();
			console.log("editor: ", editor.value);
			console.log("ckeditor4: ", CKEDITOR);
		});

		return { editor, initGrapes };
	},
};
</script>

<style lang="sass">
#gjs



.gjs-dashed body
  background: #e0e0e0 !important

.gjs-editor-cont
  margin: 45px 0 45px 45px
</style>
