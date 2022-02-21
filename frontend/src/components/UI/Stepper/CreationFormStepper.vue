<template>
	<div class="q-pa-md stepper_wrapper">
		<q-form
			@submit="step === 3 ? onSubmit() : $refs.stepper.next()"
			class="q-gutter-md"
		>
			<q-stepper
				v-model="step"
				ref="stepper"
				animated
				active-color="purple"
				class="col col-md-12"
			>
				<q-step :name="1" prefix="1" title="">
					<div class="row col-md-12 q-gutter-md">
						<div class="col">
							<q-input
								filled
								label="Name *"
								hint=""
								lazy-rules
								:rules="[
									(val) => (val && val.length > 0) || 'Please type something',
								]"
								v-model="name"
							/>
						</div>
						<q-img
							:src="avatarUrl"
							spinner-color="red"
							style="height: 140px; max-width: 150px"
						/>
						<div class="col">
							<q-select
								filled
								:options="optionsSelections"
								label="Workspace parent"
								v-model="selectedParentData"
							/>
						</div>
					</div>
					<div class="row">
						<div class="col">
							<q-input
								filled
								label="Short description"
								lazy-rules
								:rules="[
									(val) => (val && val.length > 0) || 'Please type something',
								]"
								v-model="shortDescription"
							/>
						</div>
					</div>
					<div class="row q-gutter-md">
						<div class="col col-md-8">
							<q-input
								filled
								type="textarea"
								label="Description"
								v-model="description"
							/>
						</div>
						<!-- <div class="col">
							<q-uploader
								name="file"
								style="max-width: 100%"
								label="Your Logo"
								accept=".jpg, svg, image/*"
								@rejected="onRejected"
								color="primary"
								:factory="uploadSingleFile"
							/>
						</div> -->
						<div class="col">
							<q-uploader
								style="max-width: 100%"
								label="Your Logo"
								multiple
								accept=".jpg, svg, image/*"
								@rejected="onRejected"
								color="primary"
								:factory="uploadFile"
								@uploaded="onFileUpload"
							/>
						</div>
					</div>
				</q-step>

				<q-step :name="2" prefix="2" title="">
					<Tabs
						v-if="optionsSelections.length"
						:allTags="null"
						:teamProducts="
							selectedParentData.products ? selectedParentData.products : null
						"
						:teamMembers="selectedParentData.authorizations"
						:teamLibraries="selectedParentData.libraries"
						:teamEnvironnements="selectedParentData.environments"
					/>
				</q-step>

				<q-step :name="3" prefix="3" title="">
					<div class="row q-mt-md">
						<div class="col col-md-12 text-center">
							<h4>Your Data is ready to be sent</h4>
						</div>
					</div>
				</q-step>

				<template v-slot:navigation>
					<q-stepper-navigation>
						<div class="flex justify-center">
							<q-btn
								v-if="step <= 2"
								@click="$refs.stepper.next()"
								color="positive"
								label="Next"
								style="padding: 15px 50px"
							/>
							<q-btn
								v-if="step >= 3"
								type=""
								@click="$refs.creationDialog"
								color="positive"
								label="Ok"
								style="padding: 15px 50px"
								v-close-popup
							/>

							<q-btn
								v-if="step > 1"
								unelevated
								@click="$refs.stepper.previous()"
								label="Back"
								class="q-ml-sm"
							/>
						</div>
					</q-stepper-navigation>
				</template>
			</q-stepper>
		</q-form>
	</div>
</template>
<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import API from "../../../services";
import { v4 as uuidv4 } from "uuid";
import Tabs from "../TabPanels/Tabs";

