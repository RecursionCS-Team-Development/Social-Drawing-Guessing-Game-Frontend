<template>
  <div id="app">
    <header>
      <NavigationBar v-if="$route.name != 'Room'" />
      <GameBar v-else />
    </header>

    <main>
      <router-view class="center SiteWrapper" />
    </main>

    <footer>
      <div class="py-2">
        <div class="container">
          <p class="m-0 rem0p8">
            @2022 Social Drawing Guessing Game all rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import NavigationBar from './components/NavigationBar.vue'
import GameBar from './components/GameBar.vue'
import { useStore } from '../src/store'

export default defineComponent({
  name: 'App',
  components: {
    NavigationBar,
    GameBar
  },
  setup() {
    const store = useStore()
    onMounted(() => {
      store.dispatch('login')
    })
  }
})
</script>

<style>
.center {
  min-height: calc(100vh - 120px);
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
@media screen and (max-width: 768px) {
  .center {
    min-height: calc(100vh - 130px);
  }
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

main {
  flex: 1;
  overflow-x: hidden;
}
</style>
