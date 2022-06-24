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
			:rows="rowsData"
			:columns="userColumns"
			:grid="$q.screen.xs"
			row-key="name"
			field
			table-header-class="table_header"
		>
			<template v-slot:body-cell-Logo="props">
				<AvatarImg :source="props.row.Logo" />
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
		<Modal
			class="modalGlobal"
			v-show="openAddUserDialog"
			v-model="openAddUserDialog"
			persistent
			position="bottom"
		>
			<template v-slot:ModalTitle> {{ $t("create_user") }} </template>
			<template v-slot:ModalContent>
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
						<div class="col-md-8">
							<q-input
								class="full-height"
								filled
								type="textarea"
								label="Description *"
								lazy-rules
								:rules="[
									(val) => (val && val.length > 0) || 'Please type something',
								]"
								v-model="userDescription"
							/>
						</div>
						<FileUploader @uploadAction="uploadFile" class="q-pl-md" />
					</div>
					<q-card-actions
						align="right"
						class="text-primary flex justify-center"
					>
						<q-btn type="reset" label="Cancel" v-close-popup />
						<q-btn label="Create" type="submit" color="primary" v-close-popup />
					</q-card-actions>
				</q-form>
			</template>
		</Modal>

		<!-- Modification Dialog -->
		<Modal
			class="modalGlobal"
			v-show="openDialog"
			v-model="openDialog"
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
									(val) => (val && val.length > 0) || 'Please type something',
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
									(val) => (val && val.length > 0) || 'Please type something',
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
									(val) => (val && val.length > 0) || 'Please type something',
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
									(val) => (val && val.length > 0) || 'Please type something',
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
						<div class="col-md-8">
							<q-input
								filled
								type="textarea"
								v-model="userObj[6]"
								label="Description *"
								lazy-rules
								:rules="[
									(val) => (val && val.length > 0) || 'Please type something',
								]"
							/>
						</div>
						<FileUploader @uploadAction="uploadFile" class="q-pl-md" />
					</div>
					<q-card-actions
						align="right"
						class="text-primary flex justify-center"
					>
						<q-btn type="reset" label="Cancel" v-close-popup />
						<q-btn label="Update" type="submit" color="primary" v-close-popup />
					</q-card-actions>
				</q-form>
			</template>
		</Modal>
	</div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import Modal from "../Dialogs/Modal.vue";
import useFileData from "../../../composables/Forms/userFileData";
import FileUploader from "../Form/FileUploader.vue";
import AvatarImg from "components/UI/Images/AvatarImg.vue";
import userColumns from "./colums/userColumns";

export default {
	components: { Modal, FileUploader, AvatarImg },
	setup() {
		const store = useStore();
		const $q = useQuasar();
		const openDialog = ref(false);
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
		const userLogo = ref("");
		let { imagesUID, logoUrl, uploadFile } = useFileData();

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
				});
		};
		const allUsers = async () => {
			await store.dispatch("appUsers/fetchUsers");
			const getUsers = store.getters["appUsers/allUsers"];
			rowsData.value = Object.values(
				getUsers.map((item) => {
					return {
						ID: item.ID,
						Logo: item.Logo,
						FirstName: item.FirstName,
						LastName: item.LastName,
						Email: item.Email,
						Password: item.Password,
						Description: item.Description,
					};
				})
			);
		};
		allUsers();

		const AddUser = () => {
			openAddUserDialog.value = true;
			userFirstName.value = "";
			userLastName.value = "";
			userLogo.value = "";
			userEmail.value = "";
			userPassword.value = "";
			userDescription.value = "";
		};
		const onSubmitAdd = async () => {
			const userData = {
				FirstName: userFirstName.value,
				LastName: userLastName.value,
				Logo: logoUrl.value,
				Email: userEmail.value,
				Password: userPassword.value,
				Description: userDescription.value,
			};

			try {
				await store.dispatch("appUsers/addUser", userData);
				await allUsers();
				userFirstName.value = "";
				userLastName.value = "";
				userEmail.value = "";
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
				ID: userObj.value[0],
				FirstName: userObj.value[2],
				LastName: userObj.value[3],
				Logo: logoUrl.value,
				Email: userObj.value[4],
				Password: userObj.value[5],
				Description: userObj.value[6],
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
			openAddUserDialog.value = false;
		};
		const onResetAdd = () => {
			openAddUserDialog.value = false;
		};
		const editRow = (currentTarget) => {
			openDialog.value = true;
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
			userColumns,
			rowsData,
			userObj,
			AddUser,
			userFirstName,
			userLastName,
			userLogo,
			userEmail,
			editRow,
			deleteRow,
			onSubmitAdd,
			onSubmitUpdate,
			onResetUpdate,
			onResetAdd,
			openDialog,
			openAddUserDialog,
			userPassword,
			userDescription,
			imagesUID,
			logoUrl,
			uploadFile,
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
