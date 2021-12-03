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
						<!-- <span>{{ id }}</span> -->
						<!-- <span>{{ environmentTypeID }}</span>
						<span>{{ domainID }}</span> -->
						<div class="text-subtitle2">{{ name }}</div>
						<div class="text-h8">{{ role }}</div>
					</div>
					<div class="button_actions__container col-auto">
						<q-btn color="grey-7" round flat icon="more_vert">
							<q-menu cover auto-close>
								<q-list>
									<q-item clickable @click.prevent="openModal()">
										<q-item-section class="action_card__item">
											<q-icon name="edit" size="1.5em" class="q-mr-sm" />Update
										</q-item-section>
									</q-item>
									<q-item clickable @click.prevent="delteItem()">
										<q-item-section class="action_card__item">
											<q-icon name="delete" size="1.5em" class="q-mr-sm" />
											Remove
										</q-item-section>
									</q-item>
								</q-list>
							</q-menu>
						</q-btn>
						<!-- Modification dialog -->
						<q-dialog v-model="isOpened" persistent>
							<q-card style="width: 750px; max-width: 80vw">
								<q-card-section>
									<div class="text-h6 q-pa-md">{{ $t("edit_tag") }}</div>
								</q-card-section>

								<q-card-section class="q-pt-none">
									<q-form
										@submit.prevent="onSubmitUpdate"
										@reset="onResetUpdate"
										class="q-gutter-md q-pa-md"
									>
										<q-input
											filled
											label="Name *"
											lazy-rules
											:rules="[
												(val) =>
													(val && val.length > 0) || 'Please type something',
											]"
											v-model="name"
										/>
										<q-input
											filled
											label="Short Description *"
											lazy-rules
											:rules="[
												(val) =>
													(val && val.length > 0) || 'Please type something',
											]"
										/>
										<q-input
											filled
											label="Description *"
											lazy-rules
											:rules="[
												(val) =>
													(val && val.length > 0) || 'Please type something',
											]"
										/>

										<q-card-actions
											align="right"
											class="text-primary flex justify-center"
										>
											<q-btn type="reset" label="Cancel" v-close-popup />
											<q-btn
												label="Update"
												type="submit"
												color="primary"
												v-close-popup
											/>
										</q-card-actions>
									</q-form>
								</q-card-section>
							</q-card>
						</q-dialog>
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
import { ref } from "vue";
export default {
	emits: ["openEditModal", "deleteAction", "updateAction"],
	props: {
		id: { type: String },
		logo: { type: String, default: "https://cdn.quasar.dev/img/parallax2.jpg" },
		name: { type: String },
		role: { type: String },
		shortDescription: { type: String },
		description: { type: String },
		environmentTypeID: { type: String },
		domainID: { type: String },
	},
	setup(props, { emit }) {
		const isOpened = ref(false);
		const openModal = (props) => {
			isOpened.value = true;
			emit("openEditModal", props);
			console.log("props: ", props);
		};
		const updateItem = () => {
			emit("updateAction", props);
			console.table({ id: props.id, domainID: props.id });
		};
		const delteItem = () => {
			emit("deleteAction", props);
			console.table({ id: props.id, domainID: props.id });
		};
		const onSubmitUpdate = () => {
			console.log("event: ", props.id);
		};
		const onResetUpdate = () => {
			console.log("event: ", props.id);
		};

		return {
			isOpened,
			openModal,
			updateItem,
			delteItem,
			onSubmitUpdate,
			onResetUpdate,
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
