<template>
	<div>
		<div class="row q-pa-sm">
			<div class="col-4 q-pt-sm">
				<slot name="radioButtonTitle"> Title </slot>
			</div>

			<div class="col-8">
				<q-radio v-model="radioValue" :val="labelValue1" :label="labelValue1" />
				<q-radio v-model="radioValue" :val="labelValue2" :label="labelValue2" />
			</div>
		</div>
	</div>
</template>
<script>
import { ref } from "@vue/reactivity";
export default {
	props: {
		labelV1: {
			type: String,
			default: "Yes",
		},
		labelV2: {
			type: String,
			default: "No",
		},
	},
	setup(props) {
		const labelValue1 = ref(props.labelV1);
		const radioValue = ref("Yes");
		const labelValue2 = ref(props.labelV2);

		return {
			labelValue1,
			radioValue,
			labelValue2,
		};
	},
};
</script>
