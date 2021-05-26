<template>
  <div class="grid row">
    <div class="flex xs12">
      <v-card class="fill-height" style="overflow-x: auto;">
        <v-card-title></v-card-title>
        <v-card-content>
          <div class="row">

            <div class="flex xs12">
              <v-tabs center v-model="tabValue" style="width: 100%; min-width: 250px;">
                <template #tabs>
                  <v-tab
                    key="text"
                  >
                    Texte
                  </v-tab>
                  <v-tab
                    key="3d"
                  >
                    3D
                  </v-tab>
                </template>
              </v-tabs>
            </div>
          </div>
          <v-row>
            <v-col cols="12" v-if="tabValue==1">
              <v-btn @click="clickHandler">++++</v-btn> {{cubeCount}}
              <editor></editor>
            </v-col>
            <v-col cols="12" v-if="tabValue==2">
              <three-dee ref="thd" :cube-count="cubeCount"></three-dee>
            </v-col>
          </v-row>
        </v-card-content>
      </v-card>

    </div>
  </div>
</template>

<script>

import ThreeDee from "./ThreeDee";
import Editor from "./Editor";
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
