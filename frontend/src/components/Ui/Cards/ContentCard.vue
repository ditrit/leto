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
									ref="EditNameRef"
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
										@save="updateName(item)"
									>
										<template v-slot:append>
											<q-icon name="edit" />
										</template>
									</q-input>
								</q-popup-edit>
							</span>
						</div>
						<div class="text-subtitle3 text-grey-8">
							{{ item.ShortDescription }}
							<q-popup-edit
								ref="EditShortDescRef"
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
									@save="scope.set"
								>
									<template v-slot:append>
										<q-icon name="edit" />
									</template>
								</q-input>
							</q-popup-edit>
						</div>
						<div class="content_wrapper q-mt-md">
							<img :src="item.Logo" alt="domain logo" />
							<p class="q-ml-md">
								{{ item.Description }}
								<q-popup-edit
									ref="EditLongDescRef"
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
										@save="scope.set"
									>
										<template v-slot:append>
											<q-icon name="edit" />
										</template>
									</q-input>
								</q-popup-edit>
							</p>
						</div>
					</div>
					<div class="col-auto">
						<q-btn color="grey-7" round flat icon="more_vert">
							<q-menu cover auto-close>
								<q-list>
									<q-item clickable @click.prevent="$refs.EditNameRef.show()">
										<q-item-section>
											<q-icon
												name="edit"
												size="1.5em"
												class="q-mr-sm"
											/>Name</q-item-section
										>
									</q-item>
									<q-item
										clickable
										@click.prevent="$refs.EditShortDescRef.show()"
									>
										<q-item-section>
											<q-icon name="edit" size="1.5em" class="q-mr-sm" />Short
											description</q-item-section
										>
									</q-item>
									<q-item
										clickable
										@click.prevent="$refs.EditLongDescRef.show()"
									>
										<q-item-section>
											<q-icon
												name="edit"
												size="1.5em"
												class="q-mr-sm"
												@click.prevent="EditEvent"
											/>Long description</q-item-section
										>
									</q-item>
									<q-item clickable>
										<q-item-section>
											<q-icon
												name="edit"
												size="1.5em"
												class="q-mr-sm"
												@click.prevent="EditEvent"
											/>Logo</q-item-section
										>
									</q-item>
								</q-list>
							</q-menu>
						</q-btn>
					</div>
				</div>
			</q-card-section>
		</q-card>
	</div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
	name: "ContentCard",
	components: {},
	props: {
		data: {
			type: Array,
		},
	},
	setup() {
		const store = useStore();
		const name = ref("");
		const short = ref("");
		const long = ref("");
		const logo = ref("");
		const parentID = ref("");
		const updateName = (update) => {
			console.log(update, update.id, update.Name);
			store.dispatch("appDomain/updateDomain", update.id);
		};
		return {
			updateName,
			name,
			short,
			long,
			logo,
			parentID,
		};
	},
};
</script>
<style lang="sass" scoped>
.buttons_wrapper
  display: flex
  flex-direction: column
  justify-content: space-evenly
  align-items: flex-start

.q-item__section
  display: flex
  flex-direction: row
  justify-content: flex-start

.button_actions__wrapper
  margin-top: 80px
  margin-left: -100px
</style>
