<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal elevated class="bg-primary text-white">
      <q-tabs align="left">
        <q-toolbar-title class="q-ml-md">
          <!-- <q-avatar>
            <img src="" />
          </q-avatar> -->
          Leto app
        </q-toolbar-title>

        <q-item clickable v-ripple>
          <q-item-section>
            <q-avatar round size="30px">
              <img src="https://cdn.quasar.dev/img/avatar.png" />
              <q-badge floating rounded color="teal">1</q-badge>
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>Nom Prènom</q-item-label>
          </q-item-section>
        </q-item>
      </q-tabs>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
      :width="60"
      class="centered"
    >
      <!-- drawer content -->

      <EssentialTools
        v-for="link in linksToolsList"
        :key="link.title"
        v-bind="link"
      />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

import EssentialTools from "components/EssentialTools.vue";
// import MainMenu from "components/MainMenu";
// import Accordion from "components/TabsPanels/Accordion";

const linksToolsList = [
  {
    title: "",
    caption: "tool1 ",
    icon: "edit",
    link: "#/tool-one",
  },
  {
    title: "",
    caption: "tool2",
    icon: "download",
    link: "#/tool-two",
  },
  {
    title: "",
    caption: "tool3",
    icon: "landscape",
    link: "#/tool-three",
  },
  {
    title: "",
    caption: "tool4",
    icon: "settings",
    link: "#/tool-four",
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

export default defineComponent({
  name: "MainLayout",
  components: {
    EssentialTools,
    // Accordion,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      linksToolsList,
    };
  },
});
</script>
<style lang="sass">
.full_height
  height: inherit

.width_19
  width: 19%

.centered
  display: flex
  align-items: center
  flex-direction: column
  justify-content: center
</style>
