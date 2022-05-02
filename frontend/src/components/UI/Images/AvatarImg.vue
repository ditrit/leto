<template>
	<img :src="source ? source : substitute" :alt="alt" />
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
