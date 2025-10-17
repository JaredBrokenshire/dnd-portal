<template>
  <div class="absolute left-0 top-[427px]">
    <section class="relative w-[278px] h-[338px] py-[13px] px-[20px]">
      <div class="character-sheet-section-bg">
        <svg viewBox="0 0 278 338">
          <polygon
            fill="#10161ADB"
            points="8 336 271 336 271 2 8 2 8 336"
          />
          <path
            d="M278,6.39V4.47h-6.14V0h-2.68s-1.06,1.54-3.91,1.54H12.73C9.88,1.54,8.82,0,8.82,0H6.14V4.47H0V6.39c2.53,0,2.67,4.14,2.67,4.14V324.91S2.53,329,0,329V331H6.14v7H8.82V3.31H269.18V334.69H8.82V338s1.06-1.54,3.91-1.54H265.27c2.84,0,3.9,1.52,3.91,1.54h2.68v-7H278V329c-2.53,0-2.67-4.13-2.67-4.13V10.53s.14-4.14,2.67-4.14ZM6.27,324.91H4.14V12.12H6.27Zm267.79.48h-2.12V12.61h2.12Z"
            fill="#972e2e"
          />
        </svg>
      </div>

      <h2 class="sr-only">Proficiencies & Training</h2>

      <div class="relative overflow-y-auto cursor-pointer h-[300px]">
        <!-- Armour -->
        <div class="border-b border-[#c5313166] mb-2 pb-2">
          <div class="font-bold uppercase text-[14px] text-gray-light">Armour</div>
          <div class="text-white text-[13px]">
            {{ $props.character.proficiencies.armour.slice().sort().join(', ') }}
          </div>
        </div>

        <!-- Weapon -->
        <div class="border-b border-[#c5313166] mb-2 pb-2">
          <div class="font-bold uppercase text-[14px] text-gray-light">Weapons</div>
          <div class="text-white text-[13px]">
            {{ $props.character.proficiencies.weapons.slice().sort().join(', ') }}
          </div>
        </div>

        <!-- Tools -->
        <div class="border-b border-[#c5313166] mb-2 pb-2">
          <div class="font-bold uppercase text-[14px] text-gray-light">Tools</div>
          <div class="text-white text-[13px]">{{ $props.character.proficiencies.tools.slice().sort().join(', ') }}</div>
        </div>

        <!-- Languages -->
        <div class="border-b border-[#c5313166] mb-2 pb-2">
          <div class="font-bold uppercase text-[14px] text-gray-light">Languages</div>
          <div class="text-white text-[13px]">
            {{ $props.character.proficiencies.languages.slice().sort().join(', ') }}
          </div>
        </div>
      </div>
    </section>

    <div class="subsection-footer">
      <span> Proficiencies & Training </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ProficiencyGroups",
    props: {
      character: {
        type: Object,
        required: true
      }
    },
  }
</script>

<style scoped>

</style>