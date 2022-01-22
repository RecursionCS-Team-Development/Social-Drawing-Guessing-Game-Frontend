<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid container">
      <router-link
        class="navbar-brand d-flex align-items-center"
        to="/"
        style="width: 50px; height: 50px"
        ><img src="../../public/logo.png" alt="logo" style="width: 70px"
      /></router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse flex-grow-0"
        id="navbarSupportedContent"
      >
        <!-- ログイン -->
        <div
          class="dropdown"
          v-if="
            !initialPage.includes(String($router.currentRoute.value.name)) &&
            userInfo.login == true
          "
        >
          <div
            class="btn d-flex p-0"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style="width: 50px; height: 50px"
          >
            <img class="avatar" :src="user.img" alt="Avatar" />
          </div>
          <ul class="dropdown-menu mt-2" aria-labelledby="dropdownMenuButton1">
            <li v-for="(dropItem, index) in setDropItems" :key="index">
              <router-link
                class="dropdown-item"
                :to="dropItem.link"
                :style="{ color: dropItem.color }"
                >{{ dropItem.name }}
              </router-link>
            </li>
          </ul>
        </div>
        <!-- 未ログイン -->
        <ul v-else class="navbar-nav text-start me-auto mb-2 mb-lg-0">
          <li v-for="(navItem, index) in setNavItems" :key="index">
            <router-link
              class="nav-link"
              aria-current="page"
              :to="navItem.link"
              :style="{ color: navItem.color }"
              >{{ navItem.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div>{{ userInfo.login }}</div>
    <button @click="change" class="mx-2">ログ切替</button>
  </nav>
</template>

<script lang="ts">
import { defineComponent, toRef, computed } from 'vue'
import router from '../router'

export default defineComponent({
  name: 'navBar',
  props: ['user'],
  setup(props) {
    let userInfo = toRef(props, 'user')

    const change = () => (userInfo.value.login = !userInfo.value.login) //ログイン切り替え

    const initialPage = ['Home', 'LogIn', 'SignUp']
    const logSignPage = ['LogIn', 'SignUp']
    const homeLogItems = [
      { name: 'ゲスト', link: '/lobby', color: '#000000' },
      { name: 'ログイン', link: '/login', color: '#000000' },
      { name: '新規登録', link: '/sign_up', color: '#2196F3' }
    ]
    const homeNotLogItems = [
      { name: 'ロビーへ', link: '/lobby', color: '#000000' }
    ]
    const dropItems = [
      { name: userInfo.value.name, link: '/myPage', color: '#000000' },
      { name: '設定', link: '/settings', color: '#000000' },
      { name: 'ログアウト', link: '/', color: '#000000' }
    ]

    const setNavItems = computed(() => {
      let routeName = String(router.currentRoute.value.name)

      if (!logSignPage.includes(routeName) && userInfo.value.login == false) {
        return homeLogItems
      } else if (routeName === 'Home' && userInfo.value.login == true) {
        return homeNotLogItems
      } else return []
    })

    const setDropItems = computed(() => dropItems)

    return {
      userInfo,
      change,
      initialPage,
      logSignPage,
      setDropItems,
      setNavItems,
      homeLogItems,
      homeNotLogItems,
      dropItems
    }
  }
})
</script>

<style scoped>
.avatar {
  vertical-align: middle;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>
