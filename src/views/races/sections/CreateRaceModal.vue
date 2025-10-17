<template>
  <validation-observer
    ref="observer"
    v-slot="{ handleSubmit, invalid }"
  >
    <form @submit.prevent="handleSubmit(createRace)">
      <div class="flex gap-4 mb-4">
        <section class="w-1/2">
          <label>Name</label>
          <validation-provider
            v-slot="validationContext"
            :rules="{ required: true }"
            name="Name"
          >
            <text-input
              v-model="race.name"
              :invalid="!!validationContext.errors[0]"
              placeholder="Enter name"
            />
            <small class="text-danger">{{ validationContext.errors[0] }}</small>
          </validation-provider>
        </section>

        <section class="w-1/2">
          <label>Creature Type</label>
          <validation-provider
            v-slot="validationContext"
            :rules="{ required: true }"
            name="Creature Type"
          >
            <text-input
              v-model="race.creature_type"
              :invalid="!!validationContext.errors[0]"
              placeholder="Enter creature type"
            />
            <small class="text-danger">{{ validationContext.errors[0] }}</small>
          </validation-provider>
        </section>
      </div>

      <div class="flex gap-4">
        <section class="mb-4 w-1/2">
          <label>Size</label>
          <validation-provider
            v-slot="validationContext"
            :rules="{ required: true }"
            name="Size"
          >
            <text-input
              v-model="race.size"
              :invalid="!!validationContext.errors[0]"
              placeholder="Enter size"
            />
            <small class="text-danger">{{ validationContext.errors[0] }}</small>
          </validation-provider>
        </section>

        <section class="mb-4 w-1/2">
          <label>Base Speed</label>
          <validation-provider
            v-slot="validationContext"
            :rules="{ required: true, min: 0 }"
            name="Base Speed"
          >
            <number-input
              v-model="race.base_speed"
              :invalid="!!validationContext.errors[0]"
              :min="0"
              :step="5"
              placeholder="Enter base speed"
              type="number"
            />
            <small class="text-danger">{{ validationContext.errors[0] }}</small>
          </validation-provider>
        </section>
      </div>

      <section class="mb-4">
        <label>Short Description</label>
        <validation-provider
          v-slot="validationContext"
          :rules="{required: true}"
          name="Short Description"
        >
          <text-input
            v-model="race.short_description"
            :invalid="!!validationContext.errors[0]"
            :rows="3"
            placeholder="Write a short description for the race"
          />
          <small class="text-danger">{{ validationContext.errors[0] }}</small>
        </validation-provider>
      </section>

      <section class="mb-4">
        <label>Logo (Optional)</label>
        <validation-provider
          v-slot="validationContext"
          :rules="{ isImageFile }"
          name="Image"
        >
          <file-input
            v-model="image"
            :invalid="!!validationContext.errors[0]"
            placeholder="Browse files"
          />
          <small class="text-danger">{{ validationContext.errors[0] }}</small>
        </validation-provider>
      </section>

      <div class="float-right flex gap-2 mt-2">
        <c-button
          class="mr-2"
          @click="$emit('close')"
        >
          Cancel
        </c-button>
        <c-button
          :disabled="invalid || loading"
          type="submit"
          variant="primary"
        >
          Create
        </c-button>
      </div>
    </form>
  </validation-observer>
</template>

<script>
  import HelperService from "@/services/HelperService";
  import CButton from "@/components/ui/CustomButton.vue";
  import TextInput from "@/components/ui/input/TextInput.vue";
  import FileInput from "@/components/ui/input/FileInput.vue";
  import {isImageFile} from "@core/utils/validations/validations";
  import NumberInput from "@/components/ui/input/NumberInput.vue";
  import RaceService from "@/services/RaceService";

  export default {
    name: "CreateRaceModal",
    components: {NumberInput, CButton, FileInput, TextInput},
    data() {
      return {
        loading: false,
        race: {
          name: "",
          creature_type: "",
          size: "",
          base_speed: 30,
          short_description: "",
        },
        image: null,
        sizeOptions: [
          {label: "Tiny", value: "Tiny"},
          {label: "Small", value: "Small"},
          {label: "Medium", value: "Medium"},
          {label: "Large", value: "Large"},
          {label: "Huge", value: "Huge"},
          {label: "Gargantuan", value: "Gargantuan"},
        ]
      }
    },
    computed: {
      isImageFile() {
        return isImageFile
      }
    },
    methods: {
      async createRace() {
        this.loading = true;
        try {
          const dto = {
            name: this.race.name,
            creature_type: this.race.creature_type,
            size: this.race.size,
            base_speed: this.race.base_speed,
            short_description: this.race.short_description,
          }

          const res = await RaceService.create(dto)

          if (this.image) {
            await RaceService.uploadLogo(res.data.id, this.image)
          }

          HelperService.successToast(this.$toast, "Race created successfully")
          await this.$router.push({name: 'race-details', params: {id: res.data.id}})
          this.$emit("close")
        } catch (err) {
          const res = err.response;
          let errorText = "Could not create race, please refresh and try again";

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