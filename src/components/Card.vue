<template>
  <div class="relative h-64 border-black rounded-lg" @click="selectCard">
    <div v-if="visible" class="w-full h-full absolute top-0 text-white border-4 border-orange shadow-md rounded-md bg-yellow p-4">
      {{ value }} - {{ matched }}
    </div>
    <div
      v-else
      class="w-full h-full absolute top-0 text-white border-4
      border-purple shadow-md rounded-md bg-cover bg-center bg-no-repeat"
      :style="{backgroundImage: `url(https://images.pexels.com/photos/3255761/pexels-photo-3255761.jpeg?auto=compress&cs=tinysrgb&w=800)`}"
      />
  </div>
</template>

<script>
export default {
  name: 'CardComponent',
  props: {
    value: {
      type: Number,
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
