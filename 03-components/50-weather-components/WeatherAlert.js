import { defineComponent } from 'vue'
import './WeatherAlert.css'

export default defineComponent({
  name: 'WeatherAlert',

  template: `
      <div class="weather-alert">
        <span class="weather-alert__icon">⚠️</span>
        <span class="weather-alert__description">Королевская метеослужба короля Арагорна II: Предвещается наступление сильного шторма.</span>
      </div>
  `,
})
