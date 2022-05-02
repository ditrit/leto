<template>
	<div class="col-12">
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
				<q-tab dense name="requirements" label="Requirements" icon="info" />
				<q-tab
					dense
					name="authorizations"
					label="Authorizations"
					icon="reduce_capacity"
				/>
				<q-tab dense name="libraries" label="Libraries" icon="library_books" />
				<q-tab
					v-if="environmentTeam"
					dense
					name="environnements"
					label="Environnements"
					icon="code"
				/>
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
						v-for="product in productTeam"
						:key="product.ID"
					>
						<div v-if="product.Logo">
							<ProductsTabCard
								v-if="product.Name"
								:id="product.ID"
								:domainID="product.DomainID"
								:name="product.Name"
								:shortDescription="product.ShortDescription"
								:description="product.Description"
								:logo="product.Logo"
								:repositoryURL="product.RepositoryURL"
								@deleteProductAction="confirmDeleteProduct(product.ID)"
							/>
						</div>
						<div v-else>
							<ProductsTabCard
								v-if="product.Name"
								:id="product.ID"
								:domainID="product.DomainID"
								:name="product.Name"
								:shortDescription="product.ShortDescription"
								:description="product.Description"
								:logo="logo"
								:repositoryURL="product.RepositoryURL"
								@deleteProductAction="confirmDeleteProduct(product.ID)"
							/>
						</div>
					</div>
					<div class="panel_add__btn q-pa-md q-gutter-sm absolute-bottom-right">
						<q-btn
							color="white"
							text-color="primary"
							icon="add"
							class="text-primary"
							label="New product"
							@click.prevent="openCreationProductModal(productTeam)"
						/>
					</div>
					<!-- Products Creation dialog -->
					<Modal class="modalGlobal" v-model="isCreationProductsOpened">
						<template v-slot:ModalTitle> {{ $t("add_product") }} </template>
						<template v-slot:ModalContent>
							<q-form
								@submit.prevent="addNewProduct"
								@reset="onResetProduct"
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
											v-model="productName"
										/>
									</div>
								</div>
								<q-input
									class="q-gutter-md"
									filled
									label="Short Description *"
									lazy-rules
									:rules="[
										(val) => (val && val.length > 0) || 'Please type something',
									]"
									v-model="productShortDescription"
								/>
								<q-input
									class="q-gutter-md"
									filled
									label="Repo *"
									lazy-rules
									:rules="[
										(val) => (val && val.length > 0) || 'Please type something',
									]"
									v-model="productProductRepositoryURL"
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
											v-model="productDescription"
										/>
									</div>
									<FileUploader @uploadAction="uploadFile" />
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
						</template>
					</Modal>
				</q-tab-panel>
				<q-tab-panel name="requirements" class="flex q-gutter-md">
					<div class="cards_wrapper">
						<RequirementsTabCard cardTitle="Groupe Name One" />
					</div>
				</q-tab-panel>

				<q-tab-panel name="authorizations" class="flex q-gutter-md">
					<div
						class="cards_wrapper"
						v-for="member in authorizationDomainObj"
						:key="member.ID"
					>
						<div v-if="member.Logo">
							<AuthorizationsTabCard
								v-if="member.User.LastName"
								:authorizationId="member.ID"
								:authorizationName="
									member.User.FirstName + ' ' + member.User.LastName
								"
								:authorizationRoleName="member.Role.Name"
								:authorizationShortDescription="member.User.Description"
								:authorizationDescription="member.User.Description"
								:authorizationLogo="member.Logo"
								:authorizationRoleID="member.Role.ID"
								:authorizationDomainID="member.DomainID"
								:authorizationUserID="member.User.ID"
								@deleteAuthorizationAction="
									confirmDeleteAuthorization(member.ID)
								"
							/>
						</div>
						<div v-else>
							<AuthorizationsTabCard
								v-if="member.User.LastName"
								:authorizationId="member.ID"
								:authorizationName="
									member.User.FirstName + ' ' + member.User.LastName
								"
								:authorizationRoleName="member.Role.Name"
								:authorizationShortDescription="member.User.Description"
								:authorizationDescription="member.User.Description"
								:authorizationLogo="logo"
								:authorizationRoleID="member.Role.ID"
								:authorizationDomainID="member.DomainID"
								:authorizationUserID="member.User.ID"
								@deleteAuthorizationAction="
									confirmDeleteAuthorization(member.ID)
								"
							/>
						</div>
					</div>
					<div class="panel_add__btn q-pa-md q-gutter-sm absolute-bottom-right">
						<q-btn
							color="white"
							text-color="primary"
							icon="add"
							label="New Authorization"
							@click.stop="
								openAuthorizsationCreationModal(authorizationDomainObj)
							"
						/>
					</div>
					<!-- Authorizations Creation dialog -->
					<Modal class="modalGlobal" v-model="isAuthorCreationOpened">
						<template v-slot:ModalTitle>
							{{ $t("add_authorization") }}
						</template>
						<template v-slot:ModalContent>
							<q-form
								@submit.prevent="onSubmitAuthorization"
								@reset="onResetAuthorization"
								class="q-gutter-sm q-pa-md"
							>
								<q-select
									filled
									v-model="authorizationNameRef"
									:options="usersList"
									label="Choose a user"
								/>
								<q-select
									filled
									v-model="authorizationRoleRef"
									:options="roleList"
									label="Choose a role"
								/>
								<div class="col" disabled>
									<q-select
										disabled
										filled
										label="Domain"
										v-model="authorizationDomainNameRef"
									/>
								</div>

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
						</template>
					</Modal>
				</q-tab-panel>

				<q-tab-panel name="libraries" class="flex q-gutter-md">
					<div
						class="cards_wrapper"
						v-for="library in libraryTeam"
						:key="library.ID"
					>
						<div v-if="library.Logo">
							<LibraryTabCard
								v-if="library.Name"
								:id="library.ID"
								:name="library.Name"
								:shortDescription="library.ShortDescription"
								:logo="library.Logo"
								@deleteAction="confirmDeleteLibrary(library.ID)"
							/>
						</div>
						<div v-else>
							<LibraryTabCard
								v-if="library.Name"
								:id="library.ID"
								:name="library.Name"
								:shortDescription="library.ShortDescription"
								:logo="logo"
								@deleteAction="confirmDeleteLibrary(library.ID)"
							/>
						</div>
					</div>
					<div class="panel_add__btn q-pa-md q-gutter-sm absolute-bottom-right">
						<q-btn
							color="white"
							text-color="primary"
							icon="add"
							label="New library"
							@click.prevent="openCreationLibraryModal(libraryTeam)"
						/>

						<Modal class="modalGlobal" v-model="isCreationLibraryOpened">
							<template v-slot:ModalTitle> {{ $t("add_library") }} </template>
							<template v-slot:ModalContent>
								<q-form
									@submit.prevent="addNewLibrary"
									@reset="onResetLibrary"
									class="q-gutter-sm q-pa-md"
								>
									<div class="col-md-12 q-gutter-md">
										<div class="col">
											<q-select
												filled
												:options="librariesList"
												label="Library"
												v-model="libraryName"
											/>
										</div>
										<div class="col" disabled>
											<q-select
												disabled
												filled
												label="Domain"
												v-model="domainNameRef"
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
							</template>
						</Modal>
					</div>
				</q-tab-panel>

				<q-tab-panel name="environnements" class="flex q-gutter-md">
					<div
						class="cards_wrapper"
						v-for="env in environmentTeam"
						:key="env.ID"
					>
						<div v-if="env.Logo">
							<EnvironemtsTabCard
								:id="env.ID"
								:domainID="env.DomainID"
								:name="env.Name"
								:shortDescription="env.ShortDescription"
								:description="env.Description"
								:logo="env.Logo"
								:environmentTypeName="env.EnvironmentType.Name"
								@deleteAction="confirmDeleteEnvironment(env.ID)"
							/>
						</div>
						<div v-else>
							<EnvironemtsTabCard
								:id="env.ID"
								:name="env.Name"
								:shortDescription="env.ShortDescription"
								:description="env.Description"
								:logo="env.logo"
								:domainID="env.DomainID"
								:environmentTypeName="env.EnvironmentType.Name"
								@deleteAction="confirmDeleteEnvironment(env.ID)"
							/>
						</div>
						<!-- Environments Creation dialog -->
						<Modal class="modalGlobal" v-model="isEnvironmentsCreationOpened">
							<template v-slot:ModalTitle>
								{{ $t("create_environment") }}
							</template>
							<template v-slot:ModalContent>
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
											label="Create"
											type="submit"
											color="primary"
											v-close-popup
										/>
									</q-card-actions>
								</q-form>
							</template>
						</Modal>
					</div>
					<div class="panel_add__btn q-pa-md q-gutter-sm absolute-bottom-right">
						<q-btn
							color="white"
							text-color="primary"
							icon="add"
							label="New Environnement"
							@click.prevent="openEnvironmentCreationModal(env)"
						/>
					</div>
				</q-tab-panel>
			</q-tab-panels>
		</q-card>
	</div>
