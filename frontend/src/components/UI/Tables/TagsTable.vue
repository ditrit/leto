<template>
	<div class="q-pa-lg">
		<div class="flex justify-end">
			<q-btn
				color="white"
				text-color="primary"
				label="Add new tag"
				class="q-my-md"
				@click.prevent="AddTag"
			/>
		</div>
		<q-table
			:key="updateKey"
			title=""
			:rows="rowsData"
			:columns="columns"
			row-key="name"
			field
			table-header-class="table_header"
		>
			<template v-slot:body-cell-avatar="props">
				<!-- Modification Dialog -->
				<q-dialog v-model="opendDialog" persistent position="bottom">
					<q-card style="width: 750px; max-width: 80vw">
						<q-card-section>
							<div class="text-h6 q-pa-md">{{ $t("edit_tag") }}</div>
						</q-card-section>

						<q-card-section class="q-pt-none">
							<q-form
								@submit.prevent="onSubmitUpdate"
								@reset="onResetUpdate"
								class="q-gutter-md q-pa-md"
							>
								<q-input
									filled
									v-model="tagsObj[3]"
									label="Name *"
									lazy-rules
									:rules="[
										(val) => (val && val.length > 0) || 'Please type something',
									]"
								/>
								<q-input
									filled
									v-model="tagsObj[4]"
									label="Short Description *"
									lazy-rules
									:rules="[
										(val) => (val && val.length > 0) || 'Please type something',
									]"
								/>
								<q-input
									filled
									v-model="tagsObj[5]"
									label="Description *"
									lazy-rules
									:rules="[
										(val) => (val && val.length > 0) || 'Please type something',
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
						</q-card-section>
					</q-card>
				</q-dialog>

				<q-td :props="props">
					<q-avatar size="26px">
						<img src="https://cdn.quasar.dev/img/boy-avatar.png" />
					</q-avatar>
				</q-td>
			</template>
			<template v-slot:body-cell-actionsButtons="props">
				<q-td :props="props">
					<q-btn
						dense
						round
						flat
						color="grey"
						@click="editRow(props.row)"
						icon="edit"
					></q-btn>
					<q-btn
						dense
						round
						flat
						color="grey"
						@click="deleteRow(props.row)"
						icon="delete"
					></q-btn>
				</q-td>
			</template>
		</q-table>

		<!-- Create Dialog -->
		<q-dialog v-model="openAddTagDialog" persistent position="bottom">
			<q-card style="width: 750px; max-width: 80vw">
				<q-card-section>
					<div class="text-h6 q-pa-md">{{ $t("create_tag") }}</div>
				</q-card-section>

				<q-card-section class="q-pt-none">
					<q-form
						@submit.prevent="onSubmitAdd"
						@reset="onResetAdd"
						class="q-gutter-md q-pa-md"
					>
						<q-input
							filled
							label="Name *"
							lazy-rules
							:rules="[
								(val) => (val && val.length > 0) || 'Please type something',
							]"
							v-model="tagName"
						/>
						<q-input
							filled
							label="Short Description *"
							lazy-rules
							:rules="[
								(val) => (val && val.length > 0) || 'Please type something',
							]"
							v-model="tagShortDescription"
						/>
						<q-input
							filled
							label="Description *"
							lazy-rules
							:rules="[
								(val) => (val && val.length > 0) || 'Please type something',
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
	</div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";

const columns = [
	{
		name: "avatar",
		required: true,
		label: "Avatar",
		align: "left",
		field: (row) => row.name,
		format: (val) => `${val}`,
		sortable: true,
	},

	{
		name: "name",
		label: "Name",
		align: "left",
		field: "name",
		sortable: true,
	},

	{
		name: "shortDescription",
		label: "Short Description",
		align: "left",
		field: "shortDescription",
		sortable: true,
	},
	{
		name: "description",
		label: "Description",
		align: "left",
		field: "description",
		sortable: true,
	},
	{
		name: "actionsButtons",
		label: "",
		align: "left",
		field: "actionsButtons",
		sortable: false,
	},
];

