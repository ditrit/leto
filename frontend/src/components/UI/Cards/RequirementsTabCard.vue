<template>
	<div class="row wrap">
		<q-card flat bordered class="item_card__requirements shadow-10">
			<div class="row items-center no-wrap q-pa-sm text-bold">
				{{ groupName }}
			</div>
			<q-card-section>
				<Range :minV="10" :maxV="1000" :stepV="10" :dataV="dataValue">
					<template v-slot:rangeTitle> {{ title1 }}</template>
				</Range>
			</q-card-section>
			<q-card-section>
				<TextInput :labelV="title2">
					<template v-slot:textInputTitle> {{ title2 }} </template>
				</TextInput>
			</q-card-section>
			<q-card-section>
				<DropDown :labelV="title3">
					<template v-slot:dropDownInputTitle> {{ title3 }} </template>
				</DropDown>
			</q-card-section>
			<q-card-section>
				<CheckBox :labelV="title2">
					<template v-slot:checkBoxTitle> {{ title4 }} </template>
				</CheckBox>
			</q-card-section>
		</q-card>
	</div>
</template>
<script>
import { ref } from "vue";
import useRequirementsTab from "../../../composables/TabPanels/useRequirementsTab";
import Range from "../Inputs/Ranges/Range.vue";
import TextInput from "../Inputs/Texts/TextInput.vue";
import DropDown from "../Inputs/DropDowns/DropDown.vue";
import CheckBox from "../Inputs/CheckBox/CheckBox.vue";

export default {
	components: { Range, TextInput, DropDown, CheckBox },
	props: {
		cardTitle: {
			type: String,
			default: "Group Name",
		},
	},
	setup(props) {
		const isOpened = ref(false);
		const title1 = ref("Security Level");
		const title2 = ref("Git Organization");
		const title3 = ref("Monitoring");
		const title4 = ref("Providers");
		const groupName = ref(props.cardTitle);
		const dataValue = ref({ min: 300, max: 700 });
		const textValue = ref("https://github.com/ditrit/leto.git");
		let { Test } = useRequirementsTab();
		Test();
		return {
			isOpened,
			Test,
			title1,
			title2,
			title3,
			title4,
			groupName,
			dataValue,
			textValue,
		};
	},
};
</script>
<style lang="sass" scoped>
.action_card__item
	display: flex
	flex-direction: row
</style>
