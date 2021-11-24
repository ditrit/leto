<template>
	<div class="q-pa-lg">
		<div class="flex justify-end">
			<q-btn
				color="white"
				text-color="primary"
				label="Add new User"
				class="q-my-md"
				@click.prevent="AddUser"
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
							<div class="text-h6 q-pa-md">Edit User</div>
						</q-card-section>

						<q-card-section class="q-pt-none">
							<q-form
								@submit.prevent="onSubmitUpdate"
								@reset.prevent="onResetUpdate"
								class="q-gutter-md q-pa-md"
							>
								<q-input
									filled
									v-model="userObj[2]"
									label="Your First Name *"
									lazy-rules
									:rules="[
										(val) => (val && val.length > 0) || 'Please type something',
									]"
								/>
								<q-input
									filled
									v-model="userObj[3]"
									label="Your Last Name *"
									lazy-rules
									:rules="[
										(val) => (val && val.length > 0) || 'Please type something',
									]"
								/>
								<q-input
									filled
									v-model="userObj[4]"
									label="Your Email *"
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
		<q-dialog v-model="openAddUserDialog" persistent>
			<q-card style="width: 750px; max-width: 80vw">
				<q-card-section>
					<div class="text-h6 q-pa-md">Create New User</div>
				</q-card-section>

				<q-card-section class="q-pt-none">
					<q-form
						@submit.prevent="onSubmitAdd"
						@reset.prevent="onResetAdd"
						class="q-gutter-md q-pa-md"
					>
						<q-input
							filled
							label="Your First Name *"
							lazy-rules
							:rules="[
								(val) => (val && val.length > 0) || 'Please type something',
							]"
							v-model="userFirstName"
						/>
						<q-input
							filled
							label="Your Last Name *"
							lazy-rules
							:rules="[
								(val) => (val && val.length > 0) || 'Please type something',
							]"
							v-model="userLastName"
						/>
						<q-input
							filled
							label="Your Email *"
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
		name: "firstName",
		label: "First Name",
		align: "left",
		field: "firstName",
		sortable: true,
	},
	{
		name: "lastName",
		label: "Last Name",
		align: "left",
		field: "lastName",
		sortable: true,
	},
	{
		name: "email",
		label: "Email",
		align: "left",
		field: "email",
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
	data() {
		return {
			updateKey: 0,
		};
	},
	methods: {
		forceUpdate() {
			this.updateKey += 1;
		},
		updated() {
			console.log(this.updateKey);
		},
	},
	setup() {
		const store = useStore();
		const opendDialog = ref(false);
		const openAddUserDialog = ref(false);
		const userObj = ref(null);
		const rowsData = ref([]);
		const editedIndex = ref(null);
		const userFirstName = ref("");
		const userLastName = ref("");
		const userEmail = ref("");
		const allUsers = async () => {
			// fetch All Users
			await store.dispatch("appUsers/fetchUsers");
			const getUsers = computed(() => store.getters["appUsers/allUsers"]);
			console.log(
				"getUsers: ",
				Object.values(
					getUsers.value.map((item) => {
						return {
							id: item.ID,
							avatar:
								"https://images.unsplash.com/photo-1637637498892-6b9801f4e5bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
							firstName: item.FirstName,
							lastName: item.LastName,
							email: item.Email,
							password: item.Password,
						};
					})
				)
			);
			return (rowsData.value = Object.values(
				getUsers.value.map((item) => {
					return {
						id: item.ID,
						avatar:
							"https://images.unsplash.com/photo-1637637498892-6b9801f4e5bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
						firstName: item.FirstName,
						lastName: item.LastName,
						email: item.Email,
						password: item.Password,
					};
				})
			));
		};
		allUsers();

		const AddUser = (currentTarget) => {
			console.log("currentTarget to Edit: ", currentTarget);
			openAddUserDialog.value = true;
		};
		const onSubmitAdd = async () => {
			console.log("onSubmitAdd");
			const userData = {
				firstName: userFirstName.value,
				lastName: userLastName.value,
				email: userEmail.value,
			};
			console.log(userData);
			await store.dispatch("appUsers/addUser", userData);
			rowsData.value.unshift(userData);
		};

		const onSubmitUpdate = async () => {
			const userData = {
				id: userObj.value[0],
				firstName: userObj.value[2],
				lastName: userObj.value[3],
				email: userObj.value[4],
			};
			console.log(" the submited value", userData);
			await store.dispatch("appUsers/updateUser", userData);
		};
		const onResetUpdate = async () => {
			console.log("onResetUpdate");
			const userData = {
				firstName: "",
				lastName: "",
				email: "",
			};
			console.log(userData);
		};
		const onResetAdd = async () => {
			console.log("onResetAdd");
		};
		const editRow = (currentTarget) => {
			console.log("currentTarget to Edit: ", currentTarget);
			opendDialog.value = true;
			userObj.value = Object.values(currentTarget);
			console.log("userObj value: ", userObj.value);
		};
		const deleteRow = (currentTarget) => {
			console.log(Object.values(currentTarget));
			rowsData.value.splice(currentTarget, 1);
			console.log(Object.values(currentTarget));
			const userID = Object.values(currentTarget)[0];
			store.dispatch("appUsers/removeUser", userID);
		};

		return {
			editedIndex,
			columns,
			rowsData,
			userObj,
			AddUser,
			userFirstName,
			userLastName,
			userEmail,
			editRow,
			deleteRow,
			onSubmitAdd,
			onSubmitUpdate,
			onResetUpdate,
			onResetAdd,
			opendDialog,
			openAddUserDialog,
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
