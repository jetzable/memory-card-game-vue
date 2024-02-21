<template>
  <div class="card" @click="selectCard">
    <div v-if="visible" class="card-face is-front">
      {{ value }} - {{ matched }}
    </div>
    <div v-else class="card-face is-back">
      Back
    </div>
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
.card {
  height: 12rem;
  border: 5px solid black;
  position: relative;
}

.card-face {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
}

.card-face.is-front {
  background-color: blueviolet;
  color: white;
}

.card-face.is-back {
  background-color: black;
  color: white;
}
</style>
