<template>
  <div class="fixed top-0 left-0 z-10 bg-black h-screen w-full flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-2xl">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'ModalCard',
  }
</script>