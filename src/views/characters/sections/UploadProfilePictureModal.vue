<template>
  <validation-observer
    ref="observer"
    v-slot="{ handleSubmit, invalid }"
  >
    <form @submit.prevent="handleSubmit(uploadProfilePicture)">
      <section class="mb-4">
        <label>Profile Picture</label>
        <validation-provider
          v-slot="validationContext"
          :rules="{ isImageFile }"
          name="Profile Picture"
        >
          <file-input
            v-model="profilePicture"
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
          :disabled="invalid || loading || !profilePicture"
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
  import FileInput from "@/components/ui/input/FileInput.vue";
  import CButton from "@/components/ui/CustomButton.vue";
  import {isImageFile} from "@core/utils/validations/validations";

  export default {
    name: "UploadProfilePictureModal",
    components: {CButton, FileInput},
    data() {
      return {
        loading: false,
        profilePicture: null,
      }
    },
    computed: {
      isImageFile() {
        return isImageFile
      }
    },
    methods: {
      uploadProfilePicture() {
        this.$emit('update', this.profilePicture);
      }
    }
  }
</script>

<style scoped>

</style>