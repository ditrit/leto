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
				<ul>
					<li>7</li>
					<li>7</li>
					<li>7</li>
				</ul>
			</template>
		</Drawer>

		<q-page-container>
			<q-page :style-fn="pageSizeTweak" class="flex bg-gray">
				<PageContent
					v-for="item in productsData"
					:key="item.id"
					:icon="item.icon"
					:headline="$t('products')"
					:textContent="$t('text_content')"
				/>

				<div
					class="teams_buttons__container"
					v-for="btn in buttonsList"
					:key="btn.title"
				>
					<transiton name="fade" v-if="dataItems">
						<BtnAddNew
							v-show="dataItems.length === 1"
							:title="$t('add_product')"
							:class="btn.styles"
							outline
							round
							:color="btn.color"
							:icon="btn.icon"
							:href="btn.link"
							@click="oepnDialog = true"
						/>
					</transiton>
					<!-- <CreateItems /> -->
					<q-dialog v-model="oepnDialog">
						<q-card style="width: 700px; max-width: 80vw">
							<q-card-section>
								<div class="text-h6">{{ $t("create_product") }}</div>
							</q-card-section>

							<q-card-section class="q-pt-none">
								<ProductCreationStepper />
							</q-card-section>

							<q-card-actions align="right" class="bg-white text-teal">
								<q-btn flat label="Next" v-close-popup />
							</q-card-actions>
						</q-card>
					</q-dialog>
				</div>
			</q-page>
		</q-page-container>
	</q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import PageContent from "../components/Content/PageContent";
import ProductCreationStepper from "../components/UI/Stepper/ProductCreationStepper";
import AjaxBar from "../components/UI/Progress/AjaxBar";
import Drawer from "../components/UI/Drawers/Drawer.vue";
import BtnAddNew from "../components/UI/Buttons/BtnAddNew";
import { pageSizeTweak } from "../common/index";

import AccountSettings from "components/UI/Profil/AccountSettings";

const buttonsList = [
	{
		title: "Add new product",
		styles: "q-mt-sm",
		color: "primary",
		icon: "add",
		link: "/",
	},
	{
		title: "Add to Favorite",
		styles: "q-mt-sm",
		color: "primary",
		icon: "favorite",
		link: "#/favorite",
	},
	{
		title: "Navigate",
		styles: "q-mt-sm",
		color: "primary",
		icon: "add",
		link: "#/products",
	},
];

export default defineComponent({
	name: "PageTeams",
	components: {
		AccountSettings,
		BtnAddNew,
		PageContent,
		AjaxBar,
		Drawer,
	},

	setup() {
		const drawer = ref(false);
		const productsData = ref([
			{
				id: 2,
				icon: "apps",
				headline: "Products",
				textContent:
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusda recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur ugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!",
			},
		]);

		const filter = ref("");
		const filterRef = ref(null);
		const oepnDialog = ref(false);

		return {
			drawer,
			buttonsList,
			productsData,
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
	height: fit-content
	flex: 1

.fade-enter-from, .fade-leave-to
	opacity: 0

.fade-enter-active, .fade-leave-active
	transition: opacity 3s ease-out
</style>
