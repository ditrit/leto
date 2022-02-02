<template>
	<div class="q-pa-md">
		<q-form @submit="onSubmit" class="q-gutter-md">
			<div class="row">
				<div class="col col-md-4 q-mr-md">
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
				<div class="col col-md-4 q-mr-md">
					<q-select
						filled
						:options="options"
						label="Workspace parent"
						v-model="teamParent"
					/>
				</div>
				<!-- <div class="col col-md-3">
					<q-uploader
						style="max-width: 192px"
						url="http://localhost:8080/upload"
						label="Logo"
						multiple
						accept=".jpg, svg, image/*"
						@rejected="onRejected"
					/>
				</div> -->
			</div>
			<div class="row q-mt-md">
				<div class="col col-md-12">
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
			<div class="row q-mt-md">
				<div class="col col-md-12">
					<q-input
						filled
						type="textarea"
						label="Description"
						v-model="description"
					/>
				</div>
			</div>
			<q-btn type="submit">Send...</q-btn>
		</q-form>
	</div>
</template>
<script>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useStore } from "vuex";

export default {
	setup() {
		const name = ref(null);
		const teamParent = ref(null);
		const shortDescription = ref(null);
		const description = ref(null);
		const store = useStore();
		const $q = useQuasar();
		const text = ref("");
		function onRejected(rejectedEntries) {
			$q.notify({
				type: "negative",
				message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
			});
		}

		return {
			step: ref(1),
			store,
			options: ["BDDF", "GIMS", "SGCIB", "BHUFM", "GTS"],
			onRejected,
			text,

			name,
			teamParent,
			shortDescription,
			description,

			onSubmit() {
				const newDomain = {
					name: name.value,
					teamParent: teamParent.value,
					shortDescription: shortDescription.value,
					description: description.value,
				};

				store.dispatch("appDomain/addDomain", newDomain);
				console.log("newDomain: ", newDomain);
			},
		};
	},
};
</script>
<style lang="sass">
.q-card
	width: 800px !important
.q-stepper
	width: 720px !important
	box-shadow: none !important
.q-stepper__header--border
	border-bottom: none !important
.q-uploader__list
	display: none
.q-card__actions
	display: none
.q-stepper__dot
	width: 40px
	height: 40px
	background: #474262
</style>
