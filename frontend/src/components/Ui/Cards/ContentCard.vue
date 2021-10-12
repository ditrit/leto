<template>
	<div class="">
		<q-card
			class="card_default"
			flat
			bordered
			v-for="item in data"
			:key="item.id"
		>
			<q-card-section>
				<div class="row no-wrap">
					<div class="col">
						<div class="text-h6">
							<q-icon :name="item.icon" size="30px" class="q-mr-sm" />
							{{ item.headline }}
						</div>
						<div class="text-subtitle3 text-grey-8">
							{{ item.subTitle }}
						</div>
						<div class="content_wrapper q-mt-md">
							<img src="https://cdn.quasar.dev/img/parallax2.jpg" alt="logo" />
							<p class="q-ml-md">
								{{ item.textContent }}
							</p>
						</div>
					</div>
					<CardButtons :links="links" />
				</div>
			</q-card-section>
		</q-card>
	</div>
</template>

<script>
import { ref } from "vue";
import CardButtons from "../../UI/Cards/CardButtons.vue";
export default {
	name: "ContentCard",
	components: { CardButtons },
	props: {
		data: {
			type: Array,
		},
	},
	setup() {
		const links = ref(["Link One", "Link Two", "Link Three"]);
		return {
			links,
		};
	},
};
</script>

<style></style>
