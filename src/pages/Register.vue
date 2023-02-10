<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleRegister">
      <p class="col-12 text-h5 text-center">Register</p>
      <div class="col-12 col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input label="Name" outlined v-model="form.name" />
        <q-input label="Email" outlined v-model="form.email" />
        <q-input label="Password" outlined v-model="form.password" />
        <div class="full-width q-pt-md">
          <q-btn
            type="submit"
            label="Register"
            color="primary"
            class="full-width"
            outline
            rounded
            size="lg"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import userAuthUser from "src/composables/UseAuthUser";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "IndexRegister",
  setup() {
    const router = useRouter();

    const { register } = userAuthUser();

    const form = ref({
      name: "",
      email: "",
      password: "",
    });

    const handleRegister = async () => {
      try {
        await register(form.value);
        router.push({
          name: "email-confirmation",
          query: { email: form.value.email },
        });
      } catch (error) {
        alert(error.message);
      }
    };

    return {
      form,
      handleRegister,
    };
  },
});
</script>
