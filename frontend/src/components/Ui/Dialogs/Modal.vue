<template>
	<div class="q-pa-md q-gutter-sm">
		<div class="buttons_wrapper">
			<div class="teams_buttons__container">
				<BtnAddNew
					:title="$t('add_team')"
					class="bg-white q-mt-sm"
					:color="primary"
					icon="add"
					@click="openedDailog"
				/>
				<q-dialog v-model="isOpened" v-show="oepnDialog">
					<q-card style="width: 750px; max-width: 80vw">
						<q-card-section>
							<div class="text-h6 q-pa-md">
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
		</div>
	</div>
</template>

<script>
import { ref } from "vue";
import BtnAddNew from "../../UI/Buttons/BtnAddNew.vue";
export default {
	name: "Modal",
	components: { BtnAddNew },
	props: ["oepnDialog"],
	setup() {
		const isOpened = ref(false);
		const openedDailog = () => {
			isOpened.value = true;
		};
		return {
			isOpened,
			openedDailog,
		};
	},
};
</script>
<style lang="sass" scoped>
.buttons_wrapper
  display: flex
  flex-direction: row
  justify-content: space-evenly
  align-items: center

.teams_buttons__container
  display: flex
  flex-direction: column
</style>
