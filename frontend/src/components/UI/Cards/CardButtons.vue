<template>
	<div class="col-auto">
		<q-btn color="grey-7" round flat icon="more_vert">
			<q-menu cover auto-close class="card_actions">
				<q-list>
					<q-item
						clickable
						class="buttons_wrapper"
						v-for="(link, index) in links"
						:key="index"
					>
						<q-item-section class="flex">
							<q-icon
								name="edit"
								size="1.5em"
								class="q-mr-sm"
								@click.prevent="EditEvent"
							/>
							{{ link }}
						</q-item-section>
					</q-item>
				</q-list>
			</q-menu>
		</q-btn>
	</div>
</template>

<script>
export default {
	props: {
		links: {
			type: Array,
		},
	},
};
</script>

<style lang="sass" scoped>
.buttons_wrapper
  display: flex
  flex-direction: column
  justify-content: space-evenly
  align-items: flex-start

.q-item__section
  display: flex
  flex-direction: row
  justify-content: space-between
</style>
