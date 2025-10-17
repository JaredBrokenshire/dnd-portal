<template>
  <div class="h-full min-h-0 max-h-full">
    <section class="flex flex-col h-[600px] max-h-full w-full">
      <h2 class="sr-only">Actions</h2>

      <div class="flex flex-col min-h-0 text-[12px]">
        <div class="overflow-y-auto">
          <!-- Actions -->
          <div class="mb-[1.5625rem]">
            <div class="content-section__header">
              <div class="content-section__header-text">
                Actions <span class="ml-[.188rem]">•</span>
                <span
                  class="ml-[.188rem] text-gray-light font-normal normal-case"
                >
                  Attacks Per Action: {{ $props.character.attacks_per_action }}
                </span>
              </div>
            </div>

            <div>
              <div class="mb-[.8125rem]">
                <div class="flex text-[.6875rem] text-white font-bold uppercase">
                  <div class="w-[1.6875rem]" />
                  <div class="w-[8.75rem] py-[.3125rem]">Attack</div>
                  <div class="w-[3.4375rem] py-[.3125rem]">Range</div>
                  <div class="w-[3.4375rem] py-[.3125rem]">Hit / DC</div>
                  <div class="w-[5rem] py-[.3125rem]">Damage</div>
                  <div class="grow shrink basis-0 py-[.3125rem]">Notes</div>
                </div>

                <div>
                  <action-display
                    v-for="(action, index) in actions"
                    :key="`action-display-${index}`"
                    :action="action"
                  />
                </div>
              </div>

              <!-- Actions in Combat -->
              <div class="mb-[1.0625rem] text-white">
                <div class="font-bold text-white leading-[1.2] text-[13px]">Actions in Combat</div>
                <div class="text-white border-l-[3px] border-fighter ml-[4px] my-[5px] py-[5px] pl-[8px]">
                  <div class="flex flex-wrap">
                    Attack, Dash, Disengage, Dodge, Grapple, Help, Hide,
                    Improvise, Influence, Magic, Ready, Search, Shove, Study, Utilise
                  </div>
                </div>
              </div>

              <!-- Trait Actions -->
              <div class="mb-[1.0625rem] text-white text-[12px]">
                <div
                  v-for="traitAction of traitActions"
                  :key="`trait-action-${traitAction.action_name}`"
                >
                  <div class="font-bold leading-[1.2] text-[13px]">{{ traitAction.action_name }}</div>
                  <div class="my-[5px]">{{ traitAction.description }}</div>

                  <div
                    v-if="traitAction.action_uses !== 0"
                    class="flex items-center"
                  >
                    <div class="inline-flex items-center font-bold mr-[5px]">
                      <spell-slot-indicator
                        v-for="use in traitAction.action_uses"
                        :key="`trait-action-${traitAction.action_name}-slot-indicator-${use}`"
                      />
                    </div>
                    <div class="text-gray-light mr-[5px]">/</div>
                    <div>{{ traitAction.action_reset }}</div>
                  </div>
                </div>
              </div>

              <!-- Unarmed Strike: Details -->
              <div class="mb-[1.0625rem] text-white text-[12px]">
                <div class="mb-[13px]">
                  <div class="font-bold text-white leading-[1.2] text-[13px]">Unarmed Strike</div>
                  <div class="flex flex-col gap-[.25rem]">
                    <div>
                      You make a melee attack that involves using your body to deal one of the following effects:
                    </div>
                    <div class="flex gap-[.25rem]">
                      <div class="font-bold">Damage:</div>
                      <div>
                        You make an attack roll against the creature, and on a hit, you deal
                        <tooltip
                          class="cursor-default"
                          text="1 + STR"
                        >
                          <span class="font-bold underline">
                            {{ unarmedDamage }}
                          </span>
                        </tooltip>
                        Bludgeoning damage.
                      </div>
                    </div>
                    <div class="flex gap-[.25rem]">
                      <div class="font-bold">Grapple:</div>
                      <div>The target must succeed on a Str./Dex. (it chooses which) saving throw (DC =
                        <tooltip
                          class="cursor-default"
                          text="8 + Prof. Bonus + STR"
                        >
                          <span class="font-bold underline">
                            {{ unarmedSaveDC }}
                          </span>
                        </tooltip>
                        ) or it has the Grappled condition.
                      </div>
                    </div>
                    <div class="flex gap-[.25rem]">
                      <div class="font-bold">Shove:</div>
                      <div>
                        The target must succeed on a Str./Dex. (it chooses which) saving throw (DC =
                        <tooltip
                          class="cursor-default"
                          text="8 + Prof. Bonus + STR"
                        >
                          <span class="font-bold underline">
                            {{ unarmedSaveDC }}
                          </span>
                        </tooltip>
                        ) or you can either push it 5 ft. away or cause it to have the Prone condition.
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Bonus Actions -->
          <div class="mb-[1.5625rem]">
            <div class="content-section__header">
              <div class="content-section__header-text">
                Bonus Actions
              </div>
            </div>

            <!-- Actions in Combat -->
            <div class="mb-[1.0625rem] text-white">
              <div class="font-bold text-white leading-[1.2] text-[13px]">Actions in Combat</div>
              <div class="text-white border-l-[3px] border-fighter ml-[4px] my-[5px] py-[5px] pl-[8px]">
                <div class="flex flex-wrap">
                  Two-Weapon Fighting
                </div>
              </div>
            </div>
          </div>

          <!-- Reactions -->
          <div class="mb-[1.5625rem]">
            <div class="content-section__header">
              <div class="content-section__header-text">
                Reactions
              </div>
            </div>

            <!-- Actions in Combat -->
            <div class="mb-[1.0625rem] text-white">
              <div class="font-bold text-white leading-[1.2] text-[13px]">Actions in Combat</div>
              <div class="text-white border-l-[3px] border-fighter ml-[4px] my-[5px] py-[5px] pl-[8px]">
                <div class="flex flex-wrap">
                  Opportunity Attack
                </div>
              </div>
            </div>
          </div>

          <!-- Other -->
          <div class="mb-[1.5625rem]">
            <div class="content-section__header">
              <div class="content-section__header-text">
                Other
              </div>
            </div>

            <!-- Actions in Combat -->
            <div class="mb-[1.0625rem] text-white">
              <div class="font-bold text-white leading-[1.2] text-[13px]">Actions in Combat</div>
              <div class="text-white border-l-[3px] border-fighter ml-[4px] my-[5px] py-[5px] pl-[8px]">
                <div class="flex flex-wrap">
                  Interact with an Object
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import {modifierFromLevel, proficiencyBonusFromLevel} from "@/utils/characterSheet";
  import ActionDisplay from "@/views/characters/sections/sheet/subsections/primary/actions/ActionDisplay.vue";
  import Tooltip from "@/components/ui/Tooltip.vue";
  import SpellSlotIndicator from "@/views/characters/sections/sheet/subsections/primary/spells/SpellSlotIndicator.vue";

  export default {
    name: "Actions",
    components: {SpellSlotIndicator, Tooltip, ActionDisplay},
    props: {
      character: {
        type: Object,
        required: true
      }
    },
    computed: {
      actions() {
        const actions = []

        for (const item of this.$props.character.inventory) {
          if (item.location !== 'Equipment' || item.item.type !== 'weapon' || !item.equipped) continue

          let isProficient = false
          const weaponProficiencies = JSON.parse(item.item.weapon.proficiencies)
          for (const weaponProficiency of weaponProficiencies) {
            if (this.$props.character.proficiencies.weapons.includes(weaponProficiency)) {
              isProficient = true
              break;
            }
          }

          let abilityModifier = 0
          switch (item.item.weapon.ability) {
          case "STR":
            abilityModifier = modifierFromLevel(this.$props.character.strength)
            break;
          case "DEX":
            abilityModifier = modifierFromLevel(this.$props.character.dexterity)
            break;
          }

          const hitModifier = abilityModifier + (proficiencyBonusFromLevel(this.$props.character.level) * isProficient) + item.item.weapon.bonus
          const damageModifier = abilityModifier + item.item.weapon.bonus

          actions.push({
            name: item.item.name,
            rarity: item.item.rarity,
            type: item.item.weapon.weapon_type,
            distance: item.item.weapon.distance,
            alt_distance: item.item.weapon.alt_distance,
            hit_modifier: hitModifier,
            damage: `${item.item.weapon.damage}${damageModifier >= 0 ? '+' : '-'}${Math.abs(damageModifier)}`,
            alt_damage: item.item.weapon.alt_damage ? `${item.item.weapon.damage}${damageModifier >= 0 ? '+' : '-'}${Math.abs(damageModifier)}` : null,
            damage_type: item.item.weapon.damage_type,
            notes: item.item.notes
          })
        }

        if (this.$props.character.spells) {
          for (const spell of this.$props.character.spells) {
            if (spell.level !== 0 || !spell.is_attack) continue

            let abilityModifier = 0
            switch (this.$props.character.class.spellcasting_ability) {
            case 'Intelligence':
              abilityModifier = modifierFromLevel(this.$props.character.intelligence)
              break;
            case 'Wisdom':
              abilityModifier = modifierFromLevel(this.$props.character.wisdom)
              break;
            case 'Charisma':
              abilityModifier = modifierFromLevel(this.$props.character.charisma)
              break;
            }

            const hitModifier = abilityModifier + proficiencyBonusFromLevel(this.$props.character.level)

            actions.push({
              name: spell.name,
              rarity: "Common",
              type: `${spell.school} Cantrip`,
              distance: spell.range.split(' ')[0],
              hit_modifier: hitModifier,
              damage: spell.damage,
              damage_type: spell.damage_type,
              notes: spell.notes,
            })
          }
        }


        actions.push({
          name: "Unarmed Strike",
          type: "Melee Attack",
          distance: 5,
          ability: "STR",
          damage: Math.max(0, modifierFromLevel(this.$props.character.strength) + 1),
          damage_type: "Bludgeoning",
          rarity: "Common",
          hit_modifier: modifierFromLevel(this.$props.character.strength) + proficiencyBonusFromLevel(this.$props.character.level)
        })

        return actions
      },
      unarmedDamage() {
        return Math.max(0, 1 + modifierFromLevel(this.$props.character.strength))
      },
      unarmedSaveDC() {
        return 8 + proficiencyBonusFromLevel(this.$props.character.level) + modifierFromLevel(this.$props.character.strength)
      },
      traitActions() {
        const traitActions = []

        for (const trait of this.$props.character.race.traits) {
          if (!trait.options) continue

          for (const option of trait.options) {
            if (!option.action_name) continue
            if (option.action_type !== 'Action') continue

            traitActions.push(option)
          }
        }

        return traitActions
      }
    },
  }
</script>

<style scoped>

</style>