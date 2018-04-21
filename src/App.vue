<template lang="pug">
  #app(v-loading="loading")
    #app-container(v-if="logged")
      topmenu
      sidebar(:class="{ 'active' : showSideBar }")
      .second-bar(:class="{ 'active' : showSecondBar }")
        .top-line
          i.el-icon-close.close-right(@click="closeSideBars()")
          .top-line-username(v-if="userinfo") {{ userinfo.fullName }}
          .utop-line-sername(v-else) загрузка...
        el-form
          el-form-item
            el-select(v-model="context.field", clearable, filterable, size="small", placeholder="Выберите поле...")
              el-option(v-for="field in fields",
              :key="field.id",
              :label="field.newName",
              :value="field.id")
          el-form-item
            el-select(v-model="context.year", clearable, filterable, size="small", placeholder="Год")
              el-option(v-for="year in years",
              :key="year",
              :label="year",
              :value="year")
          el-form-item
            el-select(v-model="context.organization", clearable, filterable, size="small", placeholder="Организация")
              el-option(
                v-for="org in userorganizations",
                :label="org.name",
                :value="org.id",
                :key="org.id"
              )
          el-form-item
            el-select(v-model="context.budget", clearable, filterable, size="small", placeholder="Бюджет")
              el-option(v-for="budget in budgets",
              :key="budget.id",
              :label="budget.name",
              :value="budget.id")

        .bottom-line
          el-button(size="small", @click="clearCache()") очистить БД
          el-button(size="small", type="primary", @click="userLogout()") выйти

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

import {EventBus} from '@/services/EventBus'
import http from '@/services/httpQuery.js'
import moment from 'moment'

import topmenu from '@/components/topmenu'
import sidebar from '@/components/sidebar'

export default {
  name: 'App',
  components: {
    topmenu,
    sidebar
  },
  data () {
    return {
      logged: false,
      inputLogin: null,
      inputPassword: null,
      fields: [],
      userorganizations: [],
      budgets: [],
      userinfo: null,
      showSideBar: false,
      showSecondBar: false,
      loadingLogin: false,
      context: {
        year: null,
        organization: null,
        field: null,
        budget: null,
      },
      loading: false,
    }
  },
  created() {
    this.checkToken()
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
  watch: {
    ['context.organization'](val, oldVal) {
      localStorage.setItem('agromap.context.organization', val)
      this.removeContextField()
    },
    ['context.budget'](val, oldVal) {
      localStorage.setItem('agromap.context.budget', val)
    },
    ['context.field'](val, oldVal) {
      localStorage.setItem('agromap.context.field', val)
    },
    ['context.year'](val, oldVal) {
      localStorage.setItem('agromap.context.year', val)
    },
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
    checkToken(){
      let token = localStorage.getItem('agromap.token')
      if (token) {
        this.logged = true
        this.getUserInfo()
        this.getContextYear()
        this.getContextOrganization()
        this.getContextBudget()
      }
    },
    userLogin() {
      this.loadingLogin = true
      http.postToken('token', `userName=${this.inputLogin}&password=${this.inputPassword}&grant_type=password`)
        .then(data => {
          this.loadingLogin = false
          if (data && data.access_token){
            localStorage.setItem('agromap.token', `Bearer ${data.access_token}`)
            this.checkToken()
          }
        })
    },
    userLogout() {
      this.closeSideBars()
      localStorage.removeItem('agromap.token')
      this.logged = false
    },
    getUserInfo() {
      http.get('/account/userinfo/').then(data => { this.userinfo = data })
    },
    getContextYear() {
      let year = localStorage.getItem('agromap.context.year')
      if (year){
        this.context.year = +year
      } else {
        this.context.year = (new Date).getFullYear()
        localStorage.setItem('agromap.context.year', this.context.year)
      }
    },
    getContextOrganization() {
      let organization = localStorage.getItem('agromap.context.organization')
      this.loading = true
      http.get('/userorganizations').then(data => {
        this.userorganizations = data;
        if (organization){
          this.context.organization = +organization
        } else {
          this.context.organization = data[0].id
          localStorage.setItem('agromap.context.organization', this.context.organization)
        }
        this.getContextField()
        this.getEntities()
      })
    },
    getContextBudget() {
      let budget = localStorage.getItem('agromap.context.budget')
      http.get('/budgets').then(data => {
        this.budgets = data;
        if (budget){
          this.context.budget = +budget
        } else {
          this.context.budget = data[0].id
          localStorage.setItem('agromap.context.budget', this.context.budget)
        }
      })
    },
    getContextField() {
      let field = localStorage.getItem('agromap.context.field')
      http.get(`/fields/${this.context.organization}`).then(data => {
        this.fields = data;
        if (field){
          this.context.field = +field
        } else {
          this.context.field = data[0].id
          localStorage.setItem('agromap.context.field', this.context.field)
        }
        this.loading = false
      })
    },
    removeContextField() {
      localStorage.removeItem('agromap.context.field')
      this.getContextField()
    },
    getEntities() {

    },
    clearCache() {
      localStorage.clear()
      window.location.reload()
    }
  },
}
</script>

<style lang="stylus">

</style>
