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
      style="margin-top: -17px"
    >
      <q-tab name="model" label="Model" />
      <q-tab name="source" label="Source" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab">
      <q-tab-panel name="model">
        <div class="text-h6">Model</div>
      </q-tab-panel>

      <q-tab-panel name="source">
        <div class="row">
          <div class="sidebar" elevated>
            <q-btn
              flat
              dense
              round
              icon="menu"
              aria-label="Menu"
              @click="toggleLeftDrawer"
            />
            <q-drawer
              :width="200"
              v-model="leftDrawerOpen"
              show-if-above
              bordered
              class="bg-grey-1"
            >
              Sidebar
            </q-drawer>
          </div>
          <div class="viewer">Viewuer</div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>
<script>
import { ref } from "vue";

export default {
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
  height: 100vh
.viewer
</style>
