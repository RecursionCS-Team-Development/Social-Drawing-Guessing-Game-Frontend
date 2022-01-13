<template>
  <div class="lobby">
    <h1>This is an Lobby page</h1>
    <router-link class="navbar-brand" to="/room">room</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Lobby',
  components: {}
})
</script>

<style></style>
