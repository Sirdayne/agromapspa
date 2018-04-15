<template lang="pug">
.container Hello, world!
</template>

<script>

import {EventBus} from '@/services/EVentBus'
import http from '@/services/httpQuery'

export default {
  name: 'home',
  data () {
    return {
      fields: [],
      msg: 'Agromap'
    }
  },
  computed: {
    orgId() {
      return this.$store.getters.getOrganizationId
    },
  },
  created() {
    EventBus.$on('btnClicked', (msg) => {
      console.log(msg)
    });
    http.get('/fields/1').then(data => { this.fields = data })
  }
}
</script>

<style lang="stylus">

</style>
