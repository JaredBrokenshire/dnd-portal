<template>
  <validation-observer
    ref="observer"
    v-slot="{ handleSubmit, invalid }"
  >
    <form @submit.prevent="handleSubmit(createClass)">
      <div class="flex gap-4 mb-4">
        <section class="w-1/2">
          <label>Name</label>
          <validation-provider
            v-slot="validationContext"
            :rules="{ required: true }"
            name="Name"
          >
            <text-input
              v-model="newClass.name"
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
              v-model="newClass.saves"
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
              v-model="newClass.primary_ability"
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
              v-model="newClass.hit_point_die_value"
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
            v-model="newClass.short_description"
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
          Create
        </c-button>
      </div>
    </form>
  </validation-observer>
</template>

<script>
  import ClassService from "@/services/ClassService";
  import HelperService from "@/services/HelperService";
  import CButton from "@/components/ui/CustomButton.vue";
  import Dropdown from "@/components/ui/input/Dropdown.vue";
  import TextInput from "@/components/ui/input/TextInput.vue";
  import FileInput from "@/components/ui/input/FileInput.vue";
  import {isImageFile} from "@core/utils/validations/validations";
  import MultiselectDropdown from "@/components/ui/input/MultiselectDropdown.vue";

  export default {
    name: "CreateClassModal",
    components: {MultiselectDropdown, Dropdown, CButton, FileInput, TextInput},
    data() {
      return {
        loading: false,
        newClass: {
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
        ]
      }
    },
    computed: {
      isImageFile() {
        return isImageFile
      }
    },
    methods: {
      async createClass() {
        this.loading = true;
        try {
          const dto = {
            name: this.newClass.name,
            saves: JSON.stringify(this.newClass.saves),
            short_description: this.newClass.short_description,
            primary_ability: this.newClass.primary_ability,
            hit_point_die_value: this.newClass.hit_point_die_value,
          }

          const res = await ClassService.create(dto)

          if (this.logo) {
            await ClassService.uploadLogo(res.data.id, this.logo)
          }

          if (this.backgroundImage) {
            await ClassService.uploadBackgroundImage(res.data.id, this.backgroundImage)
          }

          HelperService.successToast(this.$toast, "Class created successfully")
          await this.$router.push({name: 'class-details', params: {id: res.data.id}})
          this.$emit("close")
        } catch (err) {
          const res = err.response;
          let errorText = "Could not create class, please refresh and try again";

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