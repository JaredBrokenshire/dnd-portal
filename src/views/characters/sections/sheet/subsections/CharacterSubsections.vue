<template>
  <div class="h-[770px] relative">
    <saving-throws :character="$props.character" />

    <senses :character="$props.character" />

    <proficiency-groups :character="$props.character" />

    <skills :character="$props.character" />

    <combat :character="$props.character" />

    <primary
      :character="$props.character"
      @update="$emit('update')"
    />
  </div>
</template>

<script>

  import SavingThrows from "@/views/characters/sections/sheet/subsections/SavingThrows.vue";
  import Senses from "@/views/characters/sections/sheet/subsections/Senses.vue";
  import ProficiencyGroups from "@/views/characters/sections/sheet/subsections/ProficiencyGroups.vue";
  import Skills from "@/views/characters/sections/sheet/subsections/Skills.vue";
  import Combat from "@/views/characters/sections/sheet/subsections/combat/Combat.vue";
  import Primary from "@/views/characters/sections/sheet/subsections/primary/Primary.vue";

  export default {
    name: "CharacterSubsections",
    components: {Primary, Combat, Skills, ProficiencyGroups, Senses, SavingThrows},
    props: {
      character: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style scoped>

</style>