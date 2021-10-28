<template>
	<div class="q-pa-md q-gutter-sm">
		<q-btn label="isOpened" color="primary" @click="isOpened = true" />

		<q-dialog v-model="isOpened" ref="creationDialog">
			<q-card>
				<q-card-section>
					<div class="text-h6">
						<slot name="ModalHeadline"> </slot>
					</div>
				</q-card-section>

				<q-card-section class="q-pt-none"> </q-card-section>
				<slot name="ModalBody">Hello Modal</slot>
				<q-card-actions align="right" class="bg-white text-teal">
					<q-btn flat label="OK" v-close-popup />
				</q-card-actions>
			</q-card>
		</q-dialog>
	</div>
</template>

<script>
import { ref } from "vue";

export default {
	name: "Modal",
	props: ["isModalOpened"],
	setup() {
		const isOpened = ref(false);
		return {
			isOpened,
		};
	},
};
</script>
