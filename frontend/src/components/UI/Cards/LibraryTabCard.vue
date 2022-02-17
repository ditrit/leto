<template>
	<div class="row wrap">
		<q-card flat bordered class="item_card shadow-10">
			<q-card-section>
				<div class="row items-center no-wrap">
					<div>
						<q-img
							:src="logo"
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
						<div class="text-subtitle2 ellipsis">{{ name }}</div>
					</div>
					<div class="button_actions__container col-auto">
						<q-btn color="grey-7" round flat icon="more_vert">
							<q-menu cover auto-close>
								<q-list>
									<!-- <q-item
										clickable
										@click.prevent="
											openEditionModal([
												{
													id,
													name,
													role,
													environmentTypeName,
													logo,
													shortDescription,
													description,
													environmentTypeID,
													productRepositoryURL,
													domainID,
												},
											])
										"
									>
										<q-item-section class="action_card__item">
											<q-icon name="edit" size="1.5em" class="q-mr-sm" />Update
										</q-item-section>
									</q-item> -->
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
						<q-dialog v-model="isOpened" persistent position="bottom">
							<q-card style="width: 750px; max-width: 80vw">
								<q-card-section>
									<div class="text-h6 q-pa-md">{{ `Edit ${name}` }}</div>
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
													v-model="environmentName"
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
													v-model="environmentShortDescription"
												/>
											</div>
										</div>
										<div class="row col-md-12 q-gutter-md">
											<div class="col" v-if="environmentroductRepositoryURL">
												<q-input
													filled
													label="Repository URL *"
													lazy-rules
													:rules="[
														(val) =>
															(val && val.length > 0) ||
															'Please type something',
													]"
													v-model="environmentProductRepositoryURL"
												/>
											</div>
											<div class="col" v-else></div>
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
													v-model="environmentDescription"
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
				{{ shortDescription }}
			</q-card-section>
		</q-card>
	</div>
</template>
<script>
import { ref, computed } from "vue";
import { useQuasar } from "quasar";
import { useStore } from "vuex";

export default {
	emits: [
		"openEditModal",
		"deleteAction",
		"updateAction",
		"submitUpdateAction",
		"openNewItemModal",
	],
	props: {
		id: { type: String },
		logo: { type: String, default: "https://cdn.quasar.dev/img/parallax2.jpg" },
		name: { type: String },
		role: { type: String },
		shortDescription: { type: String },
		productRepositoryURL: { type: String },
		description: { type: String },
		environmentTypeID: { type: String },
		environmentTypeName: { type: String },
		domainID: { type: String },
	},
	setup(props, { emit }) {
		const store = useStore();
		const $q = useQuasar();
		const isOpened = ref(false);

		// const openEditionModal = (props) => {
		// 	isOpened.value = true;
		// 	emit("openEditModal", props);
		// };

		const updateItem = () => {
			emit("updateAction", props);
		};
		const delteItem = () => {
			emit("deleteAction", props);
		};

		const refreshEnvironment = async (id, updatesData) => {
			await store.dispatch("appEnvironment/fetchEnvironmentyId", id);
			let data = computed(() => {
				return store.getters["appEnvironment/allEnvironments"];
			});
			console.log("data: ", data.value);
			environmentName.value = updatesData.name;
			environmentLogo.value = updatesData.logo;
			environmentShortDescription.value = updatesData.shortDescription;
			environmentDescription.value = updatesData.description;
			environmentTypeIDRef.value = updatesData.environmentTypeID;
			environmentTypeName.value = updatesData.environmentType.Name;
			environmentDomainID.value = updatesData.domainID;
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
			};
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
			isOpened,
			// openEditionModal,
			updateItem,
			delteItem,
			onSubmitUpdate,
			onResetUpdate,
			onFileUpload,
			onRejected,
			lorem: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
		};
	},
};
</script>
<style lang="sass" scoped>
.action_card__item
	display: flex
	flex-direction: row
</style>
