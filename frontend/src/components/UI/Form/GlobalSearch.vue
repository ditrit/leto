<template>
  <div class="search_bar">
    <q-input bottom-slots v-model="text" label="Search" dense>
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
  </div>
</template>

<script>
export default {};
</script>

<style lang="sass">
.search_bar
  width: 320px
</style>
