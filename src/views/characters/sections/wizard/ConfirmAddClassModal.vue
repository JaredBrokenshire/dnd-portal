<template>
  <div class="flex flex-col gap-4">
    <div class="flex justify-between gap-4">
      <div class="flex-grow">
        <h1 class="text-2xl font-bold">{{ $props.classType.name }}</h1>
        <div>{{ $props.classType.short_description }}</div>
      </div>
      <img
        :src="logoURL"
        alt=""
        class="w-[100px] h-[100px] object-contain rounded"
      >
    </div>

    <div class="">
      <div><strong>Primary Ability: </strong> {{ $props.classType.primary_ability }}</div>
      <div><strong>Hit Point Die: </strong> D{{ $props.classType.hit_point_die_value }}</div>
      <div><strong>Saves: </strong> {{ saves }}</div>
    </div>

    <div class="w-full py-2 border-y border-gray-light cursor-pointer transition-all hover:bg-link-light">
      <router-link
        :to="{name: 'class-details', params: {id: $props.classType.id}}"
        class="w-100 text-link flex items-center gap-1 px-2"
      >
        <div>
          {{ $props.classType.name }} Details Page
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
    name: "ConfirmAddClassModal",
    components: {CButton},
    props: {
      classType: {
        type: Object,
        required: true
      }
    },
    computed: {
      logoURL() {
        if (this.$props.classType.logo) {
          return `${HelperService.getApiUrl()}/files/${
            this.$props.classType.logo.file_location
          }/${this.$props.classType.logo.filename}`;
        }

        return "";
      },
      saves() {
        return JSON.parse(this.$props.classType.saves).join(" & ");
      }
    },
  }
</script>

<style scoped>

</style>