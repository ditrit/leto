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
					<div></div>
				</div>
			</template>
			<template v-slot:drawerMenu>
				<div class="q-pa-md q-gutter-sm" v-if="menu">
					<q-tree :nodes="menu" node-key="label" />
				</div>
			</template>
		</Drawer>

		<q-page-container class="bg-gray">
			<q-page :style-fn="pageSizeTweak">
				<PageContent
					v-for="item in teamData"
					:key="item.id"
					:icon="item.icon"
					:headline="$t('teams')"
					:textContent="$t('text_content')"
				/>
				<div class="buttons_wrapper">
					<div class="teams_buttons__container">
						<Modal :oepnDialog="oepnDialog">
							<template v-slot:ModalHeadline> {{ $t("add_team") }} </template>
							<template v-slot:ModalBody>
								<CreationFormStepper />
							</template>
						</Modal>
					</div>
				</div>
			</q-page>
		</q-page-container>
	</q-layout>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Modal from "../components/UI/Dialogs/Modal.vue";
import Drawer from "../components/UI/Drawers/Drawer.vue";
import PageContent from "../components/Content/PageContent";
import CreationFormStepper from "../components/UI/Stepper/CreationFormStepper";
import AjaxBar from "../components/UI/Progress/AjaxBar";
import AccountSettings from "components/UI/Profil/AccountSettings";
import { pageSizeTweak } from "../common/index";

export default defineComponent({
	name: "PageTeams",
	components: {
		AccountSettings,
		PageContent,
		Modal,
		CreationFormStepper,
		AjaxBar,
		Drawer,
	},
	props: ["nodeID"],
	setup() {
		const teamData = ref([
			{
				id: 1,
				icon: "group",
			},
		]);
		const router = useRouter();
		const filter = ref("");
		const filterRef = ref(null);
		const chosenNodeID = ref("");
		const goToID = (node) => {
			chosenNodeID.value = node.id;
			router.push(`/workspaces/${node.id}`);
			console.log("chosenNodeID: ", chosenNodeID.value);
		};

		const oepnDialog = ref(false);

		const store = useStore();
		const menu = ref(null);
		const drawer = ref(true);
		const getMenuData = async () => {
			await store.dispatch("appDomain/fetchDomainesTree");
			const allDomainTree = computed(
				() => store.getters["appDomain/allDomainesTree"]
			);
			return (menu.value = [
				{
					id: allDomainTree?.value?.ID,
					parentID: allDomainTree?.value?.ParentID,
					label: allDomainTree?.value?.Name,
					avatar: allDomainTree?.value?.Logo,
					handler: (node) => goToID(node),
					children: allDomainTree?.value?.Childs?.map((item) => {
						return {
							id: item?.ID,
							parentID: item?.ParentID,
							label: item?.Name,
							avatar: item?.Logo,
							handler: (item) => goToID(item),
							children: item?.Childs?.map((subItem) => {
								return {
									id: subItem?.ID,
									parentID: subItem?.ParentID,
									label: subItem?.Name,
									avatar: subItem?.Logo,
									handler: (subItem) => goToID(subItem),
									children: subItem?.Childs?.map((subLastItem) => {
										return {
											id: subLastItem?.ID,
											parentID: subLastItem?.ParentID,
											label: subLastItem?.Name,
											avatar: subLastItem?.Logo,
											handler: (subLastItem) => goToID(subLastItem),
										};
									}),
								};
							}),
						};
					}),
				},
			]);
		};
		getMenuData();
		console.log("menu.value: ", menu);

		return {
			teamData,
			progress: teamData.value.length,
			menu,
			drawer,
			oepnDialog,
			filter,
			filterRef,
			chosenNodeID,
			goToID,
			resetFilter() {
				filter.value = "";
				filterRef.value.focus();
			},
			pageSizeTweak,
		};
	},
});
</script>
