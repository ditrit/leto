<template>
	<q-layout class="bg-grey">
		<q-page padding class="flex bg-gray">
			<PageContent
				v-for="(item, index) in content"
				:key="index"
				:name="item.icon"
				:headline="item.headline"
				:textContent="item.textContent"
				:tags="item.tags"
			/>

			<div
				class="teams_buttons__container"
				v-for="btn in buttonsList"
				:key="btn.title"
			>
				<BtnAddNew
					:title="btn.title"
					:class="btn.styles"
					outline
					round
					:color="btn.color"
					:icon="btn.icon"
					:href="btn.link"
				/>
			</div>
		</q-page>
	</q-layout>
</template>

<script>
import { defineComponent } from "vue";
import BtnAddNew from "../components/Buttons/BtnAddNew.vue";
import PageContent from "../components/Content/PageContent.vue";
const buttonsList = [
	{
		title: "Add new Team",
		styles: "q-mt-sm",
		color: "primary",
		icon: "add",
		link: "/",
	},
	{
		title: "Add to Favorite",
		styles: "q-mt-sm",
		color: "primary",
		icon: "favorite",
		link: "#/favorite",
	},
	{
		title: "Root Team",
		styles: "q-mt-sm",
		color: "primary",
		icon: "add",
		link: "#/teams",
	},
];

const content = [
	{
		icon: "group",
		headline: "Teams",
		textContent:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusda recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur  ugiat, temporibus enim commodi iusto libero magni deleniti quod quam  consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad  earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo  fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore  suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam  totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam  quasi aliquam eligendi, placeat qui corporis!",
		tags: "",
	},
];

export default defineComponent({
	name: "PageTeams",
	components: { BtnAddNew, PageContent },

	setup() {
		return {
			buttonsList,
			content,
		};
	},
});
</script>
<style lang="sass" scoped>


.teams_buttons__container
  display: flex
  flex-direction: row
  justify-content: space-evenly
  align-items: flex-start
  flex: 1
</style>
