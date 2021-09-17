<template>
	<div class="text-white">
		<div class="row">
			<div class="leftside text-secondary md">
				<q-img src="../assets/logoBest2.svg" width="30%" />
				<span> Orchestrateur TOSTA étendu </span>
				<!-- <ul v-for="user in all" :key="user.id">
					<li>
						{{ user.id }}
					</li>
					<li>
						{{ user.email }}
					</li>
					<li>
						{{ user.password }}
					</li>

					<button @click="deleteTheUser(user.id)">Delete User</button>
				</ul> -->
			</div>
			<div class="rigthside">
				<LoginNav />
				<LoginForm />
			</div>
		</div>
	</div>
</template>
<script>
import { computed } from "vue";
import { mapActions } from "vuex";
import { useStore } from "vuex";
import LoginForm from "../components/Form/LoginForm.vue";
import LoginNav from "../components/Navigation/LoginNav.vue";

export default {
	components: { LoginForm, LoginNav },
	methods: {
		...mapActions("appUsers", ["fetchappUsers"]),
	},
	created() {
		// this.fetchappUsers();
	},

	setup() {
		const store = useStore();
		const all = computed(() => store.state.appUsers.logedUsers);

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
	color: black
</style>
