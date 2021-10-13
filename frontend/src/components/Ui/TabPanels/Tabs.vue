<template>
	<div class="col col-md-12">
		<q-card>
			<q-tabs
				v-model="tab"
				class="text-grey"
				active-color="primary"
				indicator-color="primary"
				align="justify"
				narrow-indicator
			>
				<q-tab dense name="products" label="Products" icon="apps" />
				<q-tab dense name="team_members" label="Team members" icon="group" />
				<q-tab dense name="libraries" label="Libraries" icon="library_books" />
				<q-tab dense name="environnements" label="Environnements" icon="code" />
			</q-tabs>
			<q-separator />

			<q-tab-panels v-model="tab" animated>
				<q-tab-panel name="tags">
					<ul class="cards_wrapper">
						<li v-for="(tag, index) in allTags" :key="index">{{ tag }}</li>
					</ul>
				</q-tab-panel>

				<q-tab-panel name="products">
					<div class="cards_wrapper q-gutter-x-sm">
						<ActionCard
							v-for="product in teamProducts"
							:key="product.id"
							:name="product.name"
							:role="product.role"
							:description="product.description"
						/>
					</div>
				</q-tab-panel>
				<q-tab-panel name="team_members">
					<div class="cards_wrapper q-gutter-x-sm">
						<ActionCard
							v-for="member in teamMembers"
							:key="member.id"
							:name="member.name"
							:role="member.role"
							:description="member.description"
						/>
					</div>
				</q-tab-panel>

				<q-tab-panel name="libraries">
					<div class="cards_wrapper q-gutter-x-sm">
						<ActionCard
							v-for="librarie in teamLibraries"
							:key="librarie.id"
							:name="librarie.name"
							:description="librarie.description"
						/>
					</div>
				</q-tab-panel>

				<q-tab-panel name="environnements">
					<div class="cards_wrapper q-gutter-x-sm">
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
</template>
<script>
import { ref } from "vue";
import ActionCard from "../Cards/ActionCard.vue";

export default {
	components: { ActionCard },
	props: {
		allTags: {
			type: [],
			default: ["tag-1", "tag-2", "tag-3"],
		},
		teamMembers: {
			type: [],
			default: [
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
			],
		},
		teamProducts: {
			type: [],
			default: [
				{
					id: 0,
					logo: "https://cdn.quasar.dev/img/parallax2.jpg",
					name: "Product 1",
					description: "Ceci est une description",
				},
				{
					id: 1,
					logo: "https://cdn.quasar.dev/img/parallax2.jpg",
					name: "Product 2",
					description: "Ceci est une description",
				},
				{
					id: 2,
					logo: "https://cdn.quasar.dev/img/parallax2.jpg",
					name: "Product 3",
					description: "Ceci est une description",
				},
			],
		},
		teamLibraries: {
			type: [],
			default: [
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
			],
		},
		teamEnvironnements: {
			type: [],
			default: [
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
			],
		},
	},
	setup() {
		return {
			tab: ref("tags"),
		};
	},
};
</script>
<style lang="sass" scoped></style>
