<template>
	<div class="row wrap">
		<q-card flat bordered class="item_card__requirements shadow-10">
			<div class="row items-center no-wrap q-pa-sm text-bold">
				{{ groupName }}
			</div>
			<q-card-section>
				<Range
					:minV="10"
					:maxV="1000"
					:stepV="10"
					:titleV="title"
					:dataV="dataValue"
				/>
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
	props: {
		cardTitle: {
			type: String,
			default: "Group Name",
		},
	},
	setup(props) {
		const isOpened = ref(false);
		const title = ref("Security Level");
		const groupName = ref(props.cardTitle);
		const dataValue = ref({ min: 300, max: 700 });
		let { Test } = useRequirementsTab();
		Test();
		return {
			isOpened,
			Test,
			title,
			groupName,
			dataValue,
		};
	},
};
</script>
<style lang="sass" scoped>
.action_card__item
	display: flex
	flex-direction: row
</style>
