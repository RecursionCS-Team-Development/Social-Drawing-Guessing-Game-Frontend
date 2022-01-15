<template>
  <div class="d-flex flex-row align-items-center mb-4">
    <i class="fas fa-lg me-3 fa-fw" :class="icon"></i>
    <div class="form-outline flex-fill mb-0">
      <input
        :type="inputType"
        :id="icon"
        class="form-control"
        :placeholder="placeholder"
      />
    </div>
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
    inputType: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: true
    }
  },
  name: 'inputText'
})
</script>
