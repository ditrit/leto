<template>
  <q-layout container class="global bg-black">
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
      <Search />
      <q-list v-for="item in sidebarItems" :key="item.id">
        <q-expansion-item
          group="somegroup"
          :icon="item.icon"
          :label="item.caption"
          :data-id="item.attr"
          default-opened
          header-class="text-primary"
          style="font-weight: 600"
        >
          <q-item
            v-for="child in item.children"
            :key="child.id"
            :data-id="child.attr"
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
      <q-page class="">
        <ModelEdit />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import Search from "../components/Forms/Search.vue";
import ModelEdit from "../components/3dModals/ModelEdit.vue";

const sidebarItems = [
  {
    id: 1,
    caption: "Servers",
    icon: "dns",
    attr: "servers",
    children: [
      { id: 1, caption: "Serveur de fichier", icon: "folder", attr: "server1" },
      {
        id: 2,
        caption: "Serveur d’impression",
        icon: "print",
        attr: "server2",
      },
      {
        id: 3,
        caption: "Serveur d’application",
        icon: "apps",
        attr: "server3",
      },
    ],
  },
  {
    id: 2,
    itle: "",
    caption: "Routers",
    icon: "router",
    attr: "routers",
    children: [
      { id: 1, caption: "Element one", icon: "router", attr: "router1" },
      { id: 2, caption: "Element two", icon: "router", attr: "router2" },
      { id: 3, caption: "Element three", icon: "router", attr: "router3" },
    ],
  },
  {
    id: 3,
    caption: "Database",
    icon: "storage",
    attr: "storages",
    children: [
      { id: 1, caption: "Element one", icon: "storage", attr: "storage1" },
      { id: 2, caption: "Element two", icon: "storage", attr: "storage2" },
      { id: 3, caption: "Element three", icon: "storage", attr: "storage3" },
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
  components: { Search, ModelEdit },
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
