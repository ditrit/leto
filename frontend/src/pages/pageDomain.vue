<template>
	<q-layout>
		<AjaxBar />
		<q-page padding class="flex bg-gray">
			<PageContent
				v-for="item in dataItems"
				:key="item.ID"
				:icon="group"
				:headline="item.Name"
				:textContent="item.Description"
			/>
			<ul>
				<li>{{ item.ID }}</li>
			</ul>
		</q-page>
	</q-layout>
</template>

<script>
import { useStore } from "vuex";
import AjaxBar from "../components/Progress/AjaxBar.vue";
import getDataItems from "../composables/getDataItems";
import PageContent from "../components/Content/PageContent.vue";

export default {
	components: { AjaxBar, PageContent },
	setup() {
		const store = useStore();
		const { path, dataItems, error, fetchData } = getDataItems();
		const data = fetchData("http://127.0.0.1:9203/ditrit/Gandalf/1.0.0/domain");
		dataItems.value = data;

		return {
			progress: dataItems.length,
			path,
			dataItems,
			error,
			store,
		};
	},
};
</script>

<style></style>
