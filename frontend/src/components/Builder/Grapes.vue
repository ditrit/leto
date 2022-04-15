<template>
	<q-page id="gjs"></q-page>
</template>

<script>
import { onMounted } from "vue";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import "grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.css";
import "grapesjs-preset-webpage";

export default {
	name: "Grapes",
	setup() {
		console.log("grapesjs: ", grapesjs);

		onMounted(() => {
			grapesjs.init({
				container: "#gjs",
				fromElement: true,
				height: "800px",
				width: "1000px",
				storageManager: { autoload: 0 },
				showOffsets: 1,
				panels: { defaults: [] },
				plugins: ["gjs-preset-webpage"],
				pluginsOpts: { "gjs-preset-webpage": {} },
			});
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
