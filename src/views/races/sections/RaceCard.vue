<template>
  <router-link :to="{name: 'race-details', params: {id: race.id}}">
    <card
      class="transition-all cursor-pointer hover:scale-[1.05] relative h-full"
    >
      <div class="flex gap-4 items-center">
        <img
          :alt="`${race.name} Logo`"
          :src="logoURL"
          class="w-[50px] lg:w-[100px] aspect-square rounded-xl object-cover"
        >

        <div class="flex flex-col">
          <div class="text-2xl font-bold">{{ race.name }}</div>
          <div class="line-clamp-3">{{ race.short_description }}</div>
        </div>
      </div>
    </card>
  </router-link>
</template>

<script>
  import Card from "@/components/ui/Card.vue";
  import HelperService from "@/services/HelperService";

  export default {
    name: "RaceCard",
    components: {Card},
    props: {
      race: {
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
      if (this.$props.race.logo) {
        this.logoURL = `${HelperService.getApiUrl()}/files/${
          this.$props.race.logo.file_location
        }/${this.$props.race.logo.filename}`;
      }
    }
  }
</script>

<style scoped>

</style>