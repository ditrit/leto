<template>
	<div class="q-pa-md" style="max-width: 350px">
		<q-list
			class="rounded-borders"
			v-for="(item, index) in navigationItem"
			:key="index"
		>
			<q-item clickable :active="link === link">
				<q-item-section>
					<router-link :to="item.link">{{ item.label }}</router-link>
				</q-item-section>
			</q-item>
			<q-separator spaced inset />
		</q-list>
	</div>
</template>
<script>
import { ref } from "vue";
export default {
	setup() {
		const navigationItem = ref([
			{ label: "Users", link: "/settings/users", icon: "group" },
			{ label: "Roles", link: "/settings/roles", icon: "group" },
			{
				label: "Authorizations",
				link: "/settings/authorizations",
				icon: "group",
			},
			{ label: "Tags", link: "/settings/tags", icon: "tag" },
			{
				label: "Environments Type",
				link: "/settings/environmentstypes",
				icon: "tag",
			},
		]);
		return { navigationItem };
	},
};
</script>
<style lang="sass" scoped>
a
	text-decoration: none
	font-weight: bold
	font-size: 14px
	&:active
		color: $grey
</style>
