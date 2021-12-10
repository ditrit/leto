<template>
	<div class="text-white">
		<div class="row">
			<div class="leftside text-secondary sm-hide xs-hide">
				<q-img src="../assets/logoBest2.svg" width="30%" />
				<span> Orchestrateur TOSTA étendu </span>
			</div>
			<div class="rigthside">
				<LoginNav />
				<LoginForm />
			</div>
		</div>
	</div>
</template>
<script>
import LoginForm from "../components/UI/Form/LoginForm";
import LoginNav from "../components/UI/Navigation/LoginNav";

export default {
	components: { LoginForm, LoginNav },
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
