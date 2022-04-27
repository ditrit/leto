<template>
	<div id="gjs"></div>
</template>

<script>
import { onMounted } from "vue";
import grapesjs from "grapesjs";
import "ckeditor4";
import "ckeditor4-vue";
import "grapesjs-plugin-ckeditor";
import "grapesjs-preset-webpage";
import "grapesjs/dist/css/grapes.min.css";
import "grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.css";

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
				storageManager: true,
				showOffsets: 1,
				panels: { defaults: [] },
				plugins: ["gjs-plugin-ckeditor", "gjs-preset-webpage"],
				pluginsOpts: {
					"gjs-plugin-ckeditor": {
						language: "en",
						toolbar: [
							{ name: "styles", items: ["Font", "FontSize"] },
							["Bold", "Italic", "Underline", "Strike"],
							{ name: "paragraph", items: ["NumberedList", "BulletedList"] },
							{ name: "links", items: ["Link", "Unlink"] },
							{ name: "colors", items: ["TextColor", "BGColor"] },
						],
					},
					"gjs-preset-webpage": {},
				},
			});

			console.log("editor: ", editor);

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
</style>
