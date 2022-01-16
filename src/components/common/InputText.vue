<template>
  <div class="d-flex flex-row align-items-center mb-4">
    <i class="fas fa-lg me-3 fa-fw" :class="post.icon"></i>
    <div class="form-outline flex-fill mb-0">
      <input
        :type="post.inputType"
        :id="post.icon"
        class="form-control"
        :placeholder="post.placeholder"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

interface Props {
  icon: string
  inputType: string
  placeholder: string
}

export default defineComponent({
  props: {
    post: {
      type: Object as PropType<Props>,
      required: true
    }
  },
  name: 'inputText'
})
</script>
