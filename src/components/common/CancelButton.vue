<template>
  <button
    type="button"
    class="btn btn-secondary btn-lg"
    style="padding-left: 2.5rem; padding-right: 2.5rem"
  >
    {{ text }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: { text: String },
  name: 'CancelButton'
})
</script>
