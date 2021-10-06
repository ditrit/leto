<template>
	<div class="teams_header">
		<div class="row">
			<div class="col col-md-8">
				<div class="flex">
					<q-icon :name="icon" size="30px" class="q-ml-md q-mr-sm" />
					<div class="title_container">
						<p class="text-bold text-h6">{{ headline }}</p>
						<p class="text-subtitle3 text-grey-8">{{ subTitle }}</p>
					</div>
				</div>
				<div class="content_wrapper">
					<img src="https://cdn.quasar.dev/img/parallax2.jpg" alt="logo" />
					<p class="q-ml-md">
						{{ textContent }}
					</p>
				</div>
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
		subTitle: { type: String, default: "subTitle" },
		logo: { type: String, default: "https://cdn.quasar.dev/img/parallax2.jpg" },
	},
});
</script>

<style lang="sass" scoped>
.teams_header
  padding-top: 60px
  padding-left: 30px
  margin-bottom: 60px
.title_container
  display: flex
  flex-direction: column
  align-items: center
  & p:nth-child(2)
    margin-top: -16px

.content_wrapper
  & img
    wdth: 60px
    height: 60px
</style>
