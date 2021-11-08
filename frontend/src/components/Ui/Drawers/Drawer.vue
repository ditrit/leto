<template>
	<div class="menuDrawer">
		<q-toolbar>
			<div class="row">
				<q-btn
					flat
					@click="drawer = !drawer"
					round
					color="white"
					icon="menu"
					:class="
						drawer
							? 'q-pa-md bg-primary menuStyle hiddenMenu'
							: ' q-pa-md bg-primary menuStyle visibleMenu'
					"
				/>
			</div>
		</q-toolbar>
		<q-drawer
			v-model="drawer"
			@hide="makeMenuVisible"
			show-if-above
			@click.capture="drawerClick"
			:width="300"
			:breakpoint="500"
			bordered
			class="bg-grey-3"
			style="
				transform: translateX(90px);
				box-shadow: 1px 0 6px rgb(0, 0, 0, 0.5);
				z-index: 1 !important;
			"
		>
			<slot name="drawerFilter"></slot>

			<slot name="drawerMenu"></slot>
		</q-drawer>
	</div>
</template>
<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
// import MenuAccordion from "../Accordion/MenuAccordion";

export default {
	components: {},
	props: {
		drawerManuData: {
			type: Array,
		},
	},
	setup() {
		const filter = ref("");
		const filterRef = ref(null);
		return {
			drawer: ref(false),
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
<style lang="sass">

.menuStyle
	background: #eeeeee
	border-radius: 0
	z-index: 5000 !important
	position: absolute
	top: 0

.hiddenMenu
	transform: translateX(278px)

.visibleMenu
	transform: translateX(-22px)

.q-tree__node-header-content
	font-weight: bold

.q-tree__node .q-tree__children .q-tree__node-header-content
	font-weight: 400
	color: var(--gray)
</style>
