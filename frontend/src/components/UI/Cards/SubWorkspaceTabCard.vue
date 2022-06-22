<template>
	<div class="row wrap">
		<q-card flat bordered class="item_card shadow-10">
			<q-card-section>
				<div class="row items-center no-wrap">
					<div>
						<q-img
							:src="logoUrl ? logoUrl : globalAvatar"
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
						<div class="text-subtitle2 ellipsis">{{ subworkspaceName }}</div>
						<div class="text-h8 text-grey-8 ellipsis">
							{{ subworkspaceRepositoryURL }}
						</div>
					</div>
					<div class="button_actions__container col-auto">
						<q-btn color="grey-7" round flat icon="more_vert">
							<q-menu cover auto-close>
								<q-item clickable @click.prevent="openCard(subworkspaceId)">
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
													subworkspaceId,
													subworkspaceName,
													subworkspaceLogo,
													subworkspaceShortDescription,
													subworkspaceRepositoryURL,
													subworkspaceDescription,
													subworkspaceParentID:
														route.currentRoute.value.params.id,
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
									<q-item
										clickable
										@click.prevent="confirmDeleteSubworkspace(subworkspaceId)"
									>
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
									@submit.prevent="updateSubworkspace(item)"
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
												v-model="subworkspaceName"
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
												v-model="subworkspaceShortDescription"
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
												v-model="subworkspaceRepositoryURL"
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
												v-model="subworkspaceDescription"
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
				{{ subworkspaceShortDescription }}
			</q-card-section>
		</q-card>
	</div>
</template>
<script>
import { ref } from "vue";
import useSubworkspaceTabData from "src/composables/TabPanels/useSubworkspaceTabData";
import Modal from "components/UI//Dialogs/Modal.vue";
import useFileData from "src/composables/Forms/userFileData";
import FileUploader from "components/UI/Form/FileUploader.vue";
import globalAvatar from "assets/profil.png";

export default {
	components: { Modal, FileUploader },
	emits: [
		"openChildEditModal",
		"deleteChildAction",
		"updateChildAction",
		"submitProductUpdateAction",
		"favoriteChildAction",
		"openNewItemModal",
	],
	props: {
		id: { type: String },
		logo: { type: String, default: "https://cdn.quasar.dev/img/parallax2.jpg" },
		name: { type: String },
		shortDescription: { type: String },
		repositoryURL: { type: String },
		description: { type: String },
		parentID: { type: String },
	},
	setup(props, { emit }) {
		const isOpened = ref(false);
		let { imagesUID, logoUrl, uploadFile } = useFileData();

		let {
			store,
			route,
			quasar,
			subworkspaceId,
			subworkspaceName,
			subworkspaceLogo,
			subworkspaceShortDescription,
			subworkspaceDescription,
			subworkspaceRepositoryURL,
			subworkspaceParentID,
			updateSubworkspace,
			confirmDeleteSubworkspace,
		} = useSubworkspaceTabData(props);

		const openCard = (item) => {
			route.push(`/workspaces/${item}`);
		};

		const openEditionModal = () => {
			isOpened.value = true;
		};

		const favoriteItem = () => {
			emit("favoriteChildAction", props);
		};

		return {
			isOpened,
			openEditionModal,
			favoriteItem,
			confirmDeleteSubworkspace,
			updateSubworkspace,
			subworkspaceId,
			subworkspaceName,
			subworkspaceLogo,
			subworkspaceShortDescription,
			subworkspaceDescription,
			subworkspaceRepositoryURL,
			subworkspaceParentID,
			imagesUID,
			logoUrl,
			uploadFile,
			globalAvatar,
			openCard,
			store,
			route,
			quasar,
		};
	},
};
</script>
<style lang="sass" scoped>
.action_card__item
	display: flex
	flex-direction: row
</style>
