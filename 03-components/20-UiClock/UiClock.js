import { defineComponent, onMounted, onBeforeUnmount, ref } from 'vue'

export default defineComponent({
  name: 'UiClock',

  setup() {
    const time = ref('')
    let timer = null

    const updateTime = () => {
      time.value = new Date().toLocaleTimeString(navigator.language, { timeStyle: 'medium' })
    }

    onMounted(() => {
      updateTime()
      timer = setInterval(updateTime, 1000)
    })

    onBeforeUnmount(() => {
      clearInterval(timer)
    })

    return { time }
  },

  template: `<div class="clock">{{ time }}</div>`,
})
