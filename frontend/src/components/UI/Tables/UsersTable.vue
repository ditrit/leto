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
				<AvatarImg :source="props.row.avatar" />
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
								label="Descripiton *"
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
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import Modal from "../Dialogs/Modal.vue";
import useFileData from "../../../composables/Forms/userFileData";
import FileUploader from "../Form/FileUploader.vue";
import globalAvatar from "../../../assets/profil.png";
import AvatarImg from "components/UI/Images/AvatarImg.vue";

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
	components: { Modal, FileUploader, AvatarImg },
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
		const userAvatar = ref("");
		let { imagesUID, avatarUrl, uploadFile } = useFileData();

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
			await store.dispatch("appUsers/fetchUsers");
			const getUsers = computed(() => store.getters["appUsers/allUsers"]);
			rowsData.value = Object.values(
				getUsers.value.map((item) => {
					return {
						id: item.ID,
						avatar: item.Logo,
						firstName: item.FirstName,
						lastName: item.LastName,
						email: item.Email,
						password: item.Password,
						description: item.Description,
					};
				})
			);
		};
		allUsers();

		const AddUser = () => {
			openAddUserDialog.value = "";
			userFirstName.value = "";
			userLastName.value = "";
			userAvatar.value = "";
			userEmail.value = "";
			userPassword.value = "";
			userDescription.value = "";
		};
		const onSubmitAdd = async () => {
			const userData = {
				firstName: userFirstName.value,
				lastName: userLastName.value,
				logo: avatarUrl.value,
				email: userEmail.value,
				password: userPassword.value,
				description: userDescription.value,
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
				id: userObj.value[0],
				firstName: userObj.value[2],
				lastName: userObj.value[3],
				logo: avatarUrl.value,
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
			openAddUserDialog.value = false;
		};
		const onResetAdd = () => {
			openAddUserDialog.value = false;
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
			userAvatar,
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
			imagesUID,
			avatarUrl,
			uploadFile,
			globalAvatar,
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
