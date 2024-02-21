<template>
  <div class="card">
    {{ value }}
  </div>
</template>

<script>
export default {
  name: 'CardComponent',
  props: {
    value: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>
.card {
  height: 12rem;
  background-color: #f0f0f0;
  border-radius: 12px;
  justify-content: center;
}
</style>
