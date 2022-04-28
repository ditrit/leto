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
import "grapesjs-preset-webpage";
// import "grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.css";

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
				plugins: ["gjs-plugin-ckeditor"],
				pluginsOpts: {
					"gjs-plugin-ckeditor": {
						// language: "en",
						toolbar: [
							{ name: "styles", items: ["Font", "FontSize"] },
							["Bold", "Italic", "Underline", "Strike"],
							{ name: "paragraph", items: ["NumberedList", "BulletedList"] },
							{ name: "links", items: ["Link", "Unlink"] },
							{ name: "colors", items: ["TextColor", "BGColor"] },
						],
					},
				},

				blockManager: {
					appendTo: "#blocks",
					blocks: [
						{
							id: "section", // id is mandatory
							label: "<b>Section</b>", // You can use HTML/SVG inside labels
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
							// Select the component once it's dropped
							select: true,
							// You can pass components as a JSON instead of a simple HTML string,
							// in this case we also use a defined component type `image`
							content: { type: "image" },
							// This triggers `active` event on dropped components and the `image`
							// reacts by opening the AssetManager
							activate: true,
						},
					],
				},
			});

			console.log("editor: ", editor);
			editor.BlockManager.add("#blocks", {
				content: {
					tagName: "div",
					draggable: false,
					attributes: { "some-attribute": "some-value" },
					components: [
						{
							tagName: "span",
							content: "<b>Some static content</b>",
						},
						{
							tagName: "div",
							// use `content` for static strings, `components` string will be parsed
							// and transformed in Components
							components: "<span>HTML at some point</span>",
						},
					],
				},
			});
			editor.Panels.addPanel({
				id: "panel-top",
				el: ".panel__top",
			});
			editor.Panels.addPanel({
				id: "basic-actions",
				el: ".panel__basic-actions",
				buttons: [
					{
						id: "visibility",
						active: true, // active by default
						className: "btn-toggle-borders",
						label: "<u>B</u>",
						command: "sw-visibility", // Built-in command
					},
					{
						id: "export",
						className: "btn-open-export",
						label: "Exp",
						command: "export-template",
						context: "export-template", // For grouping context of buttons from the same panel
					},
					{
						id: "show-json",
						className: "btn-show-json",
						label: "JSON",
						context: "show-json",
						command(editor) {
							editor.Modal.setTitle("Components JSON")
								.setContent(
									`<textarea style="width:100%; height: 250px;">
            ${JSON.stringify(editor.getComponents())}
          </textarea>`
								)
								.open();
						},
					},
				],
			});

			// editor.setCustomRte({
			// 	enable: function (el, rte) {
			// 		// If already exists just focus
			// 		if (rte) {
			// 			this.focus(el, rte); // implemented later
			// 			return rte;
			// 		}

			// 		// CKEditor initialization
			// 		rte = CKEDITOR.inline(el, {
			// 			// Your configurations...
			// 			toolbar: [
			// 				{ name: "styles", items: ["Font", "FontSize"] },
			// 				["Bold", "Italic", "Underline", "Strike"],
			// 				{ name: "paragraph", items: ["NumberedList", "BulletedList"] },
			// 				{ name: "links", items: ["Link", "Unlink"] },
			// 				{ name: "colors", items: ["TextColor", "BGColor"] },
			// 			],
			// 			//sharedSpaces: {
			// 			//	top: editor.RichTextEditor.getToolbarEl(),
			// 			//}
			// 		});

			// 		this.focus(el, rte); // implemented later
			// 		return rte;
			// 	},
			// 	focus(el, rte) {
			// 		// console.log(el)
			// 		// console.log(editor.getWrapper().view)
			// 		// Do nothing if already focused
			// 		if (rte && rte.focusManager.hasFocus) {
			// 			return;
			// 		}
			// 		el.contentEditable = true;
			// 		// console.log(el)
			// 		// console.log(editor.getWrapper().view)
			// 		rte && rte.focus();
			// 	},
			// 	disable(el, rte) {
			// 		el.contentEditable = false;
			// 		if (rte && rte.focusManager) rte.focusManager.blur(true);
			// 	},
			// });
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
