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
      <div class="q-mt-md" style="max-width: 350px">
        <div class="q-gutter-md">
          <q-input
            v-model="search"
            debounce="500"
            placeholder="Search"
            class="search_input q-mb-lg q-pa-md"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </div>
      <q-list v-for="item in filterdSidebarItem" :key="item.id">
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
import { ref, computed } from "vue";
import axios from "axios";
import ModelEdit from "../components/3dModals/ModelEdit.vue";

export default {
  components: { ModelEdit },
  setup() {
    const toolsSidebar = ref([]);
    const search = ref("");
    const error = ref(null);
    const filterdSidebarItem = computed(() => {
      return toolsSidebar.value.filter((item) =>
        item.caption.toLowerCase().match(search.value.toLowerCase())
      );
    });

    const getModelSidebarItem = async () => {
      try {
        let response = await axios.get("http://localhost:3000/modelSideBar");
        let data = response.data;
        toolsSidebar.value = data;
      } catch (err) {
        error.value = err.message;
        console.log(error.value);
      }
    };
    getModelSidebarItem();

    return {
      drawer: ref(false),
      toolsSidebar,
      search,
      error,
      filterdSidebarItem,
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
