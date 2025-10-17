<template>
  <div class="h-[5.563rem] w-[19.813rem] text-center relative cursor-pointer">
    <!-- Background Image -->
    <div class="character-sheet-section-bg">
      <svg viewBox="0 0 317 88.98">
        <path
          d="M9.35,8,7,10.29a38.78,38.78,0,0,1,.35,6.19l.85,57c0,4.29.29,6.67,3.67,9.37l3.76,2.46c2.56,2,19.53,1.87,9.58,1.87l271.48-.68c3.29,0,5.19-2.23,7.75-4.28l3-2.64c3.38-2.7,1.7-2.4,1.7-6.69L310,17.06c0-4.28-.76-8-4.13-10.71h0a18.9,18.9,0,0,0-10.39-3.64L19.59,2.48A36.38,36.38,0,0,0,9.35,8Z"
          fill="#10161ADB"
        />
        <path
          d="M305.89,0H11.1L0,9V79.93l11.1,9H305.89l11.11-9V9ZM294.34,86.5H22.6A24.06,24.06,0,0,1,8.69,78.78V10.24a24.36,24.36,0,0,1,14-7.76H294.4a24.09,24.09,0,0,1,13.91,7.72V78.73a24.36,24.36,0,0,1-14,7.77ZM3.05,21.16a27.77,27.77,0,0,1,4-8.79V76.63c-.37-.53-.76-1-1.09-1.62a27.78,27.78,0,0,1-2.89-7.1ZM310,12.34c.37.54.76,1.05,1.09,1.62A28,28,0,0,1,314,21.07V67.81a27.91,27.91,0,0,1-4,8.8Zm4-2.27v7a26.94,26.94,0,0,0-4-6.77v-.13h-.1a24.53,24.53,0,0,0-11.24-7.68h6ZM12.37,2.48h6A24.53,24.53,0,0,0,7.13,10.16H7v.13a26.94,26.94,0,0,0-4,6.77v-7ZM3.05,78.91v-7a26.81,26.81,0,0,0,4,6.78v.13h.1A24.61,24.61,0,0,0,18.37,86.5h-6ZM304.63,86.5h-6a24.61,24.61,0,0,0,11.24-7.68h.1v-.13a26.81,26.81,0,0,0,4-6.78v7Z"
          fill="#972e2e"
        />
      </svg>
    </div>

    <div class="flex py-[.5rem] pr-[.25rem] pl-[1rem] relative h-full">
      <h1 class="absolute uppercase text-white font-extrabold text-[.75rem] text-center w-full left-0 bottom-[.25rem]">
        Hit Points
      </h1>

      <div class="flex flex-col my-auto gap-[.188rem] text-[13px] w-[5rem]">
        <button
          class="border border-fighter rounded-xs uppercase text-[.55rem] text-green-400 leading-1 py-[.313rem] px-[.625rem] hover:bg-[#972e2e40] cursor-pointer transition-200"
          @click="() => updateHealth($props.character.current_hit_points + parseInt(healthValue))"
        >
          Heal
        </button>
        <input
          v-model="healthValue"
          class="border border-fighter bg-black text-white rounded-xs text-center w-full p-[2px] focus:ring-0 focus:outline-0"
          min="0"
          type="number"
        >
        <button
          class="border border-fighter rounded-xs uppercase text-[.55rem] text-red-500 leading-1 py-[.313rem] px-[.625rem] hover:bg-[#972e2e40] cursor-pointer transition-200"
          @click="() => updateHealth(Math.max($props.character.current_hit_points - parseInt(healthValue), 0))"
        >
          Damage
        </button>
      </div>

      <div class="flex justify-evenly w-full">
        <div class="flex gap-[.75rem]">
          <div class="sticky flex flex-col items-center">
            <div class="uppercase text-gray-light text-[.625rem] h-[1em] mb-[.375rem] font-extrabold">
              Current
            </div>
            <div class="text-white p-0 text-[1.625rem] leading-[1.2]">
              {{ $props.character.current_hit_points }}
            </div>
          </div>
          <div class="flex flex-col items-center sticky">
            <div class="mb-[.375rem] min-h-[.813rem]" />
            <span class="text-gray-light text-[1.625rem] leading-[1.2]">/</span>
          </div>

          <div class="sticky flex flex-col items-center">
            <div class="uppercase text-gray-light text-[.625rem] h-[1em] mb-[.375rem] font-extrabold">
              Max
            </div>
            <div class="text-white p-0 text-[1.625rem] leading-[1.2]">
              {{ $props.character.max_hit_points }}
            </div>
          </div>
        </div>

        <div class="w-[25%] flex flex-col sticky">
          <div class="uppercase text-gray-light text-[.625rem] h-[1em] mb-[.375rem] font-extrabold">
            Temp
          </div>
          <div
            v-if="$props.character.temp_hit_points > 0"
            class="text-white p-0 text-[1.625rem] leading-[1.2]"
          >
            {{ $props.character.temp_hit_points }}
          </div>
          <div
            v-else
            class="text-gray-light p-0 text-[1.625rem] leading-[1.2]"
          >
            --
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import HelperService from "@/services/HelperService";
  import CharacterHealthService from "@/services/CharacterHealthService";

  export default {
    name: "HitPoints",
    props: {
      character: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        healthValue: "",
        loading: false,
      }
    },
    methods: {
      async updateHealth(newHitPoints) {
        this.loading = true
        try {
          const dto = {
            current_hit_points: newHitPoints,
          }
          const res = await CharacterHealthService.update(this.$props.character.id, dto)
          this.$emit('update', res.data)
          this.healthValue = ""
        } catch (err) {
          const res = err.response;
          let errorText = "Could not update character health, please refresh and try again";

          if (res && res.data.error) {
            errorText = res.data.error;
          }

          HelperService.errorToast(this.$toast, err, errorText)
        } finally {
          this.loading = false
        }
      }
    }
  }
</script>

<style scoped>

</style>