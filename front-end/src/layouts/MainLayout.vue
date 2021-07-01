<template>
  <q-layout view="hhh lpR fff">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-tabs
          no-caps
          active-color="white"
          indicator-color="transparent"
          class="text-white"
          v-model="tab"
        >
          <q-tab name="Fichier" label="Fichier" />
          <q-tab name="Edition" label="Edition" />
          <q-tab name="Selection" label="Selection" />
          <q-tab name="Affichage" label="Affichage" />
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-drawer
      :width="300"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-1"
    >
      <div class="row full_height">
        <q-list bordered class="width_18">
          <q-item-label header class="text-grey-8"> </q-item-label>
          <EssentialTools
            v-for="link in EssentialToolss"
            :key="link.title"
            v-bind="link"
          />
        </q-list>
        <div padding class="viewer_navigation">
          <q-item-label header class="text-grey-8"> Composants </q-item-label>
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialTools from "components/EssentialTools.vue";
import MainMenu from "components/MainMenu";

const linksToolsList = [
  {
    title: "",
    caption: "",
    icon: "edit",
    link: "",
  },
  {
    title: "",
    caption: "",
    icon: "download",
    link: "",
  },
  {
    title: "",
    caption: "",
    icon: "landscape",
    link: "",
  },
  {
    title: "",
    caption: "",
    icon: "settings",
    link: "",
  },
];
const mainMenuList = [
  {
    title: "Fichier",
    link: "",
  },
  {
    title: "Edition",
    link: "",
  },
  {
    title: "Selection",
    link: "",
  },
  {
    title: "Affichage",
    link: "",
  },
  {
    title: "",
    link: "",
  },
];

import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",
  components: {
    EssentialTools,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    return {
      EssentialToolss: linksToolsList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
<style scoped lang="sass">
.full_height
  height: inherit

.width_18
  width: 18%
</style>
