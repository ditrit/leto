<template>
	<div>
		<div class="row q-pa-sm">
			<div class="col-4 q-pt-sm">
				<slot name="textInputTitle"> Title </slot>
			</div>

			<div class="col-8">
				<q-input filled v-model="textValue" :label="labelValue" />
			</div>
		</div>
	</div>
</template>
<script>
import { ref } from "@vue/reactivity";
export default {
	props: {
		textV: {
			type: String,
			default: "https://github.com/ditrit/leto.git",
		},
		labelV: {
			type: String,
			default: "Repository",
		},
	},
	setup(props) {
		const textValue = ref(props.textV);
		const labelValue = ref(props.labelV);
		return {
			textValue,
			labelValue,
		};
	},
};
</script>
