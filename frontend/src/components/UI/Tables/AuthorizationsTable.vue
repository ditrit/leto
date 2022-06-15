<template>
	<div class="q-pa-lg">
		<div class="flex justify-end">
			<q-btn
				color="white"
				text-color="primary"
				label="Add new Authorization"
				class="q-my-md"
				@click.prevent="addNewAuthorization"
			/>
		</div>
		<q-table
			:rows="rowsData"
			:columns="columns.colAuthorizations"
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
						@click.stop="editAuthorizationRow(props.row)"
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
		<Modal class="modalGlobal" v-model="openAddAuthorizationDialog">
			<template v-slot:ModalTitle> {{ $t("create_authorization") }} </template>
			<template v-slot:ModalContent>
				<q-form
					@submit.prevent="onSubmitAdd(props)"
					@reset="onResetAdd"
					class="q-gutter-md q-pa-md"
				>
					<div class="col-md-12">
						<div class="col q-gutter-md">
							<q-select
								filled
								:options="usersList"
								label="User"
								v-model="authorisationUser"
							/>

							<q-select
								filled
								:options="roleList"
								label="Role"
								v-model="authorizationRole"
							/>

							<q-select
								filled
								:options="domainList"
								label="Domain"
								v-model="authorizsationDomain"
							/>
						</div>
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
		<Modal class="modalGlobal" v-model="opendEditAuthorizationDialog">
			<template v-slot:ModalTitle>
				{{ $t("edit_authorization") }}
			</template>
			<template v-slot:ModalContent>
				<q-form
					@submit.prevent="onSubmitUpdate(props)"
					@reset="onResetUpdate"
					class="q-gutter-md q-pa-md"
				>
					<div class="col-md-12 q-gutter-md">
						<div class="col">
							<q-select
								filled
								:options="usersList"
								label="User*"
								v-model="authorizationObj[7]"
							/>
						</div>
						<div class="col">
							<q-select
								filled
								:options="roleList"
								label="Role*"
								v-model="authorizationObj[5]"
							/>
						</div>
						<div class="col">
							<q-select
								filled
								:options="domainList"
								label="Domain*"
								v-model="authorizationObj[3]"
							/>
						</div>
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

import useAuthorizationsTabsData from "../../../composables/TabPanels/useAuthorizationsTabsData";
import Modal from "../Dialogs/Modal.vue";
import AvatarImg from "components/UI/Images/AvatarImg.vue";
import columns from "./colums/index";

