<template>
	<div class="">
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
						<div class="flex text-h6 items-start">
							<q-icon name="group" size="30px" class="q-mr-sm" />
							<span class="text-uppercase">{{ item.Name }} </span>
						</div>
						<div class="text-subtitle3 text-grey-8">
							{{ item.ShortDescription }}
						</div>
						<div class="content_wrapper q-mt-md">
							<img :src="item.Logo" alt="domain logo" />
							<p class="q-ml-md">
								{{ item.Description }}
							</p>
						</div>
					</div>
					<div class="col-auto">
						<q-btn color="grey-7" round flat icon="more_vert">
							<q-menu cover auto-close>
								<q-list>
									<q-item clickable @click.prevent="EditDomain(item)">
										<q-item-section>
											<q-icon
												name="edit"
												size="1.5em"
												class="q-mr-sm"
											/>Edit</q-item-section
										>
									</q-item>
									<q-item clickable @click.prevent="DeleteDomain(item)">
										<q-item-section>
											<q-icon name="delete" size="1.5em" class="q-mr-sm" />
											Delete</q-item-section
										>
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
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useStore } from "vuex";

export default {
	name: "ContentCard",
	components: {},
	props: {
		data: {
			type: Array,
		},
	},
	emit: ["emitUpdateDomain", "emitRemoveDomain"],
	setup(props, { emit }) {
		const store = useStore();
		const route = useRouter();
		const name = ref("");
		const short = ref("");
		const long = ref("");
		const logo = ref("");
		const parentID = ref("");
		const EditDomain = (props) => {
			emit("emitUpdateDomain", props);
			console.log(props);
			// store.dispatch("appDomain/updateDomain", update.id);
		};
		const DeleteDomain = async (props) => {
			emit("emitUpdateDomain", props);
			console.log(props);
			await store.dispatch("appDomain/removeDomain", props.ID);
			getDomainstree();
		};

		const getDomainstree = async () => {
			await store.dispatch("appDomain/fetchDomainesTree");
			await store.getters["appDomain/allDomainesTree"];
			await route.push("/teams");
		};

		return {
			name,
			short,
			long,
			logo,
			parentID,
			EditDomain,
			DeleteDomain,
		};
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
  justify-content: flex-start

.button_actions__wrapper
  margin-top: 80px
  margin-left: -100px
</style>
