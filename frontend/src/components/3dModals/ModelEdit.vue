<template>
  <div class="wrapper">
    <div id="container"></div>
  </div>
</template>

<script>
const Three = require("three");
import {Renderer} from 'src/3DRenderer/Renderer'
import {Item} from 'src/3DRenderer/components/Item'

export default {
  name: "ThreeTest",
	props: {
  	items: Array
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
				console.log('items updated')
				if (!this.localItems)
					this.localItems = []
				for (let item of this.items) {
					const localIndex = this.localItems.findIndex(i => i.id === item.id)
					if (localIndex === -1) {
						console.log('new item')
						const newItem = new Item(item)
						this.localItems.push(newItem)
						this.renderer.addItem(newItem)
					} else {
						console.log('update item')
						Object.assign(this.localItems[localIndex], item)
						this.renderer.updateItem(item)
					}
				}
			}
		},
	},
};
</script>

<style lang="sass" scoped>
.wrapper
  height: 70vh
  margin-top: 0px

#container
  width: 100%
  height: 100%
</style>
