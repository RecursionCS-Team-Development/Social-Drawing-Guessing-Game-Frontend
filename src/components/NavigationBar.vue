<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid container">
      <div
        class="navbar-brand d-flex align-items-center"
        @click="logoLink()"
        style="width: 50px; height: 50px"
      >
        <img src="../../public/logo.png" alt="logo" style="width: 70px" />
      </div>
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
            user.login == true
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
            <li v-for="(dropItem, index) in dropItems" :key="index">
              <router-link
                class="dropdown-item"
                :to="dropItem.link"
                :style="{ color: dropItem.color }"
                @click="dropItem.method"
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
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../store'

export default defineComponent({
  name: 'navBar',
  setup() {
    const store = useStore()
    const router = useRouter()
    const user = store.state.user
    const logoutSubmit = () => {
      store.dispatch('logout')
    }

    const nonMethod = () => {
      return
    }

    const logoLink = () => {
      if (user.login) {
        router.push({
          name: 'Lobby'
        })
      } else {
        router.push({
          name: 'Home'
        })
      }
    }
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

    const dropItems = computed(() => {
      return [
        {
          name: user.name,
          link: '/myPage',
          color: '#000000',
          method: nonMethod
        },
        {
          name: '設定',
          link: '/settings',
          color: '#000000',
          method: nonMethod
        },
        {
          name: 'ログアウト',
          link: '/',
          color: '#000000',
          method: logoutSubmit
        }
      ]
    })

    const setNavItems = computed(() => {
      let routeName = String(router.currentRoute.value.name)

      if (!logSignPage.includes(routeName) && user.login == false) {
        return homeLogItems
      } else if (routeName === 'Home' && user.login == true) {
        return homeNotLogItems
      } else return []
    })

    return {
      user,
      initialPage,
      logSignPage,
      setNavItems,
      homeLogItems,
      homeNotLogItems,
      dropItems,
      logoLink,
      logoutSubmit,
      nonMethod
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
