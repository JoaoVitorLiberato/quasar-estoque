<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleLogin">
      <p class="col-12 text-h5 text-center">Login</p>
      <div class="col-12 col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Email"
          type="email"
          v-model="form.email"
          outlined
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Email is required']"
        />
        <q-input
          label="Password"
          :type="isPwd ? 'text' : 'password'"
          v-model="form.password"
          outlined
          lazy-rules
          :rules="[val => (val && val.length > 7) || 'Password is required.']"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility' : 'visibility_off'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <div class="full-width q-pt-md">
          <q-btn
            type="submit"
            label="Login"
            color="primary"
            class="full-width"
            outline
            rounded
            size="lg"
            :disable="(form.email === '' || form.email.length <= 10) || (form.password === '' || form.password.length < 8)"
          />
        </div>
        <div class="full-width q-gutter-y-md">
          <q-btn
            label="Register"
            color="primary"
            class="full-width"
            flat
            rounded
            to="/register"
            size="sm"
          />
        </div>
        <div class="full-width">
          <q-btn
            label="Forgot Password ?"
            color="primary"
            class="full-width"
            flat
            rounded
            to="/forgot-password"
            size="sm"
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
import UseNotify from "src/composables/useNotify";
import UseLoading from "src/composables/useLoading";


export default defineComponent({
  name: "IndexLogin",
  setup() {
    const router = useRouter();
    const { notifyError, notifySuccess } = UseNotify();
    const { showLoading } = UseLoading()

    const { login } = userAuthUser();

    const form = ref({
      email: "",
      password: "",
    });

    const isPwd = ref(false);

    const handleLogin = async () => {
      try {

        showLoading("Loading...",1000)
        await login(form.value);

        setTimeout(() => {
          notifySuccess("Success when logging in")
          router.push({
            name: "me",
          });
        }, 1200)

      } catch (error) {
        notifyError(error.message);
      }
    };

    return {
      form,
      handleLogin,
      isPwd
    };
  },
});
</script>
