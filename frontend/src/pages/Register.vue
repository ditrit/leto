<template>
	<div class="text-white">
		<div class="row">
			<div class="leftside text-secondary md">
				<q-img src="../assets/logoBest2.svg" width="30%" />
				<span> Orchestrateur TOSTA étendu </span>
			</div>
			<div class="rigthside">
				<LoginNav />
				<RegistrationForm />
				<div class="social_acces">
					<SocialConnect />
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { computed } from "vue";
import { mapActions } from "vuex";
import { useStore } from "vuex";
import RegistrationForm from "../components/UI/Form/RegistrationForm";
import SocialConnect from "../components/Login/SocialConnect";
import LoginNav from "../components/UI/Navigation/LoginNav";

export default {
	components: { RegistrationForm, SocialConnect, LoginNav },
	methods: {
		...mapActions("appUsers", [
			"fetchUsers",
			"addUser",
			"updateUser",
			"removeUser",
		]),
	},
	created() {
		// this.fetchUsers();
	},

	setup() {
		const store = useStore();
		const all = computed(() => store.state.auth.user);

		const deleteTheUser = (id) => {
			return store.dispatch("appUsers/removeUser", id);
		};

		return {
			all,
			deleteTheUser,
		};
	},
};
</script>

<style lang="sass">
.leftside
	display: flex
	flex-direction: column
	justify-content: center
	align-items: center
	height: 100vh
	width: 50%
.rigthside
	display: flex
	flex-direction: column
	justify-content: center
	align-items: center
	background: white
	height: 100vh
	flex: 1
</style>
