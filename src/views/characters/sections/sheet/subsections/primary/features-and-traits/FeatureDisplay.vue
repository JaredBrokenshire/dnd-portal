<template>
  <div class="cursor-pointer mb-[13px]">
    <div class="text-white font-bold leading-[1.2] text-[14px]">{{ $props.feature.name }}</div>
    <div class="text-gray-light text-[12px]">
      <p>{{ $props.feature.description }}</p>
    </div>

    <div
      v-if="$props.feature.trait_spells"
      class="feature-ability-section"
    >
      <!-- Feature Spells -->
      <div
        v-for="(featureSpell, index) in $props.feature.trait_spells"
        :key="`feature-${$props.feature.name}-feature-spell-${index}`"
        class="flex items-center cursor-pointer"
      >
        <div class="mr-[5px]">
          <span class="text-white">
            {{ featureSpell.spell.name }}
            <span class="ml-[.188rem] text-gray-light">({{ numberToPosition(featureSpell.spell.level) }})</span>
          </span>
        </div>

        <div class="text-white flex items-center">
          <div class="inline-flex items-center font-bold mr-[5px]">
            <spell-slot-indicator
              v-for="use in featureSpell.uses"
              :key="`feature-spell-${index}-slot-indicator-${use}`"
            />
          </div>
          <div class="text-gray-light mr-[5px]">/</div>
          <div>{{ featureSpell.reset }}</div>
        </div>
      </div>
    </div>

    <div
      v-if="$props.feature.options"
      class="feature-ability-section"
    >
      <div
        v-for="(option, index) in $props.feature.options"
        :key="`feature-${$props.feature.name}-option${index}`"
      >
        <div class="font-bold leading-[1.2]">{{ option.name }}</div>
        <div class="mt-[5px]">{{ option.description }}</div>

        <div
          v-if="option.action_name"
          class="feature-option-action-section"
        >
          <div>
            {{ option.action_name }}:
            {{ option.action_type === 'Other' ? '(No action)' : `1 ${option.action_type}` }}
          </div>
          <div
            v-if="option.action_uses !== 0"
            class="flex items-center"
          >
            <div class="inline-flex items-center font-bold mr-[5px]">
              <spell-slot-indicator
                v-for="use in option.action_uses"
                :key="`feature-option-action-${index}-slot-indicator-${use}`"
              />
            </div>
            <div class="text-gray-light mr-[5px]">/</div>
            <div>{{ option.action_reset }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SpellSlotIndicator from "@/views/characters/sections/sheet/subsections/primary/spells/SpellSlotIndicator.vue";

  export default {
    name: "FeatureDisplay",
    components: {SpellSlotIndicator},
    props: {
      feature: {
        type: Object,
        required: true
      }
    },
    methods: {
      numberToPosition(number) {
        switch (number) {
        case 1:
          return '1st'
        case 2:
          return '2nd'
        case 3:
          return '3rd'
        default:
          return `${number}th`
        }
      }
    }
  }
</script>

<style scoped>

</style>