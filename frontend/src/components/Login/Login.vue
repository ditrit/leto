<template>
  <q-page class="text-primary">
    <h1>Login form</h1>
    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="sign_in" label="Sign in" />

      <q-tab name="sign_up" label="Sign Up" />
    </q-tabs>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="sign_in">
        <div class="text-h6">Sign in</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>

      <q-tab-panel name="sign_up">
        <div class="text-h6">Sign Up</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
import {ref} from 'vue'
export default {
  setup() {
    return {
      tab: ref("sign_in"),
    };
  },
};
</script>

<style>
</style>
