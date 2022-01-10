<template>
	<div class="q-pa-md stepper_wrapper">
		<q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
			<q-stepper v-model="step" ref="stepper" animated active-color="purple">
				<q-step :name="1" prefix="1" title="">
					<div class="row">
						<div class="col col-md-4 q-mr-md">
							<q-input
								filled
								v-model="name"
								label="Name *"
								hint=""
								lazy-rules
								:rules="[
									(val) => (val && val.length > 0) || 'Please type something',
								]"
							/>
						</div>
						<div class="col col-md-4 q-mr-md">
							<q-select
								filled
								v-model="model"
								:options="options"
								label="Team Parent"
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
								v-model="name"
								label="Short description"
								lazy-rules
								:rules="[
									(val) => (val && val.length > 0) || 'Please type something',
								]"
							/>
						</div>
					</div>
					<div class="row q-mt-md">
						<div class="col col-md-12">
							<q-input
								v-model="text"
								filled
								type="textarea"
								label="Description"
							/>
						</div>
					</div>
				</q-step>

				<q-step :name="2" prefix="2" title="">
					<div class="row">
						<div class="col col-md-4 q-mr-md">
							<q-input
								filled
								v-model="name"
								label="Name *"
								hint=""
								lazy-rules
								:rules="[
									(val) => (val && val.length > 0) || 'Please type something',
								]"
							/>
						</div>
						<div class="col col-md-4 q-mr-md">
							<q-select
								filled
								v-model="model"
								:options="options"
								label="Team Parent"
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
								v-model="name"
								label="Short description"
								lazy-rules
								:rules="[
									(val) => (val && val.length > 0) || 'Please type something',
								]"
							/>
						</div>
					</div>
					<div class="row q-mt-md">
						<div class="col col-md-12">
							<q-input
								v-model="text"
								filled
								type="textarea"
								label="Description"
							/>
						</div>
					</div>
				</q-step>

				<q-step :name="3" prefix="3" title="">
					<div class="row">
						<div class="col col-md-4 q-mr-md">
							<q-input
								filled
								v-model="name"
								label="Name *"
								hint=""
								lazy-rules
								:rules="[
									(val) => (val && val.length > 0) || 'Please type something',
								]"
							/>
						</div>
						<div class="col col-md-4 q-mr-md">
							<q-select
								filled
								v-model="model"
								:options="options"
								label="Team Parent"
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
								v-model="name"
								label="Short description"
								lazy-rules
								:rules="[
									(val) => (val && val.length > 0) || 'Please type something',
								]"
							/>
						</div>
					</div>
					<div class="row q-mt-md">
						<div class="col col-md-12">
							<q-input
								v-model="text"
								filled
								type="textarea"
								label="Description"
							/>
						</div>
					</div>
				</q-step>

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
import { ref } from "vue";
import { useQuasar } from "quasar";

export default {
	setup() {
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
			model: ref(null),
			options: ["BDDF", "GIMS", "SGCIB", "BHUFM", "GTS"],
			onRejected,
			text,
		};
	},
};
</script>
<style lang="sass">

.q-stepper
	width: 720px !important
	box-shadow: none !important
.q-stepper__header--border
	border-bottom: none !important
.q-uploader__list
	display: none
// .q-card__actions
// 	display: none
.q-stepper__dot
	width: 40px
	height: 40px
	background: #474262
</style>
