<template>
	<div class="col-auto">
		<q-btn color="grey-7" round flat icon="more_vert">
			<q-menu cover auto-close class="card_actions">
				<q-list>
					<q-item clickable  v-for="item in btnLinks">
						<q-item-section>{{item}}</q-item-section>
					</q-item>
			</q-menu>
		</q-btn>
	</div>
</template>

<script>
export default {
	props: {
		btnLinks: {
			type: Array,
		},
	},
};
</script>

<style></style>
