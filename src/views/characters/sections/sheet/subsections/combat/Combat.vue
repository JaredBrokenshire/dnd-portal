<template>
  <div class="absolute top-0 right-0">
    <div class="w-[623px]">
      <div class="flex">
        <initiative :character="$props.character" />

        <armour-class :character="$props.character" />

        <defenses-and-conditions :character="$props.character" />
      </div>
    </div>
  </div>
</template>

<script>

  import Initiative from "@/views/characters/sections/sheet/subsections/combat/Initiative.vue";
  import ArmourClass from "@/views/characters/sections/sheet/subsections/combat/ArmourClass.vue";
  import DefensesAndConditions from "@/views/characters/sections/sheet/subsections/combat/DefensesAndConditions.vue";

  export default {
    name: "Combat",
    components: {DefensesAndConditions, ArmourClass, Initiative},
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