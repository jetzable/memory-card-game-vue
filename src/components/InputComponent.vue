<template>
  <div class="flex flex-col">
    <input
      type="text"
      class="p-4 border-2 border-orange rounded-lg"
      :class="{ 'border-red mb-2': errorMessage }"
      placeholder="Enter your name"
      @input="($event) => $emit('update:playerName', $event.target.value)"
      />
    <p v-if="errorMessage" class="text-red text-sm">{{ errorMessage }}</p>
  </div>
</template>
<script>
export default {
  name: 'InputComponent',
  props: {
    playerName: {
      type: String,
      required: true
    },
    errorMessage: {
      type: String,
      default: null
    }
  },
  watch: {
    playerName: {
      immediate: true,
      handler(newValue) {
        if (newValue.length > 0) {
          this.$emit('update:errorMessage', null)
        }
      }
    }
  }
}
</script>