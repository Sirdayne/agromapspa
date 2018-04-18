<template lang="pug">
  #app
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
            el-select(v-model="context.field", clearable, filterable, placeholder="Выберите поле...")
              el-option(v-for="field in fields",
              :key="field.id",
              :label="field.newName",
              :value="field.id")
          el-form-item
            el-select(v-model="context.year", clearable, filterable, placeholder="Год")
              el-option(v-for="year in years",
              :key="year",
              :label="year",
              :value="year")
          el-form-item
            el-select(v-model="context.organization", clearable, filterable, placeholder="Организация")
              el-option(v-for="org in userorganizations",
              :key="org.id",
              :label="org.name",
              :value="org.id")
          el-form-item
            el-select(v-model="context.budget", clearable, filterable, placeholder="Бюджет")
              el-option(v-for="budget in budgets",
              :key="budget.id",
              :label="budget.name",
              :value="budget.id")

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

import {EventBus} from '@/services/EVentBus'
import http from '@/services/httpQuery'
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
    ['context.budget'](val, oldVal) {
      localStorage.setItem('agromap.context.budget', val)
    },
    ['context.organization'](val, oldVal) {
      localStorage.setItem('agromap.context.organization', val)
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
    getContextOrganization() {
      let organization = localStorage.getItem('agromap.context.organization')
      http.get('/userorganizations').then(data => {
        this.userorganizations = data;
        if (data && !organization){
          this.context.organization = data[0].id
          localStorage.setItem('agromap.context.organization', data[0].id)
        }
      })
      if (organization) {
        this.context.organization = organization
        this.loading = false
      }
    },
    getContextBudget() {
      let budget = localStorage.getItem('agromap.context.budget')
      http.get('/budgets').then(data => {
        this.budgets = data;
        if (data && !budget){
          this.context.budget = data[0].id
          localStorage.setItem('agromap.context.budget', data[0].id)
        }
      })
      if (budget) {
        this.context.budget = budget
      }
    },
    getData() {
      http.get(`/fields/${context.organization}`).then(data => { this.fields = data })
    }
  },
}
</script>

<style lang="stylus">

</style>
