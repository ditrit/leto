<template>
	<q-layout class="page_padding">
		<AjaxBar />
		<Drawer>
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
		<q-page class="bg-gray">
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

export default defineComponent({
	name: "PageTeams",
	components: { PageContent, Modal, CreationFormStepper, AjaxBar, Drawer },
	props: ["nodeID"],
	setup() {
		const teamData = ref([
			{
				id: 1,
				icon: "group",
				headline: "Teamssss",
				textContent:
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusda recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur ugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!",
				child: {
					id: 1,
					icon: "group",
					headline: "Groupe SG / BDDF",
					subTitle: "Banque de détail SG France",
					logo: "https://cdn.quasar.dev/img/parallax2.jpg",
					tags: ["Tag One", "Tag Two", "Tag Three", "Tag Four", "Tag Five"],
					textContent:
						"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem",
				},
			},
		]);
		const router = useRouter();
		const filter = ref("");
		const filterRef = ref(null);
		const chosenNodeID = ref("");
		const goToID = (node) => {
			chosenNodeID.value = node.id;
			router.push(`/teams/${node.id}`);
			console.log("chosenNodeID: ", chosenNodeID.value);
		};

		const oepnDialog = ref(false);

		const store = useStore();
		const menu = ref(null);
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

			oepnDialog,
			filter,
			filterRef,
			chosenNodeID,
			goToID,
			resetFilter() {
				filter.value = "";
				filterRef.value.focus();
			},
		};
	},
});
</script>
