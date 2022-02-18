<template>
	<div class="row wrap">
		<q-card flat bordered class="item_card shadow-10">
			<q-card-section>
				<div class="row items-center no-wrap">First Requirements</div>
			</q-card-section>
		</q-card>
	</div>
</template>
<script>
import { ref } from "vue";
import useRequirementsTab from "../../../composables/TabPanels/useRequirementsTab";

export default {
	setup() {
		const isOpened = ref(false);
		let { Test } = useRequirementsTab();
		Test();
		return {
			isOpened,
			Test,
		};
	},
};
</script>
<style lang="sass" scoped>
.action_card__item
	display: flex
	flex-direction: row
</style>
