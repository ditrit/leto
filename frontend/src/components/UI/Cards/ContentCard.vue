<template>
	<div>
		<div class="col-8" v-for="item in data" :key="item.id">
			<q-card class="card_default" flat bordered>
				<q-card-section>
					<div class="row no-wrap">
						<div class="col">
							<div class="flex text-h6 items-start">
								<q-icon name="group" size="30px" class="q-mr-sm" />
								<span class="text-uppercase">{{ item.name }} </span>
							</div>
							<div class="text-subtitle3 text-grey-8">
								{{ item.shortDescription }}
							</div>
							<div class="flex items-center text-subtitle3 q-py-sm">
								<q-icon name="link" size="30px" class="q-mr-sm" /> Repository:
								<span class="q-pl-sm"> {{ item.gitURL }}</span>
							</div>
							<div class="content_wrapper q-mt-sm">
								<img :src="item.logo ? item.logo : logo" alt="domain logo" />
								<p class="q-ml-md">
									{{ item.description }}
								</p>
							</div>
						</div>
						<div class="col-auto vertical_spatator">
							<q-btn color="grey-7" round flat icon="more_vert">
								<q-menu cover auto-close>
									<q-list>
										<q-item clickable @click.prevent="editModal(item)">
											<q-item-section>
												<q-icon
													name="edit"
													size="1.5em"
													class="q-mr-sm"
												/>Edit</q-item-section
											>
										</q-item>
										<q-item clickable @click="confirm(item)">
											<q-item-section>
												<q-icon name="delete" size="1.5em" class="q-mr-sm" />
												Delete</q-item-section
											>
										</q-item>
										<q-item clickable @click="addFavorite(item)">
											<q-item-section>
												<q-icon name="favorite" size="1.5em" class="q-mr-sm" />
												{{ $t("favorite") }}</q-item-section
											>
										</q-item>
									</q-list>
								</q-menu>
							</q-btn>
							<!-- Modification Dialog -->
							<Modal class="modalGlobal" v-model="isOpend">
								<template v-slot:ModalTitle> {{ $t("edit_team") }} </template>
								<template v-slot:ModalContent>
									<q-form
										@submit.prevent="onSubmitUpdate(item)"
										@reset="onResetUpdate"
										class="q-gutter-md q-pa-md"
									>
										<div class="">
											<div class="row col-md-12 q-gutter-md">
												<div class="col">
													<q-input
														filled
														label="Name *"
														hint=""
														lazy-rules
														:rules="[
															(val) =>
																(val && val.length > 0) ||
																'Please type something',
														]"
														v-model="item.name"
													/>
												</div>
											</div>
											<div class="row">
												<div class="col">
													<q-input
														filled
														label="Short description"
														lazy-rules
														:rules="[
															(val) =>
																(val && val.length > 0) ||
																'Please type something',
														]"
														v-model="item.shortDescription"
													/>
												</div>
											</div>
											<div class="row">
												<div class="col">
													<q-input
														filled
														label="Repository"
														lazy-rules
														:rules="[
															(val) =>
																(val && val.length > 0) ||
																'Please type something',
														]"
														v-model="item.gitURL"
													/>
												</div>
											</div>
											<div class="row q-gutter-md">
												<div class="col col-md-8">
													<q-input
														filled
														type="textarea"
														label="Description"
														v-model="item.description"
													/>
												</div>
												<FileUploader @uploadAction="uploadFile" />
											</div>
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
						<div class="col-4"><slot name="tagsCard"></slot></div>
					</div>
				</q-card-section>
			</q-card>

			<div class="col panel_wrapper">
				<div class="q-mt-md" style="max-width: 350px">
					<div class="q-gutter-md">
						<q-input
							v-model="search"
							debounce="500"
							placeholder="Search"
							class="search_input q-mb-lg q-pa-md"
						>
							<template v-slot:append>
								<q-icon name="search" />
							</template>
						</q-input>
					</div>
				</div>
				<Tabs
					:allTags="null"
					:teamProducts="item.products"
					:teamMembers="item.authorizations"
					:teamLibraries="item.libraries"
					:teamEnvironnements="item.envirnments"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { ref, computed } from "vue";
import useUtils from "../../../composables/Utils/useUtils";
import useDomainData from "../../../composables/WorkSpace/useDomainData";
import Tabs from "../../UI/TabPanels/Tabs.vue";
import Modal from "../Dialogs/Modal.vue";
import FileUploader from "../Form/FileUploader.vue";
import useFileData from "../../../composables/Forms/userFileData";

export default {
	name: "ContentCard",
	components: { Tabs, Modal, FileUploader },
	props: {
		data: {
			type: Array,
		},
		logo: {
			type: String,
			default: "https://cdn.quasar.dev/img/parallax2.jpg",
		},
	},
	emit: [
		"emitRemoveDomain",
		"emitSubmitDomain",
		"emitResetDomain",
		"emitAddFavorite",
	],
	setup(props, { emit }) {
		let { store, route, $q } = useUtils();
		let { getMenuData } = useDomainData();
		let { imagesUID, logoUrl, uploadFile } = useFileData();

		const search = ref("");
		const parentID = ref("");
		const isOpend = ref(false);
		const editModal = () => {
			isOpend.value = true;
		};

		const filterdItem = computed(() => {
			return props.data.filter((item) =>
				item.toLowerCase().match(search.value.toLowerCase())
			);
		});
		const addFavorite = async () => {
			emit("emitAddFavorite", props);
		};

		const DeleteDomain = async (item) => {
			emit("emitRemoveDomain", item);
			await store.dispatch("appDomain/removeDomain", item.id).then(() => {
				route.push(`/workspaces`);
				try {
					$q.notify({
						message: "Domain was successfully deleted",
						color: "positive",
					});
				} catch (error) {
					$q.notify({
						message: "Error while deleting domain",
						color: "negative",
					});
				}
			});
		};
		const confirm = (item) => {
			$q.dialog({
				title: "Confirm",
				message: "Are you sure to delete this item?",
				cancel: true,
				persistent: true,
			}).onOk(() => {
				DeleteDomain(item);
			});
		};

		const onSubmitUpdate = async (item) => {
			emit("emitUpdateDomain", item);
			let updatedDomain = {
				id: item.id,
				logo: logoUrl.value,
				name: item.name,
				shortDescription: item.shortDescription,
				description: item.description,
				gitUrl: item.gitURL,
				parentID: item.parentID,
			};
			await store.dispatch("appDomain/updateDomain", updatedDomain);
			try {
				$q.notify({
					message: "Domain was successfully deleted",
					color: "positive",
				});
			} catch (error) {}
		};

		const onRejected = (rejectedEntries) => {
			$q.notify({
				type: "negative",
				message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
			});
		};

		return {
			store,
			getMenuData,
			route,
			$q,
			search,
			filterdItem,
			editModal,
			parentID,
			onSubmitUpdate,
			isOpend,
			onRejected,
			confirm,
			addFavorite,
			imagesUID,
			logoUrl,
			uploadFile,
		};
	},
};
</script>
<style lang="sass" scoped>
a
  color: $grey

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
