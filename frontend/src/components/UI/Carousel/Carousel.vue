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
			<q-carousel-slide :name="1" class="no-wrap">
				<div
					class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
				>
					<q-img
						v-for="(item, index) in data"
						:key="index"
						:class="item.class"
						:src="item.img"
					/>
				</div>
			</q-carousel-slide>
			<q-carousel-slide :name="2" class="no-wrap">
				<div
					class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
				>
					<q-img
						v-for="(item, index) in data"
						:key="index"
						:class="item.class"
						:src="item.img"
					/>
				</div>
			</q-carousel-slide>
			<q-carousel-slide :name="3" class="no-wrap">
				<div
					class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
				>
					<q-img
						v-for="(item, index) in data"
						:key="index"
						:class="item.class"
						:src="item.img"
					/>
				</div>
			</q-carousel-slide>
			<q-carousel-slide :name="4" class="column no-wrap">
				<div
					class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
				>
					<q-img
						class="rounded-borders col-3 full-height"
						src="https://cdn.quasar.dev/img/material.png"
					/>
					<q-img
						class="rounded-borders col-3 full-height"
						src="https://cdn.quasar.dev/img/donuts.png"
					/>
					<q-img
						class="rounded-borders col-3 full-height"
						src="https://cdn.quasar.dev/img/material.png"
					/>
					<q-img
						class="rounded-borders col-3 full-height"
						src="https://cdn.quasar.dev/img/donuts.png"
					/>
				</div>
			</q-carousel-slide>
			-->
		</q-carousel>
	</div>
</template>
<script>
import { ref } from "vue";

export default {
	setup() {
		const data = ref([
			{
				img: "https://cdn.quasar.dev/img/mountains.jpg",
				class: "rounded-borders col-3 full-height",
			},
			{
				img: "https://cdn.quasar.dev/img/parallax1.jpg",
				class: "rounded-borders col-3 full-height",
			},
			{
				img: "https://cdn.quasar.dev/img/mountains.jpg",
				class: "rounded-borders col-3 full-height",
			},

			{
				img: "https://cdn.quasar.dev/img/parallax1.jpg",
				class: "rounded-borders col-3 full-height",
			},
			{
				img: "https://cdn.quasar.dev/img/mountains.jpg",
				class: "rounded-borders col-3 full-height",
			},
			{
				img: "https://cdn.quasar.dev/img/parallax1.jpg",
				class: "rounded-borders col-3 full-height",
			},
			{
				img: "https://cdn.quasar.dev/img/mountains.jpg",
				class: "rounded-borders col-3 full-height",
			},

			{
				img: "https://cdn.quasar.dev/img/parallax1.jpg",
				class: "rounded-borders col-3 full-height",
			},
			{
				img: "https://cdn.quasar.dev/img/mountains.jpg",
				class: "rounded-borders col-3 full-height",
			},
			{
				img: "https://cdn.quasar.dev/img/parallax1.jpg",
				class: "rounded-borders col-3 full-height",
			},
			{
				img: "https://cdn.quasar.dev/img/mountains.jpg",
				class: "rounded-borders col-3 full-height",
			},

			{
				img: "https://cdn.quasar.dev/img/parallax1.jpg",
				class: "rounded-borders col-3 full-height",
			},
			{
				img: "https://cdn.quasar.dev/img/mountains.jpg",
				class: "rounded-borders col-3 full-height",
			},
			{
				img: "https://cdn.quasar.dev/img/parallax1.jpg",
				class: "rounded-borders col-3 full-height",
			},
			{
				img: "https://cdn.quasar.dev/img/mountains.jpg",
				class: "rounded-borders col-3 full-height",
			},

			{
				img: "https://cdn.quasar.dev/img/parallax1.jpg",
				class: "rounded-borders col-3 full-height",
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
