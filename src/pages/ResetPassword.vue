<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handlePasswordReset">
      <p class="col-12 text-h5 text-center">Reset Password</p>
      <div class="col-12 col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Password"
          :type="isPwd ? 'text' : 'password'"
          v-model="password"
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
        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            type="submit"
            label="Send new password"
            color="primary"
            class="full-width"
            outline
            rounded
            size="lg"
            :disable="password === '' || password.length < 7"
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
import UseNotify from "src/composables/useNotify";
import UseLoading from "src/composables/useLoading";

export default defineComponent({
  name: "PageResetPassword",
  setup() {
    const password = ref("");
    const { notifyError, notifySuccess } = UseNotify();
    const { showLoading } = UseLoading()
    const { resetPassword } = userAuthUser();
    const router = useRouter();
    const route = useRoute();
    const token = route.query.token;
    const isPwd = ref(false);

    const handlePasswordReset = async () => {

      showLoading("Sending...", 1400)
      try {
        setTimeout(async () => {
          await resetPassword(password.value);
          notifySuccess("Password changed successfully")
        }, 1500)

        setTimeout(() => {
          router.push({ name: "login" });
        }, 1600)

      } catch (error) {
        notifyError(error.message)
      }

    };

    return {
      password,
      handlePasswordReset,
      isPwd
    };
  },
});
</script>
