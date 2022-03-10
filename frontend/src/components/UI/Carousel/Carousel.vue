<template>
	<div class="flex justify-center">
		<q-carousel
			v-model="slide"
			transition-prev="slide-right"
			transition-next="slide-left"
			swipeable
			animated
			control-color="primary"
			padding
			arrows
			height="200px"
			class="carousel_container"
		>
			<q-carousel-slide
				v-for="(item, index) in data"
				:key="index"
				:name="item.slideName"
				class="no-wrap"
			>
				<div
					class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
				>
					<FavoriteCard
						v-for="(card, index) in item.cards"
						:key="index"
						:name="card.name"
						:repositoryURL="card.repo"
						:shortDescription="card.description"
					/>
				</div>
			</q-carousel-slide>
		</q-carousel>
	</div>
</template>
<script>
import { ref } from "vue";
import FavoriteCard from "../Cards/FavoriteCard.vue";

export default {
	components: { FavoriteCard },
	setup() {
		const data = ref([
			{
				slideName: 1,
				cards: [
					{
						name: "Product One",
						repo: "gitRepo One",
						description:
							"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
					},
					{
						name: "Product One - 1",
						repo: "gitRepo One",
						description:
							"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
					},
					{
						name: "Product One - 2",
						repo: "gitRepo One",
						description:
							"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
					},
					{
						name: "Product One - 3",
						repo: "gitRepo One",
						description:
							"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
					},
				],
			},
			{
				slideName: 2,
				cards: [
					{
						name: "Product Two",
						repo: "gitRepo Two",
						description:
							"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
					},
					{
						name: "Product Two - 1",
						repo: "gitRepo Two",
						description:
							"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
					},
					{
						name: "Product Two - 2",
						repo: "gitRepo Two",
						description:
							"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
					},
					{
						name: "Product Two - 3",
						repo: "gitRepo Two",
						description:
							"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
					},
				],
			},
			{
				slideName: 3,
				cards: [
					{
						name: "Product Three",
						repo: "gitRepo Three",
						description:
							"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
					},
					{
						name: "Product Three - 1",
						repo: "gitRepo Three",
						description:
							"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
					},
					{
						name: "Product Three - 2",
						repo: "gitRepo Three",
						description:
							"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
					},
					{
						name: "Product Three - 3",
						repo: "gitRepo Three",
						description:
							"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
					},
				],
			},
		]);
		return {
			data,
			slide: ref(1),
			lorem:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		};
	},
};
</script>
<style lang="sass" scoped>
.q-panel
  overflow: hidden !important
.carousel_container
  background: transparent !important
  max-width: 1000px
  width: 100%

.q-carousel__prev-arrow--horizontal
  left: -4px

.q-carousel__next-arrow--horizontal
  right: -5px !important
</style>
