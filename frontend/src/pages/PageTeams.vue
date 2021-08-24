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
					@click="medium = true"
				/>
				<!-- <CreateItems /> -->
				<q-dialog v-model="medium">
					<q-card style="width: 700px; max-width: 80vw">
						<q-card-section>
							<div class="text-h6">Create New Team</div>
						</q-card-section>

						<q-card-section class="q-pt-none">
							<q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
								<q-input
									filled
									v-model="name"
									label="Your name *"
									hint="Name and surname"
									lazy-rules
									:rules="[
										(val) => (val && val.length > 0) || 'Please type something',
									]"
								/>

								<q-input
									filled
									type="number"
									v-model="age"
									label="Your age *"
									lazy-rules
									:rules="[
										(val) =>
											(val !== null && val !== '') || 'Please type your age',
										(val) => (val > 0 && val < 100) || 'Please type a real age',
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
						</q-card-section>

						<q-card-actions align="right" class="bg-white text-teal">
							<q-btn flat label="Next" v-close-popup />
						</q-card-actions>
					</q-card>
				</q-dialog>
			</div>
		</q-page>
	</q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
import BtnAddNew from "../components/Buttons/BtnAddNew.vue";
import PageContent from "../components/Content/PageContent.vue";
// import CreateItems from "../components/Dialogs/CreateItems.vue";
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
		const medium = ref(false);
		const $q = useQuasar();

		const name = ref(null);
		const age = ref(null);
		const accept = ref(false);
		return {
			buttonsList,
			content,
			medium,
			name,
			age,
			accept,
			onSubmit() {
				if (accept.value !== true) {
					$q.notify({
						color: "red-5",
						textColor: "white",
						icon: "warning",
						message: "You need to accept the license and terms first",
					});
				} else {
					$q.notify({
						color: "green-4",
						textColor: "white",
						icon: "cloud_done",
						message: "Submitted",
					});
				}
			},
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
