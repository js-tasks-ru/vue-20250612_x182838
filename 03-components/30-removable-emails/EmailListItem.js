import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EmailListItem',

  props: {
    email: {
      type: String,
      required: true,
    },

    marked: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['delete'],

  template: `
    <li :class="{ marked }">
      {{ email }}
      <button 
          @click.stop="$emit('delete')"
          type="button" 
          aria-label="Удалить" 
      >
        ❌
      </button>
    </li>
  `,
})
