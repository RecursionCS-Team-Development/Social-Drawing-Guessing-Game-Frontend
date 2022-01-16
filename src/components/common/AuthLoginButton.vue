import defineComponent from 'vue';
<template>
  <div class="mb-4">
    <button
      type="button"
      class="btn btn-lg w-100 text-light"
      style="padding-right: 2.5rem; background-color: "
      :style="post.color"
    >
      <i class="fab" :class="post.icon" style="padding-right: 2.5rem"></i>
      {{ post.text }}でログイン
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

interface Props {
  icon: string
  color: string
  text: string
}

export default defineComponent({
  props: {
    post: {
      type: Object as PropType<Props>,
      required: true
    }
  },
  name: 'AuthLoginButton'
})
</script>
