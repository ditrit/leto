<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar class="justify-between">
        <div class="row">
          <q-toolbar-title class="q-pa-md">Leto App</q-toolbar-title>
          <q-tabs
            no-caps
            active-color="white"
            indicator-color="transparent"
            class="text-white"
            v-model="tab"
          >
            <q-route-tab
              v-for="item in essentialTablinks"
              :key="item.id"
              :name="item.name"
              :label="item.label"
              :to="item.link"
              exact
            />
          </q-tabs>
        </div>
        <q-item clickable v-ripple>
          <q-item-section>
            <q-avatar round size="30px">
              <img src="https://cdn.quasar.dev/img/avatar.png" />
              <q-badge floating rounded color="teal">1</q-badge>
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>Nom</q-item-label>
          </q-item-section>
        </q-item>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above side="left" bordered :width="70" class="centered">
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
const essentialTablinks = [
  {
    id: 1,
    name: "modal",
    label: "Model",
    link: "/tool-one/model",
  },
  {
    id: 2,
    name: "source",
    label: "Source",
    link: "/tool-one/source",
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
const profil = [
  {
    id: 1,
    firstName: "Bs",
    lastName: "Sr",
    notification: 2,
    image: "https://avatars.githubusercontent.com/u/7687826?s=60&v=4",
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
      essentialTablinks,
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
  box-sizing: border-box
  overflow-x: hidden
  background: #b0bec5
</style>
