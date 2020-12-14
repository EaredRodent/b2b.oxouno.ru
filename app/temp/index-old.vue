<template>
  <div class="a0-Index">
    <guest-content v-if="$isGuest()"/>
    <authorized-content v-else/>
  </div>
</template>

<script>
import GuestContent from './-guest-content'
import AuthorizedContent from './-authorized-content'
import config from '../config/base-config'

export default {
  components: { GuestContent, AuthorizedContent },
  head: {
    script: (() => {
      let scripts = []

      if (config.MODE.envProd) {
        scripts.push({
          src: 'https://www.google.com/recaptcha/api.js?render=6LdlobwUAAAAACF6kKuXH4LNB5_hOw_WujsL1NCO'
        })
      }

      return scripts
    })()
  }
}
</script>
