<template>
	<q-drawer
		v-model="drawer"
		@hide="makeMenuVisible"
		show-if-above
		@click.capture="drawerClick"
		:width="300"
		:breakpoint="500"
		bordered
		elevated
		class="bg-grey-3"
	>
		<slot name="drawerFilter"></slot>

		<slot name="drawerMenu"></slot>
	</q-drawer>
</template>
<script>
import { ref, computed } from "vue";

export default {
	components: {},
	props: {
		modelValue: {
			type: Boolean,
		},
		drawerManuData: {
			type: Array,
		},
	},
	setup(props, { emit }) {
		const filter = ref("");
		const filterRef = ref(null);
		return {
			drawer: computed({
				get: () => props.modelValue,
				set: (value) => emit("update:modelValue", value),
			}),
			filter,
			filterRef,
			resetFilter() {
				filter.value = "";
				filterRef.value.focus();
			},
		};
	},
};
</script>
<style lang="sass" scoped>

.hiddenMenu
	transform: translateX(278px)

.visibleMenu
	transform: translateX(-22px)

.q-tree__node-header-content
	font-weight: bold
	text-transform: capitalize !important

.q-tree__node .q-tree__children .q-tree__node-header-content
	color: var(--gray)
	font-weight: 400
</style>
