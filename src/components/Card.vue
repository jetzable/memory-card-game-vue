<template>
  <div
    class="relative h-64 border-black rounded-lg transition-transform duration-500 ease-in"
    :style="flippedStyles"
    @click="selectCard"
    >
    <div
      v-if="visible"
      class="w-full h-full absolute top-0 text-white
      border-4 border-orange shadow-md rounded-md p-4
      bg-cover bg-center bg-no-repeat"
      :style="{backgroundColor: matched ? 'green' : 'black', backgroundImage: `url(${cardImage})`}"
      >
    </div>
    <div
      v-else
      class="w-full h-full absolute top-0 text-white border-4
      shadow-lg border-gray-200 rounded-lg bg-cover bg-center bg-no-repeat"
      :style="{backgroundImage: `url(https://images.pexels.com/photos/13398438/pexels-photo-13398438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`}"
      />
  </div>
</template>

<script>
import { computed } from 'vue'

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
    const flippedStyles = computed(() => {
      if (props.visible) {
        return {
          transform: 'rotateY(180deg)'
        }
      } else {
        return 'not-flipped'
      }
    })
    const selectCard = () => {
      emit('select-card', {
        faceValue: props.value,
        position: props.position
      })
    }
    return {
      selectCard,
      flippedStyles
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
