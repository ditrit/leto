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
		<Drawer v-model="drawer">
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
			<q-page :style-fn="pageSizeTweak">
				<PageContent
					icon="person"
					:headline="$t('enviType')"
					:subTitle="$t('manage_environments')"
					textContent=""
				/>
				<div class="q-px-lg"><EnvirTypeTable /></div>
				<Modal>
					<template v-slot:ModalBody>
						<CreationFormStepperVue />
					</template>
				</Modal>
			</q-page>
		</q-page-container>
	</q-layout>
</template>

<script>
import { ref } from "vue";
import AjaxBar from "../components/UI/Progress/AjaxBar";
import PageContent from "../components/Content/PageContent";
import Drawer from "../components/UI/Drawers/Drawer.vue";
import AccountSettings from "components/UI/Profil/AccountSettings";
import SettingsNav from "../components/UI/Navigation/SettingsNav";
import { pageSizeTweak } from "../common/index";
import EnvirTypeTable from "src/components/UI/Tables/EnvirTypeTable.vue";
export default {
	components: {
		AjaxBar,
		PageContent,
		Drawer,
		AccountSettings,
		SettingsNav,
		EnvirTypeTable,
	},
	setup() {
		const drawer = ref(false);
		const filter = ref("");
		const filterRef = ref(null);
		return {
			drawer,
			filter,
			filterRef,
			resetFilter() {
				filter.value = "";
				filterRef.value.focus();
			},
			pageSizeTweak,
		};
	},
};
</script>

<style></style>
