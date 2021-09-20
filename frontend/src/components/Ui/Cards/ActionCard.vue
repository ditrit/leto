<template>
	<div class="q-pa-md row q-gutter-sm no-wrap">
		<q-card flat bordered class="my-card bg-grey-1">
			<q-card-section>
				<div class="row items-center">
					<div class="col">
						<div class="text-h6">Our Planet</div>
						<div class="text-subtitle2">by John Doe</div>
					</div>

					<div class="col-auto">
						<q-btn color="grey-7" round flat icon="more_vert">
							<q-menu cover auto-close>
								<q-list>
									<q-item clickable>
										<q-item-section>Remove Card</q-item-section>
									</q-item>
									<q-item clickable>
										<q-item-section>Send Feedback</q-item-section>
									</q-item>
									<q-item clickable>
										<q-item-section>Share</q-item-section>
									</q-item>
								</q-list>
							</q-menu>
						</q-btn>
					</div>
				</div>
			</q-card-section>

			<q-card-section>
				{{ lorem }}
			</q-card-section>
		</q-card>
		<q-card flat bordered class="my-card bg-grey-1">
			<q-card-section>
				<div class="row items-center no-wrap">
					<div class="col">
						<div class="text-h6">Our Planet</div>
						<div class="text-subtitle2">by John Doe</div>
					</div>

					<div class="col-auto">
						<q-btn color="grey-7" round flat icon="more_vert">
							<q-menu cover auto-close>
								<q-list>
									<q-item clickable>
										<q-item-section>Remove Card</q-item-section>
									</q-item>
									<q-item clickable>
										<q-item-section>Send Feedback</q-item-section>
									</q-item>
									<q-item clickable>
										<q-item-section>Share</q-item-section>
									</q-item>
								</q-list>
							</q-menu>
						</q-btn>
					</div>
				</div>
			</q-card-section>

			<q-card-section>
				{{ lorem }}
			</q-card-section>
		</q-card>
		<q-card flat bordered class="my-card bg-grey-1">
			<q-card-section>
				<div class="row items-center no-wrap">
					<div class="col">
						<div class="text-h6">Our Planet</div>
						<div class="text-subtitle2">by John Doe</div>
					</div>

					<div class="col-auto">
						<q-btn color="grey-7" round flat icon="more_vert">
							<q-menu cover auto-close>
								<q-list>
									<q-item clickable>
										<q-item-section>Remove Card</q-item-section>
									</q-item>
									<q-item clickable>
										<q-item-section>Send Feedback</q-item-section>
									</q-item>
									<q-item clickable>
										<q-item-section>Share</q-item-section>
									</q-item>
								</q-list>
							</q-menu>
						</q-btn>
					</div>
				</div>
			</q-card-section>

			<q-card-section>
				{{ lorem }}
			</q-card-section>
		</q-card>
	</div>
</template>
<script>
export default {
	setup() {
		return {
			lorem:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		};
	},
};
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
