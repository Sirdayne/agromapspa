<template lang="pug">
div
  topmenu
  h1
  p {{orgId}}
  p(v-for="field in fields") {{field.newName}}
</template>

<script>

import topmenu from '@/components/topmenu'
import {EventBus} from '@/services/EVentBus'
import http from '@/services/httpQuery'

export default {
  name: 'home',
  components: {
    topmenu
  },
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
