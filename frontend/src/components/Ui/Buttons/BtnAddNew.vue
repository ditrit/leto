<template>
	<div class="teams_button">
		{{ title }}
		<q-btn
			outline
			round
			:class="styles"
			:color="color"
			:icon="icon"
			:href="link"
		/>
	</div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
	name: "BtnAddNew",
	props: {
		title: {
			type: String,
			required: true,
		},

		styles: {
			type: String,
			default: "q-mt-sm",
		},

		color: {
			type: String,
			default: "primary",
		},

		icon: {
			type: String,
			default: "add",
		},
		link: {
			type: String,
			default: "/team",
		},
	},
});
</script>

<style lang="sass" scoped>
.teams_button
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  padding: 40px
  height: 160px
  border-radius: 8px
  box-shadow: 0px 0px 12px 0px rgba(0,0,0, .2)
  font-weight: 500
  font-size: 20px
</style>
