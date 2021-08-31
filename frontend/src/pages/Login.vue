<template>
	<div class="text-white">
		<div class="row">
			<div class="leftside text-secondary">
				<q-img src="../assets/logoBest2.svg" width="30%" />
				<span> Orchestrateur TOSTA étendu </span>
				<ul v-for="user in all" :key="user.id">
					<li>
						{{ user.id }}
					</li>
					<li>
						{{ user.name }}
					</li>
					<li>
						{{ user.email }}
					</li>

					<button @click="deleteTheUser(user.id)">Delete User</button>
				</ul>
			</div>
			<div class="rigthside">
				<Login />
			</div>
		</div>
	</div>
</template>
<script>
import { ref, computed } from "vue";
import { mapActions } from "vuex";
import { useStore } from "vuex";
import Login from "../components/Login/Login.vue";

export default {
	components: { Login },
	methods: {
		...mapActions("loginUsers", [
			"fetchUsers",
			"addUser",
			"updateUser",
			"removeUser",
		]),
	},
	created() {
		this.fetchUsers();
	},

	setup() {
		const store = useStore();
		const all = computed(() => store.state.loginUsers.theUsers);

		const deleteTheUser = (id) => {
			return store.dispatch("loginUsers/removeUser", id);
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
	width: 50%
</style>
