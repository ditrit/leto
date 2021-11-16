<template>
  <q-item clickable v-ripple>
    <q-item-section>
      <q-avatar round size="30px">
        <img :src="image" />
        <q-badge floating rounded color="teal">{{ notification }}</q-badge>
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ firstName }} {{ lasttName }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Profil",
  props: {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      default: "",
    },
    notification: {
      type: Number,
      required: false,
    },

    image: {
      type: String,
      default: "https://avatars.githubusercontent.com/u/7687826?s=60&v=4",
    },
  },
});
</script>

<style></style>