export default {
	setup() {
		const store = useStore();
		const $q = useQuasar();
		const opendDialog = ref(false);
		const openAddTagDialog = ref(false);
		const tagsObj = ref(null);
		const rowsData = ref([]);
		const editedIndex = ref(null);
		const parentID = ref("");
		const tagName = ref("");
		const tagShortDescription = ref("");
		const tagDescription = ref("");

		const allTags = async () => {
			// fetch All Users
			await store.dispatch("appTags/fetchAllTags");
			const getTags = computed(() => store.getters["appTags/allTags"]);
			console.log("	getTags", getTags.value);

			// console.log(
			// 	"rowsData:",
			// 	getTags.value.map((item) => {
			// 		return {
			// 			id: item.ID,
			// 			parentID: item.ParentID,
			// 			avatar:
			// 				"https://images.unsplash.com/photo-1637637498892-6b9801f4e5bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
			// 			name: item.Name,
			// 			shortDescription: item.ShortDescription,
			// 			description: item.Description,
			// 		};
			// 	})
			// );

			return (rowsData.value = Object.values(
				getTags.value.map((item) => {
					return {
						id: item.ID,
						parentID: item.ParentID,
						avatar:
							"https://images.unsplash.com/photo-1637637498892-6b9801f4e5bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
						name: item.Name,
						shortDescription: item.ShortDescription,
						description: item.Description,
					};
				})
			));
		};
		allTags();

		// const getParentID = computed(() => {
		// 	return rowsData.value.find((item) => item.parentID);
		// });

		const getParentID = computed(() => {
			store.dispatch("appTags/fetchAllTags");
			const getTags = computed(() => store.getters["appTags/allTags"]);
			console.log("	getTags", getTags.value);
			let response = Object.values(getTags.value).map((item) => item.ParentID);
			console.log("response one: ", response[0]);

			return response[0];
		});

		const AddTag = () => {
			openAddTagDialog.value = true;
		};
		const onSubmitAdd = async () => {
			const tagData = {
				parentID: getParentID.value,
				name: tagName.value,
				shortDescription: tagShortDescription.value,
				description: tagDescription.value,
			};
			console.log("tagData", tagData);

			try {
				await store.dispatch("appTags/addTag", tagData);
				await allTags();
				(tagName.value = ""),
					(tagShortDescription.value = ""),
					(tagDescription.value = ""),
					$q.notify({
						type: "positive",
						message: " Tag has been successfully created",
					});
			} catch (error) {
				$q.notify({
					type: "negative",
					message: "Sorry,  has not been created",
				});
			}
		};

		const onSubmitUpdate = async () => {
			const tagData = {
				id: tagsObj.value[0],
				name: tagsObj.value[3],
				shortDescription: tagsObj.value[4],
				description: tagsObj.value[5],
			};
			console.log("tagsObj: ", tagsObj.value);

			try {
				await store.dispatch("appTags/updateTag", tagData);
				await allTags();
				$q.notify({
					type: "positive",
					message: "Tag has been successfully updated",
				});
			} catch (error) {
				$q.notify({
					type: "negative",
					message: "Sorry, tag has not been updated",
				});
			}
		};
		const onResetUpdate = () => {
			return (openAddTagDialog.value = false);
		};
		const onResetAdd = () => {
			return (openAddTagDialog.value = false);
		};
		const editRow = (currentTarget) => {
			opendDialog.value = true;
			tagsObj.value = Object.values(currentTarget);
		};
		const deleteRow = async (currentTarget) => {
			try {
				const tagID = Object.values(currentTarget)[0];
				await store.dispatch("appTags/removeTag", tagID);
				await allTags();
				$q.notify({
					type: "positive",
					message: "Tag has been successfully deleted",
				});
			} catch (error) {
				$q.notify({
					type: "negative",
					message: "Sorry,  has not been deleted",
				});
			}
		};

		return {
			editedIndex,
			columns,
			rowsData,
			tagsObj,
			AddTag,
			tagName,
			parentID,
			tagShortDescription,
			tagDescription,
			editRow,
			deleteRow,
			onSubmitAdd,
			onSubmitUpdate,
			onResetUpdate,
			onResetAdd,
			opendDialog,
			openAddTagDialog,
			password: ref(""),
			isPwd: ref(true),
			getParentID,
		};
	},
};
</script>
<style lang="sass">
.table_header
  background-color: $secondary !important
  color: $primary !important
</style>
