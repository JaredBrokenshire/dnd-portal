<template>
  <div>
    <!-- Wizard Navigation-->
    <div class="w-full flex-between font-bold mb-12">
      <div class="flex items-center gap-4 lg:gap-16">
        <h1 class="text-lg lg:text-4xl">Character Builder</h1>

        <ul class="flex gap-2 lg:gap-8 lg:text-lg">
          <li
            v-for="(_, index) in steps"
            :key="index"
            :class="`${step === index && 'active'}`"
            class="cursor-pointer nav-link"
            @click="step = index"
          >
            {{ stepTitles[index] }}
          </li>
        </ul>
      </div>
      <c-button
        :disabled="loading"
        class="max-w-fit"
        variant="primary"
        @click="createCharacter"
      >
        Create Character
      </c-button>
    </div>

    <div class="md:w-1/2 mx-auto mb-16 flex flex-col gap-4">
      <card title="General Details">
        <div class="mt-4 flex items-center gap-4">
          <section
            class="relative rounded-lg border-2 border-primary cursor-pointer"
          >
            <img
              v-if="profilePictureURL"
              :src="profilePictureURL"
              alt="Profile Picture"
              class="w-[50px] lg:w-[100px] aspect-square object-cover"
            >
            <img
              v-else
              alt="Default Profile Picture"
              src="@/assets/images/pages/characters/default-character-profile.png"
            >
          </section>


          <div class="flex flex-col flex-grow gap-2">
            <section>
              <label class="font-bold">Character Name</label>
              <text-input
                v-model="wizardData.name"
                placeholder="Enter name"
              />
            </section>

            <section>
              <label class="font-bold">Character Pronouns</label>
              <text-input
                v-model="wizardData.pronouns"
                placeholder="Enter pronouns"
              />
            </section>

            <section>
              <label class="font-bold">Profile Picture</label>
              <file-input
                v-model="profilePicture"
                placeholder="Browse files"
              />
            </section>
          </div>

        </div>
      </card>

      <!-- Wizard Body -->
      <component
        :is="currentStepComponent"
        v-bind="wizardData"
        @update="updateData"
      />
    </div>
  </div>
</template>

<script>
  import auth from "@/auth/auth";
  import Card from "@/components/ui/Card.vue";
  import HelperService from "@/services/HelperService";
  import CButton from "@/components/ui/CustomButton.vue";
  import CharacterService from "@/services/CharacterService";
  import TextInput from "@/components/ui/input/TextInput.vue";
  import FileInput from "@/components/ui/input/FileInput.vue";
  import WizardStepRace from "@/views/characters/sections/wizard/WizardStepRace.vue";
  import WizardStepClass from "@/views/characters/sections/wizard/WizardStepClass.vue";
  import WizardStepGeneral from "@/views/characters/sections/wizard/WizardStepGeneral.vue";
  import WizardStepAbilities from "@/views/characters/sections/wizard/WizardStepAbilities.vue";

  export default {
    name: 'CharacterBuilder',
    components: {FileInput, CButton, TextInput, Card},
    data() {
      return {
        step: 0,
        wizardData: {
          name: `${auth.getCurrentUser().username}'s Character`,
          pronouns: "",
          class_id: 0,
          race_id: 0,
          level: 1,

          strength: 10,
          dexterity: 10,
          constitution: 10,
          intelligence: 10,
          wisdom: 10,
          charisma: 10,

          advancement_type: 'Milestone',
          hit_point_type: 'Fixed',
        },
        profilePicture: null,
        steps: [WizardStepGeneral, WizardStepClass, WizardStepRace, WizardStepAbilities],
        stepTitles: ["General", "Class", "Race", "Abilities"],
        loading: false,
      }
    },
    computed: {
      currentStepComponent() {
        return this.steps[this.step];
      },
      profilePictureURL() {
        if (this.profilePicture != null) {
          return URL.createObjectURL(this.profilePicture);
        }
        return ""
      },
    },
    methods: {
      updateData(newData) {
        this.wizardData = {...this.wizardData, ...newData};
      },
      async createCharacter() {
        if (this.wizardData.class_id === 0) {
          HelperService.errorToast(this.$toast, "Error", "You have not selected a class for your character.")
          return;
        }
        if (this.wizardData.race_id === 0) {
          HelperService.errorToast(this.$toast, "Error", "You have not selected a race for your character.")
          return;
        }

        this.loading = true
        try {
          const res = await CharacterService.create(this.wizardData)

          if (this.profilePicture) {
            await CharacterService.uploadProfilePicture(res.data.id, this.profilePicture)
          }

          HelperService.successToast(this.$toast, "Character created successfully");

          await this.$router.push({name: 'character-details', params: {id: res.data.id}});
        } catch (err) {
          const res = err.response;
          let errorText = "Could not create character, please refresh and try again";

          if (res && res.data.error) {
            errorText = res.data.error;
          }

          HelperService.errorToast(this.$toast, err, errorText)
        } finally {
          this.loading = false;
        }
      }
    }
  }
</script>

<style scoped>

</style>