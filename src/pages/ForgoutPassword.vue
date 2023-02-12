<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleForgoutPassword">
      <p class="col-12 text-h5 text-center">Reset Password</p>
      <div class="col-12 col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input label="Email" outlined v-model="email" />
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

export default defineComponent({
  setup() {
    const { sendPasswordRestEmail } = userAuthUser();
    const email = ref("");

    const handleForgoutPassword = async () => {
      await sendPasswordRestEmail(email.value);
      alert(`Password reset email sent to ${email.value}`);
    };

    return {
      email,
      handleForgoutPassword,
    };
  },
});
</script>
