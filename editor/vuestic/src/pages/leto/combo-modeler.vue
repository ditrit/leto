<template>
  <div class="grid row">
    <div class="flex xs12">
      <va-card class="fill-height" style="overflow-x: auto;">
        <va-card-title></va-card-title>
        <va-card-content>
          <div class="row">

            <div class="flex xs12">
              <va-tabs center v-model="tabValue" style="width: 100%; min-width: 250px;">
                <template #tabs>
                  <va-tab
                    key="text"
                  >
                    Texte
                  </va-tab>
                  <va-tab
                    key="3d"
                  >
                    3D
                  </va-tab>
                </template>
              </va-tabs>
            </div>
          </div>
          <div class="row">
            <div class="flex xs12" v-if="tabValue==1">
              <va-button @click="clickHandler">++++</va-button> {{cubeCount}}
              <editor></editor>
            </div>
            <div class="flex xs12" v-if="tabValue==2">
              <three-dee ref="thd" :cube-count="cubeCount"></three-dee>
            </div>
          </div>
        </va-card-content>
      </va-card>
    </div>
  </div>
</template>

<script>
import ThreeDee from "@/pages/leto/ThreeDee";
import Editor from "@/pages/leto/Editor";
export default {
  name: "combo-modeler",
  components: {ThreeDee, Editor},
  data() {
    return {
      tabValue: 1,
      cubeCount: 0,
    }
  },
  methods: {
    clickHandler() {
      console.log('this.$refs', this.$refs)
      this.cubeCount++
    }
  }
}
</script>

<style scoped>

</style>
