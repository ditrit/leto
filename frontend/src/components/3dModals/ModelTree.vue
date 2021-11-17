<template>
	<q-tree
		:nodes="localTree"
		:node-key="nodeKey"
		:label-key="labelKey"
		v-model:selected="selectedItem"
	></q-tree>
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
			selectedItem: null
		}
	},
	computed: {
		localTree() {
			const localItems = JSON.parse(JSON.stringify(this.items));
			const tree = [];
			for (let item of localItems) {
				item.icon = `img: ${item.logo}`;
				console.log('item', item)
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
		}
	}
}
</script>

<style scoped>

</style>
