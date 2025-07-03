import { defineComponent } from 'vue'
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
