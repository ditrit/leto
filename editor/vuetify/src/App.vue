<template>
  <v-app id="inspire">
    <v-app-bar app dense :clipped-left="$vuetify.breakpoint.lgAndUp">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-row
          align="center"
          style="max-width: 650px"
      >
        <v-text-field
            :append-icon-cb="() => {}"
            placeholder="Search..."
            single-line
            append-icon="mdi-magnify"
            color="white"
            hide-details
        ></v-text-field>
      </v-row>

      <div style="padding-top: 20px; margin-left: 20px">
        <v-switch label="Mode Sombre" v-model="dark"></v-switch>
      </div>
    </v-app-bar>
    <v-navigation-drawer
        v-model="drawer"
        app
        class="pt-4"
        :clipped="$vuetify.breakpoint.lgAndUp"
    >
      <v-list>
        <v-list-item :to="{name: 'Modeler'}">
          <v-list-item-title>Modeleur</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-avatar
          v-for="n in 6"
          :key="n"
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

  data(){
    return {
      drawer: true,
      dark: this.$vuetify.theme.dark || false
      //
    }},
  watch: {
    dark(newVal) {
      this.$vuetify.theme.dark = newVal
    }
  },
};
</script>
