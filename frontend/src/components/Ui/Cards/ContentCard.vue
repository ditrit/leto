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
							<q-icon name="group" size="30px" class="q-mr-sm" />
							<span class="text-uppercase">{{ item.Name }}</span>
						</div>
						<div class="text-subtitle3 text-grey-8">
							{{ item.ShortDescription }}
						</div>
						<div class="content_wrapper q-mt-md">
							<img :src="item.Logo" alt="domain logo" />
							<p class="q-ml-md">
								{{ item.Description }}
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
