<template>
	<q-item
		clickable
		v-ripple
		tag="a"
		target="_self"
		:href="link"
		class="q-mb-md"
	>
		<q-item-section v-if="icon" avatar class="text-secondary centered">
			<q-icon :name="icon" size="35px" />
			<q-item-label caption size="md" class="text-secondary centered">
				{{ caption }}
			</q-item-label>
		</q-item-section>

		<q-item-section>
			<q-item-label> {{ title }}</q-item-label>
		</q-item-section>
	</q-item>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
	name: "EssentialTools",
	props: {
		title: {
			type: String,
			required: true,
		},

		caption: {
			type: String,
			default: "",
		},

		link: {
			type: String,
			default: "#",
		},

		icon: {
			type: String,
			default: "",
		},
	},
});
</script>

<style scoped lang="sass">
.centered
  display: flex
  align-items: center
  padding-right: 0

.link_active__bg
  color: cornflowerblue
</style>
