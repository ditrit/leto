<template>
  <q-layout container class="global">
    <q-toolbar>
      <div class="row">
        <q-btn
          flat
          @click="drawer = !drawer"
          round
          dense
          icon="menu"
          :class="drawer ? 'menuStyle hiddenMenu' : ' menuStyle visibleMenu'"
        />
      </div>
    </q-toolbar>
    <q-drawer
      v-model="drawer"
      @hide="makeMenuVisible"
      show-if-above
      @click.capture="drawerClick"
      :width="250"
      :breakpoint="500"
      bordered
      class="bg-grey-3"
    >
      <q-list v-for="item in sidebarItems" :key="item.id">
        <q-expansion-item
          group="somegroup"
          :icon="item.icon"
          :label="item.caption"
          default-opened
          header-class="text-primary"
          style="font-weight: 600"
        >
          <q-item
            v-for="child in item.children"
            :key="child.id"
            clickable
            v-ripple
          >
            <q-item-section avatar class="q-pl-md">
              <q-icon color="grey" :name="child.icon" size="16px" />
            </q-item-section>
            <q-item-section style="color: grey">{{
              child.caption
            }}</q-item-section>
          </q-item>
        </q-expansion-item>
        <q-sepaartor />
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-page class="q-px-lg q-py-md">
        <h1>the Source viewer</h1>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";

const sidebarItems = [
  {
    id: 1,
    caption: "Servers",
    icon: "dns",
    children: [
      { id: 1, caption: "Serveur de fichier", icon: "folder" },
      { id: 2, caption: "Serveur d’impression", icon: "print" },
      { id: 3, caption: "Serveur d’application", icon: "apps" },
    ],
  },
  {
    id: 2,
    itle: "",
    caption: "Routers",
    icon: "router",
    children: [
      { id: 1, caption: "Element one", icon: "router" },
      { id: 2, caption: "Element two", icon: "router" },
      { id: 3, caption: "Element three", icon: "router" },
    ],
  },
  {
    id: 3,
    caption: "Database",
    icon: "storage",
    children: [
      { id: 1, caption: "Element one", icon: "storage" },
      { id: 2, caption: "Element two", icon: "storage" },
      { id: 3, caption: "Element three", icon: "storage" },
    ],
  },
  {
    id: 4,
    caption: "Network",
    icon: "wifi",
    children: [
      { id: 1, caption: "Element one", icon: "wifi" },
      { id: 2, caption: "Element two", icon: "wifi" },
      { id: 3, caption: "Element three", icon: "wifi" },
    ],
  },
];

export default {
  setup() {
    return {
      drawer: ref(false),
      sidebarItems,
    };
  },
};
</script>

<style lang="sass" scoped>
.global
  width: 100%
  height: 100%
  overflow: hidden
  min-height: 1200px
.menuStyle
  background: #eeeeee
  border-radius: 0
  margin-top: -16px
.hiddenMenu
  transform: translateX(238px)
.visibleMenu
  transform: translateX(-14px)
</style>
