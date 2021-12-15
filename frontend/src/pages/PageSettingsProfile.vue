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
			<q-page :style-fn="pageSizeTweak" class="flex">
				<PageContent
					icon="person"
					:headline="$t('profile')"
					:subTitle="$t('manage_profile')"
					:textContent="$t('text_content')"
				/>
				<div class="profil_forms">
					<div class="col">
						<q-avatar class="q-my-lg" size="100px">
							<img src="img/profil.png" />
						</q-avatar>
						<q-btn round class="profil_edit" size="10px">
							<q-icon name="edit" style="font-size: 2em" />
						</q-btn>
						<q-form
							@submit="onSubmit"
							@reset="onReset"
							class="q-gutter-sm q-pr-lg q-mr-lg"
						>
							<q-input
								filled
								v-model="firstName"
								label="Your First Name *"
								lazy-rules
								:rules="[
									(val) => (val && val.length > 0) || 'Please type something',
								]"
							/>
							<q-input
								filled
								v-model="lastName"
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
					<div class="col-4">
						<q-form
							@submit="onSubmit"
							@reset="onReset"
							class="q-gutter-md q-pl-lg"
						>
							<q-input
								filled
								v-model="password"
								label="New password *"
								lazy-rules
								:rules="[
									(val) => (val && val.length > 0) || 'Please type something',
								]"
							/>
							<q-input
								filled
								v-model="password"
								label="Enter again password *"
								lazy-rules
								:rules="[
									(val) => (val && val.length > 0) || 'Please type something',
								]"
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
		return {
			drawer,
			filter,
			filterRef,
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
.profil_forms
	display: flex
	flex-direction: row
	justify-content: space-between
	padding: 0 60px 0 60px
	width: 100%
.profil_edit
	margin-top: -80px
	margin-left: -30px
	background: $white
</style>
