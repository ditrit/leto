<template>
	<div>
		<div class="row q-pa-sm">
			<div class="col-4 q-pt-sm">{{ titleValue }}</div>

			<div class="col-8">
				<q-input filled v-model="textValue" label="Reppo" />
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
		textV: {
			type: String,
			default: "https://github.com/ditrit/leto.git",
		},
	},
	setup(props) {
		const titleValue = ref(props.titleV);
		const textValue = ref(props.textV);
		return {
			textValue,
			titleValue,
		};
	},
};
</script>
