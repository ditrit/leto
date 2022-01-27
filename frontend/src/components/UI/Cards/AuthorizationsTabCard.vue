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
						<div class="text-h8 text-grey-8">
							{{ authorizationRoleRef }}
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
													authorizationIdRef,
													authorizationLogoRef,
													authorizationShortDescriptionRef,
													authorizationDescriptionRef,
													authorizationDomainIDRef,
												},
											])
										"
									>
										<q-item-section class="action_card__item">
											<q-icon name="edit" size="1.5em" class="q-mr-sm" />Update
										</q-item-section>
									</q-item>
									<q-item clickable @click.prevent="delteItem()">
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
										{{ `Edit ${authorizationNameRef}` }}
									</div>
								</q-card-section>

								<q-card-section class="q-pt-none">
									<q-form
										@submit.prevent="onSubmitUpdate(item)"
										@reset="onResetUpdate"
										class="q-gutter-sm q-pa-md"
									>
										<div class="row col-md-12 q-gutter-md">
											<div class="col">
												<q-input
													filled
													label="Name *"
													lazy-rules
													:rules="[
														(val) =>
															(val && val.length > 0) ||
															'Please type something',
													]"
													v-model="authorizationNameRef"
												/>
											</div>
											<div class="col">
												<q-select
													filled
													:options="optionsSelections"
													label="Role Type"
													v-model="selectedParentData"
												/>
											</div>
										</div>
										<div class="row col-md-12 q-gutter-md">
											<div class="col">
												<q-input
													filled
													label="Short Description *"
													lazy-rules
													:rules="[
														(val) =>
															(val && val.length > 0) ||
															'Please type something',
													]"
													v-model="authorizationShortDescriptionRef"
												/>
											</div>
										</div>
										<div class="row q-gutter-md">
											<div class="col col-md-8">
												<q-input
													class="q-gutter-md"
													filled
													type="textarea"
													label="Description *"
													lazy-rules
													:rules="[
														(val) =>
															(val && val.length > 0) ||
															'Please type something',
													]"
													v-model="authorizationDescriptionRef"
												/>
											</div>
											<div class="col">
												<q-uploader
													style="max-width: 100%"
													url="http://127.0.0.1:9203/ditrit/Gandalf/1.0.0/file/50"
													label="Your Logo"
													multiple
													accept=".jpg, svg, image/*"
													@rejected="onRejected"
													color="primary"
													factory
													files
													hide-upload-btn="true"
													auto-upload
													@uploaded="onFileUpload"
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
		authorizationId: { type: String },
		authorizationName: { type: String },
		authorizationLogo: {
			type: String,
			default: "https://cdn.quasar.dev/img/parallax2.jpg",
		},
		authorizationShortDescription: { type: String },
		authorizationDescription: { type: String },
		authorizationDomainID: { type: String },
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
		} = useAuthorizationsTabsData(props);

		const openEditionModal = (props) => {
			isOpened.value = true;
			emit("openEditModal", props);
		};

		const updateItem = () => {
			emit("updateAction", props);
		};
		const delteItem = () => {
			emit("deleteAction", props);
			console.log("props: ", props);
			console.table({
				id: props.id,
				domainID: props.domainID,
				environmentName: environmentName.value,
			});
		};

		const refreshEnvironment = async (id, updatesData) => {
			await store.dispatch("appEnvironment/fetchEnvironmentyId", id);
			let data = computed(() => {
				return store.getters["appEnvironment/allEnvironments"];
			});
			console.log("data: ", data.value);
			environmentNameRef.value = updatesData.name;
			environmentLogoRef.value = updatesData.logo;
			environmentShortDescriptionRef.value = updatesData.shortDescription;
			environmentDescriptionRef.value = updatesData.description;
			environmentTypeIDRef.value = updatesData.environmentTypeID;
			environmentDomainIDRef.value = updatesData.domainID;
		};
		const onSubmitUpdate = async () => {
			let updates = {
				id: props.id,
				domainID: props.domainID,
				name: environmentName.value,
				environmentName: environmentName.value,
				shortDescription: environmentShortDescription.value,
				description: environmentDescription.value,
				environmentTypeID: props.id,
				environmentTypeName: environmentTypeNameRef.value,
			};
			console.log("updates: ", updates);
			console.log("submitUpdateAction: ", updates);
			emit("updateAction", updates);
			await store
				.dispatch("appEnvironment/updateEnvironment", updates)
				.then(() => {
					refreshEnvironment(updates.id, updates);
				})
				.then(() => {
					$q.notify({
						type: "positive",
						message: `${updates.name} environment was succefuly updated`,
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
		};
	},
};
</script>
<style lang="sass" scoped>
.action_card__item
	display: flex
	flex-direction: row
</style>
