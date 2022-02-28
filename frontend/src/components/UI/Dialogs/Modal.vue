<template>
	<q-dialog v-model="isOpened" position="bottom">
		<q-card style="width: 750px; max-width: 80vw">
			<q-card-section>
				<q-card-actions align="right" class="bg-white text-teal">
					<q-btn outline round color="primary" icon="close" v-close-popup />
				</q-card-actions>
				<div class="text-h6 q-pa-md">
					<slot name="ModalTitle"> Test Titles </slot>
				</div>
			</q-card-section>

			<q-card-section class="q-pt-none"> </q-card-section>
			<slot name="ModalContent">Hello Modal</slot>
		</q-card>
	</q-dialog>
</template>

<script>
import { ref } from "vue";
export default {
	name: "Modal",
	setup() {
		const isOpened = ref(false);
		return {
			isOpened,
		};
	},
};
</script>
<style lang="sass" scoped>
.buttons_wrapper
  display: flex
  flex-direction: row
  justify-content: space-evenly
  align-items: flex-start

.teams_buttons__container
  display: flex
  flex-direction: column
</style>
