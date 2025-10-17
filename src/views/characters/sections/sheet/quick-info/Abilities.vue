<template>
  <section class="w-[564px] flex-between">
    <h2 class="sr-only">Ability Scores</h2>
    <ability
      :score="$props.character.strength + abilityModifiers.get('Strength')"
      title="STRENGTH"
    />
    <ability
      :score="$props.character.dexterity + abilityModifiers.get('Dexterity')"
      title="DEXTERITY"
    />
    <ability
      :score="$props.character.constitution + abilityModifiers.get('Constitution')"
      title="CONSTITUTION"
    />
    <ability
      :score="$props.character.intelligence + abilityModifiers.get('Intelligence')"
      title="INTELLIGENCE"
    />
    <ability
      :score="$props.character.wisdom + abilityModifiers.get('Wisdom')"
      title="WISDOM"
    />
    <ability
      :score="$props.character.charisma + abilityModifiers.get('Charisma')"
      title="CHARISMA"
    />
  </section>
</template>

<script>
  import Ability from "@/views/characters/sections/sheet/quick-info/Ability.vue";

  export default {
    name: 'Abilities',
    components: {Ability},
    props: {
      character: {
        type: Object,
        required: true,
      }
    },
    computed: {
      abilityModifiers() {
        const abilityModifiers = new Map([
          ["Strength", 0],
          ["Dexterity", 0],
          ["Constitution", 0],
          ["Intelligence", 0],
          ["Wisdom", 0],
          ["Charisma", 0],
        ])

        for (const inventoryItem of this.$props.character.inventory) {
          if (inventoryItem.equipped) {
            abilityModifiers.set("Strength", abilityModifiers.get("Strength") + inventoryItem.item.strength_bonus)
            abilityModifiers.set("Dexterity", abilityModifiers.get("Dexterity") + inventoryItem.item.dexterity_bonus)
            abilityModifiers.set("Constitution", abilityModifiers.get("Constitution") + inventoryItem.item.constitution_bonus)
            abilityModifiers.set("Intelligence", abilityModifiers.get("Intelligence") + inventoryItem.item.intelligence_bonus)
            abilityModifiers.set("Wisdom", abilityModifiers.get("Wisdom") + inventoryItem.item.wisdom_bonus)
            abilityModifiers.set("Charisma", abilityModifiers.get("Charisma") + inventoryItem.item.charisma_bonus)
          }
        }

        return abilityModifiers
      }
    }
  }
</script>

<style scoped>

</style>