import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
    const firstOperand = ref(0)
    const operator = ref('sum')
    const secondOperand = ref(0)

    const result = computed(() => {
      switch (operator.value) {
        case 'sum':
          return firstOperand.value + secondOperand.value
        case 'subtract':
          return firstOperand.value - secondOperand.value
        case 'multiply':
          return firstOperand.value * secondOperand.value
        case 'divide':
          return secondOperand.value !== 0 ? firstOperand.value / secondOperand.value : 'на 0 делить нельзя'
        default:
          return 'Ошибка'
      }
    })

    return {
      result,
      operator,
      firstOperand,
      secondOperand,
    }
  },

  template: `
    <div class="calculator">
      <input v-model="firstOperand" type="number" aria-label="First operand" />

      <div class="calculator__operators">
        <label><input v-model="operator" type="radio" name="operator" value="sum"/>➕</label>
        <label><input v-model="operator" type="radio" name="operator" value="subtract"/>➖</label>
        <label><input v-model="operator" type="radio" name="operator" value="multiply"/>✖</label>
        <label><input v-model="operator" type="radio" name="operator" value="divide"/>➗</label>
      </div>

      <input v-model="secondOperand" type="number" aria-label="Second operand" />

      <div>=</div>

      <output>{{ result }}</output>
    </div>
  `,
})
