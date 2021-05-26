<template>
  <v-app id="inspire">
    <v-navigation-drawer
        v-model="drawer"
        app
        class="pt-4"
        color="grey lighten-3"
    >
      <v-list>
        <v-list-item :to="{name: 'Modeler'}">
          <v-list-item-title>Modeleur</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-avatar
          v-for="n in 6"
          :key="n"
          :color="`grey ${n === 1 ? 'darken' : 'lighten'}-1`"
          :size="n === 1 ? 36 : 20"
          class="d-block text-center mx-auto mb-9"
      ></v-avatar>
    </v-navigation-drawer>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    drawer: true
    //
  }),
};
</script>
