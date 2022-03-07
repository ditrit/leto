<template>
	<div>
		<div class="row q-pa-sm">
			<div class="col-4 q-pt-sm">
				<slot name="dropDownInputTitle"> Title </slot>
			</div>

			<div class="col-8">
				<q-select
					filled
					v-model="modelValue"
					:options="optionsValue"
					:label="optionslabelValue"
				/>
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
			default: "Choose item",
		},
	},
	setup(props) {
		const optionslabelValue = ref(props.labelV);
		const modelValue = ref(null);
		const optionsValue = ref(["Item One", "Item Two", "Item Three"]);
		return {
			optionslabelValue,
			modelValue,
			optionsValue,
		};
	},
};
</script>
