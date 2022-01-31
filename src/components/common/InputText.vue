<template>
  <div class="d-flex flex-row align-items-center mb-4">
    <i class="fas fa-lg me-3 fa-fw" :class="post.icon"></i>
    <div class="form-outline flex-fill mb-0">
      <input
        :type="prop.inputType"
        :id="prop.icon"
        class="form-control"
        :placeholder="prop.placeholder"
        :value="prop.text"
        @input="updateValue($event.target.value)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRef } from 'vue'

interface Props {
  icon: string
  inputType: string
  placeholder: string
  text: string
}

export default defineComponent({
  props: {
    post: {
      type: Object as PropType<Props>,
      required: true
    }
  },
  name: 'inputText',
  setup(props, context) {
    const prop = toRef(props, 'post')
    const updateValue = (text: string) => {
      prop.value.text = text
    }
    return {
      updateValue,
      prop
    }
  }
})
</script>
