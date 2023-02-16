<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleForgoutPassword">
      <p class="col-12 text-h5 text-center">Reset Password</p>
      <div class="col-12 col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Email"
          type="email"
          v-model="email"
          outlined
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Email is required']"
        />
        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            type="submit"
            label="Send Reset Email"
            color="primary"
            class="full-width"
            outline
            rounded
            size="lg"
            :disable="email === '' || email.length <=10"
          />
          <q-btn
            :to="{ name: 'login' }"
            label="Back"
            color="dark"
            class="full-width"
            flat
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
import UseNotify from "src/composables/useNotify";
import UseLoading from "src/composables/useLoading";

export default defineComponent({
  setup() {
    const { notifyError, notifySuccess } = UseNotify();
    const { showLoading } = UseLoading()
    const { sendPasswordRestEmail } = userAuthUser();
    const email = ref("");

    const handleForgoutPassword = async () => {
      try {

        showLoading("Sending...", 1700)
        setTimeout(async () => {
          await sendPasswordRestEmail(email.value);
        }, 1800)

        setTimeout(() => {
          notifySuccess(`Password reset email sent to ${email.value}`);
        },1900)

      } catch (error) {
        setTimeout(() => {
          notifyError( error.message || "There was a problem sending the email or with the request with the database")
        }, 1900)
      }
    };

    return {
      email,
      handleForgoutPassword,
    };
  },
});
</script>
