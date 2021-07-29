<template>
  <q-page padding class="bg-gray">
    <tPanel />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import tPanel from "../components/TabsPanels/TPanel";

export default defineComponent({
  name: "PageToolOneViewer",
  components: { tPanel },
});
</script>
