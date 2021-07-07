<template>
  <div class="q-pa-md" style="max-width: 350px">
    <q-list bordered>
      <q-expansion-item
        group="somegroup"
        icon="dns"
        label="Serveurs"
        default-opened
        header-class="text-primary"
      >
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="folder" />
          </q-item-section>

          <q-item-section>Serveur de fichier</q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="print" />
          </q-item-section>

          <q-item-section>Serveur d'impression</q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="apps" />
          </q-item-section>

          <q-item-section>Serveur d'application</q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="dns" />
          </q-item-section>

          <q-item-section>Serveur DNS</q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="mail" />
          </q-item-section>
          <q-item-section>Serveur de messagerie</q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="web" />
          </q-item-section>
          <q-item-section>Serveur web</q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="storage" />
          </q-item-section>
          <q-item-section>Serveur de base de données</q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="dvr" />
          </q-item-section>
          <q-item-section>Serveur virtuel</q-item-section>
        </q-item>
      </q-expansion-item>

      <q-separator />

      <q-expansion-item
        group="somegroup"
        icon="router"
        label="Routeur"
        header-class="text-teal"
      >
        <q-list>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon color="primary" name="folder" />
            </q-item-section>
            <q-item-section>Item 1</q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon color="primary" name="folder" />
            </q-item-section>
            <q-item-section>Item 2</q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon color="primary" name="folder" />
            </q-item-section>
            <q-item-section>Item 3</q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>

      <q-separator />

      <q-expansion-item
        group="somegroup"
        icon="storage"
        label="Stockage"
        header-class="text-purple"
      >
        <q-list>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon color="primary" name="folder" />
            </q-item-section>
            <q-item-section>Item 1</q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon color="primary" name="folder" />
            </q-item-section>
            <q-item-section>Item 2</q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon color="primary" name="folder" />
            </q-item-section>
            <q-item-section>Item 3</q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>
    </q-list>
  </div>
</template>
<script>
export default {};
</script>
<style scoped lang="sass"></style>
