<template>
  <q-layout class="bg-grey">
    <q-page padding class="flex bg-gray">
      <div class="teams_content flex">
        <div class="flex">
          <q-icon name="group" size="30px" class="q-ml-md q-mr-sm" />
          <p class="text-bold text-h6">Teams</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
            natus alias expedita vitae deleniti distinctio tempora ipsam facilis
            modi laborum porro non amet totam reiciendis, rerum harum asperiores
            obcaecati ipsum?
          </p>
          <div class="teams_content__options">
            <div class="teams_button">New Team</div>
            <div class="teams_button">Add to Favorite</div>
            <div class="teams_button">Navigate</div>
          </div>
        </div>
      </div>
    </q-page>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageTeams",
  components: {},
});
</script>
<style lang="sass">
</style>
