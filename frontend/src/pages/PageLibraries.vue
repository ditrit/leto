<template>
  <q-layout class="bg-grey">
    <q-page padding class="flex flex-center bg-gray">
      <h2>The Tool Three Viewer</h2>
      <div class="q-mt-lg">
        <ul class="row">
          <li v-for="(person, key) in getPeople" :key="key">
            {{ person.name }}
            <div>
              <div>{{ person.age }}</div>
              <div>{{ person.job }}</div>
              <div>{{ person.option }}</div>
              <button @click="deleteOption(key)">Delete Option</button>
              <button
                @click="
                  updateAge({
                    id: key,
                    updates: { age: parseInt(person.age) + 1 },
                  })
                "
              >
                update Age
              </button>
            </div>
          </li>
        </ul>
      </div>
    </q-page>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";

export default defineComponent({
  name: "PageLibraries",
  computed: {
    ...mapGetters("test", ["getPeople"]),
  },
  methods: {
    ...mapActions("test", ["updateAge", "deleteOption"]),
  },
});
</script>
