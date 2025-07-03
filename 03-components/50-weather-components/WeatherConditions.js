import { defineComponent, computed } from 'vue'
import './WeatherConditions.css'
import { WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherConditions',

  props: {
    title: {
      type: String,
      default: '',
    },

    weatherId: {
      type: Number,
      default: 0,
    },

    tempKelvin: {
      type: Number,
      default: 0,
    },
  },

  setup(props) {
    const celsius = computed(() => {
      return (props.tempKelvin - 273.15).toFixed(1)
    })

    return {
      WeatherConditionIcons,
      celsius,
    }
  },

  template: `
      <div class="weather-conditions">
        <div class="weather-conditions__icon" :title="title">
          {{ WeatherConditionIcons[weatherId] }}
        </div>
        <div class="weather-conditions__temp">{{ celsius }} °C</div>
      </div>
  `,
})
