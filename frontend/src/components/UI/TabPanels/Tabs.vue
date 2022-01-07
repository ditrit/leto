<template>
	<div class="col col-md-12">
		<q-card>
			<q-tabs
				v-model="tab"
				class="text-grey"
				active-color="primary"
				indicator-color="primary"
				align="justify"
				narrow-indicator
			>
				<q-tab v-if="tags" dense name="tags" label="Tags" icon="sell" />
				<q-tab dense name="products" label="Products" icon="apps" />
				<q-tab dense name="team_members" label="Authorizations" icon="group" />
				<q-tab dense name="libraries" label="Libraries" icon="library_books" />
				<q-tab dense name="environnements" label="Environnements" icon="code" />
			</q-tabs>
			<q-separator />

			<q-tab-panels v-model="tab" animated>
				<q-tab-panel name="tags">
					<ul class="cards_wrapper">
						<li v-for="(tag, index) in allTags" :key="index">{{ tag }}</li>
					</ul>
				</q-tab-panel>

				<q-tab-panel name="products" class="flex q-gutter-md">
					<div
						class="cards_wrapper"
						v-for="product in teamProducts"
						:key="product.ID"
					>
						<ActionCard
							v-if="product.Name"
							:id="product.ID"
							:name="product.Name"
							:description="product.ShortDescription"
							:logo="product.Logo"
						/>
					</div>
					<div class="panel_add__btn q-pa-md q-gutter-sm absolute-bottom-right">
						<q-btn
							color="white"
							text-color="primary"
							icon="add"
							class="text-primary"
							label="New product"
							@click.prevent="openCreationModal(teamProducts)"
						/>
					</div>
				</q-tab-panel>
				<q-tab-panel name="team_members" class="flex q-gutter-md">
					<div
						class="cards_wrapper"
						v-for="member in teamMembers"
						:key="member.ID"
					>
						<ActionCard
							v-if="member.User.LastName"
							:id="member.ID"
							:name="member.User.FirstName + ' ' + member.User.LastName"
							:role="member.Role.Name"
							:shortDescription="member.ShortDescription"
							:description="member.Description"
							:logo="member.Logo"
						/>
					</div>
					<div class="panel_add__btn q-pa-md q-gutter-sm absolute-bottom-right">
						<q-btn
							color="white"
							text-color="primary"
							icon="add"
							label="New Authorization"
							@click.prevent="openAuthorizsationCreationModal(teamMembers)"
						/>
					</div>

					<!-- Creation dialog -->
					<q-dialog v-model="isAuthorCreationOpened" persistent>
						<q-card style="width: 750px; max-width: 80vw">
							<q-card-section>
								<div class="text-h6 q-pa-md">{{ $t("add_authorization") }}</div>
							</q-card-section>

							<q-card-section class="q-pt-none">
								<q-form
									@submit.prevent="addNewAuthorization"
									@reset="onResetAuthorization"
									class="q-gutter-sm q-pa-md"
								>
									<q-select
										filled
										v-model="pickedUsers"
										:options="usersList"
										label="Choose a user"
									/>
									<q-select
										filled
										v-model="pickedRole"
										:options="roleList"
										label="Choose a role"
									/>

									<q-card-actions
										align="right"
										class="text-primary flex justify-center q-mt-lg q-pt-md"
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
				</q-tab-panel>

				<q-tab-panel name="libraries" class="flex q-gutter-md">
					<div
						class="cards_wrapper"
						v-for="library in teamLibraries"
						:key="library.ID"
					>
						<ActionCard
							v-if="library.Name"
							:id="library.ID"
							:name="library.Name"
							:description="library.ShortDescription"
							:logo="library.Logo"
						/>
					</div>
					<div class="panel_add__btn q-pa-md q-gutter-sm absolute-bottom-right">
						<q-btn
							color="white"
							text-color="primary"
							icon="add"
							label="New library"
							@click.prevent="openCreationModal(teamLibraries)"
						/>
					</div>
				</q-tab-panel>

				<q-tab-panel name="environnements" class="flex q-gutter-md">
					<div
						class="cards_wrapper"
						v-for="env in environmentTeam"
						:key="env.ID"
					>
						<ActionCard
							v-show="env.ID"
							:id="env.ID"
							:name="env.Name"
							:shortDescription="env.ShortDescription"
							:description="env.Description"
							:logo="env.Logo"
							:environmentTypeID="env.EnvironmentTypeID"
							:environmentTypeName="env.EnvironmentType.Name"
							:domainID="env.DomainID"
							@updateAction="updateEnvironement(env)"
							@deleteAction="confirmDeleteEnvironment"
						/>
					</div>
					<div class="panel_add__btn q-pa-md q-gutter-sm absolute-bottom-right">
						<q-btn
							color="white"
							text-color="primary"
							icon="add"
							label="New Environnement"
							@click.prevent="openCreationModal"
						/>
					</div>
					<!-- Creation dialog -->
					<q-dialog v-model="isCreationOpened" persistent>
						<q-card style="width: 750px; max-width: 80vw">
							<q-card-section>
								<div class="text-h6 q-pa-md">{{ $t("add_environment") }}</div>
							</q-card-section>

							<q-card-section class="q-pt-none">
								<q-form
									@submit.prevent="addNewEnvironment"
									@reset="onResetEnvironment"
									class="q-gutter-sm q-pa-md"
								>
									<div class="row col-md-12 q-gutter-md">
										<div class="col">
											<q-input
												filled
												label="Name *"
												hint=""
												lazy-rules
												:rules="[
													(val) =>
														(val && val.length > 0) || 'Please type something',
												]"
												v-model="environmentName"
											/>
										</div>
										<div class="col">
											<q-select
												filled
												:options="optionsSelections"
												label="Environment Type"
												v-model="selectedParentData"
											/>
										</div>
									</div>
									<q-input
										class="q-gutter-md"
										filled
										label="Short Description *"
										lazy-rules
										:rules="[
											(val) =>
												(val && val.length > 0) || 'Please type something',
										]"
										v-model="environmentShortDescription"
									/>

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
														(val && val.length > 0) || 'Please type something',
												]"
												v-model="environmentDescription"
											/>
										</div>
										<div class="col">
											<q-uploader
												style="max-width: 100%"
												url="http://localhost:3000/upload"
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
				</q-tab-panel>
			</q-tab-panels>
		</q-card>
	</div>
