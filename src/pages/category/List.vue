<template>
  <q-page padding>
    <div class="q-pa-md">
    <q-table
      :rows="rows"
      :columns="columns"
      row-key="calories"
      class="col-12"
    >
      <template v-slot:top>
        <span class="text-h6">
          Category
        </span>
        <q-space />
        <q-btn
          label="Add New"
          color="primary"
        />
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-x-sm">
          <q-btn
            icon="mdi-pencil-outline"
            color="info"
            dense
            size="sm"
          >
            <q-tooltip>
              Edit
            </q-tooltip>
          </q-btn>
          <q-btn
            icon="mdi-delete-outline"
            color="negative"
            dense
            size="sm"
          >
            <q-tooltip>
              Remove
            </q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
  </q-page>
</template>

<script>
  import { defineComponent } from "vue"

  const columns =
  [
    { name: 'name', align: 'left', label: 'name', field: 'name', sortable: true },
    { name: 'actions', align: 'right', label: 'Actions', field: 'actions', sortable: true }
  ]

  const rows =
  [
    {
      id: '123',
      name: 'Tênis'
    }
  ]


  export default defineComponent({
    name: "PageCategoryList",
    setup() {


      return {
        columns,
        rows
      }
    }
  });
</script>
