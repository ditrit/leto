<template>
	<div class="q-pa-md q-gutter-y-sm row justify-end">
		<q-toggle
			:label="modelValue"
			color="primary"
			:false-value="ValueOne"
			:true-value="ValueTwo"
			v-model="modelValue"
		/>
	</div>
</template>

<script>
import { ref } from "vue";

export default {
	name: "Toggle",
	props: {
		ValueOne: { type: String, default: "Value One" },
		ValueTwo: { type: String, default: "Value Two" },
	},
	setup(props) {
		return {
			modelValue: ref(props.ValueOne),
		};
	},
};
</script>

<style></style>
