<template>
  <validation-observer
    ref="observer"
    v-slot="{ handleSubmit, invalid }"
  >
    <form @submit.prevent="handleSubmit(updateRace)">
      <div class="flex gap-4 mb-4">
        <section class="w-1/2">
          <label>Name</label>
          <validation-provider
            v-slot="validationContext"
            :rules="{ required: true }"
            name="Name"
          >
            <text-input
              v-model="updatedRace.name"
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
              v-model="updatedRace.creature_type"
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
              v-model="updatedRace.size"
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
            name="Hit Point Die"
          >
            <number-input
              v-model="updatedRace.base_speed"
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
        <label>Short Description (Optional)</label>
        <validation-provider
          v-slot="validationContext"
          name="Short Description"
        >
          <text-input
            v-model="updatedRace.short_description"
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
          name="Logo"
        >
          <file-input
            v-model="logo"
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
          Update
        </c-button>
      </div>
    </form>
  </validation-observer>
</template>

<script>
  import CButton from "@/components/ui/CustomButton.vue";
  import FileInput from "@/components/ui/input/FileInput.vue";
  import TextInput from "@/components/ui/input/TextInput.vue";
  import {isImageFile} from "@core/utils/validations/validations";
  import NumberInput from "@/components/ui/input/NumberInput.vue";

  export default {
    name: "EditRaceModal",
    components: {FileInput, NumberInput, CButton, TextInput},
    props: {
      existing: {
        type: Object,
        required: true,
      }
    },
    data() {
      return {
        loading: false,
        updatedRace: {
          name: "",
          creature_type: "",
          size: "",
          base_speed: 0,
          short_description: "",
        },
        logo: null,
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
    mounted() {
      this.updatedRace.name = this.$props.existing.name;
      this.updatedRace.short_description = this.$props.existing.short_description;
      this.updatedRace.creature_type = this.$props.existing.creature_type;
      this.updatedRace.size = this.$props.existing.size;
      this.updatedRace.base_speed = this.$props.existing.base_speed;
    },
    methods: {
      updateRace() {
        this.$emit('update', this.updatedRace, this.logo);
      }
    }
  }
</script>

<style scoped>

</style>