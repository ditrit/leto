<template>
	<div class="q-pa-md" style="max-width: 350px">
		<q-list
			class="rounded-borders"
			v-for="(item, index) in navigationItem"
			:key="index"
		>
			<q-item clickable>
				<q-item-section>
					<router-link :to="item.link">{{ item.label }}</router-link>
				</q-item-section>
			</q-item>
		</q-list>
	</div>
</template>
<script>
import { ref } from "vue";
export default {
	setup() {
		const navigationItem = ref([
			{ label: "Profile", link: "/settings/profile", icon: "user" },
			{ label: "Users", link: "/settings/users", icon: "group" },
			{ label: "Roles", link: "/settings/users", icon: "group"  },
			{ label: "Tags", link: "/settings/users", icon: "tag" },
			{ label: "Environments Type", link: "/settings/users", icon: "tag" },
		]);
		return { navigationItem };
	},
};
</script>
<style lang="sass" scoped></style>
