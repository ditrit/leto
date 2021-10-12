<template>
	<q-header class="main_header bg-white text-primary">
		<q-toolbar>
			<slot></slot>
		</q-toolbar>
	</q-header>
</template>

<script>
export default {};
</script>

<style lang="sass" scoped>

.q-toolbar
	display: flex !important
	flex-direction: row !important
	justify-content: center !important
	height: 56px
</style>
