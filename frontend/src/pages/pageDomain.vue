<template>
	<q-layout container style="height: 100vh" view="lHh lpR lFf">

		<q-header class="bg-white">
			<q-toolbar>
				<div class="row">
					<q-btn
						flat
						@click="drawer = !drawer"
						round
						color="primary"
						icon="menu"
					/>
				</div>
				<AccountSettings></AccountSettings>

			</q-toolbar>
		</q-header>

		<AjaxBar />
		<q-page-container>
			<q-page :style-fn="pageSizeTweak" class="flex bg-gray">
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
		</q-page-container>
	</q-layout>
</template>

<script>
import { useStore } from "vuex";
import AjaxBar from "../components/UI/Progress/AjaxBar";
import getDataItems from "../composables/getDataItems";
import PageContent from "../components/Content/PageContent.vue";
import AccountSettings from "components/UI/Profil/AccountSettings";

export default {
	components: { AjaxBar, PageContent, AccountSettings },
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
	methods: {
		pageSizeTweak(offset) {
			return { minHeight: offset ? `calc(100vh - ${offset}px)` : '100vh' }
		}
	},
};
</script>

<style></style>
