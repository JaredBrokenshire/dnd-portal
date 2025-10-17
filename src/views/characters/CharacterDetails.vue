<template>
  <div
    v-if="character"
    class="flex flex-col min-h-[100vh]"
  >
    <character-sheet-header
      :character="character"
      @update="updateCharacter"
    />
    <div class="relative flex-grow character-sheet-body">
      <!-- Background Image -->
      <img
        :src="backgroundImageURL"
        alt=""
        class="absolute w-full h-full top-0 left-0 -z-10 object-cover"
      >

      <div class="mx-auto max-w-[1200px]">
        <character-quick-info
          :character="character"
          @update="updateCharacter"
        />

        <character-subsections
          :character="character"
          @update="getCharacter"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import HelperService from "@/services/HelperService";
  import CharacterService from "@/services/CharacterService";
  import CharacterSheetHeader from "@/views/characters/sections/sheet/CharacterSheetHeader.vue";
  import CharacterQuickInfo from "@/views/characters/sections/sheet/quick-info/CharacterQuickInfo.vue";
  import CharacterSubsections from "@/views/characters/sections/sheet/subsections/CharacterSubsections.vue";

  export default {
    name: "CharacterDetails",
    components: {CharacterSubsections, CharacterQuickInfo, CharacterSheetHeader},
    data() {
      return {
        character: null,
        loading: false,
      }
    },
    computed: {
      backgroundImageURL() {
        if (this.character.class.background_image) {
          return `${HelperService.getApiUrl()}/files/${
            this.character.class.background_image.file_location
          }/${this.character.class.background_image.filename}`;
        }

        return "";
      }
    },
    mounted() {
      this.getCharacter()
    },
    methods: {
      async getCharacter() {
        this.loading = true
        try {
          const res = await CharacterService.get(this.$route.params.id)
          this.character = res.data

          this.convertCharacterProperties()
        } catch (err) {
          const res = err.response;
          let errorText = "Could not get character, please refresh and try again";

          if (res && res.data.error) {
            errorText = res.data.error;
          }

          HelperService.errorToast(this.$toast, err, errorText)
        } finally {
          this.loading = false;
        }
      },
      async updateCharacter(updatedCharacter, profilePicture) {
        this.loading = true;
        try {
          if (profilePicture) {
            await CharacterService.uploadProfilePicture(this.character.id, profilePicture);
          }

          const dto = {
            name: updatedCharacter.name,
            class_id: updatedCharacter.class_id,
            race_id: updatedCharacter.race_id,
            pronouns: updatedCharacter.pronouns,
            level: updatedCharacter.level,
            strength: updatedCharacter.strength,
            dexterity: updatedCharacter.dexterity,
            constitution: updatedCharacter.constitution,
            intelligence: updatedCharacter.intelligence,
            wisdom: updatedCharacter.wisdom,
            charisma: updatedCharacter.charisma,
            advancement_type: updatedCharacter.advancement_type,
            hit_point_type: updatedCharacter.hit_point_type,
          }

          await CharacterService.update(this.character.id, dto);
          let res = await CharacterService.get(this.character.id);
          this.character = res.data

          this.convertCharacterProperties()
        } catch (err) {
          const res = err.response;
          let errorText = "Could not update character, please refresh and try again";

          if (res && res.data.error) {
            errorText = res.data.error;
          }

          HelperService.errorToast(this.$toast, err, errorText)
        } finally {
          this.loading = false;
        }
        this.convertCharacterProperties()
      },
      convertCharacterProperties() {
        const map = new Map()
        for (const profSkill of this.character.proficient_skills) {
          map.set(profSkill.skill, profSkill.proficiency_type)
        }
        this.character.proficient_skills = map

        this.character.proficiencies = JSON.parse(this.character.proficiencies)
      }
    }
  }
</script>

<style>
.character-sheet-body * {
  font-family: "Roboto Condensed,Roboto,Helvetica", sans-serif !important;
  letter-spacing: -0.04rem;
}
</style>