<template>
  <div class="q-mt-md" style="max-width: 350px">
    <div class="q-gutter-md">
      <!-- <div>
        <q-badge color="teal">Model: "{{ search }}"</q-badge>
      </div> -->

      <q-input
        v-model="search"
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
  setup() {
    return {
      search: ref(""),
    };
  },
};
</script>

<style lang="sass" scoped>
.search_input
    background: #eeeeee
    padding: 0 40px 0 20px
    width: 100%
</style>
