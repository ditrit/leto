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
				<div class="q-pa-md" style="max-width: 350px">
					<q-list dense padding class="rounded-borders">
						<q-item clickable v-ripple>
							<q-item-section> Profile </q-item-section>
						</q-item>

						<q-item clickable v-ripple>
							<q-item-section> Users </q-item-section>
						</q-item>

						<q-item clickable v-ripple>
							<q-item-section> Roles </q-item-section>
						</q-item>
						<q-item clickable v-ripple>
							<q-item-section> Tags </q-item-section>
						</q-item>
						<q-item clickable v-ripple>
							<q-item-section> Environments </q-item-section>
						</q-item>
					</q-list>
				</div>
			</template>
		</Drawer>

		<q-page-container>
			<q-page :style-fn="pageSizeTweak" class="flex">
				<PageContent
					v-for="item in settingdData"
					:key="item.id"
					:icon="item.icon"
					:headline="$t('settings')"
					:subTitle="$t('manage_profil')"
					:textContent="$t('text_content')"
				/>
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
import { pageSizeTweak } from "../common/index";
export default {
	components: {
		AjaxBar,
		PageContent,
		Drawer,
		AccountSettings,
	},
	setup() {
		const drawer = ref(false);
		const settingdData = ref([
			{
				id: 1,
				icon: "settings",
			},
		]);
		const filter = ref("");
		const filterRef = ref(null);
		return {
			settingdData,
			progress: settingdData.value.length,
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