</template>
<script>
import { ref, computed } from "vue";
import LibraryTabCard from "../Cards/LibraryTabCard.vue";
import EnvironemtsTabCard from "../Cards/EnvironemtsTabCard.vue";
import AuthorizationsTabCard from "../Cards/AuthorizationsTabCard.vue";
import ProductsTabCard from "../Cards/ProductsTabCard.vue";
import RequirementsTabCard from "../Cards/RequirementsTabCard.vue";
import useEnvironmentsTabsData from "../../../composables/TabPanels/useEnvironmentsTabsData";
import useAuthorizationsTabsData from "../../../composables/TabPanels/useAuthorizationsTabsData";
import useProductsTabData from "../../../composables/TabPanels/useProductsTabData";
import useLibraryTabData from "../../../composables/TabPanels/useLibraryTabData";
import Modal from "../Dialogs/Modal.vue";
import FileUploader from "../Form/FileUploader.vue";
import useFileData from "../../../composables/Forms/userFileData";

export default {
	components: {
		LibraryTabCard,
		EnvironemtsTabCard,
		ProductsTabCard,
		RequirementsTabCard,
		AuthorizationsTabCard,
		Modal,
		FileUploader,
	},
	emits: ["openModalToAddItem", "deleteAuthorizationAction"],
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
			default: [
				{
					id: 0,
					logo: "https://cdn.quasar.dev/img/parallax2.jpg",
					name: "Product 1",
					shortDescription: "Ceci est une courte description ",
					description:
						"Ceci est une description: molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis",
					repositoryURL: "https://github.com/ditrit/leto/projects/1",
				},
			],
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
					environmentTypeName: "EnvTypeName",
					environmentTypeID: "EnvTypeID",
					shortDescription:
						"Ceci est une description: molestiae quas vel sint commodi",
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
		let {
			store,
			route,
			$q,
			usersList,
			getUsersList,
			roleList,
			getRolesList,
			environmentName,
			addNewEnvironment,
			selectedParentData,
			deleteEnvironement,
			environmentShortDescription,
			environmentDescription,
			confirmDeleteEnvironment,
			getAllEnviTypes,
			optionsSelections,
			addNewAuthorization,
			environmentTeam,
		} = useEnvironmentsTabsData(props);

		let {
			productTeam,
			productName,
			productShortDescription,
			productDescription,
			productProductRepositoryURL,
			deleteProduct,
			confirmDeleteProduct,
			addNewProduct,
			updateProduct,
		} = useProductsTabData(props);

		let {
			librariesList,
			libraryTeam,
			libraryId,
			libraryName,
			libraryShortDescription,
			libraryDescription,
			confirmDeleteLibrary,
			addNewLibrary,
			updateLibrary,
			domainID,
		} = useLibraryTabData(props);

		let {
			authorizationNameRef,
			authorizationRoleRef,
			confirmDeleteAuthorization,
			authorizationDomainObj,
		} = useAuthorizationsTabsData(props);
		let { imagesUID, avatarUrl, uploadFile } = useFileData();

		const isEnvironmentsCreationOpened = ref(false);
		const isAuthorCreationOpened = ref(false);
		const isCreationProductsOpened = ref(false);
		const isCreationLibraryOpened = ref(false);
		const isModificationProductsOpened = ref(false);
		const isEnvironmentsModificationOpened = ref(false);
		const authorizationDomainNameRef = ref(null);

		const domainList = ref(null);
		const domainNameRef = ref(null);

		const openModal = (item) => {
			emit("openModalToAddItem", item);
		};
		const openEnvironmentCreationModal = () => {
			isEnvironmentsCreationOpened.value = true;
			emit("openNewItemModal", props);
		};

		const openCreationProductModal = () => {
			isCreationProductsOpened.value = true;
			emit("openNewItemModal", props);
		};
		const openCreationLibraryModal = () => {
			isCreationLibraryOpened.value = true;
			emit("openNewItemModal", props);
		};

		const openAuthorizsationCreationModal = () => {
			isAuthorCreationOpened.value = true;
			getDominListTab();
		};

		// Modifications
		const openModificationProductModal = () => {
			isModificationProductsOpened.value = true;
			emit("openNewItemModal", props);
		};

		const openModificationEnvironmentModal = () => {
			isEnvironmentsModificationOpened.value = true;
			emit("updateAction", props);
		};

		const onRejected = (rejectedEntries) => {
			$q.notify({
				type: "negative",
				message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
			});
		};

		// Use to get domain list for Authorization and Libraries Tab
		const getDominListTab = () => {
			store.dispatch("appDomain/fetchDomainById", domainID.value);
			let data = store.getters["appDomain/allDomaines"];
			authorizationDomainNameRef.value = data[0].Name;
			domainNameRef.value = data[0].Name;
		};
		getDominListTab();

		const refreshDomainAuthorizations = async (id) => {
			await store.dispatch("appDomain/fetchDomainById", id);
			let data = computed(() => {
				return store.getters["appDomain/allDomaines"];
			});
			let choosenDomain = data.value.find(
				(domain) => domain.ID === domainID.value
			);
			authorizationDomainObj.value = choosenDomain.Authorizations;
		};

		const onSubmitAuthorization = async () => {
			const authorizationData = {
				domainID: domainID.value,
				userID: authorizationNameRef.value.id,
				roleID: authorizationRoleRef.value.id,
			};
			try {
				await store
					.dispatch("appAuthorization/addAuthorization", authorizationData)
					.then(() => {
						refreshDomainAuthorizations(domainID.value).then(() => {
							authorizationNameRef.value = "";
							authorizationRoleRef.value = "";
						});
					});

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

		return {
			store,
			route,
			$q,
			productTeam,
			productName,
			productLogo: avatarUrl.value,
			productShortDescription,
			productDescription,
			productProductRepositoryURL,
			deleteProduct,
			confirmDeleteProduct,
			addNewProduct,
			updateProduct,
			environmentTeam,
			addNewAuthorization,
			getAllEnviTypes,
			getUsersList,
			getRolesList,
			domainID,
			authorizationDomainObj,
			tab: ref("authorizations"),
			environmentName,
			environmentShortDescription,
			environmentDescription,
			openModal,
			isEnvironmentsCreationOpened,
			openModificationEnvironmentModal,
			isEnvironmentsModificationOpened,
			isAuthorCreationOpened,
			isCreationProductsOpened,
			isModificationProductsOpened,
			openModificationProductModal,
			openCreationProductModal,
			addNewEnvironment,
			openEnvironmentCreationModal,
			openAuthorizsationCreationModal,
			deleteEnvironement,
			optionsSelections,
			selectedParentData,
			onRejected,
			confirmDeleteEnvironment,
			usersList,
			roleList,
			authorizationNameRef,
			authorizationRoleRef,
			authorizationDomainNameRef,
			onSubmitAuthorization,
			domainList,
			confirmDeleteAuthorization,
			openCreationLibraryModal,
			isCreationLibraryOpened,
			libraryTeam,
			libraryId,
			libraryName,
			libraryShortDescription,
			libraryDescription,
			confirmDeleteLibrary,
			addNewLibrary,
			updateLibrary,
			librariesList,
			domainNameRef,
			imagesUID,
			avatarUrl,
			uploadFile,
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
