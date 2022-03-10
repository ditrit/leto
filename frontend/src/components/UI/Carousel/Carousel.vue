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
				:name="item.name"
				class="no-wrap"
			>
				<div
					class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
				>
					<q-img
						v-for="(image, index) in item.images"
						:key="index"
						:class="item.class"
						:src="image"
					/>
				</div>
			</q-carousel-slide>
		</q-carousel>
	</div>
</template>
<script>
import { ref } from "vue";

export default {
	setup() {
		const data = ref([
			{
				images: [
					"https://cdn.quasar.dev/img/mountains.jpg",
					"https://cdn.quasar.dev/img/parallax1.jpg",
					"https://cdn.quasar.dev/img/mountains.jpg",
					"https://cdn.quasar.dev/img/parallax1.jpg",
					"https://cdn.quasar.dev/img/mountains.jpg",
					"https://cdn.quasar.dev/img/parallax1.jpg",
					"https://cdn.quasar.dev/img/mountains.jpg",
					"https://cdn.quasar.dev/img/parallax1.jpg",
					"https://cdn.quasar.dev/img/mountains.jpg",
				],
				class: "rounded-borders col-3 full-height",
				name: 1,
			},
			{
				images: [
					"https://cdn.quasar.dev/img/mountains.jpg",
					"https://cdn.quasar.dev/img/parallax1.jpg",
					"https://cdn.quasar.dev/img/mountains.jpg",
					"https://cdn.quasar.dev/img/parallax1.jpg",
					"https://cdn.quasar.dev/img/mountains.jpg",
					"https://cdn.quasar.dev/img/parallax1.jpg",
					"https://cdn.quasar.dev/img/mountains.jpg",
					"https://cdn.quasar.dev/img/parallax1.jpg",
					"https://cdn.quasar.dev/img/mountains.jpg",
				],
				class: "rounded-borders col-3 full-height",
				name: 2,
			},
			{
				images: [
					"https://cdn.quasar.dev/img/mountains.jpg",
					"https://cdn.quasar.dev/img/parallax1.jpg",
					"https://cdn.quasar.dev/img/mountains.jpg",
					"https://cdn.quasar.dev/img/parallax1.jpg",
					"https://cdn.quasar.dev/img/mountains.jpg",
					"https://cdn.quasar.dev/img/parallax1.jpg",
					"https://cdn.quasar.dev/img/mountains.jpg",
					"https://cdn.quasar.dev/img/parallax1.jpg",
					"https://cdn.quasar.dev/img/mountains.jpg",
				],
				class: "rounded-borders col-3 full-height",
				name: 3,
			},
			{
				images: [
					"https://cdn.quasar.dev/img/mountains.jpg",
					"https://cdn.quasar.dev/img/parallax1.jpg",
					"https://cdn.quasar.dev/img/mountains.jpg",
					"https://cdn.quasar.dev/img/parallax1.jpg",
					"https://cdn.quasar.dev/img/mountains.jpg",
					"https://cdn.quasar.dev/img/parallax1.jpg",
					"https://cdn.quasar.dev/img/mountains.jpg",
					"https://cdn.quasar.dev/img/parallax1.jpg",
					"https://cdn.quasar.dev/img/mountains.jpg",
				],
				class: "rounded-borders col-3 full-height",
				name: 4,
			},
		]);
		return {
			data,
			slide: ref(1),
		};
	},
};
</script>
<style lang="sass" scoped>

.carousel_container
  background: transparent !important
  max-width: 1000px
  width: 100%

.q-carousel__prev-arrow--horizontal
  left: -4px

.q-carousel__next-arrow--horizontal
  right: -5px !important
</style>
