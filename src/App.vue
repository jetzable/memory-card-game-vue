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
  <button @click="shuffleCards">Start Playing</button>
  <button @click="restartGame">Restart Game</button>
</template>

<script>
import _ from 'lodash'
import { ref, watch, computed } from 'vue'
import Card from './components/Card.vue'

export default {
  name: 'App',
  components: {
    Card
  },
  setup() {
    const cardList = ref([]);
    const cardItems = Array.from({ length: 20 }, (_, i) => i + 1);

    cardItems.forEach((item) => {
      cardList.value.push({
        value: item,
        visible: false,
        matched: false,
        position: null
      });

      cardList.value.push({
        value: item,
        visible: false,
        matched: false,
        position: null
      });
    });

    cardList.value = cardList.value.map((card, index) => {
      return {
        ...card,
        position: index
      }
    });

    const userSelectedCards = ref([]);
    const remainingPairs = computed(() => cardList.value.filter(card => !card.matched).length / 2);
    const status = computed(() => {
      if (remainingPairs.value === 0) {
        return 'You won!'
      }
      return 'Remaining pairs: ' + remainingPairs.value
    })

    const shuffleCards = () => {
      cardList.value = _.shuffle(cardList.value);
    }

    const restartGame = () => {
      shuffleCards();

      cardList.value = cardList.value.map((card, index) => {
        return {
          ...card,
          visible: false,
          matched: false,
          position: index
        }
      });
    }

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
      status,
      shuffleCards,
      restartGame
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
