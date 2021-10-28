<template>
	<q-layout class="domain_wrapper left_padding top_padding">
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
								<CardButtons :links="actionsLinks" />
							</div>
						</q-card-section>
						<q-card-section>
							<ul
								class="cards_tags_wrapper"
								v-for="(tag, index) in child"
								:key="index"
							>
								<li v-for="(item, index) in tag.Tags" :key="index">
									{{ item.Name }}
								</li>
							</ul>
						</q-card-section>
					</q-card>
				</div>
			</div>
			<div
				class="panel_wrapper q-mt-lg"
				v-for="(item, index) in child"
				:key="index"
			>
				<GlobalSearch class="global_Search__right" />
				<Tabs
					:allTags="null"
					:teamProducts="item.Products"
					:teamMembers="item.Authorizations"
					:teamLibraries="item.Libraries"
					:teamEnvironnements="teamEnvironnements"
				/>
			</div>
		</q-page>
	</q-layout>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
import AjaxBar from "../components/UI/Progress/AjaxBar";
import CardButtons from "../components/UI/Cards/CardButtons";
import ContentCard from "../components/UI/Cards/ContentCard";
import Tabs from "../components/UI/TabPanels/Tabs";
import GlobalSearch from "../components/UI/Form/GlobalSearch.vue";

export default defineComponent({
	name: "PageDomainChild",
	components: { AjaxBar, Tabs, ContentCard, CardButtons, GlobalSearch },

	setup() {
		const store = useStore();
		const progress = ref(null);
		const actionsLinks = ref(["Link One", "Link Two", "Link Three"]);
		const child = ref([]);
		const oepnDialog = ref(false);

		const getData = async () => {
			await store.dispatch(
				"appDomain/fetchDomainById",
				"622048a9-6706-43a7-89c0-f1a8733392b9"
			);
			let data = await computed(() => store.getters["appDomain/allDomaines"]);
			console.log("data: ", data.value);
			progress.value = child.value.length;
			return (child.value = data.value);
		};
		getData();
		return {
			oepnDialog,
			child,
			actionsLinks,
		};
	},
});
</script>
<style lang="sass" scoped>
.domain_wrapper .q-card
  width: 96%
.top_padding
  padding-top: 54px
.left_padding
  padding-left: 140px
.q-drawer
  z-index: -1 !important
</style>
