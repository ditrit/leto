<template>
	<div>
		<q-input filled v-model="filter" label="Search">
			<template v-slot:append>
				<q-icon
					v-if="filter !== ''"
					name="clear"
					class="cursor-pointer"
					@click="resetFilter"
				/>
				<q-icon
					v-else
					name="search"
					class="cursor-pointer"
					@click="resetFilter"
				/>
			</template>
		</q-input>
		<q-list
			class="rounded-borders text-white"
			dark
			v-for="item in data"
			:key="item.name"
		>
			<q-expansion-item
				expand-sperator
				group="providers"
				:icon="item.icon"
				header-class="text-bold bg-primary"
				:label="item.name"
			>
				<q-scroll-area style="height: calc(100vh - 205px)">
					<q-table
						grid
						class="scroll"
						:rows="item.data"
						:columns="columns"
						row-key="name"
						:filter="filter"
						hide-header
						hide-bottom
						virtual-scroll
						v-model:pagination="pagination"
						:rows-per-page-options="[0]"
					>
						<template v-slot:item="props">
							<div class="q-pa-xs col-xs-12 col-sm-4 col-md-6 text-primary">
								<q-card
									class="leto-palette-card"
									@click="onClick(props.row.name)"
								>
									<q-tooltip class="text-body2" v-if="props.row.name">
										{{ props.row.name }}
									</q-tooltip>
									<q-img
										:src="props.row.imageUrl"
										fit="content"
										height="70px"
									/>
									<q-card-section class="ellipsis">
										<div class="text-caption centered">
											{{
												props.row.name
													.replace(new RegExp(`${item.name}_`, "i"), "")
													.replaceAll("_", "-")
											}}
										</div>
									</q-card-section>
									<q-separator />
								</q-card>
							</div>
						</template>
					</q-table>
				</q-scroll-area>
			</q-expansion-item>
			<q-separator />
		</q-list>
	</div>
</template>

<script>
import { defineComponent, ref } from "vue";
import EventBus from "src/services/EventBus";

/**
 * @typedef {{
 * 	name: string;
 *  description?: string;
 *  imageUrl: string;
 * }} PaletteItem
 * @typedef {{
 * 	name: string;
 *  icon?: string;
 *  data: PaletteItem[];
 * }} PaletteGroup
 */

function onClick(name) {
	EventBus.emit("selected:component", name);
}

export default defineComponent({
	props: [
		/** @type {PaletteGroup[]} */
		"data",
	],
	methods: {
		onClick,
	},
	setup() {
		const filter = ref("");
		return {
			pagination: ref({ rowsPerPage: 0 }),
			filter,
			resetFilter() {
				filter.value = "";
			},
			columns: [
				{ name: "name", label: "name", field: (row) => row.name },
				{
					name: "description",
					label: "description",
					field: (row) => row.description,
				},
			],
		};
	},
});
</script>
<style lang="sass" scoped>
.leto-palette-card
	max-width: 250px
	cursor: pointer
</style>
