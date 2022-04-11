<template>
	<div class="q-pa-md">
		<q-stepper v-model="step" header-nav ref="stepper" color="primary" animated>
			<q-step :name="1" title="Select campaign settings" icon="settings">
				<ProductContent :data="currentProductContent">
					<template v-slot:productTags>
						<section class="col-4">
							<div class="tags_wrapper">
								<q-card flat bordered class="card_tags_default">
									<q-card-section>
										<div class="row no-wrap">
											<div class="col">
												<div class="row">
													<q-icon name="sell" size="30px" class="q-mr-sm" />
													<div class="text-h6">Tags</div>
												</div>
											</div>
											<div class="button_actions__container col-auto">
												<q-btn color="grey-7" round flat icon="more_vert">
													<q-menu cover auto-close>
														<q-list>
															<q-item clickable @click.prevent="OnEdit">
																<q-item-section class="action_card__item">
																	<q-icon
																		name="edit"
																		size="1.5em"
																		class="q-mr-sm"
																	/>
																	Edit</q-item-section
																>
															</q-item>
														</q-list>
													</q-menu>
												</q-btn>
											</div>
										</div>
									</q-card-section>
									<q-card-section>
										<ul
											class="cards_tags_wrapper rounded-borders overflow-hidden"
										>
											<li
												v-for="item in domainTags"
												:key="item.ID"
												:class="item.class"
											>
												{{ item.Name }}
												<q-btn
													v-if="editMode"
													round
													dense
													unelevated
													size="xs"
													color="red"
													text-color="white"
													icon="delete"
													@click.prevent="confirm(item.ID)"
													class="q-ml-sm"
												/>
											</li>
										</ul>
										<div
											v-if="globalTagsTreeList"
											v-show="editMode"
											class="globalTagTree_container"
										>
											<q-input
												ref="filterTagRef"
												v-model="filterTag"
												label="Search"
												dense
											>
												<template v-slot:append>
													<q-icon
														v-if="filterTag !== ''"
														name="clear"
														class="cursor-pointer"
														@click="resetFilterTag"
													/>
												</template>
											</q-input>
											<div class="q-pa-md q-gutter-sm">
												<q-tree
													dense
													:nodes="globalTagsTreeList"
													node-key="label"
													:filter="filterTag"
													default-expand-all
												/>
											</div>
										</div>
									</q-card-section>
								</q-card>
							</div>
						</section>
					</template>
				</ProductContent>
			</q-step>

			<q-step
				:name="2"
				title="Create an ad group"
				caption="Optional"
				icon="create_new_folder"
			>
				An ad group contains one or more ads which target a shared set of
				keywords.
			</q-step>

			<q-step :name="3" title="Create an ad" icon="add_comment">
				Try out different ad text to see what brings in the most customers, and
				learn how to enhance your ads using features like ad extensions. If you
				run into any problems with your ads, find out how to tell if they're
				running and how to resolve approval issues.
			</q-step>
		</q-stepper>
	</div>
</template>

<script>
import { ref } from "vue";
import ProductContent from "../Cards/ProductContent.vue";
import useProductDetails from "../../../composables/Products/useProductDetails";
import useDomainData from "../../../composables/WorkSpace/useDomain";

export default {
	components: { ProductContent },
	setup(props) {
		const step = ref(1);
		let { store, router, $q, currentProductContent, menu, openProject } =
			useProductDetails();
		let {
			domainTags,
			globalTagsTreeList,
			getTagsTree,
			OnDelete,
			editMode,
			confirm,
			OnEdit,
			domainID,
		} = useDomainData(props);

		return {
			step,
			store,
			router,
			$q,
			currentProductContent,
			menu,
			openProject,
			domainTags,
			globalTagsTreeList,
			getTagsTree,
			OnDelete,
			editMode,
			confirm,
			OnEdit,
			domainID,
		};
	},
};
</script>

<style lang="sass" scoped>
.q-stepper
  max-width: 1200px !important
</style>
