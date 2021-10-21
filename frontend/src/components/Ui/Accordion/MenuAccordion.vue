<template>
	<div class="q-pa-sm" style="max-width: 350px">
		<q-list>
			<q-expansion-item
				dense
				dense-toggle
				expand-separator
				:icon="icon"
				label="Account settings"
			>
				<template v-slot:header>
					<q-item-section avatar>
						<q-avatar>
							<img :src="logo" />
						</q-avatar>
					</q-item-section>

					<q-item-section>
						{{ parentLabel }}
					</q-item-section>
				</template>
				<q-card>
					<q-card-section class="link_wrapper" v-if="links">
						<router-link v-for="(link, index) in links" :key="index" to="/">{{
							link
						}}</router-link>
					</q-card-section>
				</q-card>
			</q-expansion-item>
		</q-list>
	</div>
</template>
<script>
export default {
	props: {
		logo: {
			type: String,
			default: "https://cdn.quasar.dev/img/boy-avatar.png",
		},
		parentLabel: {
			type: String,
			default: "Parent 1",
		},
		icon: {
			type: String,
			default: "perm_identity",
		},
		links: {
			type: Array,
		},
	},
};
</script>

<style lang="sass">
.link_wrapper
  display: flex
  flex-direction: column
  justify-content: space-around
  align-items: center

.q-card
  background: transparent !important

.q-item__section--side > .q-avatar
  font-size: 30px !important
</style>
