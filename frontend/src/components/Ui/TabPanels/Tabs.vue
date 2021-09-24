<template>
	<div class="q-pa-md">
		<div class="col col-md-12 q-gutter-y-md" style="max-width: 600px">
			<q-card>
				<q-tabs
					v-model="tab"
					class="text-grey"
					active-color="primary"
					indicator-color="primary"
					align="justify"
					narrow-indicator
				>
					<q-tab name="tags" label="Tags" />
					<q-tab name="team_members" label="Team members" />
					<q-tab name="libraries" label="Libraries" />
					<q-tab name="environnements" label="Environnements" />
				</q-tabs>

				<q-separator />

				<q-tab-panels v-model="tab" animated>
					<q-tab-panel name="tags">
						<ul class="tags_default">
							<li>Tag1</li>
							<li>Tag2</li>
							<li>Tag3</li>
							<li>Tag4</li>
							<li>Tag5</li>
							<li>Tag6</li>
							<li>Tag7</li>
							<li>Tag8</li>
							<li>Tag9</li>
							<li>Tag10</li>
							<li>Tag11</li>
							<li>Tag12</li>
							<li>Tag13</li>
							<li>Tag14</li>
							<li>Tag15</li>
							<li>Tag16</li>
						</ul>
					</q-tab-panel>

					<q-tab-panel name="team_members">
						<div class="row items-center wrap">
							<ActionCard
								v-for="member in teamNembers"
								:key="member.id"
								:name="member.name"
								:role="member.role"
								:description="member.description"
							/>
						</div>
					</q-tab-panel>

					<q-tab-panel name="libraries">
						<div class="row items-center wrap">
							<ActionCard
								env
								v-for="librarie in teamLibraries"
								:key="librarie.id"
								:name="librarie.name"
								:description="librarie.description"
							/>
						</div>
					</q-tab-panel>

					<q-tab-panel name="environnements">
						<div class="row items-center wrap">
							<ActionCard
								v-for="env in teamEnvironnements"
								:key="env.id"
								:name="env.name"
								:description="env.description"
							/>
						</div>
					</q-tab-panel>
				</q-tab-panels>
			</q-card>
		</div>
	</div>
</template>
<script>
import { ref } from "vue";
import ActionCard from "../Cards/ActionCard.vue";

export default {
	components: { ActionCard },
	setup() {
		const teamNembers = ref([
			{
				id: 0,
				logo: "https://cdn.quasar.dev/img/parallax2.jpg",
				name: "Brahim",
				role: "Admin",
				description: "Ceci est une description",
			},
			{
				id: 1,
				logo: "https://cdn.quasar.dev/img/parallax2.jpg",
				name: "Sabine",
				role: "Dev",
				description: "Ceci est une description",
			},
			{
				id: 2,
				logo: "https://cdn.quasar.dev/img/parallax2.jpg",
				name: "Sophia",
				role: "DevOps",
				description: "Ceci est une description",
			},
			{
				id: 3,
				logo: "https://cdn.quasar.dev/img/parallax2.jpg",
				name: "Gabriel",
				role: "Admin",
				description: "Ceci est une description",
			},
			{
				id: 4,
				logo: "https://cdn.quasar.dev/img/parallax2.jpg",
				name: "Anouk",
				role: "Dev",
				description: "Ceci est une description",
			},
			{
				id: 5,
				logo: "https://cdn.quasar.dev/img/parallax2.jpg",
				name: "Dada",
				role: "Dev2",
				description: "Ceci est une long description",
			},
		]);
		const teamLibraries = ref([
			{
				id: 0,
				logo: "https://cdn.quasar.dev/img/parallax2.jpg",
				name: "Library 1",
				description: "Ceci est une description",
			},
			{
				id: 1,
				logo: "https://cdn.quasar.dev/img/parallax2.jpg",
				name: "Library 2",
				description: "Ceci est une description",
			},
			{
				id: 2,
				logo: "https://cdn.quasar.dev/img/parallax2.jpg",
				name: "Library 3",
				description: "Ceci est une description",
			},
			{
				id: 3,
				logo: "https://cdn.quasar.dev/img/parallax2.jpg",
				name: "Library 4",
				description: "Ceci est une description",
			},
			{
				id: 4,
				logo: "https://cdn.quasar.dev/img/parallax2.jpg",
				name: "Library 5",
				description: "Ceci est une description",
			},
			{
				id: 5,
				logo: "https://cdn.quasar.dev/img/parallax2.jpg",
				name: "Library 6",
				description: "Ceci est une long description",
			},
		]);
		const teamEnvironnements = ref([
			{
				id: 0,
				logo: "https://cdn.quasar.dev/img/parallax2.jpg",
				name: "Env 1",
				description: "Ceci est une description",
			},
			{
				id: 1,
				logo: "https://cdn.quasar.dev/img/parallax2.jpg",
				name: "Env 2",
				description: "Ceci est une description",
			},
			{
				id: 2,
				logo: "https://cdn.quasar.dev/img/parallax2.jpg",
				name: "Env 3",
				description: "Ceci est une description",
			},
			{
				id: 3,
				logo: "https://cdn.quasar.dev/img/parallax2.jpg",
				name: "Env 4",
				description: "Ceci est une description",
			},
			{
				id: 4,
				logo: "https://cdn.quasar.dev/img/parallax2.jpg",
				name: "Env 5",
				description: "Ceci est une description",
			},
			{
				id: 5,
				logo: "https://cdn.quasar.dev/img/parallax2.jpg",
				name: "Env 6",
				description: "Ceci est une long description",
			},
		]);
		return {
			tab: ref("tags"),
			teamNembers,
			teamLibraries,
			teamEnvironnements,
		};
	},
};
</script>
<style lang="sass" scoped>
.tags_default
  display: flex
  justify-content: flex-start
  flex-wrap: wrap
  list-style: none
  li
    background: beige
    padding: 8px 20px
    border-radius: 12px
    margin-top: 8px
    margin-right: 8px
</style>
