import { defineComponent, computed } from 'vue'
import './WeatherCard.css'
import WeatherAlert from './WeatherAlert.js'
import WeatherConditions from './WeatherConditions.js'
import WeatherDetails from './WeatherDetails.js'

export default defineComponent({
  name: 'WeatherCard',
  components: {
    WeatherAlert,
    WeatherConditions,
    WeatherDetails,
  },

  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const toMinutes = time => {
      const [hours, minutes] = time.split(':').map(Number)

      return hours * 60 + minutes
    }

    const isNight = computed(() => {
      const dtMinutes = toMinutes(props.data.current.dt)

      const sunriseMinutes = toMinutes(props.data.current.sunrise)

      const sunsetMinutes = toMinutes(props.data.current.sunset)

      return dtMinutes < sunriseMinutes || dtMinutes > sunsetMinutes
    })

    return {
      isNight,
    }
  },

  template: `
    <li 
        class="weather-card"
        :class="{'weather-card--night': isNight}"
    >
    
      <WeatherAlert v-if="data.alert" />      
      
      <div>
        <h2 class="weather-card__name">
          {{ data.geographic_name }}
        </h2>
        <div class="weather-card__time">
          {{ data.current.dt }}
        </div>
      </div>
      
      <WeatherConditions 
          :title="data.current.weather.description"
          :weatherId="data.current.weather.id"
          :tempKelvin="data.current.temp"
      />
      
      <WeatherDetails 
        :pressureMPa="data.current.pressure"
        :humidity="data.current.humidity"
        :clouds="data.current.clouds"
        :windSpeed="data.current.wind_speed"
      />
    </li>
  `,
})
