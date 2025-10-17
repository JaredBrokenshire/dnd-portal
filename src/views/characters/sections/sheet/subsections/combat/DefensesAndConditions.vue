<template>
  <section class="min-w-0 pl-[5px] grow shrink basis-0">
    <div class="flex relative h-[95px] p-[10px] text-[13px]">
      <div class="character-sheet-section-bg">
        <svg viewBox="0 0 408 95">
          <polygon
            fill="#10161ADB"
            points="8 93 401 93 401 2 8 2 8 93"
          />
          <path
            d="M408,6.39V4.47h-6.14V0h-2.68s-1.06,1.54-3.91,1.54H12.73C9.88,1.54,8.82,0,8.82,0H6.14V4.47H0V6.39c2.53,0,2.67,4.14,2.67,4.14V81.91S2.53,86,0,86v2H6.14v7H8.82V3.31H399.18V91.69H8.82V95s1.06-1.54,3.91-1.54H395.27c2.84,0,3.9,1.52,3.91,1.54h2.68V88H408V86c-2.53,0-2.67-4.13-2.67-4.13V10.53S405.47,6.39,408,6.39ZM6.27,81.91H4.14V12.12H6.27Zm397.79.48h-2.12V12.61h2.12Z"
            fill="#972e2e"
          />
        </svg>
      </div>

      <h2 class="sr-only">Defenses and Conditions</h2>

      <defenses :character="$props.character" />

      <conditions :character="$props.character" />
    </div>
  </section>
</template>

<script>
  import Defenses from "@/views/characters/sections/sheet/subsections/combat/Defenses.vue";
  import Conditions from "@/views/characters/sections/sheet/subsections/combat/Conditions.vue";

  export default {
    name: "DefensesAndConditions",
    components: {Conditions, Defenses},
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