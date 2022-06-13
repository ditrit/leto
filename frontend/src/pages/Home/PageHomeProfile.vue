<template>
	<q-layout container style="height: 100vh" view="lHh lpR lFf">
		<q-header class="bg-white main_header">
			<q-toolbar>
				<div class="row">
					<q-btn
						flat
						@click="drawer = !drawer"
						round
						color="primary"
						icon="menu"
					/>
				</div>
				<AccountSettings />
			</q-toolbar>
		</q-header>
		<AjaxBar />
		<Drawer v-model="drawer">
			<template v-slot:drawerFilter>
				<div class="search_container">
					<q-input ref="filterRef" filled v-model="filter" label="Search">
						<template v-slot:append>
							<q-icon
								v-if="filter !== ''"
								name="clear"
								class="cursor-pointer"
								@click="resetFilter"
							/>
							<q-icon
								v-else
								name="search"
								class="cursor-pointer"
								@click="resetFilter"
							/>
						</template>
					</q-input>
				</div>
			</template>
			<template v-slot:drawerMenu>
				<HomeNav />
			</template>
		</Drawer>

		<q-page-container>
			<q-page :style-fn="pageSizeTweak" class="page_profile">
				<PageContent
					icon="person"
					:headline="$t('profile')"
					:subTitle="$t('manage_profile')"
				/>
				<div class="flex-col p_padding" v-if="user">
					<div class="col">
						<q-form
							@submit="uploadAvatar"
							class="q-gutter-md"
							v-if="showButton"
						>
							<q-file
								v-model="user.Logo"
								type="file"
								round
								:loading="showSubmitBtn"
								class="profil_edit"
								@click="editAvatar"
							>
								<q-icon
									:name="showSubmitBtn ? '' : 'edit'"
									class="profil_icon"
								/>
							</q-file>
							<div class="profil_submit__btn" v-if="showSubmitBtn">
								<q-btn label="Submit" type="submit" color="primary" />
							</div>
						</q-form>
						<q-avatar class="q-my-lg" size="100px">
							<img :src="user.Logo ? user.Logo : logo" alt="user avatar" />
						</q-avatar>
					</div>
					<div class="row">
						<div class="col">
							<div class="button_actions__container">
								<q-btn color="grey-7" round flat icon="more_vert">
									<q-menu cover auto-close>
										<q-list>
											<q-item clickable @click.prevent="OnEdit">
												<q-item-section class="action_card__item">
													<q-icon name="edit" size="1.5em" class="q-mr-sm" />
													Edit</q-item-section
												>
											</q-item>
										</q-list>
									</q-menu>
								</q-btn>
							</div>
							<q-form
								@submit="onSubmit"
								@reset="onReset"
								class="q-gutter-sm q-pr-lg q-mr-lg"
							>
								<q-input
									filled
									:disable="disabled"
									v-model="user.FirstName"
									label="Your First Name *"
									lazy-rules
									:rules="[
										(val) => (val && val.length > 0) || 'Please type something',
									]"
								/>
								<q-input
									filled
									:disable="disabled"
									v-model="user.LastName"
									label="Your Last Name *"
									lazy-rules
									:rules="[
										(val) => (val && val.length > 0) || 'Please type something',
									]"
								/>
								<q-input
									class="profile_textarea"
									filled
									type="textarea"
									:disable="disabled"
									v-model="user.Description"
									label="Your Biography *"
									lazy-rules
									:rules="[
										(val) => (val && val.length > 0) || 'Please type something',
									]"
								/>
								<div v-if="showButton">
									<q-btn label="Submit" type="submit" color="primary" />
									<q-btn
										label="Reset"
										type="reset"
										color="primary"
										flat
										class="q-ml-sm"
									/>
								</div>
							</q-form>
						</div>
						<div class="col-4">
							<div class="text-subtitle3 text-grey-8 q-pl-lg">
								Update password
							</div>
							<q-form
								@submit="submitPassword"
								@reset="onReset"
								class="q-gutter-lg q-pt-lg q-pl-lg"
							>
								<q-input filled label="New password *" v-model="password" />
								<q-input
									filled
									label="Enter again password *"
									v-model="confirmPassword"
								/>

								<div>
									<q-btn label="Submit" type="submit" color="primary" />
									<q-btn
										label="Reset"
										type="reset"
										color="primary"
										flat
										class="q-ml-sm"
									/>
								</div>
							</q-form>
						</div>
					</div>
				</div>
				<!-- Modification Dialog -->
				<Modal class="modalGlobal" v-model="opendDialog">
					<template v-slot:ModalTitle> {{ $t("edit_user") }} </template>
					<template v-slot:ModalContent>
						<q-form
							@submit.prevent="onSubmitUpdate"
							@reset="onResetUpdate"
							class="q-gutter-md q-pa-md"
						>
							<div class="row col-md-12 q-gutter-sm">
								<div class="col">
									<q-input
										filled
										v-model="user.FirstName"
										label="Your First Name *"
										lazy-rules
										:rules="[
											(val) =>
												(val && val.length > 0) || 'Please type something',
										]"
									/>
								</div>
								<div class="col q-pl-md">
									<q-input
										filled
										v-model="user.LastName"
										label="Your Last Name *"
										lazy-rules
										:rules="[
											(val) =>
												(val && val.length > 0) || 'Please type something',
										]"
									/>
								</div>
							</div>
							<div class="row col-md-12 q-gutter-sm">
								<div class="col">
									<q-input
										filled
										v-model="user.Email"
										label="Your Email *"
										lazy-rules
										:rules="[
											(val) =>
												(val && val.length > 0) || 'Please type something',
										]"
									/>
								</div>
							</div>
							<div class="row col-md-12 q-gutter-sm">
								<div class="col-md-8">
									<q-input
										filled
										type="textarea"
										v-model="user.Descripiton"
										label="Description *"
										lazy-rules
										:rules="[
											(val) =>
												(val && val.length > 0) || 'Please type something',
										]"
									/>
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
					</template>
				</Modal>
			</q-page>
		</q-page-container>
	</q-layout>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import API from "../../services/index";
