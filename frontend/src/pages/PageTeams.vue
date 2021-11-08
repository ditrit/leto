<template>
	<q-layout class="page_padding">
		<AjaxBar />
		<Drawer :drawerManuData="data">
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
				<!-- <pre>{{ menu }}</pre> -->
				<div class="q-pa-md q-gutter-sm" v-if="menu">
					<q-tree :nodes="menu" node-key="label" />
				</div>
			</template>
		</Drawer>
		<q-page class="bg-gray">
			<PageContent
				v-for="item in dataItems"
				:key="item.id"
				:icon="item.icon"
				:headline="$t('teams')"
				:textContent="item.textContent"
			/>
			<div class="buttons_wrapper">
				<div class="teams_buttons__container">
					<Modal :oepnDialog="oepnDialog">
						<template v-slot:ModalHeadline> Create new Team </template>
						<template v-slot:ModalBody>
							<CreationFormStepper />
						</template>
					</Modal>
				</div>
			</div>
		</q-page>
	</q-layout>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Modal from "../components/UI/Dialogs/Modal.vue";
import getDataItems from "../composables/getDataItems";
import Drawer from "../components/UI/Drawers/Drawer.vue";
import PageContent from "../components/Content/PageContent";
import CreationFormStepper from "../components/UI/Stepper/CreationFormStepper";
import AjaxBar from "../components/UI/Progress/AjaxBar";

export default defineComponent({
	name: "PageTeams",
	components: { PageContent, Modal, CreationFormStepper, AjaxBar, Drawer },

	setup() {
			const router = useRouter();
		const filter = ref("");
		const filterRef = ref(null);
		const goToID = (node) => {
				router.push(`/teams/${node.id}`)
    }
		const oepnDialog = ref(false);
		const { path, dataItems, error, fetchData } = getDataItems();
		const data = fetchData("http://localhost:3000/teams");
		dataItems.value = data;

		const store = useStore();
		const menu = ref(null);
		const getMenuData = async () => {
			await store.dispatch("appDomain/fetchDomainesTree");
			const allDomainTree =  computed(
				() => store.getters["appDomain/allDomainesTree"]
			);
			console.log("allDomainTree: ", allDomainTree.value);
			console.log("allDomainTree  name: ", allDomainTree.value.Name);
			console.log(
				"allDomainTree  childs: ",
				allDomainTree.value.Childs.map((item) => item.Name)
			);
			return menu.value = [
				{
					label: allDomainTree?.value?.Name,
					avatar: allDomainTree?.value?.Logo,
					children: allDomainTree?.value?.Childs?.map((item) => {
						return {
							id: item?.ID,
							label: item?.Name,
							avatar: item?.Logo,
							handler: (item) => goToID(item),
							children: item?.children?.map((subItem) => {
								return [
									{
										id: subItem?.ID,
										label: subItem?.Name,
										avatar: subItem?.Logo,
										handler: (subItem) => goToID(subItem),
										children: subItem?.children?.map((subLastItem) => {
											return [
												{
													id: subLastItem?.ID,
													label: subLastItem?.Name,
													avatar: subLastItem?.Logo,
													handler: (subLastItem) => goToID(subLastItem),
												},
											];
										}),
									},
								];
							}),
						};
					}),
				},
			];
		};
		getMenuData();
		console.log("menu.value: ", menu);

		return {
			progress: dataItems.length,
			path,
			menu,
			dataItems,
			error,
			oepnDialog,
			filter,
			filterRef,
			goToID,
			resetFilter() {
				filter.value = "";
				filterRef.value.focus();
			},

			simple: [
				{
					label: "TEAMS MENU",
					avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
					children: [
						{
							label: "Good food (with icon)",
							icon: "restaurant_menu",
							children: [
								{ label: "Quality ingredients" },
								{ label: "Good recipe" },
							],
						},
						{
							label: "Good service (disabled node with icon)",
							icon: "room_service",
							disabled: true,
							children: [
								{ label: "Prompt attention" },
								{ label: "Professional waiter" },
							],
						},
						{
							label: "Pleasant surroundings (with icon)",
							icon: "photo",
							children: [
								{
									label: "Happy atmosphere (with image)",
									img: "https://cdn.quasar.dev/img/logo_calendar_128px.png",
								},
								{ label: "Good table presentation" },
								{ label: "Pleasing decor" },
							],
						},
					],
				},
			],
		};
	},
});
</script>
