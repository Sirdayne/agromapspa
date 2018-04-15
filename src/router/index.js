import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home'
import Anketa from '@/pages/anketa'
import Notepad from '@/pages/notepad'
import Checklists from '@/pages/checklists'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Главная',
      component: Home
    },
    {
      path: '/notepad',
      name: 'Блокнот',
      component: Notepad
    },
    {
      path: '/anketa',
      name: 'Анкета',
      component: Anketa
    },
    {
      path: '/checklists',
      name: 'Чек-листы',
      component: Checklists
    },
  ]
})
