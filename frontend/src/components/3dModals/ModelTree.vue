<template>
	<div>
		<div class="q-mt-md" style="max-width: 350px">
			<div class="q-gutter-md">
				<q-input
					debounce="500"
					label="Search"
					class="search_input q-mb-lg q-pa-md"
				 :model-value="search">
					<template v-slot:append>
						<q-icon name="search" />
					</template>
				</q-input>
			</div>
		</div>
		<q-tree
			:nodes="localTree"
			:node-key="nodeKey"
			:label-key="labelKey"
			v-model:selected="selectedItem"
		></q-tree>
	</div>
</template>

<script>
export default {
	name: "ModelTree",
	props: {
		items: Array,
		nodeKey: String,
		labelKey: String
	},
	data() {
		return {
			selectedItem: null,
			search: ""
		}
	},
	computed: {
		localTree() {
			const localItems = JSON.parse(JSON.stringify(this.items));
			const tree = [];
			for (let item of localItems) {
				item.icon = `img: ${item.logo}`;
				if (!item.children) item.children = [];
				if (item.derivedFrom && item.derivedFrom !== "root") {
					const parent = localItems.find((i) => i.type === item.derivedFrom);
					if (!parent.children) parent.children = [];
					parent.children.push(item);
				} else {
					tree.push(item);
				}
			}
			return tree;
		}
	},
	watch: {
		selectedItem(newVal) {
			this.$emit('item:selected', newVal)
			this.selectedItem = null
		}
	}
}
</script>

<style scoped>

</style>
