<template>
  <q-layout view="lhh">
    <q-tabs
      v-model="tab"
      dense
      class="text-gray"
      active-color="primary"
      indicator-color="primary"
      align="justify-start"
      narrow-indicator
      style="margin-top: -17px; margin-left: 0px"
    >
      <q-tab name="model" label="Model" />
      <q-tab name="source" label="Source" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" style="height: 1000px">
      <q-tab-panel name="model"> </q-tab-panel>

      <q-tab-panel name="source">
        <div class="row" style="margin-left: -15px; height: 100%">
          <div class="col-9 col-md-9 viewer">
            <h1 class="color_gray">Source Viewer</h1>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-layout>
</template>
<script>
import { ref } from "vue";

export default {
  components: {},
  setup() {
    const leftDrawerOpen = ref(false);
    return {
      tab: ref("model"),
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
};
</script>
<style scoped lang="sass">
.sidebar
  display: flex
  flex-direction: column
  border-right: 0.5px solid #EBE2E2
.viewer
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center

.color_gray
  color: #EBE2E2
</style>
