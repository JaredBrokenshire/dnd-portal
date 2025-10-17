<template>
  <div class="flex flex-col gap-4">
    <div class="flex justify-between gap-4">
      <div class="flex-grow">
        <h1 class="text-2xl font-bold">{{ $props.race.name }}</h1>
        <div>{{ $props.race.short_description }}</div>
      </div>
      <img
        :src="logoURL"
        alt=""
        class="w-[100px] h-[100px] object-contain rounded"
      >
    </div>

    <div class="">
      <div><strong>Creature Type: </strong> {{ $props.race.creature_type }}</div>
      <div><strong>Size: </strong> {{ $props.race.size }}</div>
      <div><strong>Base Speed: </strong> {{ $props.race.base_speed }}</div>
    </div>

    <div class="w-full py-2 border-y border-gray-light cursor-pointer transition-all hover:bg-link-light">
      <router-link
        :to="{name: 'race-details', params: {id: $props.race.id}}"
        class="w-100 text-link flex items-center gap-1 px-2"
      >
        <div>
          {{ $props.race.name }} Details Page
        </div>
        <feather-icon
          icon="ChevronRightIcon"
          size="18"
        />
      </router-link>
    </div>

    <div class="flex gap-4">
      <c-button
        variant="gray"
        @click="$emit('close')"
      >
        Cancel
      </c-button>
      <c-button
        variant="primary"
        @click="$emit('confirm')"
      >
        Confirm
      </c-button>
    </div>
  </div>
</template>

<script>
  import HelperService from "@/services/HelperService";
  import CButton from "@/components/ui/CustomButton.vue";

  export default {
    name: "ConfirmAddRaceModal",
    components: {CButton},
    props: {
      race: {
        type: Object,
        required: true
      }
    },
    computed: {
      logoURL() {
        if (this.$props.race.logo) {
          return `${HelperService.getApiUrl()}/files/${
            this.$props.race.logo.file_location
          }/${this.$props.race.logo.filename}`;
        }

        return "";
      },
    },
  }
</script>

<style scoped>

</style>