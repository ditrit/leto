<template>
	<div>
		<div class="row q-pa-sm">
			<div class="col-4 q-pt-sm">
				<slot name="rangeTitle"> Title </slot>
			</div>

			<div class="col-8">
				<q-range
					v-model="data"
					:min="minValue"
					:max="maxValue"
					:step="stepValue"
					color="primary"
					label-always
				/>
			</div>
		</div>
	</div>
</template>
<script>
import { ref } from "@vue/reactivity";
export default {
	props: {
		dataV: {
			type: Object,
		},
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
		const data = ref(props.dataV);
		const minValue = ref(props.minV);
		const maxValue = ref(props.maxV);
		const stepValue = ref(props.stepV);
		return {
			data,
			minValue,
			maxValue,
			stepValue,
		};
	},
};
</script>
