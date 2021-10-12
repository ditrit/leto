<template>
	<div>
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
			"
		>
			<slot>
				<div class="search_container">
					<q-input ref="filterRef" filled v-model="filter" label="Search">
						<template v-slot:append>
							<q-icon
								v-if="filter !== ''"
								name="clear"
								class="cursor-pointer"
								@click="resetFilter"
							/>
							<q-icon
								v-else
								name="search"
								class="cursor-pointer"
								@click="resetFilter"
							/>
						</template>
					</q-input>

					<q-tree
						:nodes="data"
						node-key="label"
						:filter="filter"
						class="node_tree q-pl-lg q-pt-md"
						default-expand-all
					/>
				</div>
			</slot>
		</q-drawer>
	</div>
</template>
<script>
import { ref } from "vue";

export default {
	props: {
		data: {
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
	z-index: 5000

.hiddenMenu
	transform: translateX(376px)

.visibleMenu
	transform: translateX(78px)

.q-tree__node-header-content
	font-weight: bold

.q-tree__node .q-tree__children .q-tree__node-header-content
	font-weight: 400
	color: var(--gray)
</style>
