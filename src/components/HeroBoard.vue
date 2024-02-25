<template>
  <div class="w-full p-4">
    <h1 class="text-4xl mt-6 mb-2 text-center font-bold text-blue">Memory Card Game</h1>
    <p class="text-2xl text-center text-orange mb-4 font-bold">{{ playerName }}</p>
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
      <div class="flex flex-col">
        <button
          class="bg-yellow mb-2 h-full uppercase font-bold text-white p-3 rounded-lg"
          @click="($event) => $emit('restart')"
          >
          Restart Game
        </button>
        <button
          class="bg-blue h-full uppercase font-bold text-white p-3 rounded-lg"
          @click="($event) => $emit('logout')"
          >
          Log out
        </button>
      </div>
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
    },
    playerName: {
      type: String,
      default: ''
    }
  },
}
</script>
