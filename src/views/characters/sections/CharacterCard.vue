<template>
  <router-link :to="{name: 'character-details', params: {id: character.id}}">
    <card
      class="transition-all cursor-pointer hover:scale-[1.05] relative h-full"
    >
      <div class="flex gap-4 items-center">
        <img
          v-if="profilePictureURL"
          :alt="`${character.name} Profile Picture`"
          :src="profilePictureURL"
          class="w-[50px] lg:w-[100px] aspect-square rounded-xl object-contain"
        >
        <img
          v-else
          alt="Default Profile Picture"
          src="@/assets/images/pages/characters/default-character-profile.png"
        >

        <div class="flex flex-col">
          <div class="text-2xl font-bold">{{ character.name }}</div>
          <div>Level {{ character.level }} | {{ character.class.name }} | {{ character.race.name }}</div>
        </div>
      </div>
    </card>
  </router-link>
</template>

<script>
  import Card from "@/components/ui/Card.vue";
  import HelperService from "@/services/HelperService";

  export default {
    name: "CharacterCard",
    components: {Card},
    props: {
      character: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        profilePictureURL: "",
      }
    },
    mounted() {
      if (this.$props.character.profile_picture.id !== 0) {
        this.profilePictureURL = `${HelperService.getApiUrl()}/files/${
          this.$props.character.profile_picture.file_location
        }/${this.$props.character.profile_picture.filename}`;
      }
    }
  }
</script>

<style scoped>

</style>