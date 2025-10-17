<template>
  <div class="flex flex-col gap-8">
    <card title="Settings">
      <div class="flex flex-col gap-4 my-4">
        <!-- Advancement Type -->
        <section>
          <h5 class="text-lg font-bold">Advancement Type</h5>
          <div class="text-sm text-gray">Story-based character progression / XP-based character progression</div>
          <dropdown
            v-model="advancementType"
            :options="advancementTypeOptions"
            class="xl:w-1/2"
            @input="update"
          />
        </section>

        <!-- Hit Point Type -->
        <section>
          <h5 class="text-lg font-bold">Hit Point Type</h5>
          <div class="text-sm text-gray">When leveling up, increase hit points by the fixed value for your chosen
            class
            or manually enter a rolled value
          </div>
          <dropdown
            v-model="hitPointType"
            :options="hitPointTypeOptions"
            class="xl:w-1/2"
            @input="update"
          />
        </section>
      </div>
    </card>

  </div>
</template>

<script>
  import Dropdown from "@/components/ui/input/Dropdown.vue";
  import Card from "@/components/ui/Card.vue";

  export default {
    name: 'WizardStepGeneral',
    components: {Card, Dropdown},
    data() {
      return {
        advancementType: this.$attrs.advancement_type,
        hitPointType: this.$attrs.hit_point_type,
        advancementTypeOptions: [
          {label: "Milestone", value: "Milestone"},
          {label: "XP", value: "XP"},
        ],
        hitPointTypeOptions: [
          {label: "Fixed", value: "Fixed"},
          {label: "Manual", value: "Manual"},
        ],
      }
    },
    mounted() {
      if (this.$attrs.profile_picture) {
        const reader = new FileReader();
        reader.onload = e => {
          this.profilePicture = e.target.result;
        };
        reader.readAsDataURL(this.profilePicture);
      }
    },
    methods: {
      update() {
        this.$emit('update', {
          advancement_type: this.advancementType,
          hit_point_type: this.hitPointType,
        })
      },
    }
  }
</script>

<style scoped>

</style>