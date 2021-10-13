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
								:options="options"
								label="Team Parent"
								v-model="teamParent"
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
						:allTags="tags"
						:teamMembers="teamMembers"
						:teamLibraries="teamLibraries"
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
		const optionsSelections = ref([]);
		const options = ref([]);
		const tags = ref([]);
		const $q = useQuasar();
		const text = ref("");
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
		const fetchTeams = store.dispatch("appTeams/fetchAllTeams");
		const fetchTags = store.dispatch("appTags/fetchAllTags");

		const allTeams = computed(() => store.getters["appTeams/allTeams"]);
		console.log("allTeams: ", allTeams.value);

		const getTagsNames = async () => {
			const allTags = await store.getters["appTags/allTags"];
			const data = await allTags.map((tag) => tag.Name);
			return (tags.value = data);
		};
		getTagsNames();

		optionsSelections.value = allTeams.value.map((payload) => {
			return {
				name: payload.Name,
				id: payload.ID,
				parentName: payload?.Parent?.Name,
				parentId: payload.ParentID,
			};
		});
		let unique = optionsSelections.value.map((item) => item.name);
		options.value = [...new Set(unique)].filter((item) => item != null);

		const getTeamParentId = () => {
			const obj = Object.values(optionsSelections.value);
			let findId = obj.find((item) => item.name === teamParent.value);
			console.log("parent Team Id: ", findId);
			return (domainID.value = findId.id);
		};

		return {
			step: ref(1),
			model: ref(null),
			fetchTeams,
			fetchTags,
			optionsSelections,
			options,
			domainID,
			tags,
			teamMembers,
			teamLibraries,
			teamEnvironnements,
			onRejected,
			text,
			store,
			name,
			teamParent,
			shortDescription,
			description,

			onSubmit() {
				const newDomain = {
					id: getTeamParentId(),
					name: name.value,
					teamParent: teamParent.value,
					shortDescription: shortDescription.value,
					description: description.value,
					// tags: tags.value,
				};
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
