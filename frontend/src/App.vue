<template>
	<router-view v-slot="{ Component }">
		<transition name="fade" mode="out-in">
			<component :is="Component" />
		</transition>
	</router-view>
</template>
<script>
import { defineComponent } from "vue";
import "./store/subscriber";
import { useStore } from "vuex";
export default defineComponent({
	name: "App",
	setup() {
		const store = useStore();
		store.dispatch("auth/attempt", localStorage.getItem("token"));

		return {};
	},
});
</script>

<style lang="sass">
.fade-enter-from, .fade-leave-to
  opacity: 0

.fade-enter-active, .fade-leave-active
  transition: opacity 0.3s ease-out
</style>
