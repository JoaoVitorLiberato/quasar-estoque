<template>
  <q-page padding>
    <div class="q-pa-md">
    <q-table
      :rows="categories"
      :columns="columns"
      row-key="calories"
      class="col-12"
      :loading="loading"
    >
      <template v-slot:top>
        <span class="text-h6">
          Category
        </span>
        <q-space />
        <q-btn
          icon="mdi-plus"
          label="Add New"
          color="primary"
          dense
          size="md"
          :to="{name: 'form-category'}"
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
  import { defineComponent, ref, onMounted } from "vue"
  import useAPi from "src/composables/UserApi";
  import UseNotify from "src/composables/useNotify";

  const columns =
  [
    { name: 'name', align: 'left', label: 'name', field: 'name', sortable: true },
    { name: 'actions', align: 'right', label: 'Actions', field: 'actions', sortable: true }
  ]


  export default defineComponent({
    name: "PageCategoryList",
    setup() {

      const categories = ref([])
      const loading = ref(false)
      const { list } = useAPi()
      const { notifyError } = UseNotify()

      onMounted(() => {
        const halndleListCategories = async () => {
          try {
            loading.value = true
            categories.value = await list('category')
            loading.value = false
          } catch (error) {
            notifyError(error.message)
          }
        }

        halndleListCategories()
      })

      return {
        columns,
        categories,
        loading,
      }
    }
  });
</script>
