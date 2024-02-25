<template>
  <div class="px-4 md:px-16 pt-4 md:pt-8 pb-16 w-full h-screen overflow-auto">
    <ModalCard v-if="welcomeCard">
      <form @submit.prevent="startGame" class="flex flex-col">
        <h1 class="text-4xl mb-4 text-center font-bold text-orange">Memory Card Game</h1>
        <p v-if="playerName && isLogged" class="text-center text-xl">Welcome back, {{ playerName }}!</p>
        <InputComponent
          v-else
          v-model="playerName"
          :value="playerName"
          :playerName="playerName"
          :errorMessage="errorMessage"
          @update:playerName="($event) => playerName = $event"
          />
        <button type="submit" class="self-end mt-4 uppercase font-bold bg-blue text-white p-3 rounded-lg">
          {{ !isLogged ? 'Start Game' : 'Restart Game' }}
        </button>   
      </form>
    </ModalCard>
    <ModalCard v-else-if="goodByeCard">
      <h1 class="text-4xl mb-4 text-center font-bold text-orange">Memory Card Game</h1>
      <p class="text-center text-xl">See you next time, {{ playerName }}!</p>
    </ModalCard>
    <ModalCard v-else-if="winnerCard">
      <h1 class="text-4xl mb-4 text-center font-bold text-orange">Memory Card Game</h1>
      <p class="text-center text-xl">Congratulations, {{ playerName }}!</p>
      <p class="text-center text-xl">You won!</p>
      <div class="flex items-center justify-between mt-4">
        <button
          class="uppercase font-bold bg-blue text-white p-3 rounded-lg"
          @click="restartGame"
          >
          Restart Game
        </button>
        <button
          class="uppercase font-bold bg-red text-white p-3 rounded-lg"
          @click="logout"
          >
          Log out
        </button>
      </div>
    </ModalCard>
    <div v-else>
      <HeroBoard
        :status="status"
        :rightGuesses="rightGuesses"
        :wrongGuesses="wrongGuesses"
        :playerName="playerName"
        @restart="restartGame"
        @logout="logout"
        />
      <section class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4 mt-4">
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
    const rightGuesses = ref(0);
    const wrongGuesses = ref(0);
    const welcomeCard = ref(true);
    const goodByeCard = ref(false);
    const playerName = ref('');
    const errorMessage = ref(null);
    const userSelectedCards = ref([]);
    const isLogged = ref(false);
    
    // Computed properties
    const remainingPairs = computed(() => (cardList.value.filter((card) => !card.matched).length) / 2);
    const winnerCard = computed(() => remainingPairs.value === 0);
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

    // Methods

    // Shuffle cards
    const shuffleCards = () => {
      wrongGuesses.value = 0;
      rightGuesses.value = 0;
      cardList.value = _.shuffle(cardList.value);
    }

    // Start game: set player name and shuffle cards
    const startGame = () => {
      if (playerName.value === '') {
        errorMessage.value = 'Please enter your name to start playing';
        return
      } else {
        window.localStorage.setItem('playerName', playerName.value);
        isLogged.value = true;
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

    // Restart game: reset right and wrong guesses, shuffle cards and reset card list
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

    // Flip card: flip card and check if it matches
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

    // Get cards: fetch cards from API
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
        if (window.localStorage.getItem('playerName')) {
          playerName.value = window.localStorage.getItem('playerName');
          isLogged.value = true;
        }
      } catch (error) {
        console.error(error)
      }
    }

    // Logout: remove player name from local storage and reset game
    const logout = () => {
      goodByeCard.value = true;
      setTimeout(() => {
        window.localStorage.removeItem('playerName');
        playerName.value = '';
        isLogged.value = false;
        welcomeCard.value = true;
        goodByeCard.value = false;
      }, 2000)
    }

    // Lifecycle hooks

    // Get cards: fetch cards from API
    getCards();

    // Watchers

    // Watch user selected cards: check if cards match
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
          // Hide cards after 1.3 seconds
          setTimeout(() => {
            wrongGuesses.value += 1;
            cardList.value[cardOne.position].visible = false
            cardList.value[cardTwo.position].visible = false
            userSelectedCards.value = []
          }, 1300)
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
      errorMessage,
      logout,
      goodByeCard,
      isLogged,
      winnerCard
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