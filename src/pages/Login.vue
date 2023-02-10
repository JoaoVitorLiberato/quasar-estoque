<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleLogin">
      <p class="col-12 text-h5 text-center">Login</p>
      <div class="col-12 col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input label="Email" v-model="form.email" outlined />
        <q-input label="Password" v-model="form.password" outlined />
        <div class="full-width q-pt-md">
          <q-btn
            type="submit"
            label="Login"
            color="primary"
            class="full-width"
            outline
            rounded
            size="lg"
          />
        </div>
        <div class="full-width">
          <q-btn
            label="Register"
            color="primary"
            class="full-width"
            flat
            rounded
            to="/register"
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
  name: "IndexLogin",
  setup() {
    const router = useRouter();

    const { login } = userAuthUser();

    const form = ref({
      email: "",
      password: "",
    });

    const handleLogin = async () => {
      try {
        await login(form.value);
        router.push({
          name: "me",
        });
      } catch (error) {
        alert(error.message);
      }
    };

    return {
      form,
      handleLogin,
    };
  },
});
</script>
