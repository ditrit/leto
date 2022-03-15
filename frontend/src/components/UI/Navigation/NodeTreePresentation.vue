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
						default-expand-all="true"
						:nodes="tagsTree"
						node-key="label"
						selected-color="primary"
						v-model:selected="selected"
						:filter="filterTag"
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
					<q-tab-panel :name="tagDatalabel" v-if="tagData">
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
										<q-item clickable @click.prevent="confirm(tagData)">
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
						<span class="text-subtitle2 text-grey-8">Short description:</span>
						<p>{{ tagData.shortDescription }}</p>
						<span class="text-subtitle2 text-grey-8">Description:</span>
						<p>{{ tagData.description }}</p>

						<!-- Create Dialog -->
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
						<!-- Modification Dialog -->
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
										v-model="tagData.shortDescription"
										label="Short description *"
										lazy-rules
										:rules="[
											(val) =>
												(val && val.length > 0) || 'Please type something',
										]"
									/>
									<q-input
										filled
										type="textarea"
										v-model="tagData.description"
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
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import Modal from "../Dialogs/Modal.vue";

export default {
	components: { Modal },
	setup() {
		const store = useStore();
		const $q = useQuasar();
		const selected = ref("root");
		const tagData = ref(null);
		const tagDatalabel = ref(null);
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
			console.log("Edit tag");
			openEditDialog.value = true;
			console.log("tag: ", tag);
			selectedParentData.value = tag;
		};

		const confirm = (props) => {
			$q.dialog({
				title: "Confirm",
				message: "Are you sure to delete this item?",
				cancel: true,
				persistent: true,
			})
				.onOk(() => {
					DeleteTag(props);
				})
				.onCancel(() => {
					console.log("Cancel");
				});
		};

		const DeleteTag = async (item) => {
			await store.dispatch("appTags/removeTag", item.id);
			getTagsTreeData();
			tagDatalabel.value = "";
		};
		const showTagData = async (tag) => {
			tagData.value = tag;
			tagDatalabel.value = tag.label;
			console.log("showtagData: ", tag);
		};

		// Get Data
		const getTagsTreeData = async () => {
			await store.dispatch("appTags/fetchAllTagsTree");
			const tagsArray = computed(() => store.getters["appTags/allTagsTree"]);
			let tagsArr = Object.values(tagsArray.value);
			console.log("tagsArr: ", tagsArr);
			console.log("tagsArray: ", tagsArray.value);

			return (tagsTree.value = [
				{
					id: tagsArray?.value?.ID,
					parentID: tagsArray?.value?.ParentID,
					label: tagsArray?.value?.Name,
					avatar: tagsArray?.value?.Logo,
					shortDescription: tagsArray?.value?.ShortDescription,
					description: tagsArray?.value?.Description,
					handler: (tagsArray) => showTagData(tagsArray),
					icon: "sell",
					children: tagsArray?.value?.Childs?.map((item) => {
						return {
							id: item?.ID,
							parentID: item?.ParentID,
							label: item?.Name,
							avatar: item?.Logo,
							shortDescription: item?.ShortDescription,
							description: item?.Description,
							handler: (item) => showTagData(item),
							icon: "sell",
							children: item?.Childs?.map((subItem) => {
								return {
									id: subItem?.ID,
									parentID: subItem?.ParentID,
									label: subItem?.Name,
									avatar: subItem?.Logo,
									shortDescription: subItem?.ShortDescription,
									description: subItem?.Description,
									handler: (subItem) => showTagData(subItem),
									icon: "sell",
									children: subItem?.Childs?.map((subLastItem) => {
										return {
											id: subLastItem?.ID,
											parentID: subLastItem?.ParentID,
											label: subLastItem?.Name,
											avatar: subLastItem?.Logo,
											shortDescription: subLastItem?.ShortDescription,
											description: subLastItem?.Description,
											handler: (subLastItem) => showTagData(subLastItem),
											icon: "sell",
											children: subLastItem?.Childs?.map((subMoreItem) => {
												return {
													id: subMoreItem?.ID,
													parentID: subMoreItem?.ParentID,
													label: subMoreItem?.Name,
													avatar: subMoreItem?.Logo,
													shortDescription: subMoreItem?.ShortDescription,
													description: subMoreItem?.Description,
													handler: (subMoreItem) => showTagData(subMoreItem),
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
			]);
		};
		getTagsTreeData();

		const AddTag = async (tag) => {
			selectedParentData.value = await tag;
			openAddTagDialog.value = true;
			await store.dispatch("appTags/fetchAllTags");
			const tagsList = computed(() => store.getters["appTags/allTags"]);
			let data = tagsList.value.map((item) => {
				return {
					id: item.ID,
					label: item.Name,
					value: item.Name,
					parentId: item.ParentID,
					logo: item.Logo,
				};
			});
			optionsSelections.value = [...new Set(data)].filter(
				(item) => item != null
			);
		};
		const onSubmitAdd = async () => {
			const tagToAdd = {
				pid: selectedParentData.value.id,
				name: tagName.value,
				label: tagName.value,
				shortDescription: tagShortDescription.value,
				description: tagDescription.value,
			};
			console.log("tagToAdd", tagToAdd);

			try {
				await store.dispatch("appTags/addTag", tagToAdd);
				(tagName.value = ""),
					(tagShortDescription.value = ""),
					(tagDescription.value = ""),
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
				id: tagData.value.id,
				name: tagData.value.label,
				shortDescription: tagData.value.shortDescription,
				description: tagData.value.description,
				parentID: tagData.value.parentID,
			};
			console.log("updateTag", updateTag);

			try {
				await store.dispatch("appTags/updateTag", updateTag);
				(tagData.value.label = ""),
					(tagData.value.shortDescription = ""),
					(tagData.value.description = ""),
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
			selected,
			AddTag,
			parentTag,
			EditTag,
			DeleteTag,
			tagsTree,
			tagData,
			tagDatalabel,
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
