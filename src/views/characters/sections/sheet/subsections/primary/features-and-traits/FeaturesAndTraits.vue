<template>
  <div class="h-full max-h-full min-h-0">
    <section class="flex flex-col max-h-full w-full h-[600px] overflow-y-auto">
      <h2 class="sr-only">Features & Traits</h2>

      <!-- Class Features -->
      <div>
        <div class="content-section__header">
          <div class="content-section__header-text">Class Features</div>
        </div>

        <feature-display
          v-for="(classFeature, index) in sortedClassFeatures"
          :key="`class-feature-${index}`"
          :feature="classFeature.feature"
        />
      </div>

      <!-- Racial Traits -->
      <div>
        <div class="content-section__header">
          <div class="content-section__header-text">Racial Traits</div>
        </div>

        <feature-display
          v-for="(raceTrait, index) in sortedRaceTraits"
          :key="`race-trait-${index}`"
          :feature="raceTrait.feature"
        />
      </div>
    </section>
  </div>
</template>

<script>
  import FeatureDisplay
    from "@/views/characters/sections/sheet/subsections/primary/features-and-traits/FeatureDisplay.vue";

  export default {
    name: "FeaturesAndTraits",
    components: {FeatureDisplay},
    props: {
      character: {
        type: Object,
        required: true
      }
    },
    computed: {
      sortedClassFeatures() {
        let res = this.$props.character.class.features;
        return res.sort((a, b) => {
          return a.priority >= b.priority;
        })
      },
      sortedRaceTraits() {
        let res = this.$props.character.race.traits
        return res.sort((a, b) => {
          return a.priority >= b.priority;
        })
      }
    },
  }
</script>

<style scoped>

</style>