<template>
	<div>
		<q-splitter v-model="splitterModel" style="height: 320px">
			<template v-slot:before>
				<div class="q-pa-md">
					<q-tree
						:nodes="tagsTree"
						node-key="label"
						selected-color="primary"
						v-model:selected="selected"
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
					<q-tab-panel :name="tagDatalabel">
						<div class="btn_actions">
							<q-btn color="grey-7" round flat icon="more_vert">
								<q-menu cover auto-close>
									<q-list>
										<q-item clickable @click.prevent="AddTag">
											<q-item-section class="btn_actions__item">
												<q-icon name="add" size="1.5em" class="q-mr-md" />
												Add</q-item-section
											>
										</q-item>
										<q-item clickable @click.prevent="EditTag">
											<q-item-section class="btn_actions__item">
												<q-icon name="edit" size="1.5em" class="q-mr-md" />
												Edit</q-item-section
											>
										</q-item>
										<q-item clickable @click.prevent="DeleteTag">
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
						<div class="text-h4 q-mb-md">
							<p>{{ tagData.label }}</p>
						</div>
						<span class="text-subtitle2 text-grey-8">Short description:</span>
						<p>{{ tagData.shortDescription }}</p>
						<span class="text-subtitle2 text-grey-8">Description:</span>
						<p>{{ tagData.description }}</p>

						<!-- Create Dialog -->
						<q-dialog v-model="openAddTagDialog" persistent>
							<q-card style="width: 750px; max-width: 80vw">
								<q-card-section>
									<div class="text-h6 q-pa-md">{{ $t("create_role") }}</div>
								</q-card-section>

								<q-card-section class="q-pt-none">
									<q-form
										@submit.prevent="onSubmitAdd"
										@reset="onResetAdd"
										class="q-gutter-md q-pa-md"
									>
										<div class="row col-md-12 q-gutter-sm">
											<div class="col">
												<q-input
													filled
													label="Name *"
													lazy-rules
													:rules="[
														(val) =>
															(val && val.length > 0) ||
															'Please type something',
													]"
													v-model="tagName"
												/>
											</div>
											<div class="col">
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
								</q-card-section>
							</q-card>
						</q-dialog>
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

export default {
	setup() {
		const store = useStore();
		const $q = useQuasar();
		const selected = ref("Tag One");
		const tagData = ref(null);
		const tagDatalabel = ref(null);
		const tagsTree = ref([]);
		const tagName = ref("");
		const optionsSelections = ref([]);
		const selectedParentData = ref();
		const tagShortDescription = ref("");
		const tagDescription = ref("");
		const openAddTagDialog = ref(false);

		const EditTag = () => {
			console.log("Edit tag");
		};
		const DeleteTag = () => {
			console.log("Delete tag");
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
			console.log("tagsTree 1: ", tagsTree.value);
			return (tagsTree.value = [
				{
					id: tagsArray?.value?.ID,
					parentID: tagsArray?.value?.ParentID,
					label: tagsArray?.value?.Name,
					avatar: tagsArray?.value?.Logo,
					shortDescription: tagsArray?.value?.ShortDescription,
					description: tagsArray?.value?.Description,
					handler: (tagsArray) => showTagData(tagsArray),
					children: tagsArray?.value?.Childs?.map((item) => {
						return {
							id: item?.ID,
							parentID: item?.ParentID,
							label: item?.Name,
							avatar: item?.Logo,
							shortDescription: item?.ShortDescription,
							description: item?.Description,
							handler: (item) => showTagData(item),
							children: item?.Childs?.map((subItem) => {
								return {
									id: subItem?.ID,
									parentID: subItem?.ParentID,
									label: subItem?.Name,
									avatar: subItem?.Logo,
									shortDescription: subItem?.ShortDescription,
									description: subItem?.Description,
									handler: (subItem) => showTagData(subItem),
									children: subItem?.Childs?.map((subLastItem) => {
										return {
											id: subLastItem?.ID,
											parentID: subLastItem?.ParentID,
											label: subLastItem?.Name,
											avatar: subLastItem?.Logo,
											shortDescription: subLastItem?.ShortDescription,
											description: subLastItem?.Description,
											handler: (subLastItem) => showTagData(subLastItem),
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

		const AddTag = async () => {
			openAddTagDialog.value = true;
			await store.dispatch("appTags/fetchAllTags");
			const tagsList = computed(() => store.getters["appTags/allTags"]);
			console.log("tagsList: ", tagsList.value);
			optionsSelections.value = tagsList.value.map((item) => item.Name);
		};
		const onSubmitAdd = async () => {
			const tagData = {
				pid: selectedParentData.value.ID,
				name: tagName.value,
				shortDescription: tagShortDescription.value,
				description: tagDescription.value,
			};
			console.log("tagData", tagData);

			try {
				await store.dispatch("appTags/addTag", tagData);
				(tagName.value = ""),
					(tagShortDescription.value = ""),
					(tagDescription.value = ""),
					$q.notify({
						type: "positive",
						message: "Tag has been successfully created",
					});
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
			EditTag,
			DeleteTag,
			tagsTree,
			tagData,
			tagDatalabel,
			openAddTagDialog,
			tagName,
			tagShortDescription,
			tagDescription,
			onSubmitAdd,
			optionsSelections,
			selectedParentData,
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
