<template>
	<div>
		<div class="row q-pa-sm">
			<div class="col-4 q-pt-sm">{{ titleValue }}</div>

			<div class="col-8">
				<q-range
					:min="minValue"
					:max="maxValue"
					:step="stepValue"
					color="primary"
					selection-color="red"
					label
				/>
			</div>
		</div>
	</div>
</template>
<script>
import { ref } from "@vue/reactivity";
export default {
	props: {
		titleV: {
			type: String,
			default: "title",
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
		const titleValue = ref(props.titleV);
		const minValue = ref(props.minV);
		const maxValue = ref(props.maxV);
		const stepValue = ref(props.stepV);
		return {
			minValue,
			maxValue,
			stepValue,
			titleValue,
		};
	},
};
</script>
