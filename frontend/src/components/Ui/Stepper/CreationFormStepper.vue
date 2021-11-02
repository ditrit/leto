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
					<Tabs
						v-if="selectedParentData"
						:allTags="null"
						:teamProducts="selectedParentData.products"
						:teamMembers="selectedParentData.authorizations"
						:teamLibraries="selectedParentData.libraries"
						:teamEnvironnements="teamEnvironnements"
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
		const selectedParentData = ref(null);
		const optionsSelections = ref(null);
		const options = ref([]);
		const SelectedDomain = ref([]);
		const $q = useQuasar();

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
			};
		});
		// console.log("dataReturned: ", dataReturned);
		// optionsSelections.value = dataReturned;
		// console.log("selectedParentData: ", optionsSelections.value);
		optionsSelections.value = [...new Set(dataReturned)].filter(
			(item) => item != null
		);

		return {
			step: ref(1),
			selectedParentData,
			fetchDomaines,
			SelectedDomain,
			optionsSelections,
			options,
			domainID,
			teamEnvironnements,
			onRejected,
			store,
			name,
			teamParent,
			shortDescription,
			description,

			onSubmit() {
				try {
					const newDomain = {
						pid: selectedParentData.value.id,
						name: name.value,
						teamParent: selectedParentData.value.parentName,
						shortDescription: shortDescription.value,
						description: description.value,
						// authorizations: selectedParentData.value.authorizations,
						// libraries: selectedParentData.value.libraries,
						/* TODO  Whats is the heritage ?*/
						// products: selectedParentData.value.products,
					};
					if (newDomain.name.length && newDomain.teamParent.length) {
						store.dispatch("appDomain/addDomain", newDomain);
						console.log(newDomain);

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
