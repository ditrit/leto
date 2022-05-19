<template>
	<div>
		<q-splitter v-model="splitterModel" style="height: 320px">
			<template v-slot:before>
				<div class="q-pa-md">
					<q-input
						ref="filterTagRef"
						v-model="filterTag"
						label="Search"
						dense
						class="q-mb-md"
					>
						<template v-slot:append>
							<q-icon
								v-if="filterTag !== ''"
								name="clear"
								class="cursor-pointer"
								@click="resetFilterTag"
							/>
						</template>
					</q-input>
					<q-tree
						:nodes="tagsTree"
						node-key="label"
						selected-color="primary"
						v-model:selected="selected"
						:filter="filterTag"
						default-expand-all
					/>
				</div>
			</template>

			<template v-slot:after>
				<q-tab-panels
					class="bg-grey-4 q-pl-lg"
					v-model="selected"
					animated
					transition-prev="jump-up"
					transition-next="jump-up"
				>
					<q-tab-panel :name="tagDataLabel" v-if="tagData">
						<div class="btn_actions">
							<q-btn color="grey-7" round flat icon="more_vert">
								<q-menu cover auto-close>
									<q-list>
										<q-item clickable @click.prevent="AddTag(tagData)">
											<q-item-section class="btn_actions__item">
												<q-icon name="add" size="1.5em" class="q-mr-md" />
												Add</q-item-section
											>
										</q-item>
										<q-item clickable @click.prevent="EditTag(tagData)">
											<q-item-section class="btn_actions__item">
												<q-icon name="edit" size="1.5em" class="q-mr-md" />
												Edit</q-item-section
											>
										</q-item>
										<q-item clickable @click.prevent="confirm(tagData.ID)">
											<q-item-section class="btn_actions__item">
												<q-icon name="delete" size="1.5em" class="q-mr-sm" />
												Delete</q-item-section
											>
										</q-item>
									</q-list>
								</q-menu>
							</q-btn>
						</div>
						<span class="text-subtitle2 text-grey-8">Name:</span>
						<div class="text-h4 q-mb-md" v-if="tagData">
							<p v-if="tagData.label">{{ tagData.label }}</p>
						</div>
						<span class="text-subtitle2 text-grey-8">Short Description:</span>
						<p>{{ tagData.ShortDescription }}</p>
						<span class="text-subtitle2 text-grey-8">Description:</span>
						<p>{{ tagData.Description }}</p>
						<Modal class="modalGlobal" v-model="openAddTagDialog">
							<template v-slot:ModalTitle>
								{{ $t("create_tag") }}
							</template>
							<template v-slot:ModalContent>
								<q-form
									@submit.prevent="onSubmitAdd"
									@reset="onResetAdd"
									class="q-gutter-md q-pa-md"
								>
									<div class="row col-md-12">
										<div class="col">
											<q-input
												filled
												label="Name *"
												lazy-rules
												:rules="[
													(val) =>
														(val && val.length > 0) || 'Please type something',
												]"
												v-model="tagName"
											/>
										</div>
										<div class="col-4 q-ml-md">
											<q-select
												filled
												:options="optionsSelections"
												label="Tag Parent"
												v-model="selectedParentData"
											/>
										</div>
									</div>

									<q-input
										filled
										label="Short Description *"
										lazy-rules
										:rules="[
											(val) =>
												(val && val.length > 0) || 'Please type something',
										]"
										v-model="tagShortDescription"
									/>
									<q-input
										filled
										type="textarea"
										label="Description *"
										lazy-rules
										:rules="[
											(val) =>
												(val && val.length > 0) || 'Please type something',
										]"
										v-model="tagDescription"
									/>

									<q-card-actions
										align="right"
										class="text-primary flex justify-center"
									>
										<q-btn type="reset" label="Cancel" v-close-popup />
										<q-btn
											label="Create"
											type="submit"
											color="primary"
											v-close-popup
										/>
									</q-card-actions>
								</q-form>
							</template>
						</Modal>
						<Modal class="modalGlobal" v-model="openEditDialog">
							<template v-slot:ModalTitle>
								{{ $t("edit_tag") }}
							</template>
							<template v-slot:ModalContent>
								<q-form
									@submit.prevent="onSubmitUpdate"
									@reset="onResetUpdate"
									class="q-gutter-md q-pa-md"
								>
									<div class="row col-md-12">
										<div class="col">
											<q-input
												filled
												v-model="tagData.label"
												label="Name *"
												lazy-rules
												:rules="[
													(val) =>
														(val && val.length > 0) || 'Please type something',
												]"
											/>
										</div>
										<div class="col-4 q-ml-md">
											<q-select
												filled
												:options="optionsSelections"
												label="Tag Parent"
												v-model="selectedParentData"
											/>
										</div>
									</div>
									<q-input
										filled
										v-model="tagData.ShortDescription"
										label="Short Description *"
										lazy-rules
										:rules="[
											(val) =>
												(val && val.length > 0) || 'Please type something',
										]"
									/>
									<q-input
										filled
										type="textarea"
										v-model="tagData.Description"
										label="Description *"
										lazy-rules
										:rules="[
											(val) =>
												(val && val.length > 0) || 'Please type something',
										]"
									/>
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
					</q-tab-panel>
				</q-tab-panels>
			</template>
		</q-splitter>
	</div>
