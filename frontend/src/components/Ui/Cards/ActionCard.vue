<template>
	<div class="row wrap">
		<q-card flat bordered class="item_card shadow-10">
			<q-card-section>
				<div class="row items-center no-wrap">
					<div>
						<q-img
							:src="logo"
							alt=""
							style="
								height: 38px;
								width: 38px;
								border-radius: 50%;
								margin-right: 10px;
							"
						/>
					</div>
					<div class="col">
						<div class="text-subtitle2">{{ name }}</div>
						<div class="text-h8">{{ role }}</div>
					</div>
					<div class="button_actions__container col-auto">
						<q-btn color="grey-7" round flat icon="more_vert">
							<q-menu cover auto-close>
								<q-list>
									<q-item clickable>
										<q-item-section class="action_card__item">
											<q-icon name="delete" size="1.5em" class="q-mr-sm" />
											Remove Card</q-item-section
										>
									</q-item>
									<q-item clickable>
										<q-item-section class="action_card__item">
											<q-icon name="edit" size="1.5em" class="q-mr-sm" /> Update
											Card</q-item-section
										>
									</q-item>
								</q-list>
							</q-menu>
						</q-btn>
					</div>
				</div>
			</q-card-section>
			<q-card-section>
				{{ description }}
			</q-card-section>
		</q-card>
	</div>
</template>
<script>
export default {
	props: {
		logo: { type: String, default: "https://cdn.quasar.dev/img/parallax2.jpg" },
		name: { type: String },
		role: { type: String },
		description: { type: String },
	},
	setup() {
		return {
			lorem: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
		};
	},
};
</script>
<style lang="sass" scoped>
.action_card__item
	display: flex
	flex-direction: row
</style>
