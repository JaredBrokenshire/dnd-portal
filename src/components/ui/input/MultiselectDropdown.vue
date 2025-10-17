<template>
  <div class="relative w-full">
    <div
      :class="invalid ? 'border-danger-light focus:ring-danger-light focus:border-danger-light' : 'border-gray-light focus:ring-primary focus:border-primary'"
      class="bg-white border rounded-md px-3 py-2 flex items-center flex-wrap gap-1 cursor-pointer shadow-sm transition-all"
      @click="toggle"
    >
      <template v-if="selectedOptions.length">
        <span
          v-for="option in selectedOptions"
          :key="option.value"
          class="bg-primary-light hover:bg-danger-light hover:text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1 transition-all"
          @click.stop="removeOption(option.value)"
        >
          <span>{{ option.label }}</span>
        </span>
      </template>
      <div
        v-else
        class="flex-between w-full"
      >
        <div class="flex-grow text-gray text-sm">
          {{ placeholder }}
        </div>
        <feather-icon icon="ChevronDownIcon" />
      </div>
    </div>
    <ul
      v-if="open"
      class="absolute z-10 mt-1 w-full bg-white border border-gray-light rounded-md shadow-lg max-h-60 overflow-auto"
    >
      <li
        v-for="option in options"
        :key="option.value"
        class="px-4 py-2 hover:bg-gray-light cursor-pointer flex items-center gap-2"
        @click.stop="toggleOption(option.value)"
      >
        <span class="flex-grow">{{ option.label }}</span>
        <div>
          <input
            :checked="value.includes(option.value)"
            :disabled="value.length >= maxOptions && !value.includes(option.value)"
            class="form-checkbox"
            type="checkbox"
            @change.stop
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'MultiselectDropdown',
    props: {
      placeholder: {
        type: String,
        default: 'Select options...'
      },
      value: {
        type: Array,
        default: () => []
      },
      options: {
        type: Array,
        required: true
      },
      max: {
        type: Number,
        default: 0,
      },
      invalid: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        open: false,
      };
    },
    computed: {
      selectedOptions() {
        return this.options.filter(opt => this.value.includes(opt.value));
      },
      maxOptions() {
        return this.$props.max === 0 ? this.$props.value.length : this.$props.max;
      }
    },
    mounted() {
      document.addEventListener('click', this.handleClickOutside);
    },
    beforeDestroy() {
      document.removeEventListener('click', this.handleClickOutside);
    },
    methods: {
      toggle() {
        this.open = !this.open;
      },
      toggleOption(val) {
        if (this.value.includes(val)) {
          // Remove selected option
          this.$emit('input', this.value.filter(v => v !== val));
        } else {
          // Check max options not reached
          if (this.value.length < this.maxOptions) {
            // Add selected option
            this.$emit('input', [...this.value, val])
          }
        }
      },
      removeOption(val) {
        const newValue = this.value.filter(v => v !== val);
        this.$emit('input', newValue);
      },
      handleClickOutside(event) {
        if (!this.$el.contains(event.target)) {
          this.open = false;
        }
      }
    }
  };
</script>
