<template>
	<q-td :props="props" class="tr_width__actions30">
		<q-avatar size="26px">
			<img :src="source ? source : globalLogo" alt="avatar" />
		</q-avatar>
	</q-td>
</template>

<script>
import globalLogo from "assets/profil.png";
export default {
	setup() {
		return {
			globalLogo,
		};
	},

	props: {
		source: {
			type: String,
		},
	},
};
</script>
