<template>
  <h1>Hello World</h1>
  <section class="game-board">
    <Card
      v-for="(card, index) in cardList"
      :key="`card-${index}`"
      :value="card.value"
      :visible="card.visible"
      :position="card.position"
      @selectCard="flipCard"
      />
  </section>
</template>

<script>
import { ref } from 'vue'
import Card from './components/Card.vue'

export default {
  name: 'App',
  components: {
    Card
  },
  setup() {
    const cards = Array.from({ length: 40 }, (_, i) => i + 1)
      .map((value, i) => ({ value, visible: false, position: i}));
    
    const cardList = ref(cards);

    const flipCard = ({ position }) => {
      cardList.value[position].visible = !cardList.value[position].visible
    }

    return {
      cardList,
      flipCard
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
