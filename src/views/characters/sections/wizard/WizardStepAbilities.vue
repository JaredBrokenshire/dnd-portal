<template>
  <card class="mb-4">
    <div class="flex-between gap-4">
      <!-- Strength -->
      <div class="flex flex-col w-1/6">
        <h5 class="text-sm font-bold uppercase">STRENGTH</h5>
        <number-input
          v-model="strength"
          :max="30"
          :min="3"
          :show-buttons="false"
          @input="update"
        />
        <div>
          Modifier: {{ getModifier(strength) >= 0 ? '+' : '-' }}
          <span class="text-2xl">{{ Math.abs(getModifier(strength)) }}</span>
        </div>
      </div>

      <!-- Dexterity -->
      <div class="flex flex-col w-1/6">
        <h5 class="text-sm font-bold uppercase">DEXTERITY</h5>
        <number-input
          v-model="dexterity"
          :max="30"
          :min="3"
          :show-buttons="false"
          @input="update"
        />
        <div>
          Modifier: {{ getModifier(dexterity) >= 0 ? '+' : '-' }}
          <span class="text-2xl">{{ Math.abs(getModifier(dexterity)) }}</span>
        </div>
      </div>

      <!-- Constitution -->
      <div class="flex flex-col w-1/6">
        <h5 class="text-sm font-bold uppercase">CONSTITUTION</h5>
        <number-input
          v-model="constitution"
          :max="30"
          :min="3"
          :show-buttons="false"
          @input="update"
        />
        <div>
          Modifier: {{ getModifier(constitution) >= 0 ? '+' : '-' }}
          <span class="text-2xl">{{ Math.abs(getModifier(constitution)) }}</span>
        </div>
      </div>

      <!-- Intelligence -->
      <div class="flex flex-col w-1/6">
        <h5 class="text-sm font-bold uppercase">INTELLIGENCE</h5>
        <number-input
          v-model="intelligence"
          :max="30"
          :min="3"
          :show-buttons="false"
          @input="update"
        />
        <div>
          Modifier: {{ getModifier(intelligence) >= 0 ? '+' : '-' }}
          <span class="text-2xl">{{ Math.abs(getModifier(intelligence)) }}</span>
        </div>
      </div>

      <!-- Wisdom -->
      <div class="flex flex-col w-1/6">
        <h5 class="text-sm font-bold uppercase">WISDOM</h5>
        <number-input
          v-model="wisdom"
          :max="30"
          :min="3"
          :show-buttons="false"
          @input="update"
        />
        <div>
          Modifier: {{ getModifier(wisdom) >= 0 ? '+' : '-' }}
          <span class="text-2xl">{{ Math.abs(getModifier(wisdom)) }}</span>
        </div>
      </div>

      <!-- Charisma -->
      <div class="flex flex-col w-1/6">
        <h5 class="text-sm font-bold uppercase">CHARISMA</h5>
        <number-input
          v-model="charisma"
          :max="30"
          :min="3"
          :show-buttons="false"
          @input="update"
        />
        <div>
          Modifier: {{ getModifier(charisma) >= 0 ? '+' : '-' }}
          <span class="text-2xl">{{ Math.abs(getModifier(charisma)) }}</span>
        </div>
      </div>
    </div>
  </card>
</template>

<script>
  import Card from "@/components/ui/Card.vue";
  import NumberInput from "@/components/ui/input/NumberInput.vue";

  export default {
    name: "WizardStepAbilities",
    components: {NumberInput, Card},
    data() {
      return {
        strength: this.$attrs.strength,
        dexterity: this.$attrs.dexterity,
        constitution: this.$attrs.constitution,
        intelligence: this.$attrs.intelligence,
        wisdom: this.$attrs.wisdom,
        charisma: this.$attrs.charisma,
      }
    },
    methods: {
      update() {
        this.$emit("update", {
          strength: this.strength,
          dexterity: this.dexterity,
          constitution: this.constitution,
          intelligence: this.intelligence,
          wisdom: this.wisdom,
          charisma: this.charisma,
        });
      },
      getModifier(ability) {
        return Math.floor((ability - 10) / 2)
      }
    }
  }
</script>

<style scoped>

</style>