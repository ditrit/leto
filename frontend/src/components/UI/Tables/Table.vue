<template>
  <div class="q-pa-lg">
  <div class="flex justify-end">
  <q-btn color="white" text-color="primary" label="Add new User" class="q-my-md" />
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
              <q-btn dense round flat color="grey" @click="editRow(props)" icon="edit"></q-btn>
              <q-btn dense round flat color="grey" @click="deleteRow(props)" icon="delete"></q-btn>
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
import { ref } from 'vue'

const columns = [
  {
    name: 'avatar',
    required: true,
    label: 'Avatar',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },

  { name: 'name', label: 'Name', align: 'left', field: 'name', sortable: true },
  { name: 'role', label: 'Role', align: 'left', field: 'role', sortable: true },
  { name: 'email', label: 'Email',  align: 'left',field: 'email', sortable: true },
  { name: 'shortDescription', label: 'Short Description', align: 'left', field: 'shortDescription', sortable: true },
 


]

const rowsData = [
  {
    id: 1,
    logo: "https://images.unsplash.com/photo-1637532114773-a1faa8df08b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
    name: 'User One',
    role:"Admin",
    email:"userOne@gmail.com",
    shortDescription:"This is a short Description for user one",
   
  },
  {
    id: 2,
    logo: "https://images.unsplash.com/photo-1637532114773-a1faa8df08b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
    name: 'User Two',
    role:"Admin",
    email:"userTwo@gmail.com",
    shortDescription:"This is a short Description for user Two",
  },
  {
    id: 3,
    logo: "https://images.unsplash.com/photo-1637532114773-a1faa8df08b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
    name: 'User Three',
    role:"Admin",
    email:"userThree@gmail.com",
    shortDescription:"This is a short Description for user Three",
  },
  {
    id: 4,
    logo: "https://images.unsplash.com/photo-1637532114773-a1faa8df08b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
    name: 'User Four',
    role:"Admin",
    email:"userFour@gmail.com",
    shortDescription:"This is a short Description for user Four",
  },
  {
    id: 5,
    logo: "https://images.unsplash.com/photo-1637532114773-a1faa8df08b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
    name: 'User Five',
    role:"Admin",
    email:"userFive@gmail.com",
    shortDescription:"This is a short Description for user Five",
  },

]

export default {
  setup () {
    const editRow = (event) => {
     console.log(event)
    }
    editRow()
    const deleteRow = (event) => {
     console.log(event)
    }
    deleteRow()
    return {
      selected: ref([]),
      columns,
      rowsData
    }
  }
}
</script>
<style lang="sass">
.table_header
  background-color: $secondary !important
  color: $primary !important
  
</style>