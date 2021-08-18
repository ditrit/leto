<template>
  <div class="text-white">
    <div class="row">
      <div class="leftside text-secondary">
         <q-img
          src="../assets/logoBest.svg"
          
          width="30%"
        />
        <span> Orchestrateur TOSTA étendu </span>
      </div>
      <div class="rigthside">
        <Login />
      </div>
    </div>
  </div>
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
