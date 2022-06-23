<template>
	<div class="q-pa-md">
		<div class="flex">
			<q-header rounded class="modelization_navbar">
				<div>
					<span class="text-bold"> Product:</span>
					<span class="q-ml-sm">
						{{
							currentProductContent
								? currentProductContent[0].name
								: "Lodaing..."
						}}</span
					>
				</div>
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
			</q-header>
		</div>
		<section class="monaco_wrapper">
			<Monaco v-show="modelValue === vTwo" @parse_datas="parseDatas" />
			<pre>{{ compiledData }}</pre>
		</section>
		<section>
			<Modelization v-show="modelValue === vOne" />
			{{ removeHumburger }}
		</section>
	</div>
</template>

<script>
import { ref } from "vue";
import useProductDetails from "src/composables/Products/useProductDetails";
import useDomainData from "src/composables/WorkSpace/useDomainData";
import Modelization from "components/2DModel/Modelization.vue";
import Monaco from "components/Monaco/Monaco.vue";

export default {
	props: ["id"],
	emits: ["compileSourceData"],
	components: { Modelization, Monaco },
	setup(props) {
		const step = ref(1);
		const vOne = ref("Model");
		const vTwo = ref("Source");
		const modelValue = ref("Source");
		const compiledData = ref(null);
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

		const blockDrawer = () => {
			store.dispatch("appMonaco/removeDrawer");
		};
		const drawerOn = () => {
			store.dispatch("appMonaco/drawerOn");
		};

		const getCompilledData = async () => {
			await store.dispatch("appMonaco/allMonacoSource");
			compiledData.value = store.getters["appMonaco/allMonacoSource"];
			try {
				$q.notify({
					type: "positive",
					message: `Data was succefuly compiled`,
				});
			} catch (error) {
				$q.notify({
					type: "negative",
					message: `Error while compiling data`,
				});
			}
		};
		getCompilledData();

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
			compiledData,
		};
	},
	methods: {
		parseDatas(e) {
			console.log(e);
		},
	},
};
</script>

<style lang="sass" scoped>
.q-stepper
  background: none !important
  box-shadow: none !important
  max-width: 1200px !important
  border: none !important
  margin-top: 60px

.q-stepper__header--border
  border-bottom: none !important

.modelization_navbar
  display: flex
  flex-direction: row
  justify-content: flex-start
  align-items: center
  margin: 50px 0 50px 0
  padding: 10px

.modelization_toggle
  //border: 1.5px solid white

.monaco_wrapper
  margin-top: 100px
</style>
