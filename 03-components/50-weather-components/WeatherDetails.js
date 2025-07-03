import { computed, defineComponent } from 'vue'
import './WeatherDetails.css'

export default defineComponent({
  name: 'WeatherDetails',

  props: {
    pressureMPa: {
      type: Number,
      default: 0,
    },

    humidity: {
      type: Number,
      default: 0,
    },

    clouds: {
      type: Number,
      default: 0,
    },

    windSpeed: {
      type: Number,
      default: 0,
    },
  },

  setup(props) {
    const pressureMmHg = computed(() => {
      return Math.round(props.pressureMPa * 0.75)
    })

    return {
      pressureMmHg,
    }
  },

  template: `
      <div class="weather-details">
        <div class="weather-details__item">
          <div class="weather-details__item-label">Давление, мм рт. ст.</div>
          <div class="weather-details__item-value">{{ pressureMmHg }}</div>
        </div>
        <div class="weather-details__item">
          <div class="weather-details__item-label">Влажность, %</div>
          <div class="weather-details__item-value">{{ humidity }}</div>
        </div>
        <div class="weather-details__item">
          <div class="weather-details__item-label">Облачность, %</div>
          <div class="weather-details__item-value">{{ clouds }}</div>
        </div>
        <div class="weather-details__item">
          <div class="weather-details__item-label">Ветер, м/с</div>
          <div class="weather-details__item-value">{{ windSpeed }}</div>
        </div>
      </div>
  `,
})
