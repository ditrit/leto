<template>
  <div>
    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="model" label="Model" />
      <q-tab name="source" label="Source" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab">
      <q-tab-panel name="model">
        <div class="text-h6">Model</div>
        3D modeling Viewer
      </q-tab-panel>

      <q-tab-panel name="source">
        <div class="text-h6">Source</div>
        Text editor Viewer
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>
<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      tab: ref("model"),
    };
  },
};
</script>
<style scoped lang="sass"></style>
