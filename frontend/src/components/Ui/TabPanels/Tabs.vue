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
						<ActionCard />
					</q-tab-panel>

					<q-tab-panel name="libraries">
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
