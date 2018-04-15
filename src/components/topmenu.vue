<template lang="pug">
.top-menu
  .burger
    .bline.bl-1
    .bline.bl-2
    .bline.bl-3
  h2 Agro
    span map
  .second-menu
    i.el-icon-menu
</template>

<script>

import {EventBus} from '@/services/EVentBus'

export default {
  name: 'headerMenu',
  data () {
    return {
      num: 1,
    }
  },
  methods: {
    btnClick() {
      this.num = this.num + 1
      this.$store.dispatch('actionSetOrganizationId', this.num);
      EventBus.$emit('btnClicked', this.num);
    }
  }
}
</script>

<style lang="stylus">

</style>
