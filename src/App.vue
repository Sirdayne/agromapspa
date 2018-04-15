<template lang="pug">
  #app
    topmenu
    .sidebar(:class="{ 'active' : showSideBar }")
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
    .second-bar(:class="{ 'active' : showSecondBar }")
      .top-line
        i.el-icon-close.close-right(@click="closeSideBars()")
        .top-line-username(v-if="userinfo") {{ userinfo.fullName }}
        .utop-line-sername(v-else) загрузка...
      el-form
        el-form-item
          el-select(v-model="selectedOrgId", clearable, filterable, placeholder="Организация")
            el-option(v-for="org in userorganizations",
            :key="org.id",
            :label="org.name",
            :value="org.id")
        el-form-item
          el-select(v-model="selectedFieldId", clearable, filterable, placeholder="Выберите поле...")
            el-option(v-for="field in fields",
                      :key="field.id",
                      :label="field.newName",
                      :value="field.id")
        el-form-item
          el-select(v-model="selectedYear", clearable, filterable, placeholder="Год")
            el-option(v-for="year in years",
            :key="year",
            :label="year",
            :value="year")

    .overlay-dark(:class="{ 'active' : showSideBar || showSecondBar}", @click="closeSideBars()")
    router-view
</template>

<script>

import topmenu from '@/components/topmenu'
import {EventBus} from '@/services/EVentBus'
import http from '@/services/httpQuery'
import moment from 'moment'

export default {
  name: 'App',
  components: {
    topmenu
  },
  data () {
    return {
      selectedYear: null,
      selectedFieldId: null,
      selectedOrgId: null,
      fields: [],
      userorganizations: [],
      userinfo: null,
      showSideBar: false,
      showSecondBar: false,
    }
  },
  created() {
    http.get('/account/userinfo/').then(data => { this.userinfo = data })
    http.get('/userorganizations').then(data => { this.userorganizations = data })
    http.get('/fields/1').then(data => { this.fields = data })
    //this.$store.dispatch('actionSetOrganizationId', this.num);
    EventBus.$on('openSideBar', () => {
      this.showSideBar = true
    });
    EventBus.$on('openSecondBar', () => {
      this.showSecondBar = true
    });
    EventBus.$on('closeSideBars', () => {
      this.closeSideBars()
    });
  },
  computed: {
    years() {
      let year = (new Date).getFullYear();
      let years = [year - 4, year - 3, year - 2, year - 1, year, year + 1, year + 2]
      return years
    },
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
