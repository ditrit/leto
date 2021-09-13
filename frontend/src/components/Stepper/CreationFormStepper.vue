<template>
	<div class="q-pa-md">
		<q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
			<q-stepper v-model="step" ref="stepper" animated active-color="purple">
				<q-step :name="1" prefix="1" title="">
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
								v-model="newDomaine.name"
							/>
						</div>
						<div class="col col-md-4 q-mr-md">
							<q-select
								filled
								:options="options"
								label="Team Parent"
								v-model="newDomaine.teamParent"
							/>
						</div>
						<div class="col col-md-3">
							<q-uploader
								style="max-width: 192px"
								url="http://localhost:8080/upload"
								label="Logo"
								multiple
								accept=".jpg, svg, image/*"
								@rejected="onRejected"
							/>
						</div>
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
								v-model="newDomaine.shortDescription"
							/>
						</div>
					</div>
					<div class="row q-mt-md">
						<div class="col col-md-12">
							<q-input
								filled
								type="textarea"
								label="Description"
								v-model="newDomaine.description"
							/>
						</div>
					</div>
				</q-step>

				<q-step :name="2" prefix="2" title=""> </q-step>

				<q-step :name="3" prefix="3" title=""> </q-step>

				<template v-slot:navigation>
					<q-stepper-navigation>
						<div class="flex justify-center">
							<q-btn
								@click="$refs.stepper.next()"
								color="positive"
								:label="step === 3 ? 'Send' : 'Next'"
								style="padding: 15px 50px"
							/>
							<q-btn
								v-if="step > 1"
								filled
								color="grey"
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
import { ref, reactive } from "vue";
import { useQuasar } from "quasar";

export default {
	setup() {
		const newDomaine = reactive({
			name: "",
			teamParent: "",
			shortDescription: "",
			description: "",
		});
		const $q = useQuasar();
		const text = ref("");
		function onRejected(rejectedEntries) {
			$q.notify({
				type: "negative",
				message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
			});
		}

		function onSubmit() {
			console.log("object");
		}
		onSubmit();
		return {
			step: ref(1),
			model: ref(null),
			options: ["BDDF", "GIMS", "SGCIB", "BHUFM", "GTS"],
			onRejected,
			text,
			newDomaine,
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
