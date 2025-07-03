import { defineComponent, ref } from 'vue'
import { UiButton } from '@shgk/vue-course-ui'
import './UiCounter.css'

export default defineComponent({
  name: 'UiCounter',

  components: {
    UiButton,
  },

  props: {
    count: {
      type: Number,
      required: true,
    },

    min: {
      type: Number,
      default: 0,
    },

    max: {
      type: Number,
      default: Infinity,
    },
  },

  emits: ['update:count'],

  setup(props, { emit }) {
    // Рекомендуется для практики реализовать обработку событий внутри setup, а не непосредственно в шаблоне

    const disabledDecrement = ref(false)
    const disabledIncrement = ref(false)

    const decrement = () => {
      if (props.count > props.min) {
        emit('update:count', props.count - 1)
      }
    }

    const increment = () => {
      if (props.count < props.max) {
        emit('update:count', props.count + 1)
      }
    }

    return {
      decrement,
      increment,
      disabledDecrement,
      disabledIncrement,
    }
  },

  template: `
    <div class="counter">
      <UiButton 
          @click="decrement" 
          aria-label="Decrement"
          :disabled="count === min"
      >
        ➖
      </UiButton>
      
      <span class="count" data-testid="count">{{ count }}</span>
      
      <UiButton 
          @click="increment" 
          aria-label="Increment"
          :disabled="count === max"
      >
        ➕
      </UiButton>
    </div>
  `,
})
