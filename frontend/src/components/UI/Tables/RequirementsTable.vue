<template>
	<div class="q-pa-lg">
		<div class="flex justify-end">
			<q-btn
				color="white"
				text-color="primary"
				label="Add new Requirement"
				class="q-my-md"
				@click.prevent="AddRequirement"
			/>
		</div>

		<q-table
			:rows="rowsData"
			:columns="requirementColumns"
			:grid="$q.screen.xs"
			row-key="name"
			field
			table-header-class="table_header"
		>
			<template v-slot:body-cell-avatar="props">
				<AvatarImg :source="props.row.avatar" />
			</template>
			<template v-slot:body-cell-actionsButtons="props">
				<q-td :props="props">
					<q-btn
						dense
						round
						flat
						color="grey"
						@click="editRow(props.row)"
						icon="edit"
					></q-btn>
					<q-btn
						dense
						round
						flat
						color="grey"
						@click="confirm(props.row)"
						icon="delete"
					></q-btn>
				</q-td>
			</template>
		</q-table>
		<!-- Create Dialog -->
		<Modal class="modalGlobal" v-model="isOpened">
			<template v-slot:ModalTitle> {{ $t("create_requirements") }} </template>
			<template v-slot:ModalContent>
				<q-card-section class="q-pt-none">
					<q-form
						@submit.prevent="onSubmitAdd"
						@reset="onResetAdd"
						class="q-gutter-md q-pa-md"
					>
						<div class="row col-md-12 q-gutter-sm">
							<div class="col">
								<q-input
									filled
									label="Requirement Name *"
									lazy-rules
									:rules="[
										(val) => (val && val.length > 0) || 'Please type something',
									]"
									v-model="requirementName"
								/>
							</div>

							<div class="col q-pl-md">
								<q-input
									filled
									label="Data Type *"
									lazy-rules
									:rules="[
										(val) => (val && val.length > 0) || 'Please type something',
									]"
									v-model="requirementDataType"
								/>
							</div>
						</div>
						<div class="row">
							<div class="col">
								<div>
									Active:
									<q-radio v-model="requirementActive" val="yes" label="Yes" />
									<q-radio v-model="requirementActive" val="no" label="No" />
								</div>
							</div>
							<div class="col">
								<div>
									Required:
									<q-radio
										v-model="requirementRequired"
										val="yes"
										label="Yes"
									/>
									<q-radio v-model="requirementRequired" val="no" label="No" />
								</div>
							</div>
						</div>
						<div class="row col-md-12">
							<div class="col">
								<div>
									Value Type:
									<q-radio
										v-model="requirementValueType"
										val="yes"
										label="Yes"
									/>
									<q-radio v-model="requirementValueType" val="no" label="No" />
								</div>
							</div>
							<div class="col">
								<q-select
									filled
									v-model="optionsWidgetSelected"
									:options="optionsWidget"
									label="Possible Value"
								/>
							</div>
						</div>
						<div class="row">
							<div class="col">
								<div>
									Value:
									<div class="q-pa-lg">
										<q-range
											:model-value="lazy"
											@change="
												(val) => {
													lazy = val;
												}
											"
											:min="0"
											:max="50"
											label
										/>
									</div>
								</div>
							</div>
							<div class="col">
								<q-select
									filled
									v-model="model"
									:options="options"
									label="Widget"
								/>
							</div>
						</div>
						<q-card-actions
							align="right"
							class="text-primary flex justify-center"
						>
							<q-btn type="reset" label="Cancel" v-close-popup />
							<q-btn
								label="Create"
								type="submit"
								color="primary"
								v-close-popup
							/>
						</q-card-actions>
					</q-form>
				</q-card-section>
			</template>
		</Modal>

		<!-- Edit Dialog -->
		<Modal
			class="modalGlobal"
			v-show="opendDialog"
			v-model="opendDialog"
			persistent
			position="bottom"
		>
			<template v-slot:ModalTitle> {{ $t("edit_requirements") }} </template>
			<template v-slot:ModalContent>
				<q-card-section class="q-pt-none">
					<q-form
						@submit.prevent="onSubmitAdd"
						@reset="onResetAdd"
						class="q-gutter-md q-pa-md"
					>
						<div class="row col-md-12 q-gutter-sm">
							<div class="col">
								<q-input
									filled
									label="Requirement Name *"
									lazy-rules
									:rules="[
										(val) => (val && val.length > 0) || 'Please type something',
									]"
									v-model="requirementName"
								/>
							</div>

							<div class="col q-pl-md">
								<q-input
									filled
									label="Data Type *"
									lazy-rules
									:rules="[
										(val) => (val && val.length > 0) || 'Please type something',
									]"
									v-model="requirementDataType"
								/>
							</div>
						</div>
						<div class="row">
							<div class="col">
								<div>
									Active:
									<q-radio v-model="requirementActive" val="yes" label="Yes" />
									<q-radio v-model="requirementActive" val="no" label="Yes" />
								</div>
							</div>
							<div class="col">
								<div>
									Required:
									<q-radio
										v-model="requirementRequired"
										val="yes"
										label="Yes"
									/>
									<q-radio v-model="requirementRequired" val="no" label="No" />
								</div>
							</div>
						</div>
						<div class="row col-md-12">
							<div class="col">
								<div>
									Value Type:
									<q-radio
										v-model="requirementValueType"
										val="yes"
										label="Yes"
									/>
									<q-radio v-model="requirementValueType" val="no" label="No" />
								</div>
							</div>
							<div class="col">
								<q-select
									filled
									v-model="optionsWidgetSelected"
									:options="optionsWidget"
									label="Widget"
								/>
							</div>
						</div>
						<div class="row">
							<div class="col">
								<div>
									Value:
									<div class="q-pa-lg">
										<q-range
											:model-value="lazy"
											@change="
												(val) => {
													lazy = val;
												}
											"
											:min="0"
											:max="50"
											label
										/>
									</div>
								</div>
							</div>
							<div class="col">
								<q-select
									filled
									v-model="optionsValueSelected"
									:options="optionsValue"
									label="Possible Value"
								/>
							</div>
						</div>
						<q-card-actions
							align="right"
							class="text-primary flex justify-center"
						>
							<q-btn type="reset" label="Cancel" v-close-popup />
							<q-btn
								label="Create"
								type="submit"
								color="primary"
								v-close-popup
							/>
						</q-card-actions>
					</q-form>
				</q-card-section>
			</template>
		</Modal>
	</div>
