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
    fetchEntities(array, callback){
      let counter = 0
      array.forEach(path => {
        let data = this.fromCache(path)
        if (data) {
          counter++
          return data
        } else {
          http.get(path).then(res => {
            this.toCache(path, res)
            counter++
            this.checkCounter(counter, array.length, callback)
          })
        }
      })
      this.checkCounter(counter, array.length, callback)
    },
    checkCounter(counter, length, callback){
      if (counter == length){
        callback()
      }
    },
    fromCache(path) {
      let entity = this.pathLS + path
      return JSON.parse(localStorage.getItem(entity))
    },
    toCache(path, data) {
      let entity = this.pathLS + path
      localStorage.setItem(entity, JSON.stringify(data))
    },
  }
}
