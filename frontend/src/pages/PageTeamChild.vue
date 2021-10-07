<template>
	<q-layout>
		<AjaxBar />
		<q-page padding class="bg-gray">
			<q-toolbar>
				<div class="row">
					<q-btn
						flat
						@click="drawer = !drawer"
						round
						dense
						icon="menu"
						:class="drawer ? 'menuStyle hiddenMenu' : ' menuStyle visibleMenu'"
					/>
				</div>
			</q-toolbar>
			<q-drawer
				v-model="drawer"
				@hide="makeMenuVisible"
				show-if-above
				@click.capture="drawerClick"
				:width="250"
				:breakpoint="500"
				bordered
				class="main_drawer bg-grey-3"
			>
				<div class="q-mt-md" style="max-width: 350px">
					<div class="q-gutter-md">
						<q-input
							v-model="search"
							debounce="500"
							placeholder="Search"
							class="search_input q-mb-lg q-pa-md"
						>
							<template v-slot:append>
								<q-icon name="search" />
							</template>
						</q-input>
					</div>
				</div>
				<q-list v-for="item in filterdSidebarItem" :key="item.id">
					<q-expansion-item
						group="somegroup"
						:icon="item.icon"
						:label="item.caption"
						:data-id="item.attr"
						default-opened
						header-class="text-primary"
						style="font-weight: 600"
					>
						<q-item
							v-for="child in item.children"
							:key="child.id"
							:data-id="child.attr"
							clickable
							v-ripple
						>
							<q-item-section avatar class="q-pl-md">
								<q-icon color="grey" :name="child.icon" size="16px" />
							</q-item-section>
							<q-item-section style="color: grey">{{
								child.caption
							}}</q-item-section>
						</q-item>
					</q-expansion-item>
					<q-sepaartor />
				</q-list>
			</q-drawer>
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
			drawer: ref(false),
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
.q-drawer--left
  z-index: 1 !important
.teams_buttons__container
  display: flex
  flex-direction: column
.menuStyle
  background: #eeeeee
  border-radius: 0
  margin-top: -41px
.hiddenMenu
  transform: translateX(220px)
.visibleMenu
  transform: translateX(-28px)
</style>
