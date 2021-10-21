<template>
    <div id="container"></div>
</template>

<script>
const Three = require("three");
import {Renderer} from 'src/3DRenderer/Renderer'
import {Item} from 'src/3DRenderer/components/Item'
import {Link} from 'src/3DRenderer/components/Link'

export default {
  name: "ThreeTest",
	props: {
  	items: Array,
		links: Array
	},
  data() {
    return {};
  },
  mounted() {
    this.init();
    this.animate();
  },



  methods: {
    init: function () {
      const container = document.getElementById("container");
      this.renderer = new Renderer(container)

			this.renderer.render()
			this.renderer.on('selected:item', (event) => {
				console.log('intersects event', event)
				this.$emit('select:item', event)
			})

      /*this.camera = new Three.PerspectiveCamera(
        70,
        container.clientWidth / container.clientHeight,
        0.01,
        10
      );
      this.camera.position.z = 1;

      this.scene = new Three.Scene();

      let geometry = new Three.BoxGeometry(0.2, 0.2, 0.2);
      let material = new Three.MeshNormalMaterial();

      this.mesh = new Three.Mesh(geometry, material);
      this.scene.add(this.mesh);

      this.renderer = new Three.WebGLRenderer({ antialias: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);*/
    },
    animate: function () {

			requestAnimationFrame(this.animate);

			this.renderer.render()


		},
  },
	watch: {
		items: {
			deep: true,
			handler() {
				if (!this.localItems)
					this.localItems = []
				for (let item of this.items) {
					const localIndex = this.localItems.findIndex(i => i.id === item.id)
					if (localIndex === -1) {
						const newItem = new Item(item)
						this.localItems.push(newItem)
						this.renderer.addItem(newItem)
					} else {
						Object.assign(this.localItems[localIndex], item)
						this.renderer.updateItem(item)
					}
				}
			}
		},
		links: {
			deep: true,
			handler() {
				if (!this.localLinks)
					this.localLinks = []
				for (let link of this.links) {
					const localIndex = this.localLinks.findIndex(i => i.id === link.id)
					if (localIndex === -1) {
						const item1 = this.localItems.find(i => i.id === link.from)
						const item2 = this.localItems.find(i => i.id === link.to)
						const newLink = new Link(item1, item2)
						this.localLinks.push(newLink)
						this.renderer.addLink(newLink)
					} else {
						Object.assign(this.localLinks[localIndex], link)
						this.renderer.updateLink(link)
					}
				}
			}
		}
	},
};
</script>

<style lang="sass" scoped>
.wrapper
  height: 70vh
  margin-top: 0px

#container
  width: 100%
  height: 80vh
</style>
