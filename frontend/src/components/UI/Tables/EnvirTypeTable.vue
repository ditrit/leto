<template>
	<div class="q-pa-lg">
		<div class="flex justify-end">
			<q-btn
				color="white"
				text-color="primary"
				label="Add new Environment Type"
				class="q-my-md"
				@click.prevent="AddEnviType"
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
				<q-dialog v-model="opendDialog" persistent>
					<q-card style="width: 750px; max-width: 80vw">
						<q-card-section>
							<div class="text-h6 q-pa-md">{{ $t("edit_environment") }}</div>
						</q-card-section>

						<q-card-section class="q-pt-none">
							<q-form
								@submit.prevent="onSubmitUpdate"
								@reset="onResetUpdate"
								class="q-gutter-md q-pa-md"
							>
								<div class="col">
									<q-input
										filled
										v-model="enviTypeObj[2]"
										label="Name *"
										lazy-rules
										:rules="[
											(val) =>
												(val && val.length > 0) || 'Please type something',
										]"
									/>
								</div>
								<div class="col">
									<q-input
										filled
										v-model="enviTypeObj[3]"
										label="Short Description *"
										lazy-rules
										:rules="[
											(val) =>
												(val && val.length > 0) || 'Please type something',
										]"
									/>
								</div>
								<div class="row">
									<div class="col">
										<q-input
											filled
											type="textarea"
											v-model="enviTypeObj[4]"
											label="Description *"
											lazy-rules
											:rules="[
												(val) =>
													(val && val.length > 0) || 'Please type something',
											]"
										/>
									</div>
									<div class="col-4 q-ml-md">
										<q-uploader
											style="max-width: 100%"
											label="Your Logo"
											multiple
											accept=".jpg, svg, image/*"
											@rejected="onRejected"
											color="primary"
											:factory="uploadFile"
											@uploaded="onFileUpload"
										/>
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
						@click="confirm(props.row)"
						icon="delete"
					></q-btn>
				</q-td>
			</template>
		</q-table>

		<!-- Create Dialog -->
		<q-dialog v-model="openAddEnviTypeDialog" persistent>
			<q-card style="width: 750px; max-width: 80vw">
				<q-card-section>
					<div class="text-h6 q-pa-md">{{ $t("add_environment") }}</div>
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
							v-model="enviTypeName"
						/>
						<q-input
							filled
							label="Short Description *"
							lazy-rules
							:rules="[
								(val) => (val && val.length > 0) || 'Please type something',
							]"
							v-model="enviTypeShortDescription"
						/>
						<div class="row">
							<div class="col">
								<q-input
									filled
									type="textarea"
									label="Description *"
									lazy-rules
									:rules="[
										(val) => (val && val.length > 0) || 'Please type something',
									]"
									v-model="enviTypeDescription"
								/>
							</div>
							<div class="col-4 q-ml-md">
								<q-uploader
									style="max-width: 100%"
									label="Your Logo"
									multiple
									accept=".jpg, svg, image/*"
									@rejected="onRejected"
									color="primary"
									:factory="uploadFile"
									@uploaded="onFileUpload"
								/>
							</div>
						</div>

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
		classes: "tr_width__avatar",
	},

	{
		name: "name",
		label: "Name",
		align: "left",
		field: "name",
		sortable: true,
		classes: "tr_width__name ellipsis",
	},

	{
		name: "shortDescription",
		label: "Short Description",
		align: "left",
		field: "shortDescription",
		sortable: true,
		classes: "tr_width__shortdesc ellipsis",
	},
	{
		name: "description",
		label: "Description",
		align: "left",
		field: "description",
		sortable: true,
		classes: "tr_width__descr ellipsis",
	},
	{
		name: "actionsButtons",
		label: "",
		align: "left",
		field: "actionsButtons",
		sortable: false,
		classes: "tr_width__actions",
	},
];