import { v4 as uuidv4 } from "uuid";
import AjaxBar from "components/UI/Progress/AjaxBar";
import PageContent from "components/Content/PageContent";
import Drawer from "components/UI/Drawers/Drawer.vue";
import AccountSettings from "components/UI/Profil/AccountSettings";
import { pageSizeTweak } from "../../common/index";
import HomeNav from "components/UI/Navigation/HomeNav.vue";
import globalAvatar from "../../assets/profil.png";
import Modal from "components/UI/Dialogs/Modal.vue";

export default {
	components: {
		AjaxBar,
		PageContent,
		Drawer,
		AccountSettings,
		HomeNav,
		Modal,
	},
	props: {
		logo: {
			type: String,
			default: globalAvatar,
		},
	},

	setup() {
		const $q = useQuasar();
		const drawer = ref(false);
		const filter = ref("");
		const filterRef = ref(null);
		const store = useStore();
		const user = ref(null);
		const imagesUID = uuidv4();
		const disabled = ref(true);
		const showSubmitBtn = ref(false);
		const showButton = ref(false);
		const opendDialog = ref(true);
		const logoID = ref(null);
		const avatar = ref(null);
		const password = ref(null);
		const confirmPassword = ref(null);

		const currentUser = async () => {
			let response = await store.getters["auth/currentUser"];
			logoID.value = imagesUID;
			user.value = response.user;
			await store.dispatch("appFiles/downloadFile", `${logoID.value}`);
		};
		currentUser();

		const OnEdit = () => {
			opendDialog.value = true;
		};

		const editAvatar = () => {
			showSubmitBtn.value = !showSubmitBtn.value;
		};

		const uploadAvatar = async (file) => {
			const formData = new FormData();
			formData.append("id", imagesUID);
			formData.append("file", file[0], file[0].name);
			await API.post(`/file/${imagesUID}`, formData);
			showSubmitBtn.value = false;
			getAvatar();
		};

		const getAvatar = async () => {
			await API.get(`/file/${logoID.value}`);
		};

		const submitPassword = () => {
			const userUpdate = {
				id: user.value.ID,
				logo: logoUrl.value,
				firstName: user.value.FirstName,
				lastName: user.value.LastName,
				email: user.value.Email,
				password: password.value,
				description: user.value.Description,
			};

			if (password.value === confirmPassword.value) {
				store.dispatch("appUsers/updateUser", userUpdate);
				$q.notify({
					type: "positive",
					message: "Password has been updated.",
				});
			} else {
				$q.notify({
					type: "negative",
					message: "Password has not been updated.",
				});
			}
		};
		return {
			drawer,
			filter,
			filterRef,
			disabled,
			user,
			avatar,
			OnEdit,
			showButton,
			showSubmitBtn,
			password,
			confirmPassword,
			submitPassword,
			editAvatar,
			logoID,
			globalAvatar,
			uploadAvatar,
			imagesUID,
			opendDialog,

			resetFilter() {
				filter.value = "";
				filterRef.value.focus();
			},
			pageSizeTweak,
		};
	},
};
</script>

<style lang="sass">
.button_actions__container
  display: flex
  flex-direction: row
  justify-content: flex-end
.action_card__item
  display: flex
  flex-direction: row

.profil_forms
  display: flex
  flex-direction: row
  justify-content: space-between
  padding: 0 60px 0 60px

.profil_edit
  display: flex
  justify-content: center
  align-items: center
  align-content: center
  top: 10px
  left: 70px
  background: $white
  width: 30px
  height: 30px
  border-radius: 100%
  position: absolute
  z-index: 1
  cursor: pointer

.q-field--standard .q-field__control:before, .q-file__filler input[type="file" i]
  border-bottom: none !important

.q-file .q-field__native
  position: absolute
  top: 50%
  left: 50px
  transform: translate(-105%, -5%)
  color: rgb(245 222 179)
  width: 100px
  font-size: 10px

.profil_icon
  display: block
  position: absolute
  margin-left: 50%
  margin-right: 50%
  transform: translate(-50%, 25%)
  font-size: 1.4em

.profil_submit__btn
  position: absolute
  margin-left: 150px
  margin-top: 55px

.q-spinner
  position: absolute
  top: 3px
  left: 3px

.profile_textarea textarea
  min-height: 300px !important
</style>
