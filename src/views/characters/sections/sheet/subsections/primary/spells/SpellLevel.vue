<template>
  <div v-if="$props.spells.length > 0">
    <div class="border-b border-[#c5313166] flex items-center pb-0 mb-[4px]">
      <div class="text-fighter text-[13px] font-bold grow shrink basis-0 min-w-0 uppercase">
        {{ $props.title }}
      </div>

      <div v-if="$props.spellSlots.available > 0">
        <div class="flex items-center w-full">
          <div class="flex flex-wrap">
            <spell-slot-indicator
              v-for="spellSlot in $props.spellSlots.available"
              :key="`${$props.title}-spell-slot-indicator-${spellSlot}`"
              :used="spellSlot <= $props.spellSlots.used"
              @toggle-spell-slot-used="updateUsedSpellSlots"
            />
          </div>
          <div class="text-white font-extrabold uppercase ml-[5px] text-[12px]">Slots</div>
        </div>
      </div>
    </div>

    <div>
      <div class="text-gray-light flex">
        <div class="spell-level__col-name w-[35px]" />
        <div class="spell-level__col-name w-[135px]">Name</div>
        <div class="spell-level__col-name w-[35px]">Time</div>
        <div class="spell-level__col-name w-[55px]">Range</div>
        <div class="spell-level__col-name w-[45px]">Hit / DC</div>
        <div class="spell-level__col-name w-[85px]">Effect</div>
        <div class="spell-level__col-name grow shrink basis-0">Notes</div>
      </div>

      <div class="pb-[8px]">
        <spell
          v-for="spell in $props.spells"
          :key="`spell-${$props.title}-${spell.name}`"
          :attack-modifier="$props.attackModifier"
          :has-available-spell-slots="spellSlots.available > spellSlots.used || spellSlots.available === 0"
          :save-dc="$props.saveDc"
          :spell="spell"
          @cast="updateUsedSpellSlots(true)"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import Spell from "@/views/characters/sections/sheet/subsections/primary/spells/Spell.vue";
  import SpellSlotIndicator from "@/views/characters/sections/sheet/subsections/primary/spells/SpellSlotIndicator.vue";
  import CharacterSpellSlotService from "@/services/CharacterSpellSlotService";
  import HelperService from "@/services/HelperService";

  export default {
    name: "SpellLevel",
    components: {SpellSlotIndicator, Spell},
    props: {
      characterId: {
        type: Number,
        required: true,
      },
      title: {
        type: String,
        required: true
      },
      spells: {
        type: Array,
        required: true,
      },
      attackModifier: {
        type: Number,
        required: true,
      },
      saveDc: {
        type: Number,
        required: true,
      },
      spellSlots: {
        type: Object,
        default: () => {
          return {available: 0, used: 0}
        },
      }
    },
    data() {
      return {
        loading: false,
      }
    },
    computed: {
      spellLevel() {
        switch (this.$props.title) {
        case "Cantrip":
          return 0
        case "1st Level":
          return 1
        case "2nd Level":
          return 2
        case "3rd Level":
          return 3
        case "4th Level":
          return 4
        case "5th Level":
          return 5
        case "6th Level":
          return 6
        case "7th Level":
          return 7
        case "8th Level":
          return 8
        case "9th Level":
          return 9
        default:
          return 0
        }
      }
    },
    methods: {
      async updateUsedSpellSlots(used) {
        if (this.loading) return;

        this.loading = true
        try {
          const dto = {
            spell_slots_used: this.$props.spellSlots.used + (used ? 1 : -1)
          }

          if (dto.spell_slots_used < 0 || dto.spell_slots_used > this.$props.spellSlots.available) return;

          await CharacterSpellSlotService.update(this.$props.characterId, this.spellLevel, dto)
          this.$emit('update')
        } catch (err) {
          const res = err.response;
          let errorText = "Could not update character spell slots, please refresh and try again";

          if (res && res.data.error) {
            errorText = res.data.error;
          }

          HelperService.errorToast(this.$toast, err, errorText)
        } finally {
          this.loading = false;
        }
      }
    }
  }
</script>

<style scoped>
</style>