export default {
	setup() {
		const store = useStore();
		const $q = useQuasar();
		const opendDialog = ref(false);
		const openAddEnviTypeDialog = ref(false);
		const enviTypeObj = ref(null);
		const rowsData = ref([]);
		const editedIndex = ref(null);
		const parentID = ref("");
		const enviTypeName = ref("");
		const enviTypeShortDescription = ref("");
		const enviTypeDescription = ref("");
		const confirm = (item) => {
			console.log("item: ", item);
			$q.dialog({
				title: "Confirm",
				message: "Are you sure to delete this item?",
				cancel: true,
				persistent: true,
			})
				.onOk(() => {
					deleteRow(item);
				})
				.onCancel(() => {
					console.log("Cancel");
				});
		};

		const allEnviTypes = async () => {
			// fetch All Users
			await store.dispatch("appEnviType/fetchAllEnviTypes");
			const getEnviTypes = computed(
				() => store.getters["appEnviType/allEnviTypes"]
			);

			return (rowsData.value = Object.values(
				getEnviTypes.value.map((item) => {
					return {
						id: item.ID,
						avatar:
							"https://images.unsplash.com/photo-1637637498892-6b9801f4e5bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
						name: item.Name,
						shortDescription: item.ShortDescription,
						description: item.Description,
					};
				})
			));
		};
		allEnviTypes();

		const AddEnviType = () => {
			openAddEnviTypeDialog.value = true;
		};
		const onSubmitAdd = async () => {
			const enviTypeData = {
				name: enviTypeName.value,
				shortDescription: enviTypeShortDescription.value,
				description: enviTypeDescription.value,
			};

			try {
				await store.dispatch("appEnviType/addEnviType", enviTypeData);
				await allEnviTypes();
				(enviTypeName.value = ""),
					(enviTypeShortDescription.value = ""),
					(enviTypeDescription.value = ""),
					$q.notify({
						type: "positive",
						message: "Environment Type has been successfully created",
					});
			} catch (error) {
				$q.notify({
					type: "negative",
					message: "Sorry, Environment Type has not been created",
				});
			}
		};

		const onSubmitUpdate = async () => {
			const enviTypeData = {
				id: enviTypeObj.value[0],
				name: enviTypeObj.value[2],
				shortDescription: enviTypeObj.value[3],
				description: enviTypeObj.value[4],
			};

			try {
				await store.dispatch("appEnviType/updateEnviType", enviTypeData);
				await allEnviTypes();
				$q.notify({
					type: "positive",
					message: "Environment Type has been successfully updated",
				});
			} catch (error) {
				$q.notify({
					type: "negative",
					message: "Sorry, environment Type has not been updated",
				});
			}
		};
		const onResetUpdate = () => {
			return (openAddEnviTypeDialog.value = false);
		};
		const onResetAdd = () => {
			return (openAddEnviTypeDialog.value = false);
		};
		const editRow = (currentTarget) => {
			opendDialog.value = true;
			enviTypeObj.value = Object.values(currentTarget);
		};
		const deleteRow = async (currentTarget) => {
			try {
				const tagID = Object.values(currentTarget)[0];
				await store.dispatch("appEnviType/removeEnviType", tagID);
				await allEnviTypes();
				$q.notify({
					type: "positive",
					message: "Environment Type has been successfully deleted",
				});
			} catch (error) {
				$q.notify({
					type: "negative",
					message: "Sorry, environment Type has not been deleted",
				});
			}
		};

		return {
			confirm,
			editedIndex,
			columns,
			rowsData,
			enviTypeObj,
			AddEnviType,
			enviTypeName,
			parentID,
			enviTypeShortDescription,
			enviTypeDescription,
			editRow,
			deleteRow,
			onSubmitAdd,
			onSubmitUpdate,
			onResetUpdate,
			onResetAdd,
			opendDialog,
			openAddEnviTypeDialog,
			password: ref(""),
			isPwd: ref(true),
		};
	},
};
</script>
<style lang="sass">
.table_header
  background-color: $secondary !important
  color: $primary !important
</style>
