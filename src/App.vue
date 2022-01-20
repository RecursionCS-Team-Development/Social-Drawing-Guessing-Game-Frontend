<template>
  <div id="app">
    <header>
      <NavigationBar :user="user" />
    </header>

    <main>
      <router-view class="center SiteWrapper" :user="user" />
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
import { defineComponent, onMounted, reactive } from 'vue'
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
