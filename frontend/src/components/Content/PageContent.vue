<template>
	<div class="teams_header">
		<div class="row min_heigth__200">
			<div class="col col-md-8">
				<div class="flex">
					<q-icon :name="icon" size="30px" class="q-ml-md q-mr-sm" />
					<p class="text-bold text-h6">{{ headline }}</p>
				</div>
				<p class="q-ml-md">
					{{ textContent }}
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
	name: "PageContent",
	props: {
		icon: {
			type: String,
			default: "groups",
		},
		headline: {
			type: String,
			default: "Teams",
		},
		textContent: {
			type: String,
			default: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
		},
	},
});
</script>

<style lang="sass" scoped>
.teams_header
  padding-top: 60px
  padding-left: 30px

.min_heigth__200
  height: 200px !important
</style>
