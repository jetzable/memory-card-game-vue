<template>
  <div class="w-full p-4">
    <h1 class="text-4xl my-6 text-center font-bold text-orange">Memory Card Game</h1>
    <section class="flex items-center justify-between">
      <div class="text-lg text-center bg-green text-white flex flex-col shadow-lg max-w-[20%] uppercase items-center justify-center p-3 rounded-md">
        <span class="mr-2">Right Guesses</span>
        <span class="font-bold">{{ rightGuesses }}</span>
      </div>
      <div class="text-lg text-center bg-red text-white flex flex-col shadow-lg max-w-[20%] uppercase items-center justify-center p-3 rounded-md">
        <span class="mr-2">Wrong Guesses</span>
        <span class="font-bold">{{ wrongGuesses }}</span>
      </div>
      <div class="text-lg text-center bg-black text-white flex flex-col shadow-lg max-w-[20%] uppercase items-center justify-center p-3 rounded-md">
        <span class="mr-2">Remaining Pairs</span>
        <span class="font-bold">{{ status.value }}</span>
      </div>
        <button
          class="bg-yellow h-full uppercase font-bold text-white p-3 rounded-lg"
          @click="($event) => $emit('restart')"
          >
          Restart Game
        </button>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HeroBoard',
  props: {
    status: {
      type: Object,
      required: true
    },
    rightGuesses: {
      type: Number,
      required: true
    },
    wrongGuesses: {
      type: Number,
      required: true
    }
  },
}
</script>
