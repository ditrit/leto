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
								<a :href="item.gitURL" class="q-pl-sm"> {{ item.gitURL }}</a>
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
import useContentCardData from "../../../composables/WorkSpace/useContentCard";
import useDomainData from "../../../composables/WorkSpace/useContentCard";
import Tabs from "../../UI/TabPanels/Tabs.vue";
import Modal from "../Dialogs/Modal.vue";
import FileUploader from "../Form/FileUploader.vue";
import useFileData from "../../../composables/Forms/useFile";

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
		let { store, route, $q, refreshDomainData } = useContentCardData();
		let { getMenuData } = useDomainData();
		let { imagesUID, avatarUrl, uploadFile } = useFileData();

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
			console.log("Add to favorite");
		};

		const DeleteDomain = async (props) => {
			emit("emitRemoveDomain", props);
			try {
				store.dispatch("appDomain/removeDomain", props.id).then(() => {
					route.push(`/workspaces`);
				});
				// .then(() => {
				// 	refreshDomainData(props.parentID, props.data);
				// });
			} catch (error) {
				console.log(error);
			}
		};
		const confirm = (props) => {
			$q.dialog({
				title: "Confirm",
				message: "Are you sure to delete this item?",
				cancel: true,
				persistent: true,
			})
				.onOk(() => {
					DeleteDomain(props);
				})
				.onCancel(() => {
					console.log("Cancel");
				});
		};

		const onSubmitUpdate = async (props) => {
			console.log("props: ", props);
			emit("emitUpdateDomain", props);
			let domain = Object.values(props);
			let updatedDomain = {
				id: props.id,
				logo: props.logo,
				name: props.name,
				shortDescription: props.shortDescription,
				description: props.description,
				gitUrl: props.gitURL,
				parentID: props.parentID,
			};
			try {
				store.dispatch("appDomain/updateDomain", updatedDomain).then(() => {
					refreshDomainData(props.id, props.data);
					getMenuData();
				});
			} catch (error) {
				console.log(error);
			}
		};
		const onResetUpdate = async (props) => {
			emit("emitResetDomain", props);
			console.log(props);
		};
		const onFileUpload = (event) => {
			console.log("file name", event.files[0].name);
			console.log("file upload number", event.files[0].__uploaded);
			console.log("file Id", event.files[0].xhr.response);
		};

		const onRejected = (rejectedEntries) => {
			$q.notify({
				type: "negative",
				message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
			});
		};

		return {
			store,
			refreshDomainData,
			getMenuData,
			route,
			$q,
			search,
			filterdItem,
			editModal,
			parentID,
			onSubmitUpdate,
			isOpend,
			onFileUpload,
			onRejected,
			confirm,
			addFavorite,
			imagesUID,
			avatarUrl,
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
