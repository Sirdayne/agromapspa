<template lang="pug">
.sidebar
  .top-line
    i.el-icon-close.close-left(@click="closeSideBars()")
    .top-line-menu Меню
  .menu-row(@click="closeSideBars()")
    router-link(to="/")
      el-button(type="primary") Карта
  .menu-row(@click="closeSideBars()")
    router-link(to="/notepad")
      el-button(type="primary") Блокнот
  .menu-row(@click="closeSideBars()")
    router-link(to="/anketa")
      el-button(type="primary") Анкеты
  .menu-row(@click="closeSideBars()")
    router-link(to="/checklists")
      el-button(type="primary") Чек-листы
</template>

<script>

import {EventBus} from '@/services/EVentBus'

export default {
  name: 'sidebar',
  data () {
    return {

    }
  },
  created() {

  },
  methods: {

  }
}
</script>

<style lang="stylus">

</style>
