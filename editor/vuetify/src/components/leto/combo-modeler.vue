<template>
  <v-card>
    <v-card-title></v-card-title>
    <v-card-text>
      <v-row>

        <div class="flex xs12">
          <v-tabs center v-model="tabValue" style="width: 100%; min-width: 250px;">
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
          </v-tabs>
        </div>
      </v-row>
      <v-row>
        <v-tabs-items v-model="tabValue">
          <v-tab-item key="text">
            <v-card flat>
              <v-btn @click="clickHandler">++++</v-btn> {{cubeCount}}
              <editor></editor>
            </v-card>
          </v-tab-item>
          <v-tab-item key="3d">
            <v-card flat>
              <three-dee v-if="tabValue == 1" ref="thd" :key="GraphKey" :cube-count="cubeCount"></three-dee>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>

import ThreeDee from "./ThreeDee";
import Editor from "./Editor";
export default {
  name: "combo-modeler",
  components: {ThreeDee, Editor},
  data() {
    return {
      tabValue: 0,
      cubeCount: 0,
      GraphKey: Math.random().toString()
    }
  },
  methods: {
    clickHandler() {
      console.log('this.$refs', this.$refs)
      this.cubeCount++
    }
  },
  watch: {
    tabValue() {
      this.GraphKey = Math.random().toString()
    }
  }
}
</script>

<style scoped>

</style>
