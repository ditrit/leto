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
						<div class="text-subtitle2 ellipsis">{{ name }}</div>
					</div>
					<div class="button_actions__container col-auto">
						<q-btn color="grey-7" round flat icon="more_vert">
							<q-menu cover auto-close>
								<q-list>
									<q-item clickable @click.prevent="delteItem(id)">
										<q-item-section class="action_card__item">
											<q-icon name="delete" size="1.5em" class="q-mr-sm" />
											Remove
										</q-item-section>
									</q-item>
								</q-list>
							</q-menu>
						</q-btn>
					</div>
				</div>
			</q-card-section>
			<q-card-section class="ellipsis-2-lines">
				{{ shortDescription }}
			</q-card-section>
		</q-card>
	</div>
</template>
<script>
import { ref } from "vue";

export default {
	emits: ["deleteAction"],
	props: {
		id: { type: String },
		logo: { type: String, default: "https://cdn.quasar.dev/img/parallax2.jpg" },
		name: { type: String },
		shortDescription: { type: String },
		productRepositoryURL: { type: String },
		description: { type: String },
		domainID: { type: String },
	},
	setup(props, { emit }) {
		const isOpened = ref(false);
		const delteItem = () => {
			emit("deleteAction", props);
		};

		const onResetUpdate = () => {
			console.log("event: ", props.id);
		};

		return {
			isOpened,
			delteItem,
			onResetUpdate,
		};
	},
};
</script>
<style lang="sass" scoped>
.action_card__item
	display: flex
	flex-direction: row
</style>
