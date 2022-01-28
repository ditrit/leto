<template>
	<div class="row wrap">
		<q-card flat bordered class="item_card shadow-10">
			<q-card-section>
				<div class="row items-center no-wrap">
					<div>
						<q-img
							:src="authorizationLogoRef"
							alt=""
							style="
								height: 38px;
								width: 38px;
								border-radius: 50%;
								margin-right: 10px;
							"
						/>
					</div>
					<div class="col">
						<div class="text-subtitle2 ellipsis">
							{{ authorizationNameRef }}
						</div>
						<div class="text-h8 text-grey-8 ellipsis">
							{{ authorizationRoleNameRef }}
						</div>
					</div>
					<div class="button_actions__container col-auto">
						<q-btn color="grey-7" round flat icon="more_vert">
							<q-menu cover auto-close>
								<q-list>
									<q-item
										clickable
										@click.prevent="
											openEditionModal([
												{
													authorizationNameRef,
													authorizationRoleRef,
													authorizationRoleNameRef,
													authorizationIdRef,
													authorizationLogoRef,
													authorizationShortDescriptionRef,
													authorizationDescriptionRef,
													authorizationDomainIDRef,
													authorizationUserIDRef,
												},
											])
										"
									>
										<q-item-section class="action_card__item">
											<q-icon name="edit" size="1.5em" class="q-mr-sm" />Update
										</q-item-section>
									</q-item>
									<q-item clickable @click.prevent="delteItem">
										<q-item-section class="action_card__item">
											<q-icon name="delete" size="1.5em" class="q-mr-sm" />
											Remove
										</q-item-section>
									</q-item>
								</q-list>
							</q-menu>
						</q-btn>
						<!-- Modification dialog -->
						<q-dialog v-model="isOpened" persistent>
							<q-card style="width: 750px; max-width: 80vw">
								<q-card-section>
									<div class="text-h6 q-pa-md">
										{{ $t("edit_authorization") }}
									</div>
								</q-card-section>

								<q-card-section class="q-pt-none">
									<q-form
										@submit.prevent="onSubmitUpdate(item)"
										@reset="onResetUpdate"
										class="q-gutter-sm q-pa-md"
									>
										<div class="col-md-12 q-gutter-md">
											<div class="col">
												<q-select
													filled
													:options="usersList"
													label="User"
													v-model="authorizationNameRef"
												/>
											</div>
											<div class="col">
												<q-select
													filled
													:options="roleList"
													label="Role"
													v-model="authorizationRoleNameRef"
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
					</div>
				</div>
			</q-card-section>
			<q-card-section class="ellipsis-2-lines">
				{{ authorizationShortDescriptionRef }}
			</q-card-section>
		</q-card>
	</div>
</template>
<script>
import { ref, computed } from "vue";
import useAuthorizationsTabsData from "../../../composables/TabPanels/useAuthorizationsTabs";

export default {
	emits: [
		"openAuthorizationEditModal",
		"deleteAuthorizationAction",
		"updateAuthorizationAction",
		"submitUpdateAuthorizationAction",
		"openNewItemModal",
	],
	props: {
		authorizationRole: { type: String },
		authorizationRoleName: { type: String },
		authorizationId: { type: String },
		authorizationName: { type: String },
		authorizationLogo: {
			type: String,
			default: "https://cdn.quasar.dev/img/parallax2.jpg",
		},
		authorizationShortDescription: { type: String },
		authorizationDescription: { type: String },
		authorizationDomainID: { type: String },
		authorizationRoleID: { type: String },
		authorizationUserID: { type: String },
	},
	setup(props, { emit }) {
		const isOpened = ref(false);

		let {
			store,
			$q,
			usersList,
			roleList,
			optionsSelections,
			selectedParentData,
			authorizationIdRef,
			authorizationNameRef,
			authorizationLogoRef,
			authorizationShortDescriptionRef,
			authorizationDescriptionRef,
			authorizationDomainIDRef,
			authorizationRoleRef,
			authorizationRoleNameRef,
			authorizationRoleIDRef,
			authorizationUserIDRef,
			getRolesList,
			getUsersList,
		} = useAuthorizationsTabsData(props);

		const openEditionModal = (props) => {
			isOpened.value = true;
			emit("openAuthorizationEditModal", props);
		};

		const updateItem = () => {
			emit("updateAuthorizationAction", props);
		};
		const delteItem = () => {
			emit("deleteAuthorizationAction", props);
			console.log("props: ", props);
			console.table({
				id: props.authorizationId,
				domainID: props.authorizationDomainID,
			});
		};

		const refreshAuthorization = async (id, updatesData) => {
			await store.dispatch("appAuthorization/fetchAuthorizationById", id);
			let data = computed(() => {
				return store.getters["appAuthorization/allAuthorization"];
			});
			console.log("data: ", data.value);
			authorizationIdRef.value = updatesData.id;
			authorizationDomainIDRef.value = updatesData.domainID;
			authorizationRoleIDRef.value = updatesData.roleID;
			authorizationUserIDRef.value = updatesData.authorizationUserID;
			authorizationRoleNameRef.value = updatesData.authorizationRoleName;
		};
		const onSubmitUpdate = async () => {
			let updates = {
				id: authorizationIdRef.value,
				domainID: authorizationDomainIDRef.value,
				roleID: authorizationRoleIDRef.value,
				userID: authorizationUserIDRef.value,
				roleName: authorizationRoleNameRef.value.name,
			};
			console.log("updates: ", updates);
			emit("updateAuthorizationAction", updates);
			console.log("submitUpdateAuthorizationAction: ", updates);
			await store
				.dispatch("appAuthorization/updateAuthorization", updates)
				.then(() => {
					refreshAuthorization(updates.id, updates);
				})
				.then(() => {
					$q.notify({
						type: "positive",
						message: `${authorizationNameRef} environment was succefuly updated`,
					});
				});
		};

		const onResetUpdate = () => {
			console.log("event: ", props.id);
		};

		const onFileUpload = (event) => {
			console.log("file name", event.files[0].name);
			console.log("file upload number", event.files[0].__uploaded);
			console.log("file Id", event.files[0].xhr.response);
		};

		const onRejected = (rejectedEntries) => {
			$q.notify({
				type: "negative",
				message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
			});
		};
		return {
			usersList,
			roleList,
			isOpened,
			openEditionModal,
			updateItem,
			delteItem,
			onSubmitUpdate,
			onResetUpdate,
			onFileUpload,
			onRejected,
			selectedParentData,
			optionsSelections,
			authorizationIdRef,
			authorizationNameRef,
			authorizationLogoRef,
			authorizationShortDescriptionRef,
			authorizationDescriptionRef,
			authorizationDomainIDRef,
			authorizationRoleRef,
			authorizationRoleNameRef,
			authorizationRoleIDRef,
			authorizationUserIDRef,
			getRolesList,
			getUsersList,
		};
	},
};
</script>
<style lang="sass" scoped>
.action_card__item
	display: flex
	flex-direction: row
</style>
