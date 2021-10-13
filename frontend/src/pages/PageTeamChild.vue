<template>
	<q-layout class="">
		<AjaxBar />
		<q-page class="bg-gray">
			<div class="content_wrapper">
				<ContentCard :data="child" />
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
								<CardButtons :links="links" />
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
				<GlobalSearch class="global_Search__right" />
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

import AjaxBar from "../components/UI/Progress/AjaxBar";
import CardButtons from "../components/UI/Cards/CardButtons";
import ContentCard from "../components/Ui/Cards/ContentCard";
import Tabs from "../components/Ui/TabPanels/Tabs";
import GlobalSearch from "../components/UI/Form/GlobalSearch.vue";

export default defineComponent({
	name: "PageTeamChild",
	components: { AjaxBar, Tabs, ContentCard, CardButtons, GlobalSearch },

	setup() {
		const tags = ref([
			"Tag One",
			"Tag Two",
			"Tag Three",
			"Tag Four",
			"Tag Five",
		]);

		const links = ref(["Link One", "Link Two", "Link Three"]);

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
			progress: tags.value.length,
			lorem:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
			oepnDialog,
			tags,
			child,
			links,
		};
	},
});
</script>
<style lang="sass" scoped>

.q-drawer
  z-index: -1 !important
</style>
