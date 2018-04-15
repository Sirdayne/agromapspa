<template lang="pug">
  #app
    topmenu
    .sidebar(:class="{ 'active' : showSideBar }")
      .top-line
        i.el-icon-close.close-left(@click="closeSideBars()")
    .second-bar(:class="{ 'active' : showSecondBar }")
      .top-line
        i.el-icon-close.close-right(@click="closeSideBars()")
        .username(v-if="userinfo") {{ userinfo.fullName }}
        .username(v-else) загрузка...
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


    .overlay-dark(:class="{ 'active' : showSideBar || showSecondBar}", @click="closeSideBars()")
    router-view
</template>

<script>

import topmenu from '@/components/topmenu'
import {EventBus} from '@/services/EVentBus'
import http from '@/services/httpQuery'
import ElForm from "../node_modules/element-ui/packages/form/src/form.vue";

export default {
  name: 'App',
  components: {
    ElForm,
    topmenu
  },
  data () {
    return {
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
