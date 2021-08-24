<template>
	<div class="teams_header">
		<div class="row">
			<div class="col col-md-8">
				<div class="flex">
					<q-icon :name="name" size="30px" class="q-ml-md q-mr-sm" />
					<p class="text-bold text-h6">{{ headline }}</p>
				</div>
				<p class="q-ml-md">
					{{ textContent }}
				</p>
			</div>

			<div class="col-2 col-md-2">
				{{ tags }}
			</div>
		</div>
	</div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
	name: "PageContent",
	props: {
		name: {
			type: String,
			default: "group",
		},
		headline: {
			type: String,
			default: "Teams",
		},
		textContent: {
			type: String,
			default: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
		},
		tags: {
			type: Object,
		},
	},
});
</script>

<style lang="sass" scoped>
.teams_header
  padding-top: 60px
  padding-left: 30px
</style>
