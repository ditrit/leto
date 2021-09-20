<template>
	<div class="q-pa-md q-gutter-sm">
		<q-btn label="isOpened" color="primary" @click="isOpened = true" />

		<q-dialog v-model="isOpened">
			<q-card>
				<q-card-section>
					<div class="text-h6">isOpened</div>
				</q-card-section>

				<q-card-section class="q-pt-none">
					<CreationFormStepper />
				</q-card-section>

				<q-card-actions align="right" class="bg-white text-teal">
					<q-btn flat label="OK" v-close-popup />
				</q-card-actions>
			</q-card>
		</q-dialog>
	</div>
</template>

<script>
import { ref } from "vue";
import CreationFormStepper from "../Stepper/CreationFormStepper.vue";

export default {
	components: { CreationFormStepper },
	setup() {
		const isOpened = ref(false),
		return {
			isOpened
		};
	},
};
</script>
