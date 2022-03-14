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
			:fullscreen="fullscreen"
			:grid="$q.screen.xs"
			row-key="name"
			field
			table-header-class="table_header"
		>
			<template v-slot:body-cell-avatar="props">
				<!-- Modification Dialog -->
				<Modal
					class="modalGlobal"
					v-show="opendDialog"
					v-model="opendDialog"
					persistent
					position="bottom"
				>
					<template v-slot:ModalTitle> {{ $t("edit_user") }} </template>
					<template v-slot:ModalContent>
						<q-form
							@submit.prevent="onSubmitUpdate"
							@reset="onResetUpdate"
							class="q-gutter-md q-pa-md"
						>
							<div class="row col-md-12 q-gutter-sm">
								<div class="col">
									<q-input
										filled
										v-model="userObj[2]"
										label="Your First Name *"
										lazy-rules
										:rules="[
											(val) =>
												(val && val.length > 0) || 'Please type something',
										]"
									/>
								</div>
								<div class="col q-pl-md">
									<q-input
										filled
										v-model="userObj[3]"
										label="Your Last Name *"
										lazy-rules
										:rules="[
											(val) =>
												(val && val.length > 0) || 'Please type something',
										]"
									/>
								</div>
							</div>
							<div class="row col-md-12 q-gutter-sm">
								<div class="col">
									<q-input
										filled
										v-model="userObj[4]"
										label="Your Email *"
										lazy-rules
										:rules="[
											(val) =>
												(val && val.length > 0) || 'Please type something',
										]"
									/>
								</div>
								<div class="col q-pl-md">
									<q-input
										:type="isPwd ? 'password' : 'text'"
										filled
										v-model="userObj[5]"
										label="password *"
										lazy-rules
										:rules="[
											(val) =>
												(val && val.length > 0) || 'Please type something',
										]"
									>
										<template v-slot:append>
											<q-icon
												:name="isPwd ? 'visibility_off' : 'visibility'"
												class="cursor-pointer"
												@click="isPwd = !isPwd"
											/>
										</template>
									</q-input>
								</div>
							</div>
							<div class="row col-md-12 q-gutter-sm">
								<div class="col">
									<q-input
										filled
										type="textarea"
										v-model="userObj[6]"
										label="Description *"
										lazy-rules
										:rules="[
											(val) =>
												(val && val.length > 0) || 'Please type something',
										]"
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
					</template>
				</Modal>
				<!-- <q-dialog v-model="opendDialog" persistent position="bottom">
					<q-card style="width: 750px; max-width: 80vw">
						<q-card-section>
							<div class="text-h6 q-pa-md">{{ $t("edit_user") }}</div>
						</q-card-section>

						<q-card-section class="q-pt-none">
							<q-form
								@submit.prevent="onSubmitUpdate"
								@reset="onResetUpdate"
								class="q-gutter-md q-pa-md"
							>
								<div class="row col-md-12 q-gutter-sm">
									<div class="col">
										<q-input
											filled
											v-model="userObj[2]"
											label="Your First Name *"
											lazy-rules
											:rules="[
												(val) =>
													(val && val.length > 0) || 'Please type something',
											]"
										/>
									</div>
									<div class="col q-pl-md">
										<q-input
											filled
											v-model="userObj[3]"
											label="Your Last Name *"
											lazy-rules
											:rules="[
												(val) =>
													(val && val.length > 0) || 'Please type something',
											]"
										/>
									</div>
								</div>
								<div class="row col-md-12 q-gutter-sm">
									<div class="col">
										<q-input
											filled
											v-model="userObj[4]"
											label="Your Email *"
											lazy-rules
											:rules="[
												(val) =>
													(val && val.length > 0) || 'Please type something',
											]"
										/>
									</div>
									<div class="col q-pl-md">
										<q-input
											:type="isPwd ? 'password' : 'text'"
											filled
											v-model="userObj[5]"
											label="password *"
											lazy-rules
											:rules="[
												(val) =>
													(val && val.length > 0) || 'Please type something',
											]"
										>
											<template v-slot:append>
												<q-icon
													:name="isPwd ? 'visibility_off' : 'visibility'"
													class="cursor-pointer"
													@click="isPwd = !isPwd"
												/>
											</template>
										</q-input>
									</div>
								</div>
								<div class="row col-md-12 q-gutter-sm">
									<div class="col">
										<q-input
											filled
											type="textarea"
											v-model="userObj[6]"
											label="Description *"
											lazy-rules
											:rules="[
												(val) =>
													(val && val.length > 0) || 'Please type something',
											]"
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
				</q-dialog> -->

				<q-td :props="props">
					<q-avatar size="26px">
						<img src="https://cdn.quasar.dev/img/boy-avatar.png" />
					</q-avatar>
				</q-td>
			</template>
			<!-- <template style="width: 100px">
				<q-td key="password" :props="props" class="ellipsis">
					{{ props.row.password }}
				</q-td>
			</template> -->
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
		<q-dialog v-model="openAddUserDialog" persistent position="bottom">
			<q-card style="width: 750px; max-width: 80vw">
				<q-card-section>
					<div class="text-h6 q-pa-md">{{ $t("create_user") }}</div>
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
									label="Your First Name *"
									lazy-rules
									:rules="[
										(val) => (val && val.length > 0) || 'Please type something',
									]"
									v-model="userFirstName"
								/>
							</div>

							<div class="col q-pl-md">
								<q-input
									filled
									label="Your Last Name *"
									lazy-rules
									:rules="[
										(val) => (val && val.length > 0) || 'Please type something',
									]"
									v-model="userLastName"
								/>
							</div>
						</div>
						<div class="row col-md-12 q-gutter-sm">
							<div class="col">
								<q-input
									filled
									label="Your Email *"
									lazy-rules
									:rules="[
										(val) => (val && val.length > 0) || 'Please type something',
									]"
									v-model="userEmail"
								>
								</q-input>
							</div>
							<div class="col q-pl-md">
								<q-input
									filled
									label="Your password *"
									:type="isPwd ? 'password' : 'text'"
									lazy-rules
									:rules="[
										(val) => (val && val.length > 0) || 'Please type something',
									]"
									v-model="userPassword"
								>
									<template v-slot:append>
										<q-icon
											:name="isPwd ? 'visibility_off' : 'visibility'"
											class="cursor-pointer"
											@click="isPwd = !isPwd"
										/>
									</template>
								</q-input>
							</div>
						</div>
						<div class="row col-md-12 q-gutter-sm">
							<div class="col">
								<q-input
									filled
									type="textarea"
									label="Descripiton *"
									lazy-rules
									:rules="[
										(val) => (val && val.length > 0) || 'Please type something',
									]"
									v-model="userDescription"
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
import Modal from "../Dialogs/Modal.vue";

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
		name: "firstName",
		label: "First Name",
		align: "left",
		field: "firstName",
		sortable: true,
		classes: "tr_width__name ellipsis",
	},
	{
		name: "lastName",
		label: "Last Name",
		align: "left",
		field: "lastName",
		sortable: true,
		classes: "tr_width__name ellipsis",
	},
	{
		name: "email",
		label: "Email",
		align: "left",
		field: "email",
		sortable: true,
		classes: "tr_width__email ellipsis",
	},
	{
		name: "password",
		label: "Password",
		align: "left",
		field: "password",
		sortable: false,
		classes: "tr_width ellipsis",
	},
	{
		name: "description",
		label: "Description",
		align: "left",
		field: "description",
		sortable: false,
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
	components: { Modal },
	setup() {
		const store = useStore();
		const $q = useQuasar();
		const opendDialog = ref(false);
		const isPwd = ref(true);
		const openAddUserDialog = ref(false);
		const userObj = ref(null);
		const rowsData = ref([]);
		const editedIndex = ref(null);
		const userFirstName = ref("");
		const userLastName = ref("");
		const userEmail = ref("");
		const userPassword = ref("");
		const userDescription = ref("");
		const confirm = (item) => {
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
		const allUsers = async () => {
			// fetch All Users
			await store.dispatch("appUsers/fetchUsers");
			const getUsers = computed(() => store.getters["appUsers/allUsers"]);
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
						description: item.Description,
					};
				})
			));
		};
		allUsers();

		const AddUser = () => {
			openAddUserDialog.value = "";
			userFirstName.value = "";
			userLastName.value = "";
			userEmail.value = "";
			userPassword.value = "";
			userDescription.value = "";
		};
		const onSubmitAdd = async () => {
			const userData = {
				firstName: userFirstName.value,
				lastName: userLastName.value,
				email: userEmail.value,
				password: userPassword.value,
				description: userDescription.value,
			};

			try {
				await store.dispatch("appUsers/addUser", userData);
				await allUsers();
				(userFirstName.value = ""),
					(userLastName.value = ""),
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
				id: userObj.value[0],
				firstName: userObj.value[2],
				lastName: userObj.value[3],
				email: userObj.value[4],
				password: userObj.value[5],
				description: userObj.value[6],
			};

			try {
				await store.dispatch("appUsers/updateUser", userData);
				await allUsers();
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
			return (openAddUserDialog.value = false);
		};
		const onResetAdd = () => {
			return (openAddUserDialog.value = false);
		};
		const editRow = (currentTarget) => {
			opendDialog.value = true;
			userObj.value = Object.values(currentTarget);
		};
		const deleteRow = async (currentTarget) => {
			try {
				const userID = Object.values(currentTarget)[0];
				await store.dispatch("appUsers/removeUser", userID);
				await allUsers();
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
			isPwd,
			confirm,
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
			userPassword,
			userDescription,
			password: ref(""),
		};
	},
};
</script>
<style lang="sass">
.table_header
  background-color: $secondary !important
  color: $primary !important
</style>