</template>
<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import ActionCard from "../Cards/ActionCard.vue";

export default {
	components: { ActionCard },
	emits: ["openModalToAddItem"],
	props: {
		allTags: {
			type: [],
			default: ["tag-1", "tag-2", "tag-3"],
		},
		teamMembers: {
			type: [],
			default: [
				{
					id: 0,
					logo: "https://cdn.quasar.dev/img/parallax2.jpg",
					name: "Brahim",
					role: "Admin",
					description:
						"Ceci est une description: molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis",
				},
				{
					id: 1,
					logo: "https://cdn.quasar.dev/img/parallax2.jpg",
					name: "Sabine",
					role: "Dev",
					description:
						"Ceci est une description: molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis",
				},
				{
					id: 2,
					logo: "https://cdn.quasar.dev/img/parallax2.jpg",
					name: "Sophia",
					role: "DevOps",
					description:
						"Ceci est une description: molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis",
				},
				{
					id: 3,
					logo: "https://cdn.quasar.dev/img/parallax2.jpg",
					name: "Gabriel",
					role: "DevOps",
					description:
						"Ceci est une description: molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis",
				},
				{
					id: 4,
					logo: "https://cdn.quasar.dev/img/parallax2.jpg",
					name: "Anouk",
					role: "DevOps",
					description:
						"Ceci est une description: molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis",
				},
			],
		},
		teamProducts: {
			type: [],
		},
		teamLibraries: {
			type: [],
			default: [
				{
					id: 0,
					logo: "https://cdn.quasar.dev/img/parallax2.jpg",
					name: "Library 1",
					description:
						"Ceci est une description: molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis",
				},
				{
					id: 1,
					logo: "https://cdn.quasar.dev/img/parallax2.jpg",
					name: "Library 2",
					description:
						"Ceci est une description: molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis",
				},
				{
					id: 2,
					logo: "https://cdn.quasar.dev/img/parallax2.jpg",
					name: "Library 3",
					description:
						"Ceci est une description: molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis",
				},
			],
		},
		teamEnvironnements: {
			type: [],
			default: [
				{
					id: 0,
					logo: "https://cdn.quasar.dev/img/parallax2.jpg",
					name: "Env 1",
					environmentTypeName: "EnvType",
					description:
						"Ceci est une description: molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis",
				},
				{
					id: 1,
					logo: "https://cdn.quasar.dev/img/parallax2.jpg",
					name: "Env 2",
					description:
						"Ceci est une description: molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis",
				},
				{
					id: 2,
					logo: "https://cdn.quasar.dev/img/parallax2.jpg",
					name: "Env 3",
					description:
						"Ceci est une description: molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis",
				},
			],
		},
	},
	setup(props, { emit }) {
		const store = useStore();
		const route = useRouter();
		const $q = useQuasar();
		const optionsSelections = ref(null);
		const selectedParentData = ref(null);
		const environmentName = ref("");
		const environmentShortDescription = ref("");
		const environmentDescription = ref("");
		const isCreationOpened = ref(false);
		const isAuthorCreationOpened = ref(false);
		const environmentTeam = ref(props.teamEnvironnements);

		const usersList = ref([]);
		const roleList = ref([]);
		const pickedUsers = ref("");
		const pickedRole = ref("");
		const openModal = (item) => {
			emit("openModalToAddItem", item);
		};

		const addNewAuthorization = async () => {};
		addNewAuthorization();

		const getUsersList = async () => {
			await store.dispatch("appUsers/fetchUsers");
			const list = computed(() => store.getters["appUsers/allUsers"]);
			console.log("Users list: ", list.value);
			usersList.value = list.value.map((user) => {
				return {
					id: user.ID,
					firstName: user.FirstName,
					lastName: user.LastName,
					email: user.Email,
					label: user.FirstName + " " + user.LastName,
					value: user.FirstName + " " + user.LastName,
					logo: user.Logo,
					description: user.Description,
				};
			});
			// pickedUsers.value = usersList.value.id;
			// console.log("pickedUsers.value: ", pickedUsers.value);
		};
		getUsersList();
		console.log("usersList.value: ", usersList.value);

		const getRolesList = async () => {
			await store.dispatch("appRoles/fetchAllRoles");
			const roles = computed(() => store.getters["appRoles/allRoles"]);
			console.log("Roles list: ", roles.value);
			roleList.value = roles.value.map((role) => {
				return {
					id: role.ID,
					name: role.Name,
					label: role.Name,
					value: role.Name,
					logo: role.Logo,
					shortDescription: role.ShortDescription,
					description: role.Description,
				};
			});
		};
		getRolesList();

		const confirmDeleteEnvironment = (props) => {
			$q.dialog({
				title: "Confirm",
				message: "Are you sure to delete this item?",
				cancel: true,
				persistent: true,
			})
				.onOk(() => {
					deleteEnvironement(props);
				})
				.onCancel(() => {
					console.log(">>>> Cancel");
				});
		};

		const openCreationModal = (props) => {
			isCreationOpened.value = true;
			emit("openNewItemModal", props);
			console.log("openCreationModal props: ", props);
		};
		const openAuthorizsationCreationModal = (props) => {
			isAuthorCreationOpened.value = true;
			emit("openNewItemModal", props);
			console.log("openCreationModal props: ", props);
		};

		const addNewEnvironment = async () => {
			console.log("selectedParentData", selectedParentData.value);
			let newEnvironment = {
				domainID: route.currentRoute.value.params.id,
				environmentTypeID: selectedParentData.value.id,
				environmentTypeName: selectedParentData.value.name,
				name: environmentName.value,
				shortDescription: environmentShortDescription.value,
				description: environmentDescription.value,
			};
			console.log("newEnvironment: ", newEnvironment);
			try {
				await store.dispatch("appEnvironment/addEnvironment", newEnvironment);
				await refreshEnvironments();
				$q.notify({
					type: "positive",
					message: `${environmentName.value} environment was succefuly created`,
				});
			} catch (error) {
				$q.notify({
					type: "negative",
					message: `${environmentName.value} environment was not created`,
				});
			}
			selectedParentData.value = "";
			environmentName.value = "";
			environmentShortDescription.value = "";
			environmentDescription.value = "";
		};
		const deleteEnvironement = async (evironment) => {
			await store.dispatch("appEnvironment/removeEnvironment", evironment.id);
			// await store.dispatch("appDomain/fetchDomainesTree");
			// let getDomainTree = await store.getters["appDomain/allDomainesTree"];
			// console.log("getDomainTree: ", getDomainTree);
			refreshEnvironments();
		};
		const updateEnvironement = async (evironment) => {
			console.log("props is: ", props, evironment.id);
			await store.dispatch("appEnvironment/updateEnvironment", evironment);
			refreshEnvironments();
		};

		// Refrech tabs items data
		const refreshEnvironments = async () => {
			await store.dispatch("appEnvironment/fetchAllEnvironments");
			let data = store.getters["appEnvironment/allEnvironments"];
			environmentTeam.value = data;
		};

		const getAllEnviTypes = async () => {
			await store.dispatch("appEnviType/fetchAllEnviTypes");
			const allEnviTypes = computed(
				() => store.getters["appEnviType/allEnviTypes"]
			);
			console.log("allEnviTypes: ", allEnviTypes.value);
			// Get input Select options value

			let dataReturned = allEnviTypes.value.map((payload) => {
				return {
					id: payload.ID,
					name: payload.Name,
					label: payload.Name,
					value: payload.Name,
					parentName: payload?.Name,
					shortDescription: payload.ShortDescription,
					description: payload.Description,
					logo: payload.Logo,
				};
			});
			console.log("dataReturned from form: ", [...dataReturned]);
			// optionsSelections.value = dataReturned;

			optionsSelections.value = [...new Set(dataReturned)].filter(
				(item) => item != null
			);
		};
		getAllEnviTypes();
		console.log("selectedParentData: ", optionsSelections.value);

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
			environmentTeam,
			tab: ref("environnements"),
			environmentName,
			environmentShortDescription,
			environmentDescription,
			openModal,
			isCreationOpened,
			isAuthorCreationOpened,
			addNewEnvironment,
			openCreationModal,
			openAuthorizsationCreationModal,
			updateEnvironement,
			deleteEnvironement,
			optionsSelections,
			selectedParentData,
			route,
			onFileUpload,
			onRejected,
			confirmDeleteEnvironment,
			usersList,
			roleList,
			pickedUsers,
			pickedRole,
			model: ref(null),
			options: ["BDDF", "GIMS", "SGCIB", "BHUFM", "GTS"],
		};
	},
};
</script>
<style lang="sass" scoped>
.q-tab-panel
	padding: 25px
</style>
