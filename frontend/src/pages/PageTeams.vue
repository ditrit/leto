<template>
	<q-layout class="bg-grey">
		<q-page padding class="flex bg-gray">
			<div class="teams_content flex">
				<div class="row">
					<div class="col col-md-8">
						<div class="flex">
							<q-icon name="group" size="30px" class="q-ml-md q-mr-sm" />
							<p class="text-bold text-h6">Teams</p>
						</div>
						<p class="q-ml-md">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
							natus alias expedita vitae deleniti distinctio tempora ipsam
							facilis modi laborum porro non amet totam reiciendis, rerum harum
							asperiores obcaecati ipsum?
						</p>
					</div>

					<div class="col-2 col-md-2">
						<p>
							Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus
							magni corrupti quo blanditiis porro! Vel voluptatem quod quasi
							dolor aperiam ipsum culpa, voluptate est neque illo tempora veniam
							eos officia.
						</p>
					</div>
				</div>

				<div class="teams_buttons__container">
					<div class="teams_button">
						New Team
						<q-btn class="q-mt-sm" outline round color="primary" icon="add" />
					</div>
					<div class="teams_button">
						Add to Favorite
						<q-btn class="q-mt-sm" outline round color="primary" icon="add" />
					</div>
					<div class="teams_button">
						Root Team
						<q-btn class="q-mt-sm" outline round color="primary" icon="add" />
					</div>
				</div>
			</div>
		</q-page>
	</q-layout>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
	name: "PageTeams",
	components: {},
});
</script>
<style lang="sass">
.teams_buttons__container
  display: flex
  flex-direction: row
  justify-content: space-evenly
  align-items: flex-start

.teams_button
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  padding: 40px
  height: 160px
  border-radius: 8px
  box-shadow: 0px 0px 12px 0px rgba(0,0,0, .2)
  font-weight: 500
  font-size: 20px
</style>
