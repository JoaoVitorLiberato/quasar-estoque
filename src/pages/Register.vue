<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleRegister">
      <p class="col-12 text-h5 text-center">Register</p>
      <div class="col-12 col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Name"
          type="text"
          outlined
          v-model="form.name"
          lazy-rules
          :rules="[rules.require]"
        />
        <q-input
          label="Email"
          type="email"
          outlined
          v-model="form.email"
          lazy-rules
          :rules="[rules.require]"
        />
        <q-input
          label="Password"
          :type="isPwd ? 'text' : 'password'"
          v-model="form.password"
          outlined
          lazy-rules
          :rules="[rules.require]"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility' : 'visibility_off'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <q-input
          label="Password"
          :type="isPwd ? 'text' : 'password'"
          v-model="confirmPassword"
          outlined
          lazy-rules
          :rules="[rules.require, rules.validatePasswords]"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwdValidade ? 'visibility' : 'visibility_off'"
              class="cursor-pointer"
              @click="isPwdValidade = !isPwdValidade"
            />
          </template>
        </q-input>
        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            type="submit"
            label="Register"
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
import { defineComponent, ref } from "vue";
import userAuthUser from "src/composables/UseAuthUser";
import { useRouter } from "vue-router";
import UseNotify from "src/composables/useNotify";
import UseLoading from "src/composables/useLoading";

export default defineComponent({
  name: "IndexRegister",
  setup() {
    const router = useRouter();

    const { register } = userAuthUser();

    const { notifyError, notifySuccess } = UseNotify();
    const { showLoading } = UseLoading();

    const isPwd = ref(false);
    const isPwdValidade = ref(false);

    const form = ref({
      name: "",
      email: "",
      password: "",
    });

    const confirmPassword = ref('')

    const rules = {
      require: val => (val && val.length > 7) || 'Input is required.',
      validatePasswords: () => {
        if(confirmPassword.value !== form.value.password) {
          return 'the passwords are different'
        }

        return
      }
    }

    const handleRegister = async () => {
      try {

        showLoading("Aguarde...", 1300)

        setTimeout(async () => {
          await register(form.value);
        }, 1400)

        setTimeout(() => {
          notifySuccess("Registration successfully completed, just one step left!")
          router.push({
            name: "email-confirmation",
            query: { email: form.value.email },
          });

        }, 1600)
      } catch (error) {
        notifyError(error.message);
      }
    };

    return {
      form,
      handleRegister,
      confirmPassword,
      rules,
      isPwd,
      isPwdValidade
    };
  },
});
</script>
