<template>
  <div class="relative h-64 border-black rounded-lg" @click="selectCard">
    <div
      v-if="visible"
      class="w-full h-full absolute top-0 text-white
      border-4 border-orange shadow-md rounded-md p-4
      bg-cover bg-center bg-no-repeat"
      :style="{backgroundColor: matched ? 'green' : 'black', backgroundImage: `url(${cardImage})`}"
      >
      <p class="text-xl uppercase text-yellow font-bold text-center absolute top-4 left-4">{{ value }}</p>
    </div>
    <div
      v-else
      class="w-full h-full absolute top-0 text-white border-4
      shadow-lg border-gray-200 rounded-md bg-cover bg-center bg-no-repeat"
      :style="{backgroundImage: `url(https://images.pexels.com/photos/1774986/pexels-photo-1774986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`}"
      />
  </div>
</template>

<script>
export default {
  name: 'CardComponent',
  props: {
    value: {
      type: String,
      required: true
    },
    cardImage: {
      type: String,
      required: true
    },
    visible: {
      type: Boolean,
      default: false
    },
    position: {
      type: Number,
      required: true
    },
    matched: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const selectCard = () => {
      emit('select-card', {
        faceValue: props.value,
        position: props.position
      })
    }
    return {
      selectCard
    }
  }
}
</script>

<style scoped>


.card-face.is-back {
  background-color: black;
  color: white;
}
</style>
