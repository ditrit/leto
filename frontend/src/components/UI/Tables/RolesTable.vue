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
		<Modal class="modalGlobal" v-model="openAddRoleDialog" persistent>
			<template v-slot:ModalTitle> {{ $t("create_role") }} </template>
			<template v-slot:ModalContent>
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
					<div class="row col-md-12 q-gutter-sm">
						<div class="col-md-8">
							<q-input
								filled
								type="textarea"
								label="Description *"
								lazy-rules
								:rules="[
									(val) => (val && val.length > 0) || 'Please type something',
								]"
								v-model="roleDescription"
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
		<Modal class="modalGlobal" v-model="opendDialog">
			<template v-slot:ModalTitle> {{ $t("edit_role") }} </template>
			<template v-slot:ModalContent>
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
						v-model="roleObj[3]"
						label="Short Description *"
						lazy-rules
						:rules="[
							(val) => (val && val.length > 0) || 'Please type something',
						]"
					/>
					<div class="row col-md-12 q-gutter-sm">
						<div class="col-md-8">
							<q-input
								filled
								type="textarea"
								v-model="roleObj[4]"
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
	components: { Modal, FileUploader, AvatarImg },
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
		const roleDescription = ref("");
		let { imagesUID, avatarUrl, uploadFile } = useFileData();

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

		const allRoles = async () => {
			await store.dispatch("appRoles/fetchAllRoles");
			const getRoles = computed(() => store.getters["appRoles/allRoles"]);
			rowsData.value = Object.values(
				getRoles.value.map((item) => {
					return {
						id: item.ID,
						avatar: item.Logo,
						name: item.Name,
						shortDescription: item.ShortDescription,
						description: item.Description,
					};
				})
			);
		};
		allRoles();

		const AddRole = () => {
			openAddRoleDialog.value = true;
		};
		const onSubmitAdd = async () => {
			const roleData = {
				name: roleName.value,
				shortDescription: roleShortDescription.value,
				description: roleDescription.value,
				logo: avatarUrl.value,
			};
			console.log("roleData", roleData);

			try {
				await store.dispatch("appRoles/addRole", roleData);
				await allRoles();
				roleName.value = "";
				roleShortDescription.value = "";
				roleDescription.value = "";
				$q.notify({
					type: "positive",
					message: "Role has been successfully created",
				});
			} catch (error) {
				$q.notify({
					type: "negative",
					message: "Sorry, role has not been created",
				});
			}
		};

		const onSubmitUpdate = async () => {
			const roleData = {
				id: roleObj.value[0],
				name: roleObj.value[2],
				shortDescription: roleObj.value[3],
				description: roleObj.value[4],
				logo: avatarUrl.value,
			};
			console.log("roleObj: ", roleObj.value);

			try {
				await store.dispatch("appRoles/updateRole", roleData);
				await allRoles();
				$q.notify({
					type: "positive",
					message: "Role has been successfully updated",
				});
			} catch (error) {
				$q.notify({
					type: "negative",
					message: "Sorry, role has not been updated",
				});
			}
		};
		const onResetUpdate = () => {
			openAddRoleDialog.value = false;
		};
		const onResetAdd = () => {
			openAddRoleDialog.value = false;
		};
		const editRow = (currentTarget) => {
			opendDialog.value = true;
			roleObj.value = Object.values(currentTarget);
		};
		const deleteRow = async (currentTarget) => {
			try {
				const roleID = Object.values(currentTarget)[0];
				await store.dispatch("appRoles/removeRole", roleID);
				await allRoles();
				$q.notify({
					type: "positive",
					message: "Role has been successfully deleted",
				});
			} catch (error) {
				$q.notify({
					type: "negative",
					message: "Sorry, role has not been deleted",
				});
			}
		};

		return {
			confirm,
			editedIndex,
			columns,
			rowsData,
			roleObj,
			AddRole,
			roleName,
			roleShortDescription,
			roleDescription,
			editRow,
			deleteRow,
			onSubmitAdd,
			onSubmitUpdate,
			onResetUpdate,
			onResetAdd,
			opendDialog,
			openAddRoleDialog,
			imagesUID,
			avatarUrl,
			uploadFile,
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