</template>

<script>
import { ref } from "vue";
import { useQuasar } from "quasar";
import Modal from "../Dialogs/Modal.vue";
import AvatarImg from "../Images/AvatarImg.vue";
import requirementColumns from "./colums/requirementColumns";

export default {
	components: { Modal, AvatarImg },
	setup() {
		const $q = useQuasar();
		const isOpened = ref(false);
		const opendDialog = ref(false);
		const userObj = ref(null);
		const rowsData = ref([
			{
				name: "nameOne",
				active: "Yes",
				required: "No",
				dataType: "Int",
				valueType: "Multiple",
				possibleValue: "AWS",
				widget: "Range",
				min_value: 0,
				max_value: 100,
			},
			{
				name: "nameTwo",
				active: "Yes",
				required: "No",
				dataType: "String",
				valueType: "Single",
				possibleValue: "OCS",
				widget: "Input",
				min_value: null,
				max_value: "lorem ipsum",
			},
			{
				name: "nameThree",
				active: "No",
				required: "No",
				dataType: "Int",
				valueType: "Single",
				possibleValue: "Kub",
				widget: "dropdown",
				min_value: 0,
				max_value: 20,
			},
		]);

		const optionsWidget = ref([
			"Range",
			"Text Input",
			"Dropdown",
			"Radio button",
			"Checkbox",
		]);
		const optionsValue = ref(["OCS", "KUP", "AWS", "Azure", "FireBase"]);
		const optionsValueSelected = ref(null);
		const optionsWidgetSelected = ref(null);

		const AddRequirement = () => {
			console.log("opend");
			isOpened.value = true;
		};
		const editedIndex = ref(null);

		const confirm = (item) => {
			$q.dialog({
				title: "Confirm",
				message: "Are you sure to delete this item?",
				cancel: true,
				persistent: true,
			})
				.onOk(() => {
					deleteRow(item);
				})
				.onCancel(() => {
					console.log("Cancel");
				});
		};

		const editRow = (currentTarget) => {
			opendDialog.value = true;
			userObj.value = Object.values(currentTarget);
			console.log("Edit this row");
		};
		const deleteRow = async (currentTarget) => {
			try {
				console.log("Delete this element", currentTarget);
				$q.notify({
					type: "positive",
					message: "User has been successfully deleted",
				});
			} catch (error) {
				$q.notify({
					type: "negative",
					message: "Sorry, user has not been deleted",
				});
			}
		};

		return {
			requirementColumns,
			rowsData,
			confirm,
			optionsValue,
			optionsWidget,
			optionsValueSelected,
			optionsWidgetSelected,
			editedIndex,
			userObj,
			editRow,
			deleteRow,
			isOpened,
			opendDialog,
			AddRequirement,
			requirementActive: ref("yes"),
			requirementRequired: ref("yes"),
			requirementValueType: ref("yes"),
		};
	},
};
</script>
<style lang="sass">
.table_header
  background-color: $secondary !important
  color: $primary !important
</style>
