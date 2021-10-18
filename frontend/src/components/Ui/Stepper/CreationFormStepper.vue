<template>
	<div class="q-pa-md">
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
						<div class="col">
							<q-select
								filled
								:options="optionsSelections"
								label="Team Parent"
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
						<div class="col">
							<q-uploader
								style="max-width: 100%"
								url="http://localhost:8080/upload"
								label="Logo"
								multiple
								accept=".jpg, svg, image/*"
								@rejected="onRejected"
							/>
						</div>
					</div>
				</q-step>

				<q-step :name="2" prefix="2" title="">
					<q-badge color="secondary" multi-line>
						Model: "{{ selectedParentData }}"
					</q-badge>
					<Tabs
						:allTags="tags"
						:teamProducts="selectedParentData.products"
						:teamMembers="selectedParentData.authorizations"
						:teamLibraries="selectedParentData.libraries"
						:teamEnvironnements="teamEnvironnements"
					/>
				</q-step>

				<q-step :name="3" prefix="3" title="">
					<div class="row q-mt-md">
						<div class="col col-md-12">thank you</div>
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
								v-if="step > 2"
								type=""
								@click="$refs.stepper.close()"
								color="positive"
								label="Ok"
								style="padding: 15px 50px"
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
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import Tabs from "../TabPanels/Tabs";

