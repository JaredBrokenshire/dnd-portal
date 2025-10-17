<template>
  <div class="cursor-pointer grow shrink basis-0 min-w-0 overflow-hidden relative px-[10px]">
    <div class="font-bold text-gray-light uppercase text-[13px]">Defenses</div>
    <div class="overflow-hidden max-h-[57px]">
      <div
        v-if="$props.character.defenses"
        class="text-white"
      >
        <!-- Resistances -->
        <div
          v-if="defenses.get('Resistance').length > 0"
          class="defense-summary"
        >
          <tooltip text="Resistance">
            <svg
              class="defense-summary__icon"
              viewBox="0 0 40.89941 48"
            >
              <path
                d="M21.18969,15.5h-4.12v7.44h4.12a3.68142,3.68142,0,0,0,2.79-.97,3.75732,3.75732,0,0,0,.94-2.73,3.81933,3.81933,0,0,0-.95-2.74A3.638,3.638,0,0,0,21.18969,15.5Z"
                fill="#00c680"
              />
              <path
                d="M40.4497,8c-11,0-20-6-20-8,0,2-9,8-20,8-4,35,20,40,20,40S44.4497,43,40.4497,8Zm-8.11,29.51h-6.97l-4.77-9.56h-3.53v9.56h-6.51V10.49h10.63c3.2,0,5.71.71,7.51,2.13a7.21618,7.21618,0,0,1,2.71,6.03,8.78153,8.78153,0,0,1-1.14,4.67005,8.14932,8.14932,0,0,1-3.57,3l5.64,10.91Z"
                fill="#00c680"
              />
            </svg>
          </tooltip>

          <span>{{ defenses.get('Resistance').join(', ') }}</span>
        </div>

        <!-- Immunities -->
        <div
          v-if="defenses.get('Immunity').length > 0"
          class="defense-summary"
        >
          <tooltip text="Immunity">
            <svg
              class="defense-summary__icon"
              viewBox="0 0 40.89941 48"
            >
              <path
                d="M40.4497,8c-11,0-20-6-20-8,0,2-9,8-20,8-4,35,20,40,20,40S44.4497,43,40.4497,8Zm-16.75,29.42h-6.5V10.4h6.5Z"
                fill="#00c680"
              />
            </svg>
          </tooltip>

          <span>{{ defenses.get('Immunity').join(', ') }}</span>
        </div>

        <!-- Vulnerabilities -->
        <div
          v-if="defenses.get('Vulnerability').length > 0"
          class="defense-summary"
        >
          <tooltip text="Vulnerability">
            <svg
              class="defense-summary__icon"
              viewBox="0 0 40.89941 48"
            >
              <path
                d="M40.4497,8c-11,0-20-6-20-8,0,2-9,8-20,8-4,35,20,40,20,40S44.4497,43,40.4497,8Zm-16.63,30.42h-7.12l-9.02-27.02h7.22L20.2597,31.07l5.38-19.67h7.27Z"
                fill="#e40712"
              />
            </svg>
          </tooltip>

          <span>{{ defenses.get('Vulnerability').join(', ') }}</span>
        </div>
      </div>

      <div
        v-else
        class="text-gray-light text-[12px]"
      >
        No Resistances, Immunities or Vulnerabilities
      </div>
    </div>
  </div>
</template>

<script>
  import Tooltip from "@/components/ui/Tooltip.vue";

  export default {
    name: "Defenses",
    components: {Tooltip},
    props: {
      character: {
        type: Object,
        required: true
      }
    },
    computed: {
      defenses() {
        const map = new Map([
          ["Resistance", []],
          ["Immunity", []],
          ["Vulnerability", []],
        ])

        for (const {damage_type, defense_type} of this.$props.character.defenses) {
          map.get(defense_type).push(damage_type)
        }

        return map
      }
    },
  }
</script>

<style scoped>
.defense-summary {
  @apply overflow-hidden overflow-ellipsis whitespace-nowrap leading-[1.2] flex;
}

.defense-summary span {
  @apply cursor-default;
}

.defense-summary__icon {
  @apply w-[12px] h-[12px] mr-[4px];
}
</style>