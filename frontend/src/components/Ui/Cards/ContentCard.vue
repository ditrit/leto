<template>
	<div>
		<q-card
			class="card_default"
			flat
			bordered
			v-for="item in data"
			:key="item.id"
		>
			<q-card-section>
				<div class="row no-wrap">
					<div class="col">
						<div class="text-h6">
							<q-icon :name="item.icon" size="30px" class="q-mr-sm" />
							{{ item.headline }}
						</div>
						<div class="text-subtitle3 text-grey-8">
							{{ item.subTitle }}
						</div>
						<div class="content_wrapper q-mt-md">
							<img src="https://cdn.quasar.dev/img/parallax2.jpg" alt="logo" />
							<p class="q-ml-md">
								{{ item.textContent }}
							</p>
						</div>
					</div>

					<div class="col-auto">
						<q-btn color="grey-7" round flat icon="more_vert">
							<q-menu cover auto-close class="card_actions">
								<q-list>
									<q-item clickable>
										<q-item-section>Link One</q-item-section>
									</q-item>
									<q-item clickable>
										<q-item-section>Link Two </q-item-section>
									</q-item>
									<q-item clickable>
										<q-item-section>Link Three</q-item-section>
									</q-item>
								</q-list>
							</q-menu>
						</q-btn>
					</div>
				</div>
			</q-card-section>
		</q-card>
	</div>
</template>

<script>
export default {
	name: "ContentCard",
	props: {
		data: {
			type: Array,
		},
	},
};
</script>

<style></style>
