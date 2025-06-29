import { defineComponent, ref, computed, watch } from 'vue'
import { getMeetup } from './meetupsService.ts'

export default defineComponent({
  name: 'SelectedMeetupApp',

  setup() {
    const meetupCount = ref(5)
    const currentMeetupId = ref(1)
    const currentMeetupTitle = ref('')

    const isButtonPreviousDisabled = computed(() => currentMeetupId.value === 1)
    const isButtonNextDisabled = computed(() => currentMeetupId.value === meetupCount.value)

    const showPreviousSlide = () => currentMeetupId.value > 1 && --currentMeetupId.value
    const showNextSlide = () => currentMeetupId.value < meetupCount.value && ++currentMeetupId.value

    const getCurrentMeetupTitle = async id => {
      const meetup = await getMeetup(id)
      currentMeetupTitle.value = meetup.title
    }

    watch(
      currentMeetupId,
      () => {
        getCurrentMeetupTitle(currentMeetupId.value)
      },
      { immediate: true },
    )

    return {
      meetupCount,
      currentMeetupId,
      isButtonPreviousDisabled,
      isButtonNextDisabled,
      showPreviousSlide,
      showNextSlide,
      currentMeetupTitle,
    }
  },

  template: `
    <div class="meetup-selector">
      <div class="meetup-selector__control">
        <button 
            @click="showPreviousSlide" 
            class="button button--secondary" 
            type="button" 
            :disabled="isButtonPreviousDisabled"
        >
          Предыдущий
        </button>

        <div class="radio-group" role="radiogroup">
          <div 
              v-for="item in meetupCount" 
              :key="item" 
              class="radio-group__button"
          >
            <input
              :id="'meetup-id-' + item"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              :value="item"
              v-model="currentMeetupId"
            />
            <label 
                :for="'meetup-id-' + item" 
                class="radio-group__label"
            >
              {{ item }}
            </label>
          </div>
        </div>

        <button 
            @click="showNextSlide" 
            class="button button--secondary" 
            type="button" 
            :disabled="isButtonNextDisabled"
        >
          Следующий
        </button>
      </div>

      <div class="meetup-selector__cover">
        <div class="meetup-cover">
          <h1 class="meetup-cover__title">{{ currentMeetupTitle }}</h1>
        </div>
      </div>
    </div>
  `,
})
