<template>
  <router-link :to="{name: 'subclass-details', params: {classId: subclass.class_id, subclassId: subclass.id}}">
    <card
      class="transition-all cursor-pointer hover:scale-[1.05] relative h-full"
    >
      <div class="flex gap-4 items-center">
        <img
          :alt="`${subclass.name} Logo`"
          :src="logoURL"
          class="w-[50px] lg:w-[100px] aspect-square rounded-xl object-contain"
        >

        <div class="flex flex-col">
          <div class="text-2xl font-bold">{{ subclass.name }}</div>
          <div class="line-clamp-3">{{ subclass.short_description }}</div>
        </div>
      </div>
    </card>
  </router-link>
</template>

<script>
  import Card from "@/components/ui/Card.vue";
  import HelperService from "@/services/HelperService";

  export default {
    name: "SubclassCard",
    components: {Card},
    props: {
      subclass: {
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
      if (this.$props.subclass.logo) {
        this.logoURL = `${HelperService.getApiUrl()}/files/${
          this.$props.subclass.logo.file_location
        }/${this.$props.subclass.logo.filename}`;
      }
    }
  }
</script>

<style scoped>

</style>