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
							<span class="text-uppercase">{{ item.name }} </span>
						</div>
						<div class="text-subtitle3 text-grey-8">
							{{ item.shortDescription }}
						</div>
						<div class="flex items-center text-subtitle3 q-py-sm">
							<q-icon name="link" size="30px" class="q-mr-sm" /> Repository:
							<a :href="item.gitURL" class="q-pl-sm"> {{ item.gitURL }}</a>
						</div>
						<div class="content_wrapper q-mt-sm">
							<img :src="item.logo" alt="domain logo" />
							<p class="q-ml-md">
								{{ item.description }}
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
									<q-item clickable @click="confirm(item)">
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
														v-model="item.name"
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
														v-model="item.shortDescription"
													/>
												</div>
											</div>
											<div class="row">
												<div class="col">
													<q-input
														filled
														label="Repository"
														lazy-rules
														:rules="[
															(val) =>
																(val && val.length > 0) ||
																'Please type something',
														]"
														v-model="item.gitURL"
													/>
												</div>
											</div>
											<div class="row q-gutter-md">
												<div class="col col-md-8">
													<q-input
														filled
														type="textarea"
														label="Description"
														v-model="item.description"
													/>
												</div>
												<div class="col">
													<q-uploader
														style="max-width: 100%"
														url="http://127.0.0.1:9203/ditrit/Gandalf/1.0.0/file"
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
import { useQuasar } from "quasar";

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
		const $q = useQuasar();
		const parentID = ref("");
		const isOpend = ref(false);
		const editModal = () => {
			isOpend.value = true;
		};

		const confirm = (props) => {
			$q.dialog({
				title: "Confirm",
				message: "Are you sure to delete this item?",
				cancel: true,
				persistent: true,
			})
				.onOk(() => {
					DeleteDomain(props);
				})
				.onCancel(() => {
					console.log("Cancel");
				});
		};
		const DeleteDomain = async (props) => {
			emit("emitRemoveDomain", props);
			console.log(props);
			await store.dispatch("appDomain/removeDomain", props.ID);
			getDomainstree();
		};
		const onSubmitUpdate = async (props) => {
			console.log("props: ", props);
			emit("emitUpdateDomain", props);
			console.log("Domain to edit:", Object.values(props));
			let domain = Object.values(props);
			console.log("domain: ", domain);

			let updatedDomain = {
				id: route.currentRoute.value.params.id,
				name: domain[0],
				shortDescription: domain[1],
				description: domain[2],
				gitUrl: domain[5],
				parentID: domain[6],
			};

			try {
				store
					.dispatch("appDomain/updateDomain", updatedDomain)
					.then(() => {
						getDomainstree();
					})
					.then(() => {
						route.go(`teams/${route.currentRoute.value.params.id}`);
					});
			} catch (error) {
				console.log(error);
			}
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
		};

		return {
			editModal,
			parentID,
			onSubmitUpdate,
			DeleteDomain,
			isOpend,
			onFileUpload,
			onRejected,
			confirm,
		};
	},
};
</script>
<style lang="sass" scoped>
a
  color: $grey

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
