<template>
  <q-container class="text-white">
    <div class="row">
      <div class="leftside text-secondary">
        <h1>Leto</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo
        </p>
      </div>
      <div class="rigthside">
        <Login />
      </div>
    </div>
  </q-container>
</template>
<script>
import Login from "../components/Login/Login.vue";
export default { components: { Login } };
</script>

<style lang="sass">
.leftside
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center

  height: 100vh
  width: 50%
.rigthside
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  background: white
  height: 100vh
  width: 50%
</style>
