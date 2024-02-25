<template>
  <div
    class="fixed top-0 left-0 z-10 bg-blue h-screen
    w-full flex items-center justify-center
    bg-opacity-60 bg-cover bg-center bg-no-repeat p-4 md:p-0"
    :style="{ backgroundImage: `url(https://images.pexels.com/photos/13398438/pexels-photo-13398438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)` }"
    >
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