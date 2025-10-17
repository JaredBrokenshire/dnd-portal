<template>
  <router-link :to="{name: 'class-details', params: {id: classType.id}}">
    <card
      class="transition-all cursor-pointer hover:scale-[1.05] relative h-full"
    >
      <div class="flex gap-4 items-center">
        <img
          :alt="`${classType.name} Logo`"
          :src="logoURL"
          class="w-[50px] lg:w-[100px] aspect-square rounded-xl object-contain"
        >

        <div class="flex flex-col">
          <div class="text-2xl font-bold">{{ classType.name }}</div>
          <div class="line-clamp-3">{{ classType.short_description }}</div>
        </div>
      </div>
    </card>
  </router-link>
</template>

<script>
  import Card from "@/components/ui/Card.vue";
  import HelperService from "@/services/HelperService";

  export default {
    name: "ClassCard",
    components: {Card},
    props: {
      classType: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        logoURL: "",
      }
    },
    mounted() {
      if (this.$props.classType.logo) {
        this.logoURL = `${HelperService.getApiUrl()}/files/${
          this.$props.classType.logo.file_location
        }/${this.$props.classType.logo.filename}`;
      }
    }
  }
</script>

<style scoped>

</style>