<template>
  <q-page padding>
    <p class="text-body-1">Thanks for registering !</p>
    <p class="text-body-1">
      Please confirm your email to finishing registering:
      <strong>{{ $route.query.email }}</strong>
    </p>
    <div class="row justify-center">
      <div class="col-12 col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-btn
          label="Back to login"
          color="primary"
          class="full-width"
          rounded
          size="lg"
          @click="handleRedirect"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import UseLoading from "src/composables/useLoading";

export default defineComponent({
  name: "IndexEmailConformation",
  setup() {

    const router = useRouter();
    const { showLoading } = UseLoading();

    const handleRedirect = () => {
      showLoading("Aguarde, Vcoê está sendo direcionado para página de login.", 1100)
      setTimeout(() => {
        router.push({
          name: 'login',
        })
      }, 1200)
    }


    return {
      handleRedirect
    }
  }
});
</script>
