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
									<q-item clickable @click.prevent="editModal(item)">
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
						<!-- Modification Dialog -->
						<q-dialog v-model="isOpend" persistent>
							<q-card style="width: 750px; max-width: 80vw">
								<q-card-section>
									<div class="text-h6 q-pa-md">{{ $t("edit_team") }}</div>
								</q-card-section>

								<q-card-section class="q-pt-none">
									<q-form
										@submit.prevent="onSubmitUpdate(item)"
										@reset="onResetUpdate"
										class="q-gutter-md q-pa-md"
									>
										<div class="">
											<div class="row col-md-12 q-gutter-md">
												<div class="col">
													<q-input
														filled
														label="Name *"
														hint=""
														lazy-rules
														:rules="[
															(val) =>
																(val && val.length > 0) ||
																'Please type something',
														]"
														v-model="item.Name"
													/>
												</div>
											</div>
											<div class="row">
												<div class="col">
													<q-input
														filled
														label="Short description"
														lazy-rules
														:rules="[
															(val) =>
																(val && val.length > 0) ||
																'Please type something',
														]"
														v-model="item.ShortDescription"
													/>
												</div>
											</div>
											<div class="row q-gutter-md">
												<div class="col col-md-8">
													<q-input
														filled
														type="textarea"
														label="Description"
														v-model="item.Description"
													/>
												</div>
												<div class="col">
													<q-uploader
														style="max-width: 100%"
														url="http://localhost:3000/upload"
														label="Your Logo"
														multiple
														accept=".jpg, svg, image/*"
														color="primary"
														factory
														files
														hide-upload-btn="true"
														auto-upload
														@rejected="onRejected"
														@uploaded="onFileUpload"
													/>
												</div>
											</div>
										</div>

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
	emit: ["emitRemoveDomain", "emitSubmitDomain", "emitResetDomain"],
	setup(props, { emit }) {
		const store = useStore();
		const route = useRouter();
		// const name = ref("");
		// const short = ref("");
		// const long = ref("");
		// const logo = ref("");
		const parentID = ref("");
		const isOpend = ref(false);

		const editModal = () => {
			isOpend.value = true;
		};

		const DeleteDomain = async (props) => {
			emit("emitRemoveDomain", props);
			console.log(props);
			await store.dispatch("appDomain/removeDomain", props.ID);
			getDomainstree();
		};
		const onSubmitUpdate = async (props) => {
			emit("emitUpdateDomain", props);
			console.log("Domain to edit:", props);
			let domain = await Object.values(props);
			console.log("domain: ", domain);
			let updatedDomain = {
				id: domain[0],
				name: domain[4],
				shortDescription: domain[12],
				description: domain[13],
			};

			console.log("updatedDomain: ", updatedDomain);

			store.dispatch("appDomain/updateDomain", updatedDomain);
			// getDomainstree();
		};
		const onResetUpdate = async (props) => {
			emit("emitResetDomain", props);
			console.log(props);
		};
		const onFileUpload = (event) => {
			console.log("file name", event.files[0].name);
			console.log("file upload number", event.files[0].__uploaded);
			console.log("file Id", event.files[0].xhr.response);
		};

		const onRejected = (rejectedEntries) => {
			$q.notify({
				type: "negative",
				message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
			});
		};
		const getDomainstree = async () => {
			await store.dispatch("appDomain/fetchDomainesTree");
			await store.getters["appDomain/allDomainesTree"];
			await route.push("/teams");
		};

		return {
			// name,
			// short,
			// long,
			// logo,
			editModal,
			parentID,
			onSubmitUpdate,
			DeleteDomain,
			isOpend,
			onFileUpload,
			onRejected,
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
