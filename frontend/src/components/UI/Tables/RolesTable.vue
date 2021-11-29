<template>
	<div class="q-pa-lg">
		<div class="flex justify-end">
			<q-btn
				color="white"
				text-color="primary"
				label="Add new Role"
				class="q-my-md"
				@click.prevent="AddRole"
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
							<div class="text-h6 q-pa-md">{{ $t("edit_role") }}</div>
						</q-card-section>

						<q-card-section class="q-pt-none">
							<q-form
								@submit.prevent="onSubmitUpdate"
								@reset="onResetUpdate"
								class="q-gutter-md q-pa-md"
							>
								<q-input
									filled
									v-model="roleObj[2]"
									label="Name *"
									lazy-rules
									:rules="[
										(val) => (val && val.length > 0) || 'Please type something',
									]"
								/>
								<q-input
									filled
									v-model="userObj[3]"
									label="Short Description *"
									lazy-rules
									:rules="[
										(val) => (val && val.length > 0) || 'Please type something',
									]"
								/>
								<q-input
									filled
									v-model="userObj[4]"
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
		<q-dialog v-model="openAddRoleDialog" persistent>
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
						<q-input
							filled
							label="Name *"
							lazy-rules
							:rules="[
								(val) => (val && val.length > 0) || 'Please type something',
							]"
							v-model="roleName"
						/>
						<q-input
							filled
							label="Short Description *"
							lazy-rules
							:rules="[
								(val) => (val && val.length > 0) || 'Please type something',
							]"
							v-model="roleShortDescription"
						/>
						<q-input
							filled
							label="Description *"
							lazy-rules
							:rules="[
								(val) => (val && val.length > 0) || 'Please type something',
							]"
							v-model="userEmail"
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
	// {
	// 	name: "password",
	// 	label: "Password",
	// 	align: "left",
	// 	field: "password",
	// 	sortable: false,
	// },
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
		const openAddRoleDialog = ref(false);
		const roleObj = ref(null);
		const rowsData = ref([]);
		const editedIndex = ref(null);
		const roleName = ref("");
		const roleShortDescription = ref("");
		const userEmail = ref("");
		const allRoles = async () => {
			// fetch All Users
			let response = await store.dispatch("appRoles/fetchAllRoles");
			console.log("response: ", response);
			const getRoles = computed(() => store.getters["appRoles/allRoles"]);
			console.log(getRoles.value);
			return (rowsData.value = getRoles.value.map((item) => {
				return {
					id: item.ID,
					avatar:
						"https://images.unsplash.com/photo-1637637498892-6b9801f4e5bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
					name: item.Name,
					shortDescription: item.ShortDescription,
					description: item.Description,
				};
			}));
		};
		allRoles();

		const AddRole = () => {
			openAddRoleDialog.value = true;
		};
		const onSubmitAdd = async () => {
			console.log("onSubmitAdd");
			const userData = {
				firstName: roleName.value,
				lastName: roleShortDescription.value,
				email: userEmail.value,
			};

			try {
				await store.dispatch("appRoles/addRole", userData);
				await allRoles();
				(roleName.value = ""),
					(roleShortDescription.value = ""),
					(userEmail.value = ""),
					$q.notify({
						type: "positive",
						message: "User has been successfully created",
					});
			} catch (error) {
				$q.notify({
					type: "negative",
					message: "Sorry, user has not been created",
				});
			}
		};

		const onSubmitUpdate = async () => {
			const userData = {
				id: roleObj.value[0],
				firstName: roleObj.value[2],
				lastName: roleObj.value[3],
				email: roleObj.value[4],
			};

			try {
				await store.dispatch("appRoles/updateRole", userData);
				await allRoles();
				$q.notify({
					type: "positive",
					message: "User has been successfully updated",
				});
			} catch (error) {
				$q.notify({
					type: "negative",
					message: "Sorry, user has not been updated",
				});
			}
		};
		const onResetUpdate = () => {
			return (openAddRoleDialog.value = false);
		};
		const onResetAdd = () => {
			return (openAddRoleDialog.value = false);
		};
		const editRow = (currentTarget) => {
			opendDialog.value = true;
			roleObj.value = Object.values(currentTarget);
		};
		const deleteRow = async (currentTarget) => {
			try {
				const userID = Object.values(currentTarget)[0];
				await store.dispatch("appRoles/removeRole", userID);
				await allRoles();
				$q.notify({
					type: "positive",
					message: "User has been successfully deleted",
				});
			} catch (error) {
				$q.notify({
					type: "negative",
					message: "Sorry, user has not been deleted",
				});
			}
		};

		return {
			editedIndex,
			columns,
			rowsData,
			roleObj,
			AddRole,
			roleName,
			roleShortDescription,
			userEmail,
			editRow,
			deleteRow,
			onSubmitAdd,
			onSubmitUpdate,
			onResetUpdate,
			onResetAdd,
			opendDialog,
			openAddRoleDialog,
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
