<template>
  <q-page class="flex flex-center">
    <div v-if="user">
      <p>Hello {{ email }}</p>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import userAuthUser from "src/composables/UseAuthUser";

export default defineComponent({
  name: "PageME",
  setup() {
    const { user } = userAuthUser();
    const { email } = user._value;

    return {
      user,
      email,
    };
  },
});
</script>
