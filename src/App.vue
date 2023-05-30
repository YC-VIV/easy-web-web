<template>
  <div class="app">
    <Editor v-model="state" :formData="formData"></Editor>
  </div>
</template>

<script>
  import {
    ref,
    provide,
    computed
  } from 'vue';
  import data from './data.json';
  import Editor from './packages/editor';
  import {
    registerConfig
  } from './utils/editor-config';
  /* import {
    useStore
  } from 'vuex'; */
  import Range from './components/Range.jsx'
  export default {
    components: {
      Editor,
      Range
    },
    setup() {
      /* function getData() {
        let {
          dispatch
        } = useStore();
        dispatch('getComponents')
      }
      getData();
      const store = useStore();
      console.log(store.state.component) */

      const state = ref(data);
      // console.log(registerConfig)
      // const config = ref(registerConfig);
      const config = registerConfig
      // console.log(config.value)
      provide('config', config); // 将组件的配置直接传值

      const formData = ref({
        username: 'zfjg',
        password: 123,
        start: 0,
        end: 100
      })

      return {
        state,
        formData,
      }
    },
  }
</script>

<style lang="scss">
  .app {
    position: fixed;
    top: 20px;
    left: 20px;
    right: 20px;
    bottom: 20px;
  }
</style>