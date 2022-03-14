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
			title=""
			:rows="rowsData"
			:columns="columns"
			row-key="name"
			field
			table-header-class="table_header"
		>
			<template v-slot:body-cell-avatar="props">
				<q-td :props="props">
					<q-avatar size="26px">
						<img src="https://cdn.quasar.dev/img/boy-avatar.png" />
					</q-avatar>
				</q-td>
			</template>
			<template v-slot:body-cell-actionsButtons="props">
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
					<div class="col-md-12 q-gutter-md">
						<div class="col">
							<q-select
								filled
								:options="usersList"
								label="User"
								v-model="authorisationUser"
							/>
						</div>
						<div class="col">
							<q-select
								filled
								:options="roleList"
								label="Role"
								v-model="authorizationRole"
							/>
						</div>
						<div class="col">
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
	</div>
</template>

<script>
import { ref, computed, onUnmounted } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import useAuthorizationsTabsData from "../../../composables/TabPanels/useAuthorizationsTabs";
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
		classes: "tr_width__actions30",
	},

	{
		name: "user",
		label: "User",
		align: "left",
		field: "user",
		sortable: true,
		classes: "tr_width ellipsis",
	},
	{
		name: "role",
		label: "Role",
		align: "left",
		field: "role",
		sortable: true,
		classes: "tr_width ellipsis",
	},
	{
		name: "domain",
		label: "Domain",
		align: "left",
		field: "domain",
		sortable: true,
		classes: "tr_width ellipsis",
	},
	{
		name: "actionsButtons",
		label: "",
		align: "left",
		field: "actionsButtons",
		sortable: false,
		classes: "tr_width__actions40",
	},
];

export default {
	components: { Modal },
	setup(props) {
		const store = useStore();
		const $q = useQuasar();
		const authorizationObj = ref(null);
		const rowsData = ref([]);
		const authorizsationDomain = ref(null);
		const authorisationUser = ref("");
		const authorizationRole = ref("");
		const domainList = ref(null);

		let {
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
			$q.dialog({
				title: "Confirm",
				message: "Are you sure to delete this item?",
				cancel: true,
				persistent: true,
			})
				.onOk(() => {
					deleteRow(item.id);
				})
				.onCancel(() => {});
		};

		const allAuthorizations = async () => {
			// fetch All Users
			await store.dispatch("appAuthorization/fetchAllAuthorization");
			const getAuth = computed(
				() => store.getters["appAuthorization/allAuthorizations"]
			);

			return (rowsData.value = Object.values(
				getAuth.value.map((item) => {
					return {
						id: item.ID,
						avatar:
							"https://images.unsplash.com/photo-1637637498892-6b9801f4e5bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
						domainID: item.Domain.ID,
						domain: item.Domain.Name,
						roleID: item.RoleID,
						role: item.Role.Name,
						userID: item.UserID,
						user: item.User.FirstName + " " + item.User.LastName,
					};
				})
			));
		};
		allAuthorizations();

		const addNewAuthorization = () => {
			openAddAuthorizationDialog.value = true;
		};
		const onSubmitAdd = async () => {
			const authorizationData = {
				domainID: authorizsationDomain.value.id,
				userID: authorisationUser.value.id,
				roleID: authorizationRole.value.id,
			};

			try {
				await store.dispatch(
					"appAuthorization/addAuthorization",
					authorizationData
				);
				await allAuthorizations();
				(authorizsationDomain.value = ""),
					(authorisationUser.value = ""),
					(authorizationRole.value = ""),
					$q.notify({
						type: "positive",
						message: "Authorizsation has been successfully created",
					});
			} catch (error) {
				$q.notify({
					type: "negative",
					message: "Sorry, authorizsation has not been created",
				});
			}
		};

		const onSubmitUpdate = async () => {
			const authorizationData = {
				id: authorizationObj.value[0],
				domainID: authorizationObj.value[3].id,
				roleID: authorizationObj.value[5].id,
				userID: authorizationObj.value[7].id,
			};

			try {
				await store.dispatch(
					"appAuthorization/updateAuthorization",
					authorizationData
				);
				(authorizsationDomain.value = ""),
					(authorisationUser.value = ""),
					(authorizationRole.value = ""),
					await allAuthorizations();
				$q.notify({
					type: "positive",
					message: "Authorizsation has been successfully updated",
				});
			} catch (error) {
				$q.notify({
					type: "negative",
					message: "Sorry, authorizsation has not been updated",
				});
			}
		};
		const onResetUpdate = () => {
			return (openAddAuthorizationDialog.value = false);
		};
		const onResetAdd = () => {
			return (openAddAuthorizationDialog.value = false);
		};
		const editAuthorizationRow = (currentTarget) => {
			opendEditAuthorizationDialog.value = true;
			authorizationObj.value = Object.values(currentTarget);
		};
		const deleteRow = async (id) => {
			try {
				await store.dispatch("appAuthorization/removeAuthorization", id);
				await allAuthorizations();
				(authorizsationDomain.value = ""),
					(authorisationUser.value = ""),
					(authorizationRole.value = ""),
					$q.notify({
						type: "positive",
						message: "Authorization has been successfully deleted",
					});
			} catch (error) {
				$q.notify({
					type: "negative",
					message: "Sorry, authorization has not been deleted",
				});
			}
		};

		const getDominListTable = async () => {
			await store.dispatch("appDomain/fetchAllDomaines");
			let data = computed(() => store.getters["appDomain/allDomaines"]);
			let choosenDomain = data.value.find(
				(domain) => domain.ID === authorizationDomainIDRef.value
			);
			domainList.value = data.value.map((domain) => {
				return {
					id: domain.ID,
					name: domain.Name,
					value: domain.Name,
					label: domain.Name,
				};
			});

			return (authorizsationDomain.value = choosenDomain);
		};

		getDominListTable();

		return {
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
