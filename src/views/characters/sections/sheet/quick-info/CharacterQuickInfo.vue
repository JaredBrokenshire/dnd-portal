<template>
  <div class="w-full mt-[-8px] mb-[10px] flex-between">
    <abilities :character="character" />

    <proficiency-bonus :level="character.level" />

    <walking-speed :value="character.race.base_speed" />

    <inspiration
      :character="character"
      @update="(v) => $emit('update', v)"
    />

    <hit-points
      :character="character"
      @update="(v) => $emit('update', v)"
    />
  </div>
</template>

<script>
  import Abilities from "@/views/characters/sections/sheet/quick-info/Abilities.vue";
  import Inspiration from "@/views/characters/sections/sheet/quick-info/Inspiration.vue";
  import WalkingSpeed from "@/views/characters/sections/sheet/quick-info/WalkingSpeed.vue";
  import ProficiencyBonus from "@/views/characters/sections/sheet/quick-info/ProficiencyBonus.vue";
  import HitPoints from "@/views/characters/sections/sheet/quick-info/HitPoints.vue";

  export default {
    name: "CharacterQuickInfo",
    components: {HitPoints, Inspiration, WalkingSpeed, ProficiencyBonus, Abilities},
    props: {
      character: {
        type: Object,
        required: true,
      }
    }
  }
</script>

<style scoped>

</style>