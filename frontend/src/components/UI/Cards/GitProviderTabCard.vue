<template>
	<div class="row wrap">
		<q-card flat bordered>
			<q-form
				@submit="onSubmitAdd"
				@reset="onResetAdd"
				class="q-gutter-md q-pa-md">
				<div class="col-md-12">
					<div class="col q-gutter-md">
						<q-select
							filled
							:options="usersList"
							label="User *"
							v-model="authorisationUser"
							:rules="[(val) => val || 'Please select something']"
						/>

						<q-select
							filled
							:options="roleList"
							label="Role *"
							v-model="authorizationRole"
							:rules="[(val) => val || 'Please select something']"
						/>

						<q-select
							filled
							:options="domainList"
							label="Domain *"
							v-model="authorizsationDomain"
							:rules="[(val) => val || 'Please select something']"
						/>
					</div>
				</div>

				<q-card-actions
					align="right"
					class="text-primary flex justify-center"
				>
					<q-btn type="reset" label="Cancel" />
					<q-btn label="Create" type="submit" color="primary" />
				</q-card-actions>
			</q-form>
		</q-card>
	</div>
</template>

<script>
export default {
	name: "GitProviderTabCard",
};
</script>

<style scoped>

</style>
