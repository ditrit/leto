<template>
  <div class="q-pa-md">
    <!-- <q-toggle v-model="expanded" label="Expanded" class="q-mb-md" /> -->

    <q-expansion-item
      v-model="expanded"
      label="Model Menu"
      caption="Voir les options"
      class="bg-white text-primary shadow-1"
    >
        <q-list bordered>
             <p class="q-pa-md">Serveurs</p>
      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon color="primary" name="storage" />
        </q-item-section>

        <q-item-section>Serveur 1</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon color="primary" name="storage" />
        </q-item-section>

        <q-item-section>Serveur 2</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon color="primary" name="storage" />
        </q-item-section>

        <q-item-section>Serveur 3</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon color="primary" name="storage" />
        </q-item-section>

        <q-item-section>Serveur 4</q-item-section>
      </q-item>

      <q-separator />

      <p class="q-pa-md">Autres</p>
      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon color="primary" name="folder" />
        </q-item-section>

        <q-item-section>Element 1</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon color="primary" name="folder" />
        </q-item-section>

        <q-item-section>Element 2</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon color="primary" name="folder" />
        </q-item-section>

        <q-item-section>Element 3</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon color="primary" name="folder" />
        </q-item-section>

        <q-item-section>Element 4</q-item-section>
      </q-item>
    

    </q-list>
    </q-expansion-item>
  </div>
</template>
<script>
import { ref } from "vue";


export default {
  setup() {
    return {
      expanded: ref(false),
    };
  },
 
};
</script>
<style scoped lang="sass">
</style>
