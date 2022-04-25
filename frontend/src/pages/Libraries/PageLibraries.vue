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
				<AccountSettings></AccountSettings>
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
				<ul>
					<li>6</li>
					<li>6</li>
					<li>6</li>
				</ul>
			</template>
		</Drawer>

		<q-page-container>
			<q-page :style-fn="pageSizeTweak" class="flex bg-gray">
				<PageContent
					v-for="item in librariesData"
					:key="item.id"
					:icon="item.icon"
					:headline="$t('library')"
					:textContent="$t('text_content')"
				/>

				<div
					class="teams_buttons__container"
					v-for="btn in buttonsList"
					:key="btn.title"
				>
					<!-- <BtnAddNew
						:title="$t('add_library')"
						:class="btn.styles"
						outline
						round
						:color="btn.color"
						:icon="btn.icon"
						:href="btn.link"
						@click="oepnDialog = false"
					/> -->
					<Modal class="modalGlobal" v-model="oepnDialog">
						<template v-slot:ModalTitle>
							{{ $t("create_library") }}
						</template>
						<template v-slot:ModalContent>
							<ProductCreationStepper />
						</template>
					</Modal>

					<!-- <q-dialog v-model="oepnDialog">
						<q-card style="width: 700px; max-width: 80vw">
							<q-card-section>
								<div class="text-h6">{{ $t("create_library") }}</div>
							</q-card-section>

							<q-card-section class="q-pt-none">
								<ProductCreationStepper />
							</q-card-section>

							<q-card-actions align="right" class="bg-white text-teal">
								<q-btn flat label="Next" v-close-popup />
							</q-card-actions>
						</q-card>
					</q-dialog> -->
				</div>
			</q-page>
		</q-page-container>
	</q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
// import BtnAddNew from "../components/UI/Buttons/BtnAddNew";
import PageContent from "components/Content/PageContent";
import ProductCreationStepper from "components/UI/Stepper/ProductCreationStepper";
import AjaxBar from "components/UI/Progress/AjaxBar";
import Drawer from "components/UI/Drawers/Drawer.vue";
import AccountSettings from "components/UI/Profil/AccountSettings";

import { pageSizeTweak } from "../../common/index";
import Modal from "components/UI/Dialogs/Modal.vue";

const buttonsList = [
	{
		title: "Add new library",
		styles: "q-mt-sm",
		color: "primary",
		icon: "add",
		link: "/",
	},
];

export default defineComponent({
	name: "PageLibraries",
	components: {
		// BtnAddNew,
		PageContent,
		// ProductCreationStepper,
		AccountSettings,
		AjaxBar,
		Drawer,
		Modal,
	},

	setup() {
		const librariesData = ref([
			{
				id: 3,
				icon: "library_books",
			},
		]);
		const filter = ref("");
		const filterRef = ref(null);
		const drawer = ref(true);
		const oepnDialog = ref(false);

		return {
			librariesData,
			drawer,
			buttonsList,
			oepnDialog,
			filter,
			filterRef,
			resetFilter() {
				filter.value = "";
				filterRef.value.focus();
			},
			pageSizeTweak,
		};
	},
});
</script>
<style lang="sass" scoped>

.teams_buttons__container
	display: flex
	flex-direction: row
	justify-content: space-evenly
	align-items: flex-start
	flex: 1
</style>
