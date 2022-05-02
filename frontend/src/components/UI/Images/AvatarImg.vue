<template>
	<q-avatar size="26px">
		<img :src="source ? source : substitute" :alt="alt" />
	</q-avatar>
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