</template>
<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import Modal from "../Dialogs/Modal.vue";

export default {
	components: { Modal },
	setup() {
		const store = useStore();
		const $q = useQuasar();
		const tagData = ref(null);
		const tagDataLabel = ref(null);
		const parentTag = ref(null);
		const tagsTree = ref([]);
		const tagName = ref("");
		const filter = ref("");
		const filterRef = ref(null);
		const filterTag = ref("");
		const filterTagRef = ref(null);
		const optionsSelections = ref([]);
		const selectedParentData = ref();
		const tagShortDescription = ref("");
		const tagDescription = ref("");
		const openAddTagDialog = ref(false);
		const openEditDialog = ref(false);

		const EditTag = (tag) => {
			openEditDialog.value = true;
			selectedParentData.value = tag;
		};

		const confirm = (props) => {
			$q.dialog({
				title: "Confirm",
				message: "Are you sure to delete this item?",
				cancel: true,
				persistent: true,
			}).onOk(() => {
				DeleteTag(props);
			});
		};

		const DeleteTag = async (item) => {
			await store.dispatch("appTags/removeTag", item);
			getTagsTreeData();
			tagDataLabel.value = "";
		};
		const showTagData = async (tag) => {
			tagData.value = tag;
			tagDataLabel.value = tag?.label;
		};

		const getTagsTreeData = async () => {
			await store.dispatch("appTags/fetchAllTagsTree");
			const tagsArray = store.getters["appTags/allTagsTree"];
			tagsTree.value = [
				{
					ID: tagsArray?.ID,
					ParentID: tagsArray?.ParentID,
					label: tagsArray?.Name,
					Logo: tagsArray?.Logo,
					ShortDescription: tagsArray?.ShortDescription,
					Description: tagsArray?.Description,
					handler: (node) => showTagData(node),
					icon: "sell",
					children: tagsArray?.Childs?.map((item) => {
						return {
							ID: item?.ID,
							ParentID: item?.ParentID,
							label: item?.Name,
							Logo: item?.Logo,
							ShortDescription: item?.ShortDescription,
							Description: item?.Description,
							handler: (node) => showTagData(node),
							icon: "sell",
							children: item?.Childs?.map((subItem) => {
								return {
									ID: subItem?.ID,
									ParentID: subItem?.ParentID,
									label: subItem?.Name,
									Logo: subItem?.Logo,
									ShortDescription: subItem?.ShortDescription,
									Description: subItem?.Description,
									handler: (node) => showTagData(node),
									icon: "sell",
									children: subItem?.Childs?.map((subLastItem) => {
										return {
											ID: subLastItem?.ID,
											ParentID: subLastItem?.ParentID,
											label: subLastItem?.Name,
											Logo: subLastItem?.Logo,
											ShortDescription: subLastItem?.ShortDescription,
											Description: subLastItem?.Description,
											handler: (node) => showTagData(node),
											icon: "sell",
											children: subLastItem?.Childs?.map((subMoreItem) => {
												return {
													ID: subMoreItem?.ID,
													ParentID: subMoreItem?.ParentID,
													label: subMoreItem?.Name,
													Logo: subMoreItem?.Logo,
													ShortDescription: subMoreItem?.ShortDescription,
													Description: subMoreItem?.Description,
													handler: (node) => showTagData(node),
													icon: "sell",
												};
											}),
										};
									}),
								};
							}),
						};
					}),
				},
			];
		};
		getTagsTreeData();

		const AddTag = async (tag) => {
			selectedParentData.value = await tag;
			openAddTagDialog.value = true;
			await store.dispatch("appTags/fetchAllTags");
			const tagsList = store.getters["appTags/allTags"];
			let data = tagsList.map((item) => {
				return {
					ID: item.ID,
					label: item.Name,
					value: item.Name,
					ParentId: item.ParentID,
					Logo: item.Logo,
				};
			});
			optionsSelections.value = [...new Set(data)].filter(
				(item) => item != null
			);
		};
		const onSubmitAdd = async () => {
			const tagToAdd = {
				pid: selectedParentData.value.ID,
				Name: tagName.value,
				label: tagName.value,
				ShortDescription: tagShortDescription.value,
				Description: tagDescription.value,
			};

			try {
				await store.dispatch("appTags/addTag", tagToAdd);
				tagName.value = "";
				tagShortDescription.value = "";
				tagDescription.value = "";
				$q.notify({
					type: "positive",
					message: "Tag has been successfully created",
				});
				getTagsTreeData();
				showTagData();
			} catch (error) {
				$q.notify({
					type: "negative",
					message: "Sorry, tag has not been created",
				});
			}
		};
		const onSubmitUpdate = async () => {
			const updateTag = {
				ID: tagData.value.ID,
				Name: tagData.value.label,
				label: tagData?.value.label,
				ShortDescription: tagData.value.ShortDescription,
				Description: tagData.value.Description,
				ParentID: tagData.value.ParentID,
			};

			try {
				await store.dispatch("appTags/updateTag", updateTag);
				tagData.value.label = "";
				tagData.value.ShortDescription = "";
				tagData.value.Description = "";
				$q.notify({
					type: "positive",
					message: "Tag has been successfully created",
				});
				getTagsTreeData();
				showTagData();
			} catch (error) {
				$q.notify({
					type: "negative",
					message: "Sorry, tag has not been created",
				});
			}
		};

		return {
			splitterModel: ref(35),
			selected: ref("Tag Two"),
			AddTag,
			parentTag,
			EditTag,
			DeleteTag,
			tagsTree,
			tagData,
			tagDataLabel,
			openAddTagDialog,
			openEditDialog,
			tagName,
			tagShortDescription,
			tagDescription,
			onSubmitAdd,
			onSubmitUpdate,
			optionsSelections,
			selectedParentData,
			confirm,
			filter,
			filterRef,
			filterTag,
			filterTagRef,
			resetFilter() {
				filter.value = "";
				filterRef.value.focus();
			},
			resetFilterTag() {
				filterTag.value = "";
				filterTagRef.value.focus();
			},
		};
	},
};
</script>
<style lang="sass" scoped>
.btn_actions
  display: flex
  flex-direction: row
  justify-content: flex-end
  &__item
    display: flex
    flex-direction: row
</style>
