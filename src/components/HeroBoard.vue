<template>
  <div class="w-full md:p-4">
    <h1 class="mt-2 mb-2 text-2xl font-bold text-center font-lato md:text-4xl md:mt-6 text-blue">Memory Card Game</h1>
    <p class="mb-4 text-lg font-bold text-center md:text-2xl text-orange">{{ playerName }}</p>
    <section class="grid grid-cols-2 gap-2 md:flex md:items-center md:justify-between">
      <div class="text-lg text-center bg-green text-white flex flex-col shadow-lg md:max-w-[20%] uppercase items-center justify-center p-3 rounded-md">
        <span class="mr-2">Right Guesses</span>
        <span class="font-bold">{{ rightGuesses }}</span>
      </div>
      <div class="text-lg text-center bg-red text-white flex flex-col shadow-lg md:max-w-[20%] uppercase items-center justify-center p-3 rounded-md">
        <span class="mr-2">Wrong Guesses</span>
        <span class="font-bold">{{ wrongGuesses }}</span>
      </div>
      <div class="text-lg text-center bg-black text-white flex flex-col shadow-lg md:max-w-[20%] uppercase items-center justify-center p-3 rounded-md">
        <span class="mr-2">Remaining Pairs</span>
        <span class="font-bold">{{ status.value }}</span>
      </div>
      <div class="flex flex-col">
        <button
          class="flex items-center justify-center h-full p-3 mb-2 font-bold text-white uppercase rounded-lg shadow-md bg-yellow"
          @click="($event) => $emit('restart')"
          >
          <p>Restart Game</p>
          <fa icon="rotate-left" class="ml-2" />
        </button>
        <button
          class="flex items-center justify-between h-full p-3 font-bold text-white uppercase rounded-lg shadow-md bg-blue"
          @click="($event) => $emit('logout')"
          >
          <p>Log out</p>
          <fa icon="arrow-right-from-bracket" class="ml-2" />
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
