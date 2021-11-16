<template>
	<div class="github_login">
		<q-separator width="320px" class="q-mt-lg" />
		<span class="bg-white q-pa-md text-bold text-primary leto_mt"> Or </span>
		<p class="text-primary">With Github</p>
		<q-img
			src="../../assets/github.svg"
			width="15%"
			class="cursor-pointer"
			@click.prevent="socialLogin"
		/>
	</div>
</template>

<script>
export default {};
</script>

<style lang="sass">
.github_login
  display: flex
  flex-direction: column
  align-items: center

.leto_mt
  display: block
  margin-top: -26px
  position: relative
  width: fit-content
</style>
