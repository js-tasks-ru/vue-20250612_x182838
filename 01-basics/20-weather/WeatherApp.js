import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',

  setup() {
    const weatherData = getWeatherData()

    const toMinutes = time => {
      const [hours, minutes] = time.split(':').map(Number)

      return hours * 60 + minutes
    }

    const isNight = (dt, sunrise, sunset) => {
      const dtMinutes = toMinutes(dt)

      const sunriseMinutes = toMinutes(sunrise)

      const sunsetMinutes = toMinutes(sunset)

      return dtMinutes < sunriseMinutes || dtMinutes > sunsetMinutes
    }

    const kelvinToCelsius = kelvin => (kelvin - 273.15).toFixed(1)

    const hPaToMmHg = mPa => Math.round(mPa * 0.75)

    return {
      weatherData,
      WeatherConditionIcons,
      isNight,
      kelvinToCelsius,
      hPaToMmHg,
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <li 
            v-for="item in weatherData" 
            :key="item.geographic_name" 
            class="weather-card"
            :class="{'weather-card--night': isNight(item.current.dt, item.current.sunrise, item.current.sunset)}"
        >
          <div 
              v-if="item.alert" 
              class="weather-alert"
          >
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">Королевская метеослужба короля Арагорна II: Предвещается наступление сильного шторма.</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{ item.geographic_name }}
            </h2>
            <div class="weather-card__time">
              {{ item.current.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div 
                class="weather-conditions__icon" 
                :title="item.current.weather.description"
            >
              {{ WeatherConditionIcons[item.current.weather.id] }}
            </div>
            <div class="weather-conditions__temp">{{ kelvinToCelsius(item.current.temp) }} °C</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{ hPaToMmHg(item.current.pressure) }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{ item.current.humidity }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{ item.current.clouds }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{ item.current.wind_speed }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
