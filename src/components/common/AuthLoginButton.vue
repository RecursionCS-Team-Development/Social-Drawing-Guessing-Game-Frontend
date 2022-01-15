import defineComponent from 'vue';
<template>
  <div class="mb-4">
    <button
      type="button"
      class="btn btn-lg w-100 text-light"
      style="padding-right: 2.5rem; background-color: "
      :style="color"
    >
      <i class="fab" :class="icon" style="padding-right: 2.5rem"></i>
      {{ text }}でログイン
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    icon: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  name: 'AuthLoginButton'
})
</script>
