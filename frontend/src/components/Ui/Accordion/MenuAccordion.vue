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
							<img v-for="(item, index) in logo" :key="index" :src="item" />
						</q-avatar>
					</q-item-section>

					<q-item-section class="text-bold uppercase">
						{{ parentLabel }}
					</q-item-section>
				</template>
				<q-card>
					<q-card-section class="link_wrapper" v-if="links">
						<router-link
							v-for="(link, index) in links"
							:key="index"
							to="/teams/b13e3d72-db6f-4ee6-af4f-11a2813c19da"
						>
							{{ link }}
						</router-link>
					</q-card-section>
				</q-card>
			</q-expansion-item>
		</q-list>
	</div>
</template>
<script>
export default {
	props: {
		id: {
			type: String,
			required: true,
		},
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
  align-items: flex-start
  padding-left: 5.2em

.q-item__section--side > .q-avatar
  font-size: 30px !important

.uppercase
  text-transform: uppercase
</style>
