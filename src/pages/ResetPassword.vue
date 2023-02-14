<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handlePasswordReset">
      <p class="col-12 text-h5 text-center">Reset Password</p>
      <div class="col-12 col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input label="New Password" outlined v-model="password" />
        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            type="submit"
            label="Send Reset Email"
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
import userAuthUser from "src/composables/UseAuthUser";
import { defineComponent, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: "PageResetPassword",
  setup() {
    const password = ref("");
    const { resetPassword } = userAuthUser();
    const router = useRouter();
    const route = useRoute();
    const token = route.query.token;

    const handlePasswordReset = async () => {
      console.log(token, password);
      await resetPassword(password.value);
      router.push({ name: "login" });
    };

    return {
      password,
      handlePasswordReset,
    };
  },
});
</script>
