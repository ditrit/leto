<template>
	<q-drawer
		v-model="isOpened"
		bordered
		:width="250"
		:breakpoint="500"
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
