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
				<q-tab v-if="tags" dense name="tags" label="Tags" icon="sell" />
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

				<q-tab-panel name="products" class="flex q-gutter-md">
					<div
						class="cards_wrapper"
						v-for="product in teamProducts"
						:key="product.ID"
					>
						<ActionCard
							v-if="product.Name"
							:id="product.ID"
							:name="product.Name"
							:description="product.ShortDescription"
							:logo="product.Logo"
						/>
					</div>
					<div class="panel_add__btn q-pa-md q-gutter-sm absolute-bottom-right">
						<q-btn
							color="white"
							text-color="primary"
							icon="add"
							class="text-primary"
							label="New product"
							@click.prevent="openModal(teamProducts)"
						/>
					</div>
				</q-tab-panel>
				<q-tab-panel name="team_members" class="flex q-gutter-md">
					<div
						class="cards_wrapper"
						v-for="member in teamMembers"
						:key="member.ID"
					>
						<ActionCard
							v-if="member.User.LastName"
							:id="member.ID"
							:name="member.User.LastName"
							:role="member.Role.Name"
							:description="member.ShortDescription"
							:logo="member.Logo"
						/>
					</div>
					<div class="panel_add__btn q-pa-md q-gutter-sm absolute-bottom-right">
						<q-btn
							color="white"
							text-color="primary"
							icon="add"
							label="New Authorization"
							@click.prevent="openModal(teamMembers)"
						/>
					</div>
				</q-tab-panel>

				<q-tab-panel name="libraries" class="flex q-gutter-md">
					<div
						class="cards_wrapper"
						v-for="library in teamLibraries"
						:key="library.ID"
					>
						<ActionCard
							v-if="library.Name"
							:id="library.ID"
							:name="library.Name"
							:description="library.ShortDescription"
							:logo="library.Logo"
						/>
					</div>
					<div class="panel_add__btn q-pa-md q-gutter-sm absolute-bottom-right">
						<q-btn
							color="white"
							text-color="primary"
							icon="add"
							label="New library"
							@click.prevent="openModal(teamLibraries)"
						/>
					</div>
				</q-tab-panel>

				<q-tab-panel name="environnements" class="flex q-gutter-md">
					<div
						class="cards_wrapper"
						v-for="env in teamEnvironnements"
						:key="env.ID"
					>
						<ActionCard
							v-if="env.Name"
							:id="env.ID"
							:name="env.Name"
							:description="env.ShortDescription"
							:logo="env.Logo"
							:environmentTypeID="env.EnvironmentTypeID"
							:domainID="env.DomainID"
						/>
					</div>
					<div class="panel_add__btn q-pa-md q-gutter-sm absolute-bottom-right">
						<q-btn
							color="white"
							text-color="primary"
							icon="add"
							label="New Environnement"
							@click.prevent="openModal(teamEnvironnements)"
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
	emits: ["openModalToAddItem"],
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
					description:
						"Ceci est une description: molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis",
				},
				{
					id: 1,
					logo: "https://cdn.quasar.dev/img/parallax2.jpg",
					name: "Sabine",
					role: "Dev",
					description:
						"Ceci est une description: molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis",
				},
				{
					id: 2,
					logo: "https://cdn.quasar.dev/img/parallax2.jpg",
					name: "Sophia",
					role: "DevOps",
					description:
						"Ceci est une description: molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis",
				},
				{
					id: 3,
					logo: "https://cdn.quasar.dev/img/parallax2.jpg",
					name: "Gabriel",
					role: "DevOps",
					description:
						"Ceci est une description: molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis",
				},
				{
					id: 4,
					logo: "https://cdn.quasar.dev/img/parallax2.jpg",
					name: "Anouk",
					role: "DevOps",
					description:
						"Ceci est une description: molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis",
				},
			],
		},
		teamProducts: {
			type: [],
		},
		teamLibraries: {
			type: [],
			default: [
				{
					id: 0,
					logo: "https://cdn.quasar.dev/img/parallax2.jpg",
					name: "Library 1",
					description:
						"Ceci est une description: molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis",
				},
				{
					id: 1,
					logo: "https://cdn.quasar.dev/img/parallax2.jpg",
					name: "Library 2",
					description:
						"Ceci est une description: molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis",
				},
				{
					id: 2,
					logo: "https://cdn.quasar.dev/img/parallax2.jpg",
					name: "Library 3",
					description:
						"Ceci est une description: molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis",
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
					description:
						"Ceci est une description: molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis",
				},
				{
					id: 1,
					logo: "https://cdn.quasar.dev/img/parallax2.jpg",
					name: "Env 2",
					description:
						"Ceci est une description: molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis",
				},
				{
					id: 2,
					logo: "https://cdn.quasar.dev/img/parallax2.jpg",
					name: "Env 3",
					description:
						"Ceci est une description: molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis",
				},
			],
		},
	},
	setup(props, { emit }) {
		const openModal = (item) => {
			emit("openModalToAddItem", item);
			console.table({ ID: item[0].ID, DomainID: item[0].DomainID });
		};
		return {
			tab: ref("tags"),
			openModal,
		};
	},
};
</script>
<style lang="sass" scoped>
.q-tab-panel
	padding: 25px
</style>
