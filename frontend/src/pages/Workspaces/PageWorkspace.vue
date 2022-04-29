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
						<ModalStepper :oepnDialog="oepnDialog">
							<template v-slot:ModalHeadline> {{ $t("add_team") }} </template>
							<template v-slot:ModalBody>
								<CreationFormStepper />
							</template>
						</ModalStepper>
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
import ModalStepper from "components/UI/Dialogs/ModalStepper.vue";
import PageContent from "components/Content/PageContent";
import CreationFormStepper from "components/UI/Stepper/CreationFormStepper";
import AjaxBar from "components/UI/Progress/AjaxBar";
import AccountSettings from "components/UI/Profil/AccountSettings";
import { pageSizeTweak } from "../../common/index";

export default defineComponent({
	name: "PageTeams",
	components: {
		AccountSettings,
		PageContent,
		ModalStepper,
		CreationFormStepper,
		AjaxBar,
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
			router.push(`/workspaces/${chosenNodeID.value}`);
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
							handler: (node) => goToID(node),
							children: item?.Childs?.map((subItem) => {
								return {
									id: subItem?.ID,
									parentID: subItem?.ParentID,
									label: subItem?.Name,
									avatar: subItem?.Logo,
									handler: (node) => goToID(node),
									children: subItem?.Childs?.map((subLastItem) => {
										return {
											id: subLastItem?.ID,
											parentID: subLastItem?.ParentID,
											label: subLastItem?.Name,
											avatar: subLastItem?.Logo,
											handler: (node) => goToID(node),
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
