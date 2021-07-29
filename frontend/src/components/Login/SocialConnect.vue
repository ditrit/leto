<template>
  <div class="github_login">
    <q-separator width="320px" class="q-mt-lg" />
    <span class="bg-white q-pa-md text-bold text-primary leto_mt"> Or </span>
    <p>With Github</p>
    <q-icon
      name="facebook"
      size="60px"
      class="cursor-pointer"
      @click.prevent="socialLogin"
    />
  </div>
</template>

<script>
export default {};
</script>

<style lang="sass">
.leto_mt
  display: block
  margin-top: -28px
  position: relative
  width: fit-content
</style>
