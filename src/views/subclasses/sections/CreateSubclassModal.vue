<template>
  <validation-observer
    ref="observer"
    v-slot="{ handleSubmit, invalid }"
  >
    <form @submit.prevent="handleSubmit(createSubclass)">
      <div class="flex gap-4 mb-4">
        <section class="w-1/2">
          <label>Name</label>
          <validation-provider
            v-slot="validationContext"
            :rules="{ required: true }"
            name="Name"
          >
            <text-input
              v-model="subclass.name"
              :invalid="!!validationContext.errors[0]"
              placeholder="Enter name"
            />
            <small class="text-danger">{{ validationContext.errors[0] }}</small>
          </validation-provider>
        </section>

        <section class="w-1/2">
          <label>Class</label>
          <text-input
            :disabled="true"
            :value="classType.name"
          />
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
            v-model="subclass.short_description"
            :invalid="!!validationContext.errors[0]"
            :rows="3"
            placeholder="Write a short description for the subclass"
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
  import SubclassService from "@/services/SubclassService";
  import TextInput from "@/components/ui/input/TextInput.vue";
  import FileInput from "@/components/ui/input/FileInput.vue";
  import {isImageFile} from "@core/utils/validations/validations";

  export default {
    name: "CreateSubclassModal",
    components: {CButton, FileInput, TextInput},
    props: {
      classType: {
        type: Object,
        required: true,
      }
    },
    data() {
      return {
        loading: false,
        subclass: {
          name: "",
          short_description: "",
        },
        image: null,
      }
    },
    computed: {
      isImageFile() {
        return isImageFile
      }
    },
    methods: {
      async createSubclass() {
        this.loading = true;
        try {
          const dto = {
            name: this.subclass.name,
            short_description: this.subclass.short_description,
            class_id: this.$props.classType.id
          }

          const res = await SubclassService.create(dto)

          if (this.image) {
            await SubclassService.uploadLogo(this.$props.classType.id, res.data.id, this.image)
          }

          HelperService.successToast(this.$toast, "Subclass created successfully")
          await this.$router.push({
            name: 'subclass-details',
            params: {classId: res.data.class_id, subclassId: res.data.id}
          })
          this.$emit("close")
        } catch (err) {
          const res = err.response;
          let errorText = "Could not create subclass, please refresh and try again";

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