<template>
  <div class="q-mt-md" style="max-width: 350px">
    <div class="q-gutter-md">
      <!-- <div>
        <q-badge color="teal">Model: "{{ search }}"</q-badge>
      </div> -->

      <q-input
        v-model="getSearch"
        debounce="500"
        placeholder="Search"
        class="search_input q-mb-lg"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";

export default {
  props: {
    searchList: {
      type: Array,
    },
  },
  // setup() {
  //   return {
  //     search: ref(""),
  //   };
  // },
  data() {
    search: "";
  },
  mounted() {
    console.log(this.searchList);
  },
  // computed: {
  //   getSearch() {
  //     return searchList.filter((item) => {
  //       return item.caption.toLowerCase().includes(this.search.toLowerCase());
  //     });
  //   },
  // },
};
</script>

<style lang="sass" scoped>
.search_input
    background: #eeeeee
    padding: 0 40px 0 20px
    width: 100%
</style>
