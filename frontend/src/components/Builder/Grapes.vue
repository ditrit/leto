<template>
	<div>
		<section id="gjs">
			<h1>Leto Component!</h1>
			<q-card class="my-card">
				<q-card-section>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis
					expedita minus delectus magnam deleniti! Porro magni pariatur illum,
					amet provident quam voluptatum! Perferendis dolorum libero pariatur
					exercitationem, molestias est explicabo.
				</q-card-section>
			</q-card>
		</section>
		<section id="blocks"></section>
		<div class="panel__top">
			<div class="panel__basic-actions"></div>
		</div>
	</div>
</template>

<script>
import { ref, onMounted } from "vue";
import "grapesjs/dist/css/grapes.min.css";
import grapesjs from "grapesjs";
import "ckeditor4";
import "grapesjs-plugin-ckeditor";
import blocks from "grapesjs-blocks-basic";
import grapesForm from "grapesjs-plugin-forms";

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
				panels: { defaults: [] },
				plugins: [grapesForm, blocks, "gjs-plugin-ckeditor"],
				pluginsOpts: {
					"gjs-plugin-ckeditor": {
						toolbar: [
							{ name: "styles", items: ["Font", "FontSize"] },
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
							label: "<b>Card</b>",
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
		};
		onMounted(() => {
			initGrapes();
			console.log("CKEDITOR: ", CKEDITOR);
			console.log("editor: ", editor.value);
		});

		return { editor, initGrapes };
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
