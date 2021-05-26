<template>
  <div id="container" style="height: 80vh"></div>
</template>

<script>
let camera = null,
  scene = null,
  renderer = null
  const meshs = []
import * as THREE from 'three'
export default {
  name: "ThreeDee",
  props: {
    cubeCount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      localCubeCount: this.cubeCount

    }
  },
  methods: {
    init: function() {
      const container = document.getElementById('container');

      camera = new THREE.PerspectiveCamera(70, container.clientWidth/container.clientHeight, 0.01, 10);
      camera.position.z = 1;

      scene = new THREE.Scene();
      while (this.localCubeCount){

        const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        const material = new THREE.MeshNormalMaterial();

        meshs.push(new THREE.Mesh(geometry, material));
        --this.localCubeCount
      }
      for (const mesh of meshs) {
        scene.add(mesh);
      }

      renderer = new THREE.WebGLRenderer({antialias: true});
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);

    },
    addCube() {
      const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
      const material = new THREE.MeshNormalMaterial();
      const cube = new THREE.Mesh(geometry, material)
      scene.add(cube)
    },
    animate: function() {
      requestAnimationFrame(this.animate);
      for (const mesh of meshs) {
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.02;
      }
      renderer.render(scene, camera);
    }
  },
  mounted() {
    this.init();
    this.animate();
  }
}
</script>
<style scoped>

</style>
