import { defineComponent } from 'vue'
import EmailListItem from './EmailListItem.js'

export default defineComponent({
  name: 'EmailList',

  components: {
    EmailListItem,
  },

  props: {
    emails: {
      type: Array,
      required: true,
    },
  },

  emits: ['deleteEmail'],

  setup(props, { emit }) {
    const deleteEmail = index => {
      emit('deleteEmail', index)
    }

    return {
      deleteEmail,
    }
  },

  template: `
    <ul class="emails-list unstyled-list" aria-label="Emails">
      <EmailListItem
        @delete="deleteEmail(index)"
        v-for="({ email, isMarked }, index) in emails"
        :key="email"
        :email
        :marked="isMarked"
      />
    </ul>
  `,
})
