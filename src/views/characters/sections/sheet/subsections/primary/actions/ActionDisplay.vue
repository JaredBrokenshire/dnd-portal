<template>
  <div class="mt-[.5rem] pt-[.5rem] flex items-center leading-[1]">
    <!-- Icon -->
    <div class="cursor-pointer w-[27px]">
      <tooltip :text="$props.action.type">
        <melee-attack v-if="$props.action.type === 'Melee Attack'" />
        <melee-weapon v-if="$props.action.type === 'Melee Weapon'" />
        <ranged-weapon v-if="$props.action.type === 'Ranged Weapon'" />
        <evocation-cantrip v-if="$props.action.type === 'Evocation Cantrip'" />
      </tooltip>
    </div>

    <!-- Name -->
    <div class="w-[140px] cursor-pointer">
      <div class="text-white text-[14px]">
        <span
          v-if="$props.action.rarity === 'Common'"
          class="text-common"
        >
          {{ $props.action.name }}
        </span>
        <span
          v-if="$props.action.rarity === 'Uncommon'"
          class="text-uncommon"
        >
          {{ $props.action.name }}
        </span>
        <span
          v-if="$props.action.rarity === 'Rare'"
          class="text-rare"
        >
          {{ $props.action.name }}
        </span>
        <span
          v-if="$props.action.rarity === 'Very Rare'"
          class="text-very-rare"
        >
          {{ $props.action.name }}
        </span>
        <span
          v-if="$props.action.rarity === 'Legendary'"
          class="text-legendary"
        >
          {{ $props.action.name }}
        </span>
      </div>
      <div class="text-gray-light flex flex-wrap text-[10px]">{{ $props.action.type }}</div>
    </div>

    <!-- Range -->
    <div class="w-[55px]">
      <div class="flex items-center text-[14px]">
        <span class="font-bold text-white">
          {{ $props.action.distance }}
          <span class="text-gray-light text-[12px]">
            {{ $props.action.alt_distance ? `(${$props.action.alt_distance})` : 'ft.' }}
          </span>
        </span>
      </div>
      <div
        v-if="!$props.action.alt_distance && typeof $props.action.distance === 'number'"
        class="text-gray-light text-[10px]"
      >
        Reach
      </div>
    </div>

    <!-- Hit / DC -->
    <div class="w-[55px]">
      <div class="text-[16px] cursor-pointer">
        <button
          class="cursor-pointer inline-flex items-center justify-center rounded-[4px] text-[20px] w-[42px] h-[36px] text-white border border-fighter bg-transparent transition-200 hover:bg-fighter-faded"
        >
          <span class="text-gray-light text-[1rem] mr-[.063rem] font-normal">
            {{ $props.action.hit_modifier >= 0 ? '+' : '-' }}
          </span>
          <span>{{ Math.abs($props.action.hit_modifier) }}</span>
        </button>
      </div>
    </div>

    <!-- Damage -->
    <div class="w-[80px]">
      <button
        class="cursor-pointer text-white inline-flex items-center justify-center rounded-[4px] max-w-[76px] min-h-[36px] py-[3px] px-[6px] border border-fighter bg-transparent transition-200 hover:bg-fighter-faded"
      >
        <span class="inline-flex items-center w-full">
          <span class="text-[14px] flex flex-col items-start">
            <span>{{ $props.action.damage }}</span>
            <span v-if="$props.action.alt_damage">{{ $props.action.alt_damage }}</span>
          </span>

          <tooltip :text="$props.action.damage_type">
            <bludgeoning v-if="$props.action.damage_type === 'Bludgeoning'" />
            <piercing v-if="$props.action.damage_type === 'Piercing'" />
            <slashing v-if="$props.action.damage_type === 'Slashing'" />
            <radiant v-if="$props.action.damage_type === 'Radiant'" />
          </tooltip>
        </span>
      </button>
    </div>

    <!-- Notes -->
    <div class="grow shrink basis-0 text-gray-light text-[12px]">{{ $props.action.notes || '' }}</div>
  </div>
</template>

<script>
  import MeleeAttack from "@/components/icons/action_types/MeleeAttack.vue";
  import Bludgeoning from "@/components/icons/damage_types/Bludgeoning.vue";
  import Tooltip from "@/components/ui/Tooltip.vue";
  import Piercing from "@/components/icons/damage_types/Piercing.vue";
  import MeleeWeapon from "@/components/icons/action_types/MeleeWeapon.vue";
  import RangedWeapon from "@/components/icons/action_types/RangedWeapon.vue";
  import Slashing from "@/components/icons/damage_types/Slashing.vue";
  import Radiant from "@/components/icons/damage_types/Radiant.vue";
  import EvocationCantrip from "@/components/icons/action_types/EvocationCantrip.vue";

  export default {
    name: "ActionDisplay",
    components: {
      EvocationCantrip,
      Radiant, Slashing, RangedWeapon, MeleeWeapon, Piercing, Tooltip, Bludgeoning, MeleeAttack
    },
    props: {
      action: {
        type: Object,
        required: true
      }
    },
  }
</script>

<style scoped>

</style>