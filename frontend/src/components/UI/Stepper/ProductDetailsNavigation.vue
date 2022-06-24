<template>
	<div class="q-pa-md">
		<div class="q-pa-md q-gutter-y-sm row justify-end">
			<q-btn-toggle
				class="modelization_toggle q-ml-lg"
				no-caps
				rounded
				elevated
				toggle-color="primary"
				color="white"
				text-color="primary"
				v-model="modelValue"
				size="10px"
				:options="[
					{ label: 'Model 3D', value: vOne },
					{ label: 'Text', value: vTwo },
				]"
			/>
		</div>
		<Modelization v-if="modelValue === vOne" @getTreeObjects="tree" />
		<Monaco v-show="modelValue === vTwo" />
	</div>
</template>

<script>
import { ref } from "vue";
import useProductDetails from "src/composables/Products/useProductDetails";
import useDomainData from "src/composables/WorkSpace/useDomainData";
import Modelization from "components/2DModel/Modelization.vue";
import Monaco from "components/Monaco/Monaco.vue";
import { mapActions } from "vuex";

export default {
	props: ["id"],
	components: { Modelization, Monaco },
	setup(props) {
		const step = ref(1);
		const vOne = ref("Model");
		const vTwo = ref("Source");
		const modelValue = ref("Source");

		let { store, router, $q, currentProductContent, menu } =
			useProductDetails();

		let {
			domainTags,
			globalTagsTreeList,
			getTagsTree,
			OnDelete,
			editMode,
			confirm,
			OnEdit,
			domainID,
		} = useDomainData(props);

		return {
			step,
			store,
			router,
			$q,
			currentProductContent,
			menu,
			domainTags,
			globalTagsTreeList,
			getTagsTree,
			OnDelete,
			editMode,
			confirm,
			OnEdit,
			domainID,
			vOne,
			vTwo,
			modelValue,
		};
	},
	watch: {
		modelValue(_oldModel, currentModel) {
			if (currentModel === "Model") {
				window.localStorage.setItem(
					"monacoSource",
					JSON.stringify(this.objectsTree.contains)
				);
				this.setResources();
				Monaco.methods.getGraph();
			}
		},
	},
	methods: {
		...mapActions({
			setResources: "appMonaco/setResources",
		}),
		tree(e) {
			this.objectsTree = e;
		},
	},
};
</script>

<style lang="sass" scoped>


.modelization_navbar
  display: flex
  flex-direction: row
  justify-content: flex-start
  align-items: center
  margin: 50px 0 50px 0
  padding: 10px

.modelization_toggle
  //border: 1.5px solid white
  margin-top: -10px

.monaco_wrapper
  margin-top: 100px
</style>