export default {
	components: { Tabs },

	setup() {
		const store = useStore();
		const name = ref("");
		const teamParent = ref("");
		const domainID = ref("");
		const shortDescription = ref("");
		const description = ref("");
		const optionsSelections = ref(null);
		const options = ref([]);
		const SelectedDomain = ref([]);
		const tags = ref([]);
		const $q = useQuasar();
		const text = ref("");
		const domainProducts = ref([]);
		const domainAuthorizations = ref([]);
		const domainLibraries = ref([]);
		const teamMembers = ref([
			{
				id: 0,
				logo: "https://cdn.quasar.dev/img/parallax2.jpg",
				name: "Brahim",
				role: "Admin",
				description: "Ceci est une description",
			},
			{
				id: 1,
				logo: "https://cdn.quasar.dev/img/parallax2.jpg",
				name: "Sabine",
				role: "Dev",
				description: "Ceci est une description",
			},
			{
				id: 2,
				logo: "https://cdn.quasar.dev/img/parallax2.jpg",
				name: "Sophia",
				role: "DevOps",
				description: "Ceci est une description",
			},
			{
				id: 3,
				logo: "https://cdn.quasar.dev/img/parallax2.jpg",
				name: "Gabriel",
				role: "DevOps",
				description: "Ceci est une description",
			},
			{
				id: 4,
				logo: "https://cdn.quasar.dev/img/parallax2.jpg",
				name: "Anouk",
				role: "DevOps",
				description: "Ceci est une description",
			},
		]);
		const teamLibraries = ref([
			{
				id: 0,
				logo: "https://cdn.quasar.dev/img/parallax2.jpg",
				name: "Library 1",
				description: "Ceci est une description",
			},
			{
				id: 1,
				logo: "https://cdn.quasar.dev/img/parallax2.jpg",
				name: "Library 2",
				description: "Ceci est une description",
			},
			{
				id: 2,
				logo: "https://cdn.quasar.dev/img/parallax2.jpg",
				name: "Library 3",
				description: "Ceci est une description",
			},
			{
				id: 3,
				logo: "https://cdn.quasar.dev/img/parallax2.jpg",
				name: "Library 4",
				description: "Ceci est une description",
			},
			{
				id: 4,
				logo: "https://cdn.quasar.dev/img/parallax2.jpg",
				name: "Library 5",
				description: "Ceci est une description",
			},
			{
				id: 5,
				logo: "https://cdn.quasar.dev/img/parallax2.jpg",
				name: "Library 6",
				description: "Ceci est une  description",
			},
		]);
		const teamEnvironnements = ref([
			{
				id: 0,
				logo: "https://cdn.quasar.dev/img/parallax2.jpg",
				name: "Env 1",
				description: "Ceci est une description",
			},
			{
				id: 1,
				logo: "https://cdn.quasar.dev/img/parallax2.jpg",
				name: "Env 2",
				description: "Ceci est une description",
			},
			{
				id: 2,
				logo: "https://cdn.quasar.dev/img/parallax2.jpg",
				name: "Env 3",
				description: "Ceci est une description",
			},
			{
				id: 3,
				logo: "https://cdn.quasar.dev/img/parallax2.jpg",
				name: "Env 4",
				description: "Ceci est une description",
			},
			{
				id: 4,
				logo: "https://cdn.quasar.dev/img/parallax2.jpg",
				name: "Env 5",
				description: "Ceci est une description",
			},
			{
				id: 5,
				logo: "https://cdn.quasar.dev/img/parallax2.jpg",
				name: "Env 6",
				description: "Ceci est une  description",
			},
			{
				id: 6,
				logo: "https://cdn.quasar.dev/img/parallax2.jpg",
				name: "Env 7",
				description: "Ceci est une  description",
			},
		]);

		function onRejected(rejectedEntries) {
			$q.notify({
				type: "negative",
				message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
			});
		}
		/**
		 * TODO
		 * 	1 - regroupe functions by thematique
		 */

		// fetch All Domaines
		const fetchDomaines = store.dispatch("appDomain/fetchAllDomaines");
		const getDomaies = computed(() => store.getters["appDomain/allDomaines"]);
		console.log("getDomaies: ", getDomaies.value);

		// fetch All Tags
		const fetchTags = store.dispatch("appTags/fetchAllTags");
		// Get Domes names
		const getParentTags = async () => {
			const allTags = await store.getters["appTags/allTags"];
			const data = await allTags.map((tag) => tag.Name);
			return (tags.value = data);
		};

		// Get input Select options value
		optionsSelections.value = getDomaies.value.map((payload) => {
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
			};
		});
		// let unique = optionsSelections.value.map((item) => item.name);
		// //options.value = [...new Set(unique)].filter((item) => item != null);
		// options.value = unique;
		// console.log("options.value: ", options.value);

		// const getTeamParentData = async () => {
		// 	let availableDomaines = await optionsSelections.value;
		// 	let chosenTeamParent = await teamParent.value;
		// 	return (SelectedDomain.value = availableDomaines.value.filter(
		// 		(item) => item.name === chosenTeamParent.name
		// 	));
		// };
		// get alldomaines available
		// get the teamParent avalue
		// filter alldomaines by teamParent value
		// show the filter data in the second step on the form

		console.log(SelectedDomain.value);
		console.log("optionsSelections: ", optionsSelections.value);

		const getDomainParentId = () => {
			const obj = optionsSelections.value;
			let findId = obj.find((item) => item.name === teamParent.value);

			console.log("Team Id: ", findId.id);
			return (domainID.value = findId.id);
		};

		// const getTeamParentObj = async () => {
		// 	const data = await optionsSelections.value.filter(
		// 		(item) => item.id === domainID.value
		// 	);
		// 	console.log("data: ", data);
		// 	return data;
		// };

		console.log("domainID.value: ", domainID.value);
		// Fetch domain By ID
		const domainById = store.dispatch(
			"appDomain/fetchDomainById",
			domainID.value
		);
		console.log("domainById: ", domainById.value);
		console.log("teamParent: ", teamParent.value);

		const getDomainParentProducts = () => {
			let findParent = optionsSelections.value.find(
				(item) => item.name === teamParent.value
			);
			return (domainProducts.value = findParent.products);
		};
		console.log("domainProducts.value : ", domainProducts.value);

		return {
			step: ref(1),
			selectedParentData: ref(null),
			fetchDomaines,
			fetchTags,
			SelectedDomain,
			optionsSelections,
			getDomainParentId,
			options,
			domainID,
			tags,
			teamMembers,
			teamLibraries,
			teamEnvironnements,
			getParentTags,
			getDomainParentProducts,
			domainProducts,
			domainAuthorizations,
			domainLibraries,
			onRejected,
			text,
			store,
			name,
			teamParent,
			shortDescription,
			description,
			domainById,
			// getTeamParentData,
			// getTeamParentObj,

			onSubmit() {
				const newDomain = {
					pid: getDomainParentId(),
					name: name.value,
					teamParent: teamParent.value,
					shortDescription: shortDescription.value,
					description: description.value,
					// tags: tags.value,
				};
				// const newDomain = {
				// 	pid: 701720315569373200,
				// 	name: "Brahim",
				// 	teamParent: "root",
				// 	shortDescription: "Short",
				// 	description: "long",
				// };
				store.dispatch("appDomain/addDomain", newDomain);
				console.log(newDomain);
				$q.notify({
					type: "positive",
					message: "Your data was sent ",
				});
			},
		};
	},
};
</script>
<style lang="sass">
.q-card
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
.q-card__actions
	display: none
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
