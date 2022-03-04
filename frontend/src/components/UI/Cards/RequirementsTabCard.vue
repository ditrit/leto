<template>
	<div class="row wrap">
		<q-card flat bordered class="item_card__requirements shadow-10">
			<q-card-section>
				<div class="row items-center no-wrap">First Requirements</div>
				<Range :minV="10" :maxV="1000" :stepV="10" :titleV="title" />
			</q-card-section>
		</q-card>
	</div>
</template>
<script>
import { ref } from "vue";
import useRequirementsTab from "../../../composables/TabPanels/useRequirementsTab";
import Range from "../Ranges/Range.vue";

export default {
	components: { Range },
	setup() {
		const isOpened = ref(false);
		const title = ref("Security Level");
		let { Test } = useRequirementsTab();
		Test();
		return {
			isOpened,
			Test,
			title,
		};
	},
};
</script>
<style lang="sass" scoped>
.action_card__item
	display: flex
	flex-direction: row
</style>
