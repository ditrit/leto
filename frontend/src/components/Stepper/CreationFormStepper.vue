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
					<Tabs />
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
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import Tabs from "../Ui/TabPanels/Tabs.vue";
import axios from "axios";

export default {
	components: { Tabs },
	setup() {
		const store = useStore();
		const name = ref("");
		const teamParent = ref("");
		const shortDescription = ref("");
		const description = ref("");
		const test1 = ref("");
		const options = ref([]);
		const optionIds = ref([]);

		const $q = useQuasar();
		const text = ref("");
		function onRejected(rejectedEntries) {
			$q.notify({
				type: "negative",
				message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
			});
		}
		const getOptions = async () => {
			let response = await axios.get(
				"http://127.0.0.1:9203/ditrit/Gandalf/1.0.0/domain/"
			);
			let data = await response.data;
			options.value = data.map((item) => {
				return item.Name;
			});
			optionIds.value = data.map((item) => {
				return item.ID;
			});
			console.log("options.value: ", options.value);
		};
		getOptions();
		console.log("	getOptions();: ", getOptions.value);
		return {
			step: ref(1),
			model: ref(null),
			options,
			optionIds,
			onRejected,
			text,
			store,
			name,
			teamParent,
			shortDescription,
			description,
			test1,

			onSubmit() {
				const newDomain = {
					name: name.value,
					teamParent: teamParent.value,
					shortDescription: shortDescription.value,
					description: description.value,
					test1: test1.value,
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
