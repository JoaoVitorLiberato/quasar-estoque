import { useQuasar } from "quasar";

export default function UseLoading() {

  const $q = useQuasar()


  const showLoading = (message, time) => {

    $q.loading.show({
      message: message,
      messageColor: "#2c9c6a",
    })

    setTimeout(() => {
      $q.loading.hide()
    }, time)
  }

  return {
    showLoading
  }
}
