<template>
	<div>
		<section id="gjs">
			<h1>Hello World Component!</h1>
		</section>
		<section id="blocks"></section>
		<div class="panel__top">
			<div class="panel__basic-actions"></div>
		</div>
	</div>
</template>

<script>
import { onMounted } from "vue";
import "grapesjs/dist/css/grapes.min.css";
import grapesjs from "grapesjs";
import "ckeditor4";
import "grapesjs-plugin-ckeditor";
console.log("CKEDITOR: ", CKEDITOR);

export default {
	name: "Grapes",
	components: {},

	setup() {
		onMounted(() => {
			const editor = grapesjs.init({
				container: "#gjs",
				fromElement: true,
				allowScripts: 1,
				width: "1100px",
				storageManager: false,
				showOffsets: 1,
				panels: { defaults: [] },
				plugins: ["grapesjs-plugin-ckeditor"],
				pluginsOpts: {
					"grapesjs-plugin-ckeditor": {
						toolbar: [
							{ name: "styles", items: ["Font", "FontSize"] },
							["Bold", "Italic", "Underline", "Strike"],
							{ name: "paragraph", items: ["NumberedList", "BulletedList"] },
							{ name: "links", items: ["Link", "Unlink"] },
							{ name: "colors", items: ["TextColor", "BGColor"] },
						],
						position: "center",
					},
				},

				blockManager: {
					appendTo: "#blocks",
					blocks: [
						{
							id: "section",
							label: "<b>Section</b>",
							attributes: { class: "gjs-block-section" },
							content: `<section>
          <h1>This is a simple title</h1>
          <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
        </section>`,
						},
						{
							id: "text",
							label: "Text",
							content: '<div data-gjs-type="text">Insert your text here</div>',
						},
						{
							id: "image",
							label: "Image",
							select: true,
							content: { type: "image" },
							activate: true,
						},
					],
				},
			});

			console.log("editor: ", editor);
		});

		return {};
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

.gjs-block
  width: auto
  height: auto
  min-height: auto

.panel__top
  padding: 0
  width: 100%
  display: flex
  position: initial
  justify-content: center
  justify-content: space-between

.panel__basic-actions
  position: initial
</style>
