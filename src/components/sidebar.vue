<template lang="pug">
.sidebar
  .top-line
    i.el-icon-close.close-left(@click="closeSideBars()")
    .top-line-menu Меню
  .menu-row(@click="closeSideBars()")
    router-link(to="/")
      el-button(size="small", type="primary") Карта
  .menu-row(@click="closeSideBars()")
    router-link(to="/notepad")
      el-button(size="small", type="primary") Блокнот
  .menu-row(@click="closeSideBars()")
    router-link(to="/anketa")
      el-button(size="small", type="primary") Анкеты
  .menu-row(@click="closeSideBars()")
    router-link(to="/checklists")
      el-button(size="small", type="primary") Чек-листы
</template>

<script>

import {EventBus} from '@/services/EventBus'

export default {
  name: 'sidebar',
  data () {
    return {

    }
  },
  created() {

  },
  methods: {
    closeSideBars() {
      EventBus.$emit('closeSideBars');
    }
  }
}
</script>

<style lang="stylus">

</style>
