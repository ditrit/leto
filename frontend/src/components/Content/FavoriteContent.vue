<template>
	<div class="favorite_header">
		<div class="row">
			<div class="">
				<div class="flex">
					<q-icon :name="icon" size="30px" class="q-ml-md q-mr-sm" />
					<div class="title_container">
						<p class="text-bold text-h6">{{ headline }}</p>
						<p v-if="subTitle" class="text-subtitle3 text-grey-8">
							{{ subTitle }}
						</p>
					</div>
				</div>
				<div class="q-ml-md">
					<img src="logo" alt="logo" />
					<slot name="favoriteContent">
						{{ textContent }}
					</slot>
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
			required: true,
		},
		headline: {
			type: String,
			required: true,
		},
		textContent: {
			type: String,
			required: true,
			default: "",
		},
		subTitle: { type: String, required: false },
		logo: { type: String, required: false },
		repo: { type: String, required: false },
	},
});
</script>

<style lang="sass" scoped>

.favorite_header
  padding-left: 30px
  // margin-bottom: 60px

.title_container
  display: flex
  flex-direction: column
  align-items: flex-start
  & p:nth-child(2)
    margin-top: -16px

.content_wrapper
  & img
    width: 60px
    height: 60px
</style>
