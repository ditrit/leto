<template>
	<div class="q-pa-lg">
		<div class="flex justify-end">
			<q-btn
				color="white"
				text-color="primary"
				label="Add new Authorization"
				class="q-my-md"
				@click.prevent="AddRole"
			/>
		</div>
		<q-table
			:key="updateKey"
			title=""
			:rows="rowsData"
			:columns="columns"
			row-key="domain"
			field
			table-header-class="table_header"
		>
			<template v-slot:body-cell-avatar="props">
				<!-- Modification Dialog -->
				<q-dialog v-model="opendEditAuthorizationDialog" persistent>
					<q-card style="width: 750px; max-width: 80vw">
						<q-card-section>
							<div class="text-h6 q-pa-md">{{ $t("edit_authorization") }}</div>
						</q-card-section>

						<q-card-section class="q-pt-none">
							<q-form
								@submit.prevent="onSubmitUpdate(props.row)"
								@reset="onResetUpdate"
								class="q-gutter-md q-pa-md"
							>
								<div class="col-md-12 q-gutter-md">
									<div class="col">
										<q-select
											filled
											:options="usersList"
											label="User*"
											v-model="props.row.user"
										/>
									</div>
									<div class="col">
										<q-select
											filled
											:options="roleList"
											label="Role*"
											v-model="props.row.role"
										/>
									</div>
									<div class="col">
										<q-select
											filled
											:options="domainList"
											label="Domain*"
											v-model="props.row.domain"
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
						@click="editRow"
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
		<q-dialog v-model="openAddAuthorizationDialog" persistent>
			<q-card style="width: 750px; max-width: 80vw">
				<q-card-section>
					<div class="text-h6 q-pa-md">{{ $t("create_authorization") }}</div>
				</q-card-section>

				<q-card-section class="q-pt-none">
					<q-form
						@submit.prevent="onSubmitAdd"
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
import useAuthorizationsTabsData from "../../../composables/TabPanels/useAuthorizationsTabs";

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
		classes: "tr_width__actions",
	},
];

export default {
	setup(props) {
		const store = useStore();
		const $q = useQuasar();
		const opendEditAuthorizationDialog = ref(false);
		const openAddAuthorizationDialog = ref(false);
		const authorizationObj = ref(null);
		const rowsData = ref([]);
		const editedIndex = ref(null);
		const authorizsationDomain = ref("");
		const authorisationUser = ref("");
		const authorizationRole = ref("");

		let {
			usersList,
			roleList,
			domainListNames,
			getUsersList,
			getRolesList,
			authorizationIdRef,
			authorizationNameRef,
			authorizationDomainIDRef,
			authorizationRoleRef,
			authorizationRoleNameRef,
			authorizationRoleIDRef,
			authorizationUserIDRef,
			domainList,
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

		const AddRole = () => {
			openAddAuthorizationDialog.value = true;
		};
		const onSubmitAdd = async () => {
			const authorizationData = {
				domainID: authorizsationDomain.value.domainId,
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

		const onSubmitUpdate = async (props) => {
			const authorizationData = {
				id: props.id,
				domainID: props.domain.domainId,
				roleID: props.role.id,
				userID: props.user.id,
			};
			try {
				await store.dispatch(
					"appAuthorization/updateAuthorization",
					authorizationData
				);
				await allAuthorizations();
				(authorizsationDomain.value = ""),
					(authorisationUser.value = ""),
					(authorizationRole.value = ""),
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
		const editRow = (currentTarget) => {
			opendEditAuthorizationDialog.value = true;
			const data = Object.values(currentTarget);
			authorizationObj.value = [data].map((item) => {
				return {
					id: item[0],
					logo: item[1],
					domainID: item[2],
					domain: item[3],
					roleID: item[4],
					role: item[5],
					userID: item[6],
					user: item[7],
				};
			});
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

		return {
			confirm,
			editedIndex,
			columns,
			rowsData,
			authorizationObj,
			AddRole,
			authorizsationDomain,
			authorisationUser,
			authorizationRole,
			editRow,
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
			domainListNames,
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