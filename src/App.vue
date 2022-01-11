<template>
  <div id="app">
    <header>
      <NavigationBar/>
    </header>

    <main>
      <router-view class="center SiteWrapper"/>
    </main>

    <footer>
      <p class="text-center">@2022 Social Drawing Guessing Game all rights reserved.</p>
    </footer>
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

.SiteWrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
  overflow-x: hidden;
}
</style>
