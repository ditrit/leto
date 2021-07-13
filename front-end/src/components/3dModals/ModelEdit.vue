<template>
  <div class="wrapper">
    <div id="container">
      <div class="q-pa-md" style="color: white">
        <h1>Ceci est test...</h1>
      </div>
    </div>
  </div>
</template>

<script>
const Three = require("THREE");

export default {
  name: "ThreeTest",
  data() {
    return {};
  },
  mounted() {
    this.init();
    this.animate();
  },
  methods: {
    init: function () {
      let container = document.getElementById("container");

      this.camera = new Three.PerspectiveCamera(
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
      container.appendChild(this.renderer.domElement);
    },
    animate: function () {
      requestAnimationFrame(this.animate);
      this.mesh.rotation.x += 0.01;
      this.mesh.rotation.y += 0.02;
      this.renderer.render(this.scene, this.camera);
    },
  },
};
</script>

<style lang="sass" scoped>
.wrapper
  max-width: 1400px
  height: 1190px
  margin-top: 0px

#container
    width: 100%
    height: 100%
</style>
