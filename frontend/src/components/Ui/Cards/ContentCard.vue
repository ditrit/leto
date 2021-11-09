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
						<div class="flex text-h6 items-start">
							<q-icon name="group" size="30px" class="q-mr-sm" />
							<span class="text-uppercase"
								>{{ item.Name }}
								<q-popup-edit
									buttons
									v-model="item.Name"
									class="bg-white text-white"
									v-slot="scope"
									label-set="Update"
									label-cancel="Reset"
								>
									<q-input
										color="primary"
										v-model="scope.value"
										dense
										autofocus
										counter
										@keyup.enter="scope.set"
									>
										<template v-slot:append>
											<q-icon name="edit" @click.prevent="scope.set" />
										</template>
									</q-input>
								</q-popup-edit>
							</span>
						</div>
						<div class="text-subtitle3 text-grey-8">
							{{ item.ShortDescription }}
							<q-popup-edit
								buttons
								v-model="item.ShortDescription"
								class="bg-white text-white"
								v-slot="scope"
								label-set="Update"
								label-cancel="Reset"
							>
								<q-input
									color="primary"
									v-model="scope.value"
									dense
									autofocus
									counter
									@keyup.enter="scope.set"
								>
									<template v-slot:append>
										<q-icon name="edit" @click.prevent="scope.set" />
									</template>
								</q-input>
							</q-popup-edit>
						</div>
						<div class="content_wrapper q-mt-md">
							<img :src="item.Logo" alt="domain logo" />
							<p class="q-ml-md">
								{{ item.Description }}
								<q-popup-edit
									buttons
									v-model="item.Description"
									class="bg-white text-white"
									v-slot="scope"
									label-set="Update"
									label-cancel="Reset"
								>
									<q-input
										type="textarea"
										color="primary"
										v-model="scope.value"
										dense
										autofocus
										counter
										@keyup.enter="scope.set"
									>
										<template v-slot:append>
											<q-icon name="edit" @click.prevent="scope.set" />
										</template>
									</q-input>
								</q-popup-edit>
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
		const links = ref([
			"Name",
			"Short description",
			"Long description",
			"Logo",
		]);
		return {
			links,
		};
	},
};
</script>

<style></style>
