<template>
	<q-layout>
		<AjaxBar />
		<q-page padding class="content_wrapper bg-gray q-mt-lg">
			<div>
				<q-card
					class="card_default"
					flat
					bordered
					v-for="item in dataItems"
					:key="item.id"
				>
					<q-card-section>
						<div class="row no-wrap">
							<div class="col">
								<div class="text-h6">
									<q-icon :name="item.child.icon" size="30px" class="q-mr-sm" />
									{{ item.child.headline }}
								</div>
								<div class="text-subtitle3 text-grey-8">
									{{ item.child.subTitle }}
								</div>
								<div class="content_wrapper q-mt-md">
									<img
										src="https://cdn.quasar.dev/img/parallax2.jpg"
										alt="logo"
									/>
									<p class="q-ml-md">
										{{ item.child.textContent }}
									</p>
								</div>
							</div>

							<div class="col-auto">
								<q-btn color="grey-7" round flat icon="more_vert">
									<q-menu cover auto-close>
										<q-list>
											<q-item clickable>
												<q-item-section>Link One</q-item-section>
											</q-item>
											<q-item clickable>
												<q-item-section>Link Two </q-item-section>
											</q-item>
											<q-item clickable>
												<q-item-section>Link Three</q-item-section>
											</q-item>
										</q-list>
									</q-menu>
								</q-btn>
							</div>
						</div>
					</q-card-section>
				</q-card>
			</div>
			<div class="tags_wrapper">
				<q-card flat bordered class="card_tags_default">
					<q-card-section>
						<div class="row items-center no-wrap">
							<div class="col">
								<div class="text-h6">Tags</div>
							</div>

							<div class="col-auto">
								<q-btn color="grey-7" round flat icon="more_vert">
									<q-menu cover auto-close>
										<q-list>
											<q-item clickable>
												<q-item-section>Link One</q-item-section>
											</q-item>
											<q-item clickable>
												<q-item-section>Link Two </q-item-section>
											</q-item>
											<q-item clickable>
												<q-item-section>Link Three</q-item-section>
											</q-item>
										</q-list>
									</q-menu>
								</q-btn>
							</div>
						</div>
					</q-card-section>
					<q-card-section>
						<ul class="cards_tags_wrapper">
							<li v-for="(tag, index) in tags" :key="index">{{ tag }}</li>
						</ul>
					</q-card-section>
				</q-card>
			</div>
		</q-page>
	</q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import getDataItems from "../composables/getDataItems";
import AjaxBar from "../components/Progress/AjaxBar.vue";

const buttonsList = [
	{
		title: "Add new Team",
		styles: "bg-white q-mt-sm",
		color: "primary",
		icon: "add",
		link: "/",
	},
	{
		title: "Add to Favorite",
		styles: "bg-white q-mt-sm",
		color: "primary",
		icon: "favorite",
		link: "#/favorite",
	},
	{
		title: "Root Team",
		styles: "bg-white q-mt-sm",
		color: "primary",
		icon: "add",
		link: "#/teams",
	},
];

export default defineComponent({
	name: "PageTeamChild",
	components: { AjaxBar },

	setup() {
		const tags = ref([
			"Tag One",
			"Tag Two",
			"Tag Three",
			"Tag Four",
			"Tag Five",
		]);
		const oepnDialog = ref(false);
		const { path, dataItems, error, fetchData } = getDataItems();
		const response = fetchData("http://localhost:3000/teams");
		dataItems.value = response;
		console.log("dataItems.value : ", dataItems);

		return {
			progress: dataItems.length,
			lorem:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
			path,
			dataItems,
			error,
			buttonsList,
			oepnDialog,
			tags,
		};
	},
});
</script>
<style lang="sass" scoped>
.buttons_wrapper
  display: flex
  flex-direction: row
  justify-content: space-evenly
  align-items: center

.teams_buttons__container
  display: flex
  flex-direction: column
</style>
