<template>
	<q-layout container style="height: 100vh" view="lHh lpR lFf">
		<q-header class="bg-white main_header">
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
				<AccountSettings />
			</q-toolbar>
		</q-header>

		<AjaxBar />
		<Drawer v-model="drawer" :data="data">
			<template v-slot:drawerFilter>
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
				</div>
			</template>
			<template v-slot:drawerMenu>
				<SettingsNav />
			</template>
		</Drawer>

		<q-page-container>
			<q-page :style-fn="pageSizeTweak" class="flex">
				<PageContent
					v-for="item in dashboardData"
					:key="item.id"
					:icon="item.icon"
					:headline="$t('dashboard')"
					:textContent="$t('text_content')"
				>
				</PageContent>
				<Modal>
					<template v-slot:ModalBody>
						<CreationFormStepperVue />
					</template>
				</Modal>
				<Grapes />
			</q-page>
		</q-page-container>
	</q-layout>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import AjaxBar from "components/UI/Progress/AjaxBar";
import PageContent from "components/Content/PageContent";
import Drawer from "components/UI/Drawers/Drawer.vue";
import SettingsNav from "components/UI/Navigation/SettingsNav";
import AccountSettings from "components/UI/Profil/AccountSettings";
import Grapes from "components/Builder/Grapes.vue";

export default {
	components: {
		AjaxBar,
		PageContent,
		Drawer,
		SettingsNav,
		AccountSettings,
		Grapes,
	},

	setup() {
		const store = useStore();
		const drawer = ref(false);
		const dashboardData = ref([
			{
				id: 1,
				icon: "dashboard",
			},
		]);

		const user = ref(null);
		const filter = ref("");
		const filterRef = ref(null);
		user.value = store.getters["auth/user"];

		return {
			dashboardData,
			progress: dashboardData.value.length,
			user,
			store,
			drawer,
			filter,
			filterRef,
			resetFilter() {
				filter.value = "";
				filterRef.value.focus();
			},
		};
	},
	methods: {
		pageSizeTweak(offset) {
			return { minHeight: offset ? `calc(100vh - ${offset}px)` : "100vh" };
		},
	},
};
</script>
