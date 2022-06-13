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
				<RadioButton :labelV1="yes" :labelV2="no">
					<template v-slot:radioButtonTitle> {{ title5 }} </template>
				</RadioButton>
			</q-card-section>
			<q-card-section>
				<DropDown :labelV="title3">
					<template v-slot:dropDownInputTitle> {{ title3 }} </template>
				</DropDown>
			</q-card-section>
			<q-card-section>
				<CheckBox :labelV1="choiceOne" :labelV2="choiceTwo">
					<template v-slot:checkBoxTitle> {{ title4 }} </template>
				</CheckBox>
			</q-card-section>
		</q-card>
		<q-card flat bordered class="item_card__requirements shadow-10">
			<div class="row items-center no-wrap q-pa-sm text-bold">
				{{ groupNameTwo }}
			</div>
			<q-card-section>
				<TextInput :labelV="title2">
					<template v-slot:textInputTitle> {{ title2 }} </template>
				</TextInput>
			</q-card-section>
			<q-card-section>
				<RadioButton :labelV1="yes" :labelV2="no">
					<template v-slot:radioButtonTitle> {{ title5 }} </template>
				</RadioButton>
			</q-card-section>
			<q-card-section>
				<Range :minV="10" :maxV="1000" :stepV="10" :dataV="dataValue">
					<template v-slot:rangeTitle> {{ title1 }}</template>
				</Range>
			</q-card-section>
			<q-card-section>
				<DropDown :labelV="title3">
					<template v-slot:dropDownInputTitle> {{ title3 }} </template>
				</DropDown>
			</q-card-section>
			<q-card-section>
				<CheckBox :labelV1="choiceOne" :labelV2="choiceTwo">
					<template v-slot:checkBoxTitle> {{ title4 }} </template>
				</CheckBox>
			</q-card-section>
		</q-card>
		<q-card flat bordered class="item_card__requirements shadow-10">
			<div class="row items-center no-wrap q-pa-sm text-bold">
				{{ groupNameThree }}
			</div>
			<q-card-section>
				<CheckBox :labelV1="choiceOne" :labelV2="choiceTwo">
					<template v-slot:checkBoxTitle> {{ title4 }} </template>
				</CheckBox>
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
				<RadioButton :labelV1="yes" :labelV2="no">
					<template v-slot:radioButtonTitle> {{ title5 }} </template>
				</RadioButton>
			</q-card-section>
			<q-card-section>
				<Range :minV="10" :maxV="1000" :stepV="10" :dataV="dataValue">
					<template v-slot:rangeTitle> {{ title1 }}</template>
				</Range>
			</q-card-section>
		</q-card>
	</div>
</template>
<script>
import { ref } from "vue";
import Range from "../Inputs/Ranges/Range.vue";
import TextInput from "../Inputs/Texts/TextInput.vue";
import DropDown from "../Inputs/DropDowns/DropDown.vue";
import CheckBox from "../Inputs/CheckBox/CheckBox.vue";
import RadioButton from "../Inputs/RadioButtons/RadioButton.vue";

export default {
	components: { Range, TextInput, DropDown, CheckBox, RadioButton },
	props: {
		cardTitle: {
			type: String,
			default: "Group Name",
		},
		cardTitle2: {
			type: String,
			default: "Group Name Two",
		},
		cardTitle3: {
			type: String,
			default: "Group Name Three",
		},
	},
	setup(props) {
		const isOpened = ref(false);
		const title1 = ref("Security Level");
		const title2 = ref("Git Organization");
		const title3 = ref("Monitoring");
		const title4 = ref("Providers");
		const title5 = ref("APM");
		const choiceOne = ref("First choice");
		const choiceTwo = ref("Second choice");
		const yes = ref("Yes");
		const no = ref("No");
		const groupName = ref(props.cardTitle);
		const groupNameTwo = ref(props.cardTitle2);
		const groupNameThree = ref(props.cardTitle3);
		const dataValue = ref({ min: 300, max: 700 });
		const textValue = ref("https://github.com/ditrit/leto.git");
		return {
			isOpened,
			Test,
			title1,
			title2,
			title3,
			title4,
			title5,
			choiceOne,
			choiceTwo,
			yes,
			no,
			groupName,
			groupNameTwo,
			groupNameThree,
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
