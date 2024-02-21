<template>
  <h1>Hello World</h1>
  <section class="game-board">
    <Card v-for="(card, index) in cardList" :key="`card-${index}`" :value="card"/>
  </section>
</template>

<script>
import Card from './components/Card.vue'

export default {
  name: 'App',
  components: {
    Card
  },
  setup() {
    const cardList = Array.from({ length: 40 }, (_, i) => i + 1);
    return {
      cardList
    }
  }
}
</script>

<style>
.game-board {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-gap: 1rem;
}
</style>
