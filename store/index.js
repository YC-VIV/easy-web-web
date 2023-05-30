import {
  createStore
} from 'vuex'
import $http from '../src/http'

export default createStore({
  state: {
    info: 'hello',
    component: {}
  },
  getters: {

  },
  mutations: {
    setComponents(state, component) {
      state.component = component;
    }
  },
  actions: {
    async getComponents() {
      // console.log('aaa')
      console.log($http)
      let res = await $http.get(`/rest/components`);
      let str = res.data[0];
      console.log(str)
      // console.log(str.replace(/[ ]|[\r\n]/g,""))
      let render = eval(str['render'])
      console.log(render)
      let preview = eval(str['preview'])
      console.log(preview)
      let label = str['name']
      console.log(label)
      let key = str['key']
      console.log(key)
      let componentObj = {
        label,
        key,
        preview,
        render
      }
      this.commit('setComponents', componentObj)
    }
  }
})