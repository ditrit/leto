<template>
	<q-layout class="page_padding">
		<AjaxBar />
		<Drawer :data="data">
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
					<li>5</li>
					<li>5</li>
					<li>5</li>
				</ul>
			</template>
		</Drawer>
		<q-page class="bg-gray">
			<PageContent
				v-for="item in dashboardData"
				:key="item.id"
				:icon="item.icon"
				:headline="$t('dashboard')"
				:textContent="$t('text_content')"
			/>
		</q-page>
	</q-layout>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import AjaxBar from "../components/UI/Progress/AjaxBar";
import PageContent from "../components/Content/PageContent";
import Drawer from "../components/UI/Drawers/Drawer.vue";

export default {
	components: {
		AjaxBar,
		PageContent,
		Drawer,
	},
	setup() {
		const store = useStore();
		const dashboardData = ref([
			{
				id: 1,
				icon: "group",
				headline: "Dashboard",
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
		const user = ref(null);
		const filter = ref("");
		const filterRef = ref(null);
		user.value = store.getters["auth/user"];

		const logout = () => {
			store.dispatch("auth/logout");
		};

		return {
			dashboardData,
			progress: dashboardData.value.length,
			user,
			store,
			logout,
			filter,
			filterRef,
			resetFilter() {
				filter.value = "";
				filterRef.value.focus();
			},
		};
	},
};
</script>

<style></style>
