<template>
  <div class="h-full max-h-full min-h-0">
    <section class="flex flex-col max-h-full w-full h-[600px]">
      <h2 class="sr-only">Spells</h2>

      <div
        v-if="$props.character.class.spellcasting_ability"
        class="flex w-full border-b border-[#c5313166] mb-[10px] pb-[10px] text-gray-light"
      >
        <div class="flex grow shrink basis-0 justify-center">
          <!-- Spellcasting Modifier -->
          <div class="flex items-center flex-col font-bold leading-[1] cursor-default">
            <div class="flex">
              <tooltip :text="$props.character.class.name">
                <span class="text-[16px] cursor-default">
                  <span class="inline-flex items-center align-top">
                    <span class="text-[.75rem] mr-[.063rem]">{{ spellcastingModifier >= 0 ? '+' : '-' }}</span>
                    <span class="text-white">{{ Math.abs(spellcastingModifier) }}</span>
                  </span>
                </span>
              </tooltip>
            </div>
            <div class="uppercase text-[10px]">Modifier</div>
          </div>

          <!-- Spell Attack Modifier -->
          <div class="flex items-center flex-col font-bold leading-[1] ml-[15px] cursor-default">
            <div class="flex">
              <tooltip :text="$props.character.class.name">
                <span class="text-[16px]">
                  <span class="inline-flex items-center align-top">
                    <span class="text-[.75rem] mr-[.063rem]">{{ spellAttackModifier >= 0 ? '+' : '-' }}</span>
                    <span class="text-white">{{ Math.abs(spellAttackModifier) }}</span>
                  </span>
                </span>
              </tooltip>
            </div>

            <div class="uppercase text-[10px]">Spell Attack</div>
          </div>

          <!-- Spell Save DC -->
          <div class="flex items-center flex-col font-bold leading-[1] ml-[15px] cursor-default">
            <div class="flex">
              <tooltip :text="$props.character.class.name">
                <span class="text-[16px]">
                  <span class="inline-flex items-center align-top">
                    <span class="text-white">{{ spellSaveDC }}</span>
                  </span>
                </span>
              </tooltip>
            </div>

            <div class="uppercase text-[10px]">Save DC</div>
          </div>
        </div>
      </div>

      <div class="flex flex-col grow shrink basis-0 min-h-0">
        <div class="p-0 flex flex-col min-h-0 bg-transparent">
          <div class="overflow-y-auto">
            <spell-level
              v-for="(spellLevel, index) in characterSpellsMap.entries()"
              :key="`spell-level-${spellLevel[0]}`"
              :attack-modifier="spellAttackModifier"
              :character-id="$props.character.id"
              :save-dc="spellSaveDC"
              :spell-slots="spellSlotsMap.get(index)"
              :spells="spellLevel[1]"
              :title="spellLevel[0]"
              @update="$emit('update')"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import Tooltip from "@/components/ui/Tooltip.vue";
  import {modifierFromLevel, proficiencyBonusFromLevel} from "@/utils/characterSheet";
  import SpellLevel from "@/views/characters/sections/sheet/subsections/primary/spells/SpellLevel.vue";

  export default {
    name: "Spells",
    components: {SpellLevel, Tooltip},
    props: {
      character: {
        type: Object,
        required: true
      }
    },
    computed: {
      spellcastingModifier() {
        switch (this.$props.character.class.spellcasting_ability) {
        case 'Intelligence':
          return modifierFromLevel(this.$props.character.intelligence)
        case 'Wisdom':
          return modifierFromLevel(this.$props.character.wisdom)
        case 'Charisma':
          return modifierFromLevel(this.$props.character.charisma)
        default:
          return 0;
        }
      },
      spellAttackModifier() {
        return this.spellcastingModifier + proficiencyBonusFromLevel(this.$props.character.level)
      },
      spellSaveDC() {
        return 8 + this.spellAttackModifier
      },
      characterSpellsMap() {
        const map = new Map([
          ["Cantrip", []],
          ["1st Level", []],
          ["2nd Level", []],
          ["3rd Level", []],
          ["4th Level", []],
          ["5th Level", []],
          ["6th Level", []],
          ["7th Level", []],
          ["8th Level", []],
          ["9th Level", []],
        ])

        const keys = map.keys().toArray()

        for (const spell of this.$props.character.spells) {
          map.get(keys[spell.level]).push(spell)
        }

        return map
      },
      spellSlotsMap() {
        const map = new Map([
          [0, {available: 0, used: 0}],
          [1, {available: 0, used: 0}],
          [2, {available: 0, used: 0}],
          [3, {available: 0, used: 0}],
          [4, {available: 0, used: 0}],
          [5, {available: 0, used: 0}],
          [6, {available: 0, used: 0}],
          [7, {available: 0, used: 0}],
          [8, {available: 0, used: 0}],
          [9, {available: 0, used: 0}],
        ])

        if (this.$props.character.class.spell_levels) {
          for (const spellSlotLevel of this.$props.character.class.spell_levels) {
            map.get(spellSlotLevel.spell_level).available = spellSlotLevel.number_of_slots
          }
        }

        if (this.$props.character.used_spell_slots) {
          for (const usedSpellSlots of this.$props.character.used_spell_slots) {
            map.get(usedSpellSlots.spell_level).used = usedSpellSlots.spell_slots_used
          }
        }

        return map
      }
    },
  }
</script>

<style scoped>

</style>