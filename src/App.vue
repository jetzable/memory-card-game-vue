<template>
  <div class="px-16 pt-8 pb-16 w-full h-screen overflow-auto">
    <ModalCard v-if="welcomeCard">
      <form @submit.prevent="startGame" class="flex flex-col">
        <h1 class="text-4xl mb-4 text-center font-bold text-orange">Memory Card Game</h1>
        <InputComponent
          v-model="playerName"
          :playerName="playerName"
          :errorMessage="errorMessage"
          @update:playerName="($event) => playerName = $event"
          />
        <button type="submit" class="self-end mt-4 uppercase font-bold bg-orange text-white p-3 rounded-lg">Start Playing</button>   
      </form>
    </ModalCard>
    <div v-else>
      <HeroBoard
        :status="status"
        :rightGuesses="rightGuesses"
        :wrongGuesses="wrongGuesses"
        @restart="restartGame"
        />
      <section class="grid grid-cols-5 gap-4 mt-4">
        <Card
          v-for="(card, index) in cardList"
          :key="`${card.id}-${index}`"
          :value="card.faceValue"
          :visible="card.visible"
          :position="card.position"
          :matched="card.matched"
          :cardImage="card.url"
          @selectCard="flipCard"
          />
      </section>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { ref, watch, computed } from 'vue'
import Card from './components/Card.vue'
import HeroBoard from './components/HeroBoard.vue'
import ModalCard from './components/ModalCard.vue'
import InputComponent from './components/InputComponent.vue'

export default {
  name: 'App',
  components: {
    Card,
    HeroBoard,
    ModalCard,
    InputComponent
},
  setup() {
    const cardItems = ref([]);
    const cardList = ref([]);
    const getCards = async () => {
      try {
        const response = await fetch('https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20');
        const data = await response.json();
        cardItems.value = data.entries.map((entry) => {
          return { 
            name: entry.fields.image.title,
            faceValue: entry.fields.image.title,
            url: entry.fields.image.url,
            id: entry.fields.image.uuid
           }
        });
        cardItems.value.forEach((item) => {
          cardList.value.push({
            ...item,
            faceValue: item.name,
            visible: false,
            matched: false,
            position: null
          });

          cardList.value.push({
            ...item,
            faceValue: item.name,
            visible: false,
            matched: false,
            position: null
          });
        });
      } catch (error) {
        console.error(error)
      }
    }
    getCards();
    const rightGuesses = ref(0);
    const wrongGuesses = ref(0);
    const welcomeCard = ref(true);
    const playerName = ref('');
    const errorMessage = ref(null);
    const userSelectedCards = ref([]);

    const remainingPairs = computed(() => (cardList.value.filter((card) => !card.matched).length) / 2);
    const status = computed(() => {
      if (remainingPairs.value === 0) {
        return {
          message: 'You won!',
          value: 0
        }
      }
      return {
        message: 'Keep playing!',
        value: remainingPairs.value
      }
    })

    const shuffleCards = () => {
      wrongGuesses.value = 0;
      rightGuesses.value = 0;
      cardList.value = _.shuffle(cardList.value);
    }

    const startGame = () => {
      if (playerName.value === '') {
        errorMessage.value = 'Please enter your name to start playing';
        return
      } else {
        shuffleCards();
        cardList.value = cardList.value.map((card, index) => {
          return {
            ...card,
            visible: false,
            matched: false,
            position: index
          }
        });
        errorMessage.value = null;
        welcomeCard.value = false;
      }
    }

    const restartGame = () => {
      rightGuesses.value = 0;
      wrongGuesses.value = 0;
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
        if ((userSelectedCards.value[0].position === payload.position) && (userSelectedCards.value[0].faceValue === payload.faceValue)) {
          return
        }

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
          rightGuesses.value += 1;
          userSelectedCards.value = [];
        } else {
          setTimeout(() => {
            wrongGuesses.value += 1;
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
      restartGame,
      rightGuesses,
      wrongGuesses,
      welcomeCard,
      playerName,
      startGame,
      errorMessage
    }
  }
}
</script>
<style>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  background-color: #f0f0f0;
}
</style>