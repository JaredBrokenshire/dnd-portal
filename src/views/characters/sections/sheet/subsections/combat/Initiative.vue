<template>
  <div class="pt-[2px] w-[105px]">
    <section class="relative mx-auto cursor-pointer w-[5.625rem]">
      <div class="text-center font-bold text-white uppercase text-[.8125rem] mb-[.1875rem] text-outline">Initiative
      </div>

      <div
        class="relative flex-center text-center font-bold uppercase w-[5.625rem] h-[3.4375rem] text-[1.625rem] tracking-[-.0625rem]"
      >
        <div class="character-sheet-section-bg">
          <svg viewBox="0 0 70 45">
            <polygon
              fill="#10161ADB"
              points="68.8,22.5 55.8,43.3 14.2,43.3 1.2,22.5 14.2,1.8 14.3,1.7 55.7,1.7 55.8,1.8 "
            />
            <path
              d="M59.1,0H10.9L0,17.2v10.5L10.9,45H59l11-17.2V17.2L59.1,0z M58.2,2.2l10,15.8v3L56.5,2.3l-0.1-0.1H58.2z M14.8,2.2h40.5 l0.1,0.1L68,22.5L55.3,42.8H14.7L2,22.5L14.8,2.2L14.8,2.2z M1.8,18l10-15.8h1.8l-0.1,0.1L1.8,21V18z M11.8,42.8L1.8,27v-3 l11.7,18.8H11.8z M68.2,27l-10,15.8h-1.7L68.2,24V27z"
              fill="#972e2e"
            />
          </svg>
        </div>

        <h2 class="sr-only">Initiative</h2>

        <button
          class="font-normal rounded-[4px] relative inline-flex items-center justify-center bg-transparent transition-200 cursor-pointer w-[3.25rem] h-[2.125rem] text-white border border-fighter hover:bg-fighter-faded"
        >
          <span class="relative inline-flex items-center">
            <span class="text-gray-light text-[1.25rem] mr-[.063rem]">
              {{ initiativeModifier >= 0 ? '+' : '-' }}
            </span>
            <span>{{ Math.abs(initiativeModifier) }}</span>
          </span>
        </button>
      </div>

      <div
        :class="`absolute bottom-[-.1875rem] left-[-.0625rem] transition-200 ${initiativeAdvantage ? 'scale-100' : 'scale-0'}`"
      >
        <span
          class="inline-flex align-middle w-[1.25rem] h-[1.25rem] rounded-[.75rem] mr-[.125rem] mt-[-.125rem] cursor-default"
        >
          <tooltip text="Advantage on Initiative">
            <svg
              class="h-full w-full"
              viewBox="0 0 24 24"
            >
              <g>
                <path
                  d="M13.3665 12.5235L12.009 8.78235L10.6516 12.5235H13.3665Z"
                  fill="#00c680"
                />
                <path
                  clip-rule="evenodd"
                  d="M12.241 1.13253C12.0909 1.05 11.9091 1.05 11.759 1.13252L2.25904 6.35753C2.09927 6.4454 2 6.61329 2 6.79563V17.2044C2 17.3867 2.09927 17.5546 2.25904 17.6425L11.759 22.8675C11.9091 22.95 12.0909 22.95 12.241 22.8675L21.741 17.6425C21.9007 17.5546 22 17.3867 22 17.2044V6.79563C22 6.61329 21.9007 6.4454 21.741 6.35753L12.241 1.13253ZM18 17.5H15.1222L14.1991 14.9412H9.80091L8.87783 17.5H6L10.5611 5.5H13.4389L18 17.5Z"
                  fill="#00c680"
                  fill-rule="evenodd"
                />
              </g>
            </svg>
          </tooltip>
        </span>
      </div>
    </section>
  </div>
</template>

<script>
  import {modifierFromLevel} from "@/utils/characterSheet";
  import Tooltip from "@/components/ui/Tooltip.vue";

  export default {
    name: "Initiative",
    components: {Tooltip},
    props: {
      character: {
        type: Object,
        required: true
      }
    },
    computed: {
      initiativeModifier() {
        let initiativeModifier = modifierFromLevel(this.$props.character.dexterity);

        for (const inventoryItem of this.$props.character.inventory) {
          if (inventoryItem.equipped) {
            initiativeModifier += inventoryItem.item.initiative_bonus
          }
        }

        return initiativeModifier;
      },
      initiativeAdvantage() {
        for (const inventoryItem of this.$props.character.inventory) {
          if (inventoryItem.equipped && inventoryItem.item.initiative_advantage) {
            return true;
          }
        }

        return false
      }
    }
  }
</script>

<style scoped>

</style>