<template>
	<div class="text-white">
		<div class="row">
			<div class="leftside text-secondary">
				<q-img src="../assets/logoBest2.svg" width="30%" />
				<span> Orchestrateur TOSTA étendu </span>
				<ul v-for="user in users" :key="user.ID">
					<li>
						{{ user.Name }}
					</li>
					<li>
						{{ user.Email }}
					</li>
				</ul>
			</div>
			<div class="rigthside">
				<Login />
			</div>
		</div>
	</div>
</template>
<script>
import { ref } from "vue";
import services from "../services/Users";
import Login from "../components/Login/Login.vue";

export default {
	components: { Login },
	setup() {
		const users = ref([]);
		const getUsers = async () => {
			let response = await services.getAlllUsers();
			let data = response.data;
			users.value = data;
			console.log("First Data: ", users.value);
		};

		getUsers();
		return {
			users,
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
