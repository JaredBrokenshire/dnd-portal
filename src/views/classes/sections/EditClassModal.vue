<template>
  <validation-observer
    ref="observer"
    v-slot="{ handleSubmit, invalid }"
  >
    <form @submit.prevent="handleSubmit(updateClass)">
      <div class="flex gap-4 mb-4">
        <section class="w-1/2">
          <label>Name</label>
          <validation-provider
            v-slot="validationContext"
            :rules="{ required: true }"
            name="Name"
          >
            <text-input
              v-model="updatedClass.name"
              :invalid="!!validationContext.errors[0]"
              placeholder="Enter name"
            />
            <small class="text-danger">{{ validationContext.errors[0] }}</small>
          </validation-provider>
        </section>

        <section class="w-1/2">
          <label>Saves</label>
          <validation-provider
            v-slot="validationContext"
            :rules="{ required: true }"
            name="Saves"
          >
            <multiselect-dropdown
              v-model="updatedClass.saves"
              :max="2"
              :options="savesOptions"
              placeholder="Select saves"
            />
            <small class="text-danger">{{ validationContext.errors[0] }}</small>
          </validation-provider>
        </section>
      </div>

      <div class="flex gap-4">
        <section class="mb-4 w-1/2">
          <label>Primary Ability</label>
          <validation-provider
            v-slot="validationContext"
            :rules="{ required: true }"
            name="Primary Ability"
          >
            <text-input
              v-model="updatedClass.primary_ability"
              :invalid="!!validationContext.errors[0]"
              placeholder="Enter primary ability"
            />
            <small class="text-danger">{{ validationContext.errors[0] }}</small>
          </validation-provider>
        </section>

        <section class="mb-4 w-1/2">
          <label>Hit Point Die</label>
          <validation-provider
            v-slot="validationContext"
            :rules="{ required: true }"
            name="Hit Point Die"
          >
            <dropdown
              v-model="updatedClass.hit_point_die_value"
              :invalid="!!validationContext.errors[0]"
              :options="hitPointDieOptions"
              placeholder="Select Hit Die"
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
            v-model="updatedClass.short_description"
            :invalid="!!validationContext.errors[0]"
            :rows="3"
            placeholder="Write a short description for the class"
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

      <section class="mb-4">
        <label>Background Image (Optional)</label>
        <validation-provider
          v-slot="validationContext"
          :rules="{ isImageFile }"
          name="Background Image"
        >
          <file-input
            v-model="backgroundImage"
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
  import Dropdown from "@/components/ui/input/Dropdown.vue";
  import TextInput from "@/components/ui/input/TextInput.vue";
  import {isImageFile} from "@core/utils/validations/validations";
  import MultiselectDropdown from "@/components/ui/input/MultiselectDropdown.vue";
  import FileInput from "@/components/ui/input/FileInput.vue";

  export default {
    name: "EditClassModal",
    components: {FileInput, MultiselectDropdown, Dropdown, CButton, TextInput},
    props: {
      existing: {
        type: Object,
        required: true,
      }
    },
    data() {
      return {
        loading: false,
        updatedClass: {
          name: "",
          saves: [],
          short_description: "",
          primary_ability: "",
          hit_point_die_value: null,
        },
        logo: null,
        backgroundImage: null,
        hitPointDieOptions: [
          {label: "D4", value: 4},
          {label: "D6", value: 6},
          {label: "D8", value: 8},
          {label: "D10", value: 10},
          {label: "D12", value: 12},
        ],
        savesOptions: [
          {label: "Strength", value: "Strength"},
          {label: "Dexterity", value: "Dexterity"},
          {label: "Constitution", value: "Constitution"},
          {label: "Intelligence", value: "Intelligence"},
          {label: "Wisdom", value: "Wisdom"},
          {label: "Charisma", value: "Charisma"},
        ],
      }
    },
    computed: {
      isImageFile() {
        return isImageFile
      }
    },
    mounted() {
      this.updatedClass.name = this.$props.existing.name;
      this.updatedClass.short_description = this.$props.existing.short_description;
      this.updatedClass.primary_ability = this.$props.existing.primary_ability;
      this.updatedClass.saves = this.$props.existing.saves;
      this.updatedClass.hit_point_die_value = this.$props.existing.hit_point_die_value;
    },
    methods: {
      updateClass() {
        this.$emit('update', this.updatedClass, this.logo, this.backgroundImage);
      }
    }
  }
</script>

<style scoped>

</style>