<template>
	<div>
		<section id="gjs"></section>
	</div>
</template>

<script>
import { ref, onMounted } from "vue";
import grapesjs from "grapesjs";
import "ckeditor4";
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
					tagName: "section",
					draggable: true,
					attributes: { class: "block_1" },
					components: [
						{
							tagName: "article",
							content:
								"<h2>This is a title</h2> <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusda recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur ugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!</p>",
						},
					],
				},
			});
		};
		onMounted(() => {
			initGrapes();
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
