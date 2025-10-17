<template>
  <section class="flex flex-col max-h-full w-full h-[600px] text-white">
    <h2 class="sr-only">Background</h2>

    <div class="p-0 flex flex-col bg-transparent min-h-0">
      <div class="overflow-y-auto">
        <div>
          <div class="content-section__header">
            <div
              class="content-section__header-text"
            >
              Background
            </div>
          </div>

          <div v-if="$props.character.background.name !== ''">
            <div class="cursor-pointer">
              <div class="font-bold text-[18px]">{{ $props.character.background.name }}</div>
              <div class="font-bold text-[13px]">Feature: {{ $props.character.background.feature }}</div>
              <div class="text-gray-light text-[13px]">{{ $props.character.background.description }}</div>
            </div>
          </div>

          <div
            v-else
            class="text-gray-light text-center text-[13px]"
          >
            Your character's background feature will display
            in this section once chosen.
          </div>
        </div>
      </div>

      <div class="mt-[30px] border-b border-b-[#c5313166]">
        <div class="content-section__header">
          <div class="content-section__header-text">Characteristics</div>
        </div>

        <div class="grid grid-cols-[25%_20%_20%_20%_15%] cursor-pointer mb-[5px]">
          <characteristic
            :content="$props.character.alignment"
            title="Alignment"
          />
          <characteristic
            :content="$props.character.gender"
            title="Gender"
          />
          <characteristic
            :content="$props.character.eyes"
            title="Eyes"
          />
          <characteristic
            :content="$props.character.size"
            title="Size"
          />
          <characteristic
            :content="$props.character.height"
            title="Height"
          />
          <characteristic
            :content="$props.character.faith"
            title="Faith"
          />
          <characteristic
            :content="$props.character.hair"
            title="Hair"
          />
          <characteristic
            :content="$props.character.skin"
            title="Skin"
          />
          <characteristic
            :content="$props.character.age"
            title="Age"
          />
          <characteristic
            :content="$props.character.weight"
            title="Weight"
          />
        </div>
      </div>
      
      <div class="text-[14px] mt-4">
        <!-- Personality Traits -->
        <div class="mb-1">
          <div class="text-white font-bold">Personality Traits</div>
          <div
            v-for="(trait, index) in JSON.parse($props.character.personality_traits)"
            :key="`personality-trait-${index}`"
          >
            {{ trait }}
          </div>
        </div>

        <!-- Ideals -->
        <div class="mb-1">
          <div class="text-white font-bold">Ideals</div>
          <div
            v-for="(ideal, index) in JSON.parse($props.character.ideals)"
            :key="`ideal-${index}`"
          >
            {{ ideal }}
          </div>
        </div>

        <!-- Bonds -->
        <div class="mb-1">
          <div class="text-white font-bold">Bonds</div>
          <div
            v-for="(bond, index) in JSON.parse($props.character.bonds)"
            :key="`bond-${index}`"
          >
            {{ bond }}
          </div>
        </div>

        <!-- Flaws -->
        <div class="mb-1">
          <div class="text-white font-bold">Flaws</div>
          <div
            v-for="(flaw, index) in JSON.parse($props.character.flaws)"
            :key="`flaw-${index}`"
          >
            {{ flaw }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import Characteristic from "@/views/characters/sections/sheet/subsections/primary/background/Characteristic.vue";

  export default {
    name: "Background",
    components: {Characteristic},
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