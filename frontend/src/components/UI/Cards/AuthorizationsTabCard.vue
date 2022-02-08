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
												authorizationIdRef,
												authorizationRoleIDRef,
												authorizationRoleNameRef,
												authorizationUserIDRef,
												authorizationNameRef,
												authorizationDomainIDRef,
												authorizationDomainNameRef,
											])
										"
									>
										<q-item-section class="action_card__item">
											<q-icon name="edit" size="1.5em" class="q-mr-sm" />Update
										</q-item-section>
									</q-item>
									<q-item
										clickable
										@click.prevent="
											confirmDeleteAuthorization(authorizationIdRef)
										"
									>
										<q-item-section class="action_card__item">
											<q-icon name="delete" size="1.5em" class="q-mr-sm" />
											Remove
										</q-item-section>
									</q-item>
								</q-list>
							</q-menu>
						</q-btn>
						<!-- Modification dialog -->
						<q-dialog v-model="isOpened" persistent position="bottom">
							<q-card style="width: 750px; max-width: 80vw">
								<q-card-section>
									<div class="text-h6 q-pa-md">
										{{ $t("edit_authorization") }}
									</div>
								</q-card-section>

								<q-card-section class="q-pt-none">
									<q-form
										@submit.stop="
											onSubmitUpdate([
												authorizationIdRef,
												authorizationRoleIDRef,
												authorizationRoleNameRef,
												authorizationUserIDRef,
												authorizationNameRef,
												authorizationDomainIDRef,
												authorizationDomainNameRef,
											])
										"
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
											<div class="col" disabled>
												<q-select
													disabled
													filled
													label="Domain"
													v-model="authorizationDomainNameRef"
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
		authorizationDomainName: { type: String },
		authorizationRoleID: { type: String },
		authorizationUserID: { type: String },
	},
	setup(props, { emit }) {
		const isOpened = ref(false);
		const domainList = ref(null);
		const authorizationDomainNameRef = ref(props.authorizationDomainName);
		const authorizationDomainIDRef = ref(props.authorizationDomainID);

		let {
			store,
			route,
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
			authorizationRoleRef,
			authorizationRoleNameRef,
			authorizationRoleIDRef,
			authorizationUserIDRef,
			getRolesList,
			getUsersList,
			confirmDeleteAuthorization,
		} = useAuthorizationsTabsData(props);

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

			return (authorizationDomainNameRef.value = choosenDomain.Name);
		};

		getDominListTable();

		const openEditionModal = (currentItem) => {
			isOpened.value = true;
			emit("openAuthorizationEditModal", currentItem);
		};

		const delteItem = async (id) => {
			emit("deleteAuthorizationAction", props);
			await store
				.dispatch("appAuthorization/removeAuthorization", id)
				.then(() => {
					refreshAuthorization(id);
				});
		};

		const refreshAuthorization = async (id) => {
			await store.dispatch("appAuthorization/fetchAuthorizationById", id);
			computed(() => {
				return store.getters["appAuthorization/allAuthorization"];
			});
		};
		const onSubmitUpdate = async (currentData) => {
			let updates = {
				id: currentData[0],
				domainID: currentData[5],
				roleID: currentData[2].id,
				userID: currentData[4].id,
			};

			(authorizationNameRef.value = currentData[4].label),
				(authorizationRoleNameRef.value = currentData[2].name),
				emit("updateAuthorizationAction", updates);

			await store
				.dispatch("appAuthorization/updateAuthorization", updates)
				.then(() => {
					refreshAuthorization(updates.id);
				})
				.then(() => {
					$q.notify({
						type: "positive",
						message: `${authorizationNameRef.value} authorization was succefuly updated`,
					});
				});
		};

		const onResetUpdate = () => {};

		const onFileUpload = (event) => {};

		const onRejected = (rejectedEntries) => {
			$q.notify({
				type: "negative",
				message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
			});
		};
		return {
			route,
			usersList,
			roleList,
			isOpened,
			openEditionModal,
			delteItem,
			onSubmitUpdate,
			onResetUpdate,
			onFileUpload,
			onRejected,
			confirmDeleteAuthorization,
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
			domainList,
			authorizationDomainNameRef,
		};
	},
};
</script>
<style lang="sass" scoped>
.action_card__item
	display: flex
	flex-direction: row
</style>
