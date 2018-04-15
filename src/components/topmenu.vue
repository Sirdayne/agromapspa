<template lang="pug">
.workspace
  h2 Меню
  img(src="@/assets/logo.png")
  button(@click="btnClick()")
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
      this.num++
      this.$store.dispatch('actionSetOrganizationId', this.num);
      EventBus.$emit('btnClicked', this.num++);
    }
  }
}
</script>

<style lang="stylus">

</style>
