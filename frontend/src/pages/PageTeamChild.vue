<template>
	<q-layout class="">
		<AjaxBar />
		<q-page padding class="bg-gray">
			<div class="content_wrapper">
				<q-card
					class="card_default"
					flat
					bordered
					v-for="item in child"
					:key="item.id"
				>
					<q-card-section>
						<div class="row no-wrap">
							<div class="col">
								<div class="text-h6">
									<q-icon :name="item.icon" size="30px" class="q-mr-sm" />
									{{ item.headline }}
								</div>
								<div class="text-subtitle3 text-grey-8">
									{{ item.subTitle }}
								</div>
								<div class="content_wrapper q-mt-md">
									<img
										src="https://cdn.quasar.dev/img/parallax2.jpg"
										alt="logo"
									/>
									<p class="q-ml-md">
										{{ item.textContent }}
									</p>
								</div>
							</div>

							<div class="col-auto">
								<q-btn color="grey-7" round flat icon="more_vert">
									<q-menu cover auto-close class="card_actions">
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

				<div class="tags_wrapper">
					<q-card flat bordered class="card_tags_default">
						<q-card-section>
							<div class="row items-center no-wrap">
								<div class="col">
									<div class="row">
										<q-icon name="sell" size="30px" class="q-mr-sm" />
										<div class="text-h6">Tags</div>
									</div>
								</div>

								<div class="col-auto">
									<q-btn color="grey-7" round flat icon="more_vert">
										<q-menu cover auto-close class="card_actions">
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
			</div>
			<div class="panel_wrapper q-mt-lg">
				<Tabs
					:allTags="tags"
					:teamProducts="teamProducts"
					:teamMembers="teamMembers"
					:teamLibraries="teamLibraries"
					:teamEnvironnements="teamEnvironnements"
				/>
			</div>
		</q-page>
	</q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import AjaxBar from "../components/Progress/AjaxBar.vue";
import Tabs from "../components/Ui/TabPanels/Tabs.vue";

export default defineComponent({
	name: "PageTeamChild",
	components: { AjaxBar, Tabs },

	setup() {
		const tags = ref([
			"Tag One",
			"Tag Two",
			"Tag Three",
			"Tag Four",
			"Tag Five",
		]);

		const child = ref([
			{
				id: 1,
				icon: "group",
				headline: "Groupe SG / BDDF",
				subTitle: "Banque de détail SG France",
				logo: "https://cdn.quasar.dev/img/parallax2.jpg",
				textContent:
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem",
			},
		]);
		const oepnDialog = ref(false);

		return {
			// progress: tags.length,
			lorem:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",

			oepnDialog,
			tags,
			child,
		};
	},
});
</script>
<style lang="sass" scoped>
.q-drawer
  z-index: -1 !important
.buttons_wrapper
  display: flex
  flex-direction: row
  justify-content: space-evenly
  align-items: center
</style>
