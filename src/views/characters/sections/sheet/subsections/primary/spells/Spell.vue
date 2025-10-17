<template>
  <div class="flex items-center cursor-pointer leading-[1] py-[4px]">
    <div class="relative w-[35px] pr-[5px]">
      <span
        v-if="$props.spell.level === 0"
        class="text-gray-light text-center uppercase mx-auto block text-[8px]"
      >
        At <br> Will
      </span>
      <button
        v-else
        :disabled="!$props.hasAvailableSpellSlots"
        class="bg-fighter text-white cursor-pointer relative flex-center p-[5px] w-full h-fit rounded-[3px] uppercase transition-200 hover:bg-fighter-dark disabled:bg-gray disabled:hover:bg-gray disabled:cursor-default"
        @click="$emit('cast')"
      >
        <span class="text-[8px]">Cast</span>
      </button>
    </div>

    <div class="w-[135px]">
      <div class="text-[13px]">
        <span class="text-white italic">{{ $props.spell.name }}</span>
      </div>
    </div>

    <div class="text-gray-light w-[35px]">
      <tooltip :text="tooltipText">
        <span class="cursor-default">{{ $props.spell.casting_time }}</span>
      </tooltip>
    </div>

    <div class="w-[55px]">
      <span class="flex items-center font-bold text-[14px]">
        <span
          v-if="rangeNumeric"
          class="text-white"
        >
          <span>{{ $props.spell.range.split(' ')[0] }}</span>
          <span class="text-gray-light text-[.625rem] ml-[.188rem]">{{ $props.spell.range.split(' ')[1] }}</span>
        </span>
        <span
          v-else
          class="text-gray-light font-normal text-[.75rem]"
        >
          {{ $props.spell.range }}
        </span>
      </span>
    </div>

    <div class="w-[45px]">
      <div
        v-if="$props.spell.is_save"
        class="font-bold"
      >
        <span class="block uppercase text-gray text-[10px]">{{ $props.spell.save_ability }}</span>
        <span class="text-[14px] text-gray-light">{{ $props.saveDc }}</span>
      </div>
      <div v-else-if="$props.spell.is_attack">
        <div class="text-[16px]">
          <button
            class="text-[20px] h-[36px] w-[42px] text-white inline-flex justify-center items-center bg-transparent border border-fighter rounded-[4px] cursor-pointer transition-200 hover:bg-fighter-faded"
          >
            <span class="inline-flex items-center">
              <span class="text-gray-light text-[.75rem] mr-[.063rem]">
                {{ $props.attackModifier >= 0 ? '+' : '-' }}
              </span>
              <span>{{ $props.attackModifier }}</span>
            </span>
          </button>
        </div>
      </div>
      <div
        v-else
        class="text-gray-light"
      >
        --
      </div>
    </div>

    <div class="w-[85px]">
      <div v-if="$props.spell.effect === 'Damage'">
        <div class="text-white">
          <span class="text-[13px]">
            <button
              class="text-white border border-fighter bg-transparent max-w-[76px] min-h-[36px] p-[3px] inline-flex items-center justify-center cursor-pointer rounded-[4px] transition-200 hover:bg-fighter-faded"
            >
              <span>{{ $props.spell.damage }}</span>

              <tooltip :text="$props.spell.damage_type">
                <radiant v-if="$props.spell.damage_type === 'Radiant'" />
                <bludgeoning v-if="$props.spell.damage_type === 'Bludgeoning'" />
                <fire v-if="$props.spell.damage_type === 'Fire'" />
                <psychic v-if="$props.spell.damage_type === 'Psychic'" />
                <thunder v-if="$props.spell.damage_type === 'Thunder'" />
              </tooltip>
            </button>
          </span>
        </div>
      </div>
      <div
        v-else
        class="text-gray-light"
      >
        <div class="text-[12px] min-h-[36px] flex items-center">
          <span>{{ $props.spell.effect }}</span>
        </div>
      </div>
    </div>

    <div class="grow shrink basis-0 min-w-0 text-gray-light text-[11px]">
      <span class="italic">{{ $props.spell.notes }}</span>
    </div>
  </div>
</template>

<script>
  import Tooltip from "@/components/ui/Tooltip.vue";
  import Radiant from "@/components/icons/damage_types/Radiant.vue";
  import Bludgeoning from "@/components/icons/damage_types/Bludgeoning.vue";
  import Fire from "@/components/icons/damage_types/Fire.vue";
  import Psychic from "@/components/icons/damage_types/Psychic.vue";
  import Thunder from "@/components/icons/damage_types/Thunder.vue";

  export default {
    name: "Spell",
    components: {Thunder, Psychic, Fire, Bludgeoning, Radiant, Tooltip},
    props: {
      spell: {
        type: Object,
        required: true
      },
      attackModifier: {
        type: Number,
        required: true
      },
      saveDc: {
        type: Number,
        required: true
      },
      hasAvailableSpellSlots: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      tooltipText() {
        switch (this.$props.spell.casting_time) {
        case '1A':
          return '1 Action';
        case '1BA':
          return '1 Bonus Action'
        case '1R':
          return '1 Reaction'
        default:
          return this.$props.spell.casting_time
        }
      },
      rangeNumeric() {
        return this.$props.spell.range.includes('ft.')
      }
    },
  }
</script>

<style scoped>

</style>