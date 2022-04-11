<template>
	<div class="row wrap">
		<q-card flat bordered class="item_card shadow-10">
			<q-card-section>
				<div class="row items-center no-wrap">
					<div>
						<q-img
							:src="avatarUrl ? avatarUrl : globalAvatar"
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
								<q-item clickable @click.prevent="openCard(productId)">
									<q-item-section class="action_card__item">
										<q-icon name="link" size="1.5em" class="q-mr-sm" />
										Details
									</q-item-section>
								</q-item>
								<q-list>
									<q-item
										clickable
										@click.prevent="
											openEditionModal([
												{
													productId,
													productName,
													productLogo,
													productShortDescription,
													productDescription,
													productProductRepositoryURL,
													productDomainID,
												},
											])
										"
									>
										<q-item-section class="action_card__item">
											<q-icon name="edit" size="1.5em" class="q-mr-sm" />Update
										</q-item-section>
									</q-item>
									<q-item clickable @click.prevent="favoriteItem(item)">
										<q-item-section class="action_card__item">
											<q-icon name="favorite" size="1.5em" class="q-mr-sm" />
											Favorite
										</q-item-section>
									</q-item>
									<q-item clickable @click.prevent="delteItem(item)">
										<q-item-section class="action_card__item">
											<q-icon name="delete" size="1.5em" class="q-mr-sm" />
											Remove
										</q-item-section>
									</q-item>
								</q-list>
							</q-menu>
						</q-btn>
						<!-- Modification dialog -->
						<Modal class="modalGlobal" v-model="isOpened">
							<template v-slot:ModalTitle> {{ `Edit ${name}` }}</template>
							<template v-slot:ModalContent>
								<q-form
									@submit.prevent="onSubmitUpdate(item)"
									@reset="onResetUpdate"
									class="q-gutter-sm q-pa-md"
								>
									<div class="row col-md-12 q-gutter-md">
										<div class="col">
											<q-input
												filled
												label="Name *"
												lazy-rules
												:rules="[
													(val) =>
														(val && val.length > 0) || 'Please type something',
												]"
												v-model="productName"
											/>
										</div>
									</div>
									<div class="row col-md-12 q-gutter-md">
										<div class="col">
											<q-input
												filled
												label="Short Description *"
												lazy-rules
												:rules="[
													(val) =>
														(val && val.length > 0) || 'Please type something',
												]"
												v-model="productShortDescription"
											/>
										</div>
									</div>
									<div class="row col-md-12 q-gutter-md">
										<div class="col">
											<q-input
												filled
												label="Repository URL *"
												lazy-rules
												:rules="[
													(val) =>
														(val && val.length > 0) || 'Please type something',
												]"
												v-model="productProductRepositoryURL"
											/>
										</div>
									</div>
									<div class="row q-gutter-md">
										<div class="col col-md-8">
											<q-input
												class="q-gutter-md"
												filled
												type="textarea"
												label="Description *"
												lazy-rules
												:rules="[
													(val) =>
														(val && val.length > 0) || 'Please type something',
												]"
												v-model="productDescription"
											/>
										</div>
										<FileUploader @uploadAction="uploadFile" />
									</div>

									<q-card-actions
										align="right"
										class="text-primary flex justify-center"
									>
										<q-btn type="reset" label="Cancel" v-close-popup />
										<q-btn
											label="Update"
											type="submit"
											color="primary"
											v-close-popup
										/>
									</q-card-actions>
								</q-form>
							</template>
						</Modal>
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
import { useRouter } from "vue-router";
import Modal from "../Dialogs/Modal.vue";
import useFileData from "../../../composables/Forms/useFile";
import FileUploader from "../Form/FileUploader.vue";
import globalAvatar from "../../../assets/profil.png";

export default {
	components: { Modal, FileUploader },
	emits: [
		"openProductEditModal",
		"deleteProductAction",
		"updateProductAction",
		"submitProductUpdateAction",
		"favoriteProductAction",
		"openNewItemModal",
	],
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
		const route = useRouter();
		const $q = useQuasar();
		const productId = ref(props.id);
		const productName = ref(props.name);
		const productLogo = ref(props.logo);
		const productShortDescription = ref(props.shortDescription);
		const productDescription = ref(props.description);
		const productProductRepositoryURL = ref(props.repositoryURL);
		const productDomainID = ref(props.domainID);
		const isOpened = ref(false);
		let { imagesUID, avatarUrl, uploadFile } = useFileData();

		const openCard = (props) => {
			console.log("props: ", props);
			route.push(`/product/${props}`);
		};

		const openEditionModal = (props) => {
			isOpened.value = true;
			emit("openProductEditModal", props);
		};

		const updateItem = () => {
			emit("updateProductAction", props);
		};

		const favoriteItem = () => {
			emit("favoriteProductAction", props);
			console.log("Add product to Favorite");
		};
		const delteItem = () => {
			emit("deleteProductAction", props);
		};

		const refreshProduct = async (id, updatesData) => {
			await store.dispatch("appProducts/fetchProductyId", id);
			computed(() => {
				return store.getters["appProducts/fetchAllProducts"];
			});
			productName.value = updatesData.name;
			productLogo.value = avatarUrl.value;
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
				logo: avatarUrl.value,
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

		const onResetUpdate = () => {
			console.log("event: ", props.id);
		};

		const onRejected = (rejectedEntries) => {
			$q.notify({
				type: "negative",
				message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
			});
		};
		return {
			isOpened,
			openEditionModal,
			updateItem,
			delteItem,
			favoriteItem,
			onSubmitUpdate,
			onResetUpdate,
			onRejected,
			productId,
			productName,
			productShortDescription,
			productDescription,
			productProductRepositoryURL,
			imagesUID,
			avatarUrl,
			uploadFile,
			globalAvatar,
			openCard,
			route,
		};
	},
};
</script>
<style lang="sass" scoped>
.action_card__item
	display: flex
	flex-direction: row
</style>
