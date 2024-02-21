<template>
  <h1>Hello World</h1>
  <section class="game-board">
    <Card
      v-for="(card, index) in cardList"
      :key="`card-${index}`"
      :value="card.value"
      :visible="card.visible"
      :position="card.position"
      :matched="card.matched"
      @selectCard="flipCard"
      />
  </section>
  <p>{{ status }}</p>
</template>

<script>
import { ref, watch, computed } from 'vue'
import Card from './components/Card.vue'

export default {
  name: 'App',
  components: {
    Card
  },
  setup() {
    const cards = Array.from({ length: 40 }, (_, i) => i + 1)
      .map((value, i) => ({ value: i, visible: false, position: i, matched: false }));
    
    const cardList = ref(cards);
    const userSelectedCards = ref([]);
    const remainingPairs = computed(() => cardList.value.filter(card => !card.matched).length / 2);
    const status = computed(() => {
      if (remainingPairs.value === 0) {
        return 'You won!'
      }
      return 'Remaining pairs: ' + remainingPairs.value
    })
    const flipCard = (payload) => {
      if (userSelectedCards.value[0]) {
        userSelectedCards.value[1] = payload
      } else {
        userSelectedCards.value[0] = payload
      }
      cardList.value[payload.position].visible = !cardList.value[payload.position].visible
    }

    watch(userSelectedCards, (currentValue) => {
      const cardOne = currentValue[0];
      const cardTwo = currentValue[1];

      if (currentValue.length === 2) {
        if (cardOne.faceValue === cardTwo.faceValue) {
          cardList.value[cardOne.position].matched = true;
          cardList.value[cardTwo.position].matched = true;
          userSelectedCards.value = [];
        } else {
          setTimeout(() => {
            cardList.value[cardOne.position].visible = false
            cardList.value[cardTwo.position].visible = false
            userSelectedCards.value = []
          }, 1800)
        }
      }
    }, { deep: true })

    return {
      cardList,
      flipCard,
      userSelectedCards,
      remainingPairs,
      status
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
