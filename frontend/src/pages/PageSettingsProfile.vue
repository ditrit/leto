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
				<SettingsNav />
			</template>
		</Drawer>

		<q-page-container>
			<q-page :style-fn="pageSizeTweak" class="">
				<PageContent
					icon="person"
					:headline="$t('profile')"
					:subTitle="$t('manage_profile')"
				/>
				<div class="profil_forms" v-if="user">
					<div class="col">
						<q-file round class="profil_edit" size="10px" @click="editAvatar">
							<q-icon name="edit" style="font-size: 2em" />
						</q-file>
						<q-avatar class="q-my-lg" size="100px">
							<img :src="user.Logo" />
						</q-avatar>
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
								filled
								type="textarea"
								v-model="biography"
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
					<div class="col-4" style="margin-top: 95px">
						<div class="text-h7 text-grey q-pa-md q-ml-sm">Update password</div>
						<q-form
							@submit="onSubmit"
							@reset="onReset"
							class="q-gutter-md q-pl-lg"
						>
							<q-input filled label="New password *" />
							<q-input filled label="Enter again password *" />

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
				<Modal>
					<template v-slot:ModalBody>
						<CreationFormStepperVue />
					</template>
				</Modal>
			</q-page>
		</q-page-container>
	</q-layout>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import AjaxBar from "../components/UI/Progress/AjaxBar";
import PageContent from "../components/Content/PageContent";
import Drawer from "../components/UI/Drawers/Drawer.vue";
import AccountSettings from "components/UI/Profil/AccountSettings";
import SettingsNav from "../components/UI/Navigation/SettingsNav";
import { pageSizeTweak } from "../common/index";
export default {
	components: {
		AjaxBar,
		PageContent,
		Drawer,
		AccountSettings,
		SettingsNav,
	},
	setup() {
		const drawer = ref(false);
		const filter = ref("");
		const filterRef = ref(null);
		const store = useStore();
		const user = ref(null);
		const disabled = ref(true);
		const showButton = ref(false);

		const currentUser = async () => {
			let response = await store.getters["auth/user"];
			user.value = response;
			console.log("user.value : ", user.value);
		};
		currentUser();

		const OnEdit = () => {
			disabled.value = false;
			showButton.value = true;
		};

		const editAvatar = () => {
			console.log("Try to upload image");
		};

		return {
			drawer,
			filter,
			filterRef,
			disabled,
			user,
			OnEdit,
			showButton,
			editAvatar,
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
	margin-top: -80px
	margin-left: -30px
	background: $white
	width: 30px
	height: 30px
	border-radius: 100%
</style>
