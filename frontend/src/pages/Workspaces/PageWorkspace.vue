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
import { ref } from "vue";
import useDomainData from "../../composables/WorkSpace/useDomainData.js";
import ModalStepper from "components/UI/Dialogs/ModalStepper.vue";
import PageContent from "components/Content/PageContent";
import CreationFormStepper from "components/UI/Stepper/CreationFormStepper";
import AjaxBar from "components/UI/Progress/AjaxBar";
import AccountSettings from "components/UI/Profil/AccountSettings";
import { pageSizeTweak } from "../../common/index";

export default {
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
		let { menu, goToID, rigthData, getMenuData, choosenNodeID } =
			useDomainData();
		const filter = ref("");
		const filterRef = ref(null);

		const oepnDialog = ref(false);

		const drawer = ref(true);
		const teamData = ref([
			{
				id: 1,
				icon: "group",
			},
		]);

		return {
			teamData,
			progress: teamData.value.length,
			menu,
			drawer,
			oepnDialog,
			filter,
			filterRef,
			choosenNodeID,
			goToID,
			getMenuData,
			rigthData,
			resetFilter() {
				filter.value = "";
				filterRef.value.focus();
			},
			pageSizeTweak,
		};
	},
};
</script>
