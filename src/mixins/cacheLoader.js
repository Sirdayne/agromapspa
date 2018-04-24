import http from '@/services/httpQuery.js';

export default {
  data() {
    return {
      ready: false,
      pathLS: 'agromap.',
    }
  },
  watch: {

  },
  computed: {

  },
  methods: {
    getEntity(path){
      let data = this.getCache(path)
      if (data) {
        return data
      } else {
        http.get(path).then(res => {
          this.setCache(path, res)
          return res
        })
      }
    },
    getCache(path) {
      let entity = this.pathLS + path
      return JSON.parse(localStorage.getItem(entity))
    },
    setCache(path, data) {
      let entity = this.pathLS + path
      return localStorage.setItem(entity, JSON.stringify(data))
    },
  }
}
