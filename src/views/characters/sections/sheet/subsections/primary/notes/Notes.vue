<template>
  <div class="h-full max-h-full min-h-0">
    <section class="w-full h-[600px] max-h-full flex flex-col">
      <h2 class="sr-only">Notes</h2>

      <div class="overflow-y-auto text-[14px]">
        <!-- Organisations -->
        <section class="mb-4">
          <div class="content-section__header">
            <div class="content-section__header-text">Organisations</div>
          </div>
          <div
            v-if="organisationsArray.length === 0"
            class="text-gray-light"
          >
            No Organisations
          </div>
          <div v-else>
            <div
              v-for="(organisation, index) in organisationsArray"
              :key="`organisation-${index}`"
              class="text-white"
            >
              - {{ organisation }}
            </div>
          </div>
        </section>

        <!-- Allies -->
        <section class="mb-4">
          <div class="content-section__header">
            <div class="content-section__header-text">Allies</div>
          </div>
          <div
            v-if="alliesArray.length === 0"
            class="text-gray-light"
          >
            No Allies
          </div>
          <div v-else>
            <div
              v-for="(ally, index) in alliesArray"
              :key="`ally-${index}`"
              class="text-white"
            >
              - {{ ally }}
            </div>
          </div>
        </section>

        <!-- Enemies -->
        <section class="mb-4">
          <div class="content-section__header">
            <div class="content-section__header-text">Enemies</div>
          </div>
          <div
            v-if="enemiesArray.length === 0"
            class="text-gray-light"
          >
            No Enemies
          </div>
          <div v-else>
            <div
              v-for="(enemy, index) in enemiesArray"
              :key="`enemy-${index}`"
              class="text-white"
            >
              - {{ enemy }}
            </div>
          </div>
        </section>

        <!-- Backstory -->
        <section class="mb-4">
          <div class="content-section__header">
            <div class="content-section__header-text">Backstory</div>
          </div>
          <div
            v-if="$props.character.backstory.length === 0"
            class="text-gray-light"
          >
            No Backstory.
          </div>
          <div v-else>
            <div class="text-white whitespace-pre-wrap">{{ $props.character.backstory.replace(' - ', ' - ') }}</div>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: "Notes",
    props: {
      character: {
        type: Object,
        required: true
      },
    },
    computed: {
      organisationsArray() {
        try {
          return JSON.parse(this.$props.character.organisations)
        } catch (_) {
          return []
        }
      },
      alliesArray() {
        try {
          return JSON.parse(this.$props.character.allies)
        } catch (_) {
          return []
        }
      },
      enemiesArray() {
        try {
          return JSON.parse(this.$props.character.enemies)
        } catch (_) {
          return []
        }
      },
    },
  }
</script>