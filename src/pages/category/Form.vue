<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p class="text-h6">
          category
        </p>
      </div>
      <q-form
        @submit.prevent="handleAddProduct"
        class="col-md-4 col-xs-10 col-sm-10 q-gutter-y-md"
      >
        <q-input
          type="text"
          label="Name"
          v-model="form.name"
        />

        <q-btn
          type="submit"
          label="Save"
          color="primary"
          class="full-width"
          rounded
        />

        <q-btn
          label="Cancel"
          color="primary"
          class="full-width"
          rounded
          flat
          :to="{ name:'category' }"
        />
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import useAPi from "src/composables/UserApi";
import { useRouter } from "vue-router";
import UseNotify from "src/composables/useNotify";
import UseLoading from "src/composables/useLoading";


export default defineComponent({
  name: "IndexFormCategory",
  setup() {
    const router = useRouter();
    const { notifyError, notifySuccess } = UseNotify();
    const { showLoading } = UseLoading()

    const { post } = useAPi();

    const form = ref({
      name: "",
    });

    const handleAddProduct = async () => {
      try {

        showLoading("Loading...",1000)
        await post("category",form.value);

        setTimeout(() => {
          notifySuccess("")
          router.push({
            name: "category",
          });
        }, 1200)

      } catch (error) {
        notifyError(error.message);
      }
    };

    return {
      form,
      handleAddProduct,
    };
  },
});
</script>
