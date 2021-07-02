<template>
  <q-layout view="hhh lpR fff">
    <q-header>
      <q-toolbar class="justify-between">
        <div class="row">
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

    <q-drawer
      :width="300"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-1"
    >
      <div class="row full_height">
        <q-list bordered class="width_19">
          <q-item-label header class="text-grey-8"> </q-item-label>
          <EssentialTools
            v-for="link in EssentialToolss"
            :key="link.title"
            v-bind="link"
          />
        </q-list>
        <div padding class="viewer_navigation">
          <q-item-label header class="text-grey-8">
            Menu de l'outil
          </q-item-label>
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

.width_19
  width: 19%
</style>
