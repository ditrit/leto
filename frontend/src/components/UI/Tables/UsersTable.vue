<template>
	<div class="q-pa-lg">
		<div class="flex justify-end">
			<q-btn
				color="white"
				text-color="primary"
				label="Add new User"
				class="q-my-md"
			/>
		</div>
		<q-table
			title=""
			:rows="rowsData"
			:columns="columns"
			row-key="name"
			selection="single"
			v-model:selected="selected"
			field
			table-header-class="table_header"
		>
			<template v-slot:body-cell-actions="props">
				<q-td :props="props">
					<q-btn
						dense
						round
						flat
						color="grey"
						@click="editRow(props)"
						icon="edit"
					></q-btn>
					<q-btn
						dense
						round
						flat
						color="grey"
						@click="deleteRow(props)"
						icon="delete"
					></q-btn>
				</q-td>
			</template>
		</q-table>

		<div class="q-mt-md">
			<pre>
      Selected Element:  {{ selected }}
      </pre>
		</div>
	</div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";

const columns = [
	{
		name: "avatar",
		required: true,
		label: "Avatar",
		align: "left",
		field: (row) => row.name,
		format: (val) => `${val}`,
		sortable: true,
	},

	{
		name: "firstName",
		label: "First Name",
		align: "left",
		field: "firstName",
		sortable: true,
	},
	{
		name: "lastName",
		label: "Last Name",
		align: "left",
		field: "lastName",
		sortable: true,
	},
	{
		name: "email",
		label: "Email",
		align: "left",
		field: "email",
		sortable: true,
	},
	{
		name: "actions",
		label: "",
		align: "left",
		field: "actions",
		sortable: false,
	},
];

export default {
	setup() {
		const store = useStore();
		const rowsData = ref([]);
		const allUsers = async () => {
			// fetch All Users
			await store.dispatch("appUsers/fetchUsers");
			const getUsers = computed(() => store.getters["appUsers/allUsers"]);
			console.log(
				"getUsers: ",
				Object.values(
					getUsers.value.map((item) => {
						return {
							id: item.ID,
							avatar:
								"https://images.unsplash.com/photo-1637637498892-6b9801f4e5bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
							firstName: item.FirstName,
							lastName: item.LastName,
							email: item.Email,
						};
					})
				)
			);
			return (rowsData.value = Object.values(
				getUsers.value.map((item) => {
					return {
						id: item.ID,
						avatar:
							"https://images.unsplash.com/photo-1637637498892-6b9801f4e5bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
						firstName: item.FirstName,
						lastName: item.LastName,
						email: item.Email,
					};
				})
			));
		};
		allUsers();
		const editRow = (event) => {
			console.log(event);
		};

		editRow();
		const deleteRow = (event) => {
			console.log(event);
		};
		deleteRow();
		return {
			selected: ref([]),
			columns,
			rowsData,
			store,
		};
	},
};
</script>
<style lang="sass">
.table_header
  background-color: $secondary !important
  color: $primary !important
</style>
