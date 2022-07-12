<template>
	<q-drawer
		v-model="isOpened"
		bordered
		:width="250"
		:breakpoint="1100"
		class="bg-grey-3"
	>
		<slot name="drawerContent" />
	</q-drawer>
</template>

<script>
import { ref } from "vue";
export default {
	setup() {
		return {
			isOpened: ref(true),
		};
	},
};
</script>

<style lang="sass"></style>
