<template lang="pug">
.top-menu.blue
  .burger(@click="openSideBar()")
    .bline.bl-1
    .bline.bl-2
    .bline.bl-3
  h1 Agro
    span map
  .second-menu(@click="openSecondBar()")
    i.el-icon-menu
</template>

<script>

import {EventBus} from '@/services/EventBus'

export default {
  name: 'headerMenu',
  data () {
    return {
      num: 1,
    }
  },
  methods: {
    openSideBar() {
      EventBus.$emit('openSideBar');
    },
    openSecondBar(){
      EventBus.$emit('openSecondBar');
    }
  }
}
</script>

<style lang="stylus">

</style>
