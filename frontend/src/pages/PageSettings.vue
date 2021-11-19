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
				</div>
			</template>
			<template v-slot:drawerMenu>
				<ul>
					<li>10</li>
					<li>10</li>
					<li>10</li>
				</ul>
			</template>
		</Drawer>
		<q-page class="flex flex-center bg-gray">
			<h2>Settings Page</h2>
		</q-page>
	</q-layout>
</template>

<script>
import { ref, defineComponent } from "vue";
import AjaxBar from "../components/UI/Progress/AjaxBar";
import Drawer from "../components/UI/Drawers/Drawer";

export default defineComponent({
	name: "PageSettings",
	components: { AjaxBar, Drawer },
	setup() {
		const filter = ref("");
		const filterRef = ref(null);
		return {
			filter,
			filterRef,
			resetFilter() {
				filter.value = "";
				filterRef.value.focus();
			},
		};
	},
});
</script>
