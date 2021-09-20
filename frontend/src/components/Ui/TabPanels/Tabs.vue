<template>
	<div class="q-pa-md">
		<div class="col col-md-12 q-gutter-y-md" style="max-width: 600px">
			<q-card>
				<q-tabs
					v-model="tab"
					dense
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
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum
						dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit
						isicing elit. Lorem ipsum dolor sit amet consectetur Lorem ipsum
						dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit
					</q-tab-panel>

					<q-tab-panel name="team_members">
						<ActionCard />
					</q-tab-panel>

					<q-tab-panel name="libraries">
						<div class="text-h6">Movies</div>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
					</q-tab-panel>

					<q-tab-panel name="environnements">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
		return {
			tab: ref("tags"),
		};
	},
};
</script>
