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
						<div class="text-small tr_width__role ellipsis-2-lines text-grey-8">
							{{ role }}
						</div>
						<div class="text-h8 text-grey-8">
							{{ environmentTypeName }}
						</div>
						<div class="text-h8 text-grey-8 ellipsis">
							{{ repo }}
						</div>
						<div class="text-h8 text-grey-8 ellipsis">
							{{ productRepositoryURL }}
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
													v-model="itemName"
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
													v-model="itemShortDescription"
												/>
											</div>
										</div>
										<div class="row col-md-12 q-gutter-md">
											<div class="col" v-if="itemProductRepositoryURL">
												<q-input
													filled
													label="Repository URL *"
													lazy-rules
													:rules="[
														(val) =>
															(val && val.length > 0) ||
															'Please type something',
													]"
													v-model="itemProductRepositoryURL"
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
													v-model="itemDescription"
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
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import useEnvironmentsTabsData from "../../../composables/TabPanels/useEnvironmentTabs";

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
		const itemId = ref(props.id);
		const itemName = ref(props.name);
		const itemRepo = ref(props.repo);
		const itemLogo = ref(props.logo);
		const itemRole = ref(props.role);
		const itemShortDescription = ref(props.shortDescription);
		const itemDescription = ref(props.description);
		const itemProductRepositoryURL = ref(props.productRepositoryURL);
		const itemEnvironmentTypeID = ref(props.environmentTypeID);
		const itemEnvironmentTypeName = ref(props.environmentTypeName);
		const itemDomainID = ref(props.domainID);
		const isOpened = ref(false);

		let { refreshData } = useEnvironmentsTabsData(props);

		const openEditionModal = (props) => {
			isOpened.value = true;
			emit("openEditModal", props);
			console.log("props: ", props);
			console.log("itemName: ", itemName.value);
		};

		const updateItem = () => {
			emit("updateAction", props);
			console.table({
				id: props.id,
				domainID: props.domainID,
				itemName: itemName.value,
			});
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
		const onSubmitUpdate = async () => {
			let updates = {
				id: props.id,
				domainID: props.domainID,
				name: itemName.value,
				shortDescription: itemShortDescription.value,
				description: itemDescription.value,
				environmentTypeID: itemEnvironmentTypeID.value,
			};
			console.log("updates: ", updates);
			console.log("submitUpdateAction: ", props);
			emit("updateAction", {
				id: props.id,
				domainID: props.domainID,
				name: itemName.value,
				shortDescription: itemShortDescription.value,
				description: itemDescription.value,
				environmentTypeID: props.id,
			});
			// emit("submitUpdateAction", {
			// 	id: props.id,
			// 	domainID: props.domainID,
			// 	name: itemName.value,
			// 	shortDescription: itemShortDescription.value,
			// 	description: itemDescription.value,
			// 	environmentTypeID: props.id,
			// });
			// console.table({
			// 	id: props.id,
			// 	domainID: props.domainID,
			// 	name: itemName.value,
			// 	shortDescription: itemShortDescription.value,
			// 	description: itemDescription.value,
			// 	environmentTypeID: props.id,
			// });
			await store
				.dispatch("appEnvironment/updateEnvironment", {
					id: props.id,
					domainID: props.domainID,
					name: itemName.value,
					shortDescription: itemShortDescription.value,
					description: itemDescription.value,
					environmentTypeID: props.id,
				})
				.then(() => {
					refreshData();
				})
				.then(() => {
					$q.notify({
						type: "positive",
						message: `${environmentName.value} environment was succefuly updated`,
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
			itemId,
			itemName,
			itemLogo,
			itemRepo,
			itemRole,
			itemShortDescription,
			itemDescription,
			itemProductRepositoryURL,
			itemEnvironmentTypeID,
			itemEnvironmentTypeName,
			itemDomainID,
			openEditionModal,
			updateItem,
			delteItem,
			onSubmitUpdate,
			onResetUpdate,
			onFileUpload,
			onRejected,
			refreshData,
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
