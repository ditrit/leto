<template>
	<div class="q-pa-lg">
		<div class="flex justify-end">
			<q-btn
				color="white"
				text-color="primary"
				label="Add new Requirement"
				class="q-my-md"
				@click.prevent="AddUser"
			/>
		</div>
		<Modal class="modalGlobal">
			<template v-slot:ModalTitle> {{ $t("add_requirements") }} </template>
			<template v-slot:ModalContent> Hello </template>
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
				<!-- Modification Dialog -->

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
		<q-dialog v-model="openAddUserDialog" persistent position="bottom">
			<q-card style="width: 750px; max-width: 80vw">
				<q-card-section>
					<div class="text-h6 q-pa-md">{{ $t("create_user") }}</div>
				</q-card-section>

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
									label="Your First Name *"
									lazy-rules
									:rules="[
										(val) => (val && val.length > 0) || 'Please type something',
									]"
									v-model="userFirstName"
								/>
							</div>

							<div class="col q-pl-md">
								<q-input
									filled
									label="Your Last Name *"
									lazy-rules
									:rules="[
										(val) => (val && val.length > 0) || 'Please type something',
									]"
									v-model="userLastName"
								/>
							</div>
						</div>
						<div class="row col-md-12 q-gutter-sm">
							<div class="col">
								<q-input
									filled
									label="Your Email *"
									lazy-rules
									:rules="[
										(val) => (val && val.length > 0) || 'Please type something',
									]"
									v-model="userEmail"
								/>
							</div>
							<div class="col q-pl-md">
								<q-input
									filled
									label="Your password *"
									lazy-rules
									:rules="[
										(val) => (val && val.length > 0) || 'Please type something',
									]"
									v-model="userPassword"
								/>
							</div>
						</div>
						<div class="row col-md-12 q-gutter-sm">
							<div class="col">
								<q-input
									filled
									type="textarea"
									label="Descripiton *"
									lazy-rules
									:rules="[
										(val) => (val && val.length > 0) || 'Please type something',
									]"
									v-model="userDescription"
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
			</q-card>
		</q-dialog>
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
		name: "value",
		label: "Value",
		align: "left",
		field: "value",
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
	rowsData: {
		type: Array,
		default: [
			{ name: ["nameOne", "nameTwo", "nameThree", "nameFour"] },
			{ active: ["Yes", "No", "No", "Yes"] },
			{ required: ["Yes", "No", "No", "Yes"] },
			{ dataType: ["String", "Int", "Boolean", "Real"] },
			{ valueType: ["Single", "Muliple", "Muliple", "Single"] },
			{ possibleValueType: ["AWS", "OCS", "KUB", "AZURE"] },
			{
				vidget: ["Range", "Input", "Dropdown", "Radio Button", "Checkbox"],
			},
		],
	},

	setup() {
		const store = useStore();
		const $q = useQuasar();
		const opendDialog = ref(true);
		const userObj = ref(null);

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
			confirm,
			editedIndex,
			columns,
			userObj,
			editRow,
			deleteRow,
			opendDialog,
		};
	},
};
</script>
<style lang="sass">
.table_header
  background-color: $secondary !important
  color: $primary !important
</style>
