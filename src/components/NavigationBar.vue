<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid container">
      <router-link class="navbar-brand" to="/">Draw</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse flex-grow-0" id="navbarSupportedContent">
        <ul class="navbar-nav text-start me-auto mb-2 mb-lg-0">
          <li v-for="(navItem, index) in navItems" :key="index">
            <router-link class="nav-link" aria-current="page" :to=navItem.link :style="{color: navItem.color}">{{ navItem.name }}</router-link>
          </li> 
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'navBar',
  components: {},
  setup(){
    const navItems: { name: string, link: string, color: string }[] = [
      {name: "ゲスト", link: "/", color: "#000000"},
      {name: "ログイン", link: "/login", color: "#000000"},
      {name: "新規登録", link: "/sign_up", color: "#2196F3"}
    ]

    return {
      navItems
    }
  }
});
</script>