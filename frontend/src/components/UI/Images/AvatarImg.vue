<template>
	<q-td :props="props">
		<q-avatar size="26px">
			<img :src="source ? source : globalAvatar" alt="avatar" />
		</q-avatar>
	</q-td>
</template>

<script>
import globalAvatar from "../../../assets/profil.png";
export default {
	setup() {
		return {
			globalAvatar,
		};
	},

	props: {
		source: {
			type: String,
		},
	},
};
</script>