export default {
	components: { Modal, AvatarImg },
	setup(props) {
		const authorizationObj = ref(null);
		const rowsData = ref([]);
		const authorizsationDomain = ref(null);
		const authorisationUser = ref("");
		const authorizationRole = ref("");
		const domainList = ref(null);

		let {
			quasar,
			store,
			usersList,
			roleList,
			getUsersList,
			getRolesList,
			authorizationIdRef,
			authorizationNameRef,
			authorizationDomainIDRef,
			authorizationRoleRef,
			authorizationRoleNameRef,
			authorizationRoleIDRef,
			authorizationUserIDRef,
			opendEditAuthorizationDialog,
			openAddAuthorizationDialog,
		} = useAuthorizationsTabsData(props);

		const confirm = (item) => {
			quasar
				.dialog({
					title: "Confirm",
					message: "Are you sure to delete this item?",
					cancel: true,
					persistent: true,
				})
				.onOk(() => {
					deleteRow(item.ID);
				});
		};

		const allAuthorizations = async () => {
			await store.dispatch("appAuthorization/fetchAllAuthorizations");
			const getAuth = store.getters["appAuthorization/allAuthorizations"];
			rowsData.value = getAuth?.map((item) => {
				return {
					ID: item.ID,
					Logo: item.User.Logo,
					domainID: item.Domain.ID,
					Domain: item.Domain.Name,
					RoleID: item.RoleID,
					Role: item.Role.Name,
					UserID: item.UserID,
					User: item.User.FirstName + " " + item.User.LastName,
				};
			});
		};
		allAuthorizations();

		const addNewAuthorization = () => {
			openAddAuthorizationDialog.value = true;
		};
		const onSubmitAdd = async () => {
			const authorizationData = {
				DomainID: authorizsationDomain.value.ID,
				UserID: authorisationUser.value.ID,
				RoleID: authorizationRole.value.ID,
			};

			try {
				await store.dispatch(
					"appAuthorization/addAuthorization",
					authorizationData
				);
				await allAuthorizations();
				authorizsationDomain.value = "";
				authorisationUser.value = "";
				authorizationRole.value = "";
				quasar.notify({
					type: "positive",
					message: "Authorizsation has been successfully created",
				});
			} catch (error) {
				quasar.notify({
					type: "negative",
					message: "Sorry, authorizsation has not been created",
				});
			}
		};

		const onSubmitUpdate = async () => {
			const authorizationData = {
				ID: authorizationObj.value[0],
				DomainID: authorizationObj.value[3].ID,
				RoleID: authorizationObj.value[5].ID,
				UserID: authorizationObj.value[7].ID,
			};

			try {
				await store.dispatch(
					"appAuthorization/updateAuthorization",
					authorizationData
				);
				authorizsationDomain.value = "";
				authorisationUser.value = "";
				authorizationRole.value = "";
				await allAuthorizations();

				quasar.notify({
					type: "positive",
					message: "Authorizsation has been successfully updated",
				});
			} catch (error) {
				quasar.notify({
					type: "negative",
					message: "Sorry, authorizsation has not been updated",
				});
			}
		};
		const onResetUpdate = () => {
			openAddAuthorizationDialog.value = false;
		};
		const onResetAdd = () => {
			openAddAuthorizationDialog.value = false;
		};
		const editAuthorizationRow = (currentTarget) => {
			opendEditAuthorizationDialog.value = true;
			authorizationObj.value = Object.values(currentTarget);
		};
		const deleteRow = async (id) => {
			try {
				await store.dispatch("appAuthorization/removeAuthorization", id);
				await allAuthorizations();
				authorizsationDomain.value = "";
				authorisationUser.value = "";
				authorizationRole.value = "";
				quasar.notify({
					type: "positive",
					message: "Authorization has been successfully deleted",
				});
			} catch (error) {
				_q.notify({
					type: "negative",
					message: "Sorry, authorization has not been deleted",
				});
			}
		};

		const getDominListTable = async () => {
			await store.dispatch("appDomain/fetchAllDomaines");
			let data = store.getters["appDomain/allDomaines"];
			let choosenDomain = data?.find(
				(domain) => domain.ID === authorizationDomainIDRef.value
			);
			domainList.value = data?.map((domain) => {
				return {
					ID: domain.ID,
					Name: domain.Name,
					value: domain.Name,
					label: domain.Name,
				};
			});

			authorizsationDomain.value = choosenDomain;
		};

		getDominListTable();

		return {
			quasar,
			store,
			confirm,
			columns,
			rowsData,
			authorizationObj,
			addNewAuthorization,
			authorizsationDomain,
			authorisationUser,
			authorizationRole,
			editAuthorizationRow,
			deleteRow,
			onSubmitAdd,
			onSubmitUpdate,
			onResetUpdate,
			onResetAdd,
			opendEditAuthorizationDialog,
			openAddAuthorizationDialog,
			password: ref(""),
			isPwd: ref(true),
			usersList,
			roleList,
			domainList,
			getUsersList,
			getRolesList,
			authorizationIdRef,
			authorizationNameRef,
			authorizationDomainIDRef,
			authorizationRoleRef,
			authorizationRoleNameRef,
			authorizationRoleIDRef,
			authorizationUserIDRef,
		};
	},
};
</script>
<style lang="sass">
.table_header
  background-color: $secondary !important
  color: $primary !important
</style>
