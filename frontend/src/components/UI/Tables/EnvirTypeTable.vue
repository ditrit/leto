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
		<Modal class="modalGlobal" v-model="openAddEnviTypeDialog">
			<template v-slot:ModalTitle>
				{{ $t("create_environment_type") }}
			</template>
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
						<div class="col-md-8">
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
			<template v-slot:ModalTitle>
				{{ $t("edit_environment_type") }}
			</template>
			<template v-slot:ModalContent>
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
								(val) => (val && val.length > 0) || 'Please type something',
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
								(val) => (val && val.length > 0) || 'Please type something',
							]"
						/>
					</div>
					<div class="row">
						<div class="col-md-8">
							<q-input
								filled
								type="textarea"
								v-model="enviTypeObj[4]"
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
import columns from "./colums/enviTypeRoleColumns";

export default {
	components: { Modal, FileUploader, AvatarImg },
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
		let { imagesUID, logoUrl, uploadFile } = useFileData();

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

			rowsData.value = Object.values(
				getEnviTypes.value.map((item) => {
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
		allEnviTypes();

		const AddEnviType = () => {
			openAddEnviTypeDialog.value = true;
		};
		const onSubmitAdd = async () => {
			const enviTypeData = {
				name: enviTypeName.value,
				shortDescription: enviTypeShortDescription.value,
				description: enviTypeDescription.value,
				logo: logoUrl.value,
			};

			try {
				await store.dispatch("appEnviType/addEnviType", enviTypeData);
				await allEnviTypes();
				enviTypeName.value = "";
				enviTypeShortDescription.value = "";
				enviTypeDescription.value = "";
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
				logo: logoUrl.value,
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
			openAddEnviTypeDialog.value = false;
		};
		const onResetAdd = () => {
			openAddEnviTypeDialog.value = false;
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
			imagesUID,
			logoUrl,
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
