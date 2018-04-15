<template lang="pug">
  #app
    topmenu
    router-view
</template>

<script>

import topmenu from '@/components/topmenu'
import {EventBus} from '@/services/EVentBus'
import http from '@/services/httpQuery'

export default {
  name: 'App',
  components: {
    topmenu
  },
}
</script>

<style lang="stylus">

</style>
