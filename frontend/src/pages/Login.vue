<template>
	<div class="text-white">
		<div class="row">
			<div class="leftside text-secondary">
				<q-img src="../assets/logoBest2.svg" width="30%" />
				<span> Orchestrateur TOSTA étendu </span>
				<ul v-for="user in users" :key="user.id">
					<li>
						{{ user.name }}
					</li>
					<li>
						{{ user.email }}
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
import axios from "axios";
import Login from "../components/Login/Login.vue";
import { ref } from "vue";
export default {
	components: { Login },
	setup() {
		const users = ref([]);
		const getUsers = async () => {
			let response = await axios.get("http://localhost:3000/users");
			let data = response.data;
			users.value = data;
			console.log(users.value);
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
