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
									v-model="model"
									:options="options"
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
		<q-table
			:key="updateKey"
			title=""
			:rows="rowsData"
			:columns="columns"
			:fullscreen="fullscreen"
			:grid="$q.screen.xs"
			row-key="name"
			field
			table-header-class="table_header"
		>
			<template v-slot:body-cell-avatar="props">
				<q-td :props="props">
					<q-avatar size="26px">
						<img src="https://cdn.quasar.dev/img/boy-avatar.png" />
					</q-avatar>
				</q-td>
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
		<Modal
			class="modalGlobal"
			v-show="opendDialog"
			v-model="opendDialog"
			persistent
			position="bottom"
		>
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
									v-model="model"
									:options="options"
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
	</div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import Modal from "../Dialogs/Modal.vue";

const columns = [
	{
		name: "name",
		required: true,
		label: "Name",
		align: "left",
		field: (row) => row.name,
		format: (val) => `${val}`,
		sortable: true,
		classes: "tr_width__avatar",
	},

	{
		name: "active",
		label: "Active",
		align: "left",
		field: "active",
		sortable: true,
		classes: "tr_width__name ellipsis",
	},
	{
		name: "required",
		label: "Required",
		align: "left",
		field: "required",
		sortable: true,
		classes: "tr_width__name ellipsis",
	},
	{
		name: "dataType",
		label: "Data Type",
		align: "left",
		field: "dataType",
		sortable: true,
		classes: "tr_width__email ellipsis",
	},
	{
		name: "valueType",
		label: "Value Type",
		align: "left",
		field: "valueType",
		sortable: false,
		classes: "tr_width ellipsis",
	},
	{
		name: "possibleValue",
		label: "Possible Value",
		align: "left",
		field: "possibleValue",
		sortable: false,
		classes: "tr_width__descr ellipsis",
	},
	{
		name: "widget",
		label: "Widget",
		align: "left",
		field: "widget",
		sortable: false,
		classes: "tr_width__descr ellipsis",
	},
	{
		name: "min_value",
		label: "Min Value",
		align: "left",
		field: "min_value",
		sortable: false,
		classes: "tr_width__descr ellipsis",
	},
	{
		name: "max_value",
		label: "Max Value",
		align: "left",
		field: "max_value",
		sortable: false,
		classes: "tr_width__descr ellipsis",
	},
	{
		name: "actionsButtons",
		label: "",
		align: "left",
		field: "actionsButtons",
		sortable: false,
		classes: "tr_width__actions",
	},
];

export default {
	components: { Modal },
	setup(props) {
		const store = useStore();
		const $q = useQuasar();
		const isOpened = ref(false);
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

		const AddRequirement = () => {
			console.log("opend");
			isOpened.value = true;
		};
		const editedIndex = ref(null);
		const rowsData = ref([
			{
				name: "nameOne",
				active: "Yes",
				required: "No",
				dataType: "Int",
				valueType: "Multiple",
				possibleValue: "AWS",
				widget: "Range",
				value: [{ Min: 10, Max: 100 }],
			},
			{
				name: "nameTwo",
				active: "No",
				required: "Yes",
				dataType: "String",
				valueType: "Single",
				possibleValue: "Kup",
				widget: "Input",
				value: "Lorem ipsum",
			},
			{
				name: "nameThree",
				active: "Yes",
				required: "No",
				dataType: "Boolean",
				valueType: "Single",
				possibleValue: "Yes",
				widget: "Radio button",
				value: "Yes",
			},
		]);
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
		const options = ref(["Google", "Facebook", "Twitter", "Apple", "Oracle"]);
		const model = ref(null);
		const addNewRequirement = () => {
			opendDialog.value = true;
		};

		const editRow = (currentTarget) => {
			opendDialog.value = true;
			userObj.value = Object.values(currentTarget);
		};
		const deleteRow = async (currentTarget) => {
			try {
				const userID = Object.values(currentTarget)[0];
				await store.dispatch("appUsers/removeUser", userID);
				await allUsers();
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
			rowsData,
			confirm,
			editedIndex,
			columns,
			userObj,
			editRow,
			deleteRow,
			isOpened,
			AddRequirement,
		};
	},
};
</script>
<style lang="sass">
.table_header
  background-color: $secondary !important
  color: $primary !important
</style>
