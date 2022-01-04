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
					</q-tab-panel>
					<!-- <div v-for="tag in tagsTree.children" :key="tag.id">
						<q-tab-panel :name="tag.label">
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
							<div class="text-h5 q-mb-md">{{ tag.label }}</div>
							<span class="text-subtitle2 text-grey-8">Short description:</span>
							<p>{{ tag.shortDescription }}</p>
							<span class="text-subtitle2 text-grey-8">Description:</span>
							<p>
								{{ tag.description }}
							</p>
						</q-tab-panel>
					</div> -->
					<!-- <q-tab-panel name="TagTwo">
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
						<div class="text-h5 q-mb-md">TagTwo</div>
						<span class="text-subtitle2 text-grey-8">Short description:</span>
						<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
						<span class="text-subtitle2 text-grey-8">Description:</span>
						<p>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
							praesentium cumque magnam odio iure quidem, quod illum numquam
							possimus obcaecati commodi minima assumenda consectetur culpa fuga
							nulla ullam. In, libero.
						</p>
					</q-tab-panel>

					<q-tab-panel name="TagThree">
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
						<div class="text-h5 q-mb-md">TagThree</div>
						<span class="text-subtitle2 text-grey-8">Short description:</span>
						<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
						<span class="text-subtitle2 text-grey-8">Description:</span>
						<p>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
							praesentium cumque magnam odio iure quidem, quod illum numquam
							possimus obcaecati commodi minima assumenda consectetur culpa fuga
							nulla ullam. In, libero.
						</p>
					</q-tab-panel> -->
				</q-tab-panels>
			</template>
		</q-splitter>
	</div>
</template>
<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";

export default {
	setup() {
		const store = useStore();
		const tagData = ref(null);
		const tagDatalabel = ref(null);
		const tagsTree = ref([]);
		const AddTag = () => {
			console.log("Add tag");
		};
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

		return {
			splitterModel: ref(35),
			selected: ref("root"),
			AddTag,
			EditTag,
			DeleteTag,
			tagsTree,
			tagData,
			tagDatalabel,
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
