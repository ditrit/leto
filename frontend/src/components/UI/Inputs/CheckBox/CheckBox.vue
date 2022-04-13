<template>
	<div>
		<div class="row q-pa-sm">
			<div class="col-4 q-pt-sm">
				<slot name="checkBoxTitle"> Title </slot>
			</div>

			<div class="col-8">
				<q-checkbox v-model="checkValue1" :label="labelValue1" />
				<q-checkbox v-model="checkValue2" :label="labelValue2" />
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
			default: "Repository",
		},
		labelV2: {
			type: String,
			default: "Repository",
		},
	},
	setup(props) {
		const textValue = ref(props.textV);
		const labelValue1 = ref(props.labelV1);
		const labelValue2 = ref(props.labelV2);
		const checkValue1 = ref(false);
		const checkValue2 = ref(false);
		return {
			textValue,
			labelValue1,
			checkValue1,
			checkValue2,
			labelValue2,
		};
	},
};
</script>
