<template>
  <div class="flex-center gap-2 w-full">
    <button
      v-if="showButtons"
      :disabled="value <= min"
      class="step-button"
      type="button"
      @click="decrease"
    >
      -
    </button>
    <input
      :class="invalid ? 'border-danger-light focus:ring-danger-light focus:border-danger-light' : 'border-gray-light focus:ring-primary focus:border-primary'"
      :max="max"
      :min="min"
      :step="step"
      :value="value"
      class="flex-grow text-center px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2"
      type="number"
      @input="onInput($event.target.value)"
    >
    <button
      v-if="showButtons"
      :disabled="value >= max"
      class="step-button"
      type="button"
      @click="increase"
    >
      +
    </button>
  </div>
</template>

<script>
  export default {
    name: 'NumberInput',
    props: {
      value: {
        type: Number,
        required: true
      },
      min: {
        type: Number,
        default: -Infinity
      },
      max: {
        type: Number,
        default: Infinity
      },
      step: {
        type: Number,
        default: 1
      },
      invalid: {
        type: Boolean,
        default: false
      },
      showButtons: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      onInput(val) {
        const num = parseFloat(val);
        if (!isNaN(num)) {
          this.updateValue(num);
        }
      },
      increase() {
        this.updateValue(this.value + this.step);
      },
      decrease() {
        this.updateValue(this.value - this.step);
      },
      updateValue(newVal) {
        const clamped = Math.min(this.max, Math.max(this.min, newVal));
        this.$emit('input', clamped);
      }
    }
  };
</script>

<style scoped>
</style>
