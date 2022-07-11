<template>
	<q-header class="bg-white text-primary shadow-1">
		<slot name="productHeaderContent"></slot>
	</q-header>
</template>

<script>
export default {};
</script>

<style lang="sass" scoped>
.productDetails_navbar
	display: flex
	flex-direction: row
	justify-content: flex-start
	align-items: center
	padding: 14px
	background: $white
	color: $primary
</style>
