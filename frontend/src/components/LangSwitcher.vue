<template>
	<!-- ...... -->
	<q-select
		v-model="locale"
		:options="localeOptions"
		label="Language"
		dense
		borderless
		emit-value
		map-options
		options-dense
		style="min-width: 100px"
	/>
	<!-- ...... -->
</template>

<script>
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";

export default {
	setup() {
		const { locale } = useI18n({ useScope: "global" });

		return {
			locale,
			localeOptions: [
				{ value: "en-US", label: "English" },
				{ value: "fr", label: "Français" },
			],
		};
	},
};
</script>
