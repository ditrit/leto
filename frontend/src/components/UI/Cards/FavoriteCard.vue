<template>
	<div class="row wrap">
		<q-card flat bordered class="item_card shadow-10">
			<q-card-section>
				<div class="row items-center no-wrap">
					<div>
						<q-img
							:src="logo"
							alt=""
							style="
								height: 38px;
								width: 38px;
								border-radius: 50%;
								margin-right: 10px;
							"
						/>
					</div>
					<div class="col">
						<div class="text-subtitle2 ellipsis">{{ productName }}</div>
						<div class="text-h8 text-grey-8 ellipsis">
							{{ productProductRepositoryURL }}
						</div>
					</div>
					<div class="button_actions__container col-auto">
						<q-btn color="grey-7" round flat icon="more_vert">
							<q-menu cover auto-close>
								<q-list>
									<q-item clickable @click.prevent="delteItem(item)">
										<q-item-section class="action_card__item">
											<q-icon name="delete" size="1.5em" class="q-mr-sm" />
											{{ $t("remove") }}
										</q-item-section>
									</q-item>
									<q-item clickable @click.prevent="openCard(item)">
										<q-item-section class="action_card__item">
											<q-icon name="link" size="1.5em" class="q-mr-sm" />
											{{ $t("open") }}
										</q-item-section>
									</q-item>
								</q-list>
							</q-menu>
						</q-btn>
					</div>
				</div>
			</q-card-section>
			<q-card-section class="ellipsis-2-lines">
				{{ productShortDescription }}
			</q-card-section>
		</q-card>
	</div>
</template>
<script>
import { ref, computed } from "vue";
import { useQuasar } from "quasar";
import { useStore } from "vuex";

export default {
	emits: ["deleteItemAction", "openCardAction"],
	props: {
		id: { type: String },
		logo: { type: String, default: "https://cdn.quasar.dev/img/parallax2.jpg" },
		name: { type: String },
		role: { type: String },
		shortDescription: { type: String },
		repositoryURL: { type: String },
		description: { type: String },
		domainID: { type: String },
	},
	setup(props, { emit }) {
		const store = useStore();
		const $q = useQuasar();
		const productId = ref(props.id);
		const productName = ref(props.name);
		const productLogo = ref(props.logo);
		const productShortDescription = ref(props.shortDescription);
		const productDescription = ref(props.description);
		const productProductRepositoryURL = ref(props.repositoryURL);
		const productDomainID = ref(props.domainID);

		const openCard = () => {
			emit("openCardAction", props);
		};
		const delteItem = () => {
			emit("deleteItemAction", props);
		};

		const refreshProduct = async (id, updatesData) => {
			await store.dispatch("appProducts/fetchProductyId", id);
			computed(() => {
				return store.getters["appProducts/fetchAllProducts"];
			});
			productName.value = updatesData.name;
			productLogo.value = updatesData.logo;
			productShortDescription.value = updatesData.shortDescription;
			productProductRepositoryURL.value = updatesData.repositoryURL;
			productDescription.value = updatesData.description;
			productDomainID.value = updatesData.domainID;
		};

		const onSubmitUpdate = async () => {
			let updates = {
				id: props.id,
				domainID: props.domainID,
				name: productName.value,
				productName: productName.value,
				shortDescription: productShortDescription.value,
				repositoryURL: productProductRepositoryURL.value,
				description: productDescription.value,
			};
			emit("updateProductAction", updates);
			await store
				.dispatch("appProducts/updateProduct", updates)
				.then(() => {
					refreshProduct(updates.id, updates);
				})
				.then(() => {
					$q.notify({
						type: "positive",
						message: `${updates.name} product was succefuly updated`,
					});
				});
		};

		return {
			delteItem,
			openCard,
			onSubmitUpdate,
			productId,
			productName,
			productShortDescription,
			productDescription,
			productProductRepositoryURL,
		};
	},
};
</script>
<style lang="sass" scoped>
.action_card__item
	display: flex
	flex-direction: row
</style>
