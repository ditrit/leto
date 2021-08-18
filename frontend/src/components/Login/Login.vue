<template>
  <q-container class="text-primary full-width">
    <q-tabs
      v-model="tab"
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="center"
      narrow-indicator
    >
      <q-tab name="sign_in" label="Sign in" />
      <q-tab name="sign_up" label="Sign Up" />
    </q-tabs>
    <q-tab-panels v-model="tab" animated align="center">
      <q-tab-panel name="sign_in">
        <Form />

        <SocialConnect />
      </q-tab-panel>

      <q-tab-panel name="sign_up">
        <!-- <Form /> -->
        <SocialConnect />
      </q-tab-panel>
    </q-tab-panels>
  </q-container>
</template>

<script>
import { ref } from "vue";
import Form from "../Form/Form.vue";
import SocialConnect from "./SocialConnect.vue";
export default {
  components: { Form, SocialConnect },
  setup() {
    return {
      tab: ref("sign_in"),
      socialLogin: () => alert("Ready to connect"),
    };
  },
};
</script>

<style lang="sass">
.q-tab 
  color: grey
</style>
