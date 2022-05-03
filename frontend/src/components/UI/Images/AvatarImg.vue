<template>
	<q-td :props="props">
		<q-avatar size="26px">
			<img :src="source ? source : substitute" :alt="alt" />
		</q-avatar>
	</q-td>
</template>

<script>
export default {
	props: {
		source: {
			type: String,
		},
		substitute: {
			type: String,
		},
		alt: {
			type: String,
		},
	},
};
</script>
