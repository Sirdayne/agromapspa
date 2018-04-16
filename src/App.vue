<template lang="pug">
  #app
    #app-container(v-if="logged")
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
        .bottom-line
          el-button(@click="userLogout()") выйти

      .overlay-dark(:class="{ 'active' : showSideBar || showSecondBar}", @click="closeSideBars()")
      router-view
    #login(v-else)
      .login-img
        img(src="@/assets/logo.png")
        p Логин
        el-input(v-model="inputLogin")
        p Пароль
        el-input(v-model="inputPassword", type="password")
        el-button(type="primary", @click="userLogin()", :loading="loadingLogin") войти

</template>

<script>

import topmenu from '@/components/topmenu'
import {EventBus} from '@/services/EVentBus'
import http from '@/services/httpQuery'
import moment from 'moment'
import ElButton from "../node_modules/element-ui/packages/button/src/button.vue";

export default {
  name: 'App',
  components: {
    ElButton,
    topmenu
  },
  data () {
    return {
      logged: false,
      inputLogin: null,
      inputPassword: null,
      selectedYear: null,
      selectedFieldId: null,
      selectedOrgId: null,
      fields: [],
      userorganizations: [],
      userinfo: null,
      showSideBar: false,
      showSecondBar: false,
      loadingLogin: false,
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
    },
    userLogin() {
      this.loadingLogin = true
      http.postToken('token', `userName=${this.inputLogin}&password=${this.inputPassword}&grant_type=password`)
        .then(data => {
          this.loadingLogin = false
          if (data && data.access_token){
            localStorage.setItem('token', data.access_token)
            this.logged = true
          }
        })
    },
    userLogout() {
      this.closeSideBars()
      this.logged = false
    },
  },
}
</script>

<style lang="stylus">

</style>
