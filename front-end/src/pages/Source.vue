<template>
  <q-layout container class="global bg-dark">
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
          :id="item.attr"
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
      <q-page class="editorWrapper">
        <Monaco />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, computed } from "vue";
import axios from "axios";
import Monaco from "../components/Monaco/Monaco.vue";

export default {
  components: { Monaco },
  setup() {
    const search = ref("");
    const sourceSidebar = ref([]);
    const error = ref(null);
    const filterdSidebarItem = computed(function () {
      return sourceSidebar.value.filter((item) =>
        item.caption.includes(search.value)
      );
    });

    const getSourceSidebarItem = async () => {
      try {
        let response = await axios.get("http://localhost:3000/sourceSideBar");
        let data = response.data;
        sourceSidebar.value = data;
        console.log(sourceSidebar.value);
        // if (!response.ok) {
        //   throw Error("There is an issues with the data");
        // }
      } catch (err) {
        error.value = err.message;
        console.log(error.value);
      }
    };
    getSourceSidebarItem();
    return {
      drawer: ref(false),
      search,
      sourceSidebar,

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
.editorWrapper
  max-width: 1400px
  width: 1400px
  height: 1190px
  margin-top: 0px
.menuStyle
  background: #eeeeee
  border-radius: 0
  margin-top: -16px
.hiddenMenu
  transform: translateX(238px)
.visibleMenu
  transform: translateX(-14px)
</style>
