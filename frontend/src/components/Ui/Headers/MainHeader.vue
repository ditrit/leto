<template>
	<q-header class="main_header bg-white text-primary">
		<q-toolbar class="justify-between">
			<slot></slot>
		</q-toolbar>
	</q-header>
</template>

<script>
export default {
	props: [""],
};
</script>

<style lang="sass" scoped>
.main_header
  display: flex
  justify-content: space-between
</style>
