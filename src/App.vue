<template lang="pug">
  #app
    topmenu
    .overlay-dark(:class="{ 'active' : showSideBar || showSecondBar}", @click="closeSideBars()")
    .sidebar(:class="{ 'active' : showSideBar }")
      i.el-icon-close(@click="closeSideBars()")
    .second-bar(:class="{ 'active' : showSecondBar }")
      i.el-icon-close(@click="closeSideBars()")
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
  data () {
    return {
      showSideBar: false,
      showSecondBar: false,
    }
  },
  created() {
    //this.$store.dispatch('actionSetOrganizationId', this.num);
    EventBus.$on('openSideBar', () => {
      this.showSideBar = true
    });
    EventBus.$on('openSecondBar', () => {
      this.showSecondBar = true
    });
  },
  computed: {
    orgId() {
      return this.$store.getters.getOrganizationId
    },
  },
  methods: {
    closeSideBars() {
      this.showSecondBar = false
      this.showSideBar = false
    }
  },
}
</script>

<style lang="stylus">

</style>
