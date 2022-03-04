<template>
	<div class="q-pa-md">
		<q-range
			:min="minValue"
			:max="maxValue"
			:step="stepValue"
			color="primary"
			label
		/>
	</div>
</template>
<script>
import { ref } from "@vue/reactivity";
export default {
	props: {
		minV: {
			type: Number,
			default: 5,
		},
		maxV: {
			type: Number,
			default: 45,
		},
		stepV: {
			type: Number,
			default: 1,
		},
	},
	setup(props) {
		const minValue = ref(props.minV);
		const maxValue = ref(props.maxV);
		const stepValue = ref(props.stepV);
		return {
			minValue,
			maxValue,
			stepValue,
		};
	},
};
</script>
