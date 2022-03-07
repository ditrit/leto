<template>
	<div>
		<div class="row q-pa-sm">
			<div class="col-4 q-pt-sm">
				<slot name="checkBoxTitle"> Title </slot>
			</div>

			<div class="col-8">
				<q-checkbox v-model="checkValue" :label="labelValuet" />
			</div>
		</div>
	</div>
</template>
<script>
import { ref } from "@vue/reactivity";
export default {
	props: {
		labelV: {
			type: String,
			default: "Repository",
		},
	},
	setup(props) {
		const textValue = ref(props.textV);
		const labelValue = ref(props.labelV);
		const checkValue = ref(false);
		return {
			textValue,
			labelValue,
			checkValue,
		};
	},
};
</script>