export default {
	components: { Tabs },

	/**
	 * TODO
	 * 	1 - Add props and get aldomaies data from TeamPage
	 */

	setup() {
		const store = useStore();
		const route = useRouter();
		const imagesUID = uuidv4();
		const name = ref("");
		const teamParent = ref("");
		const domainID = ref("");
		const shortDescription = ref("");
		const description = ref("");
		const selectedParentData = ref(null);
		const optionsSelections = ref(null);
		const options = ref([]);
		const SelectedDomain = ref([]);
		const $q = useQuasar();
		const avatarUrl = ref("");

		function onRejected(rejectedEntries) {
			$q.notify({
				type: "negative",
				message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
			});
		}
		/**
		 * TODO
		 * 	2 - regroupe functions by thematique
		 */

		// const uploadSingleFile = (file) => {
		// 	const formData = new FormData();
		// 	formData.append("id", imagesUID);
		// 	formData.append("file", file[0], file[0].name);
		// 	API.post(`http://localhost:5000/file/`, formData).then((res) => {
		// 		avatarUrl.value = res.request.responseURL;
		// 		console.log("avatarUrl.value: ", avatarUrl.value);
		// 		console.log(res);
		// 	});
		// 	console.log("formData: ", formData);
		// 	console.log("file: ", file);
		// };
		const uploadFile = async (file) => {
			const formData = new FormData();
			formData.append("id", imagesUID);
			formData.append("file", file[0], file[0].name);
			await API.post(`/file/${imagesUID}`, formData).then((res) => {
				// avatarUrl.value = res.request.responseURL;

				console.log("avatarUrl.value: ", avatarUrl.value);
				console.log("res", res);
				console.log("res.config.url", res.config.url);
			});
			console.log("formData: ", formData);
			console.log("file: ", file);
			getFile();
		};

		const getFile = async () => {
			let target = await API.get(`file/${imagesUID}`);
			console.log("target: ", target);
			console.log("responseURL: ", target.request.responseURL);
			return (avatarUrl.value = target.request.responseURL);
		};

		const getAllDomains = async () => {
			await store.dispatch("appDomain/fetchAllDomaines");
			const getDomaies = computed(() => store.getters["appDomain/allDomaines"]);
			console.log("getDomaies: ", getDomaies.value);
			// Get input Select options value
			let dataReturned = getDomaies.value.map((payload) => {
				return {
					id: payload.ID,
					name: payload.Name,
					label: payload.Name,
					value: payload.Name,
					parentName: payload?.Name,
					parentId: payload?.ParentID,
					authorizations: payload?.Authorizations,
					libraries: payload?.Libraries,
					products: payload?.Products,
					environments: payload?.Environments,
				};
			});
			console.log("dataReturned from stepper: ", [...dataReturned]);
			optionsSelections.value = [...new Set(dataReturned)].filter(
				(item) => item != null
			);
		};
		getAllDomains();

		// fetch Domaine tree
		const getDomainstree = async (id) => {
			await store.dispatch("appDomain/fetchDomainesTree");
			await store.getters["appDomain/allDomainesTree"];
			await route.push(`/workspaces/${id}`);
		};

		return {
			step: ref(1),
			selectedParentData,
			SelectedDomain,
			optionsSelections,
			options,
			domainID,
			onRejected,
			store,
			name,
			teamParent,
			shortDescription,
			description,
			avatarUrl,
			imagesUID,
			API,
			uploadFile,
			// uploadSingleFile,

			onFileUpload(event) {},

			onSubmit() {
				try {
					const newDomain = {
						pid: selectedParentData.value.id,
						name: name.value,
						teamParent: selectedParentData.value.parentName,
						shortDescription: shortDescription.value,
						description: description.value,
					};
					if (newDomain.name.length && newDomain.teamParent.length) {
						store.dispatch("appDomain/addDomain", newDomain);
						getDomainstree(newDomain.pid);

						$q.notify({
							type: "positive",
							message: "Your data was sent ",
						});
					}
				} catch (error) {
					$q.notify({
						type: "negative",
						message: "Your data was not sent ",
					});
				}
			},
		};
	},
};
</script>
<style lang="sass">
.stepper_wrapper .q-card
	max-width: 800px !important
	max-height: 100%
.q-stepper
	max-width: 800px !important
	max-height: 800px !important
	min-height: 500px !important
	box-shadow: none !important
.q-stepper__header--border
	border-bottom: none !important
.q-uploader
	max-width: 100% !important
	height: 100%
	max-height: 100%
.q-uploader__list
	// display: none
// .q-card__actions
// 	display: none
.q-stepper__dot
	width: 40px
	height: 40px
	background: #474262
.q-uploader__list
	.scroll,
	.scroll-x,
	.scroll-y
	overflow: hidden !important

.q-uploader__file--img
	height: 60px !important
</style>
