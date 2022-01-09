<template>
  <div id="app">
    <NavigationBar/>
    <router-view class="center"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavigationBar from './components/NavigationBar.vue';

export default defineComponent({
  name: 'App',
  components: {
    NavigationBar,
  },
});
</script>

<style>
.center{
  height: calc(100vh - 70px);
  display: flex;
  align-items: center;
  justify-content: center;
}
 #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
