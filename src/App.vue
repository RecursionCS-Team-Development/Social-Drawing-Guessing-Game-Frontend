<template>
  <div id="app">
    <header>
      <NavigationBar :user="user" />
    </header>

    <main>
      <router-view class="center SiteWrapper" :user="user" />
    </main>

    <footer>
      <p class="text-center">
        @2022 Social Drawing Guessing Game all rights reserved.
      </p>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import NavigationBar from './components/NavigationBar.vue'

interface User {
  name: string
  mail: string
  password: string
  img: string
  profile: string
  twitterAccount: string
  login: boolean
}

export default defineComponent({
  name: 'App',
  components: {
    NavigationBar
  },
  setup() {
    let user = reactive<User>({
      name: 'ユーザー1',
      mail: '@gmail.com',
      password: '12345678',
      img: 'https://4.bp.blogspot.com/-bTipX3Vmpts/Wn1ZgUbOHXI/AAAAAAABKM4/b31Jvq8aWssiswuiO19BAJmmAC5WAzXwACLcBGAs/s800/character_boy_normal.png',
      profile: 'よろしくお願いします',
      twitterAccount: '',
      login: false
    })

    return {
      user
    }
  }
})
</script>

<style>
.center {
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
