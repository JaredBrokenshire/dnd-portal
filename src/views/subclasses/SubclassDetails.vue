<template>
  <div v-if="subclass">
    <router-link
      :to="{name: 'class-details', params: {id: subclass.class_id}}"
      class="flex items-center gap-2 text-lg mb-4 nav-link"
    >
      <feather-icon
        icon="ChevronLeftIcon"
        size="32"
      />
      Back to Class
    </router-link>

    <div class="flex flex-col md:flex-row-reverse gap-4">
      <div class="flex-grow md:w-1/2 lg:w-1/4">
        <card
          class="flex flex-col gap-4"
          title="Actions"
        >
          <c-button
            :disabled="loading"
            variant="primary"
            @click="showUpdateModal = true"
          >
            Update
          </c-button>
          <c-button
            :disabled="loading"
            variant="danger"
            @click="showDeleteModal = true"
          >
            Delete
          </c-button>
        </card>
      </div>
      <card
        :title="`${subclass.name} Details`"
        class="mb-4 flex-grow md:w-1/2 lg:w-3/4"
      >
        <div class="flex-between gap-4">
          <div class="flex-grow self-start">
            <div class="mb-4 description">{{ subclass.short_description }}</div>
          </div>
          <img
            :alt="`${subclass.name} Logo`"
            :src="logoURL"
            class="hidden md:block w-full max-w-[100px] lg:max-w-[150px] xl:max-w-[200px] rounded-lg aspect-square object-contain"
          >
        </div>
      </card>
    </div>

    <modal
      id="modal-update-subclass"
      :visible="showUpdateModal"
      size="md"
      title="Update Subclass"
      @close="closeModals"
    >
      <edit-subclass-modal
        :class-type="classType"
        :existing="subclass"
        @close="closeModals"
        @update="updateSubclass"
      />
    </modal>

    <modal
      id="modal-delete-subclass"
      :show-close="false"
      :visible="showDeleteModal"
      size="sm"
      title="Delete Subclass"
    >
      <delete-modal
        type="subclass"
        @close="closeModals"
        @delete="deleteSubclass"
      />
    </modal>
  </div>
</template>

<script>
  import Card from "@/components/ui/Card.vue";
  import Modal from "@/components/ui/Modal.vue";
  import ClassService from "@/services/ClassService";
  import HelperService from "@/services/HelperService";
  import CButton from "@/components/ui/CustomButton.vue";
  import SubclassService from "@/services/SubclassService";
  import DeleteModal from "@/components/modals/DeleteModal.vue";
  import EditSubclassModal from "@/views/subclasses/sections/EditSubclassModal.vue";

  export default {
    name: "SubclassDetails",
    components: {EditSubclassModal, DeleteModal, Modal, CButton, Card},
    data() {
      return {
        subclass: null,
        classType: null,
        loading: false,
        showUpdateModal: false,
        showDeleteModal: false,
      }
    },
    computed: {
      logoURL() {
        if (this.subclass.logo) {
          return `${HelperService.getApiUrl()}/files/${
            this.subclass.logo.file_location
          }/${this.subclass.logo.filename}`;
        }

        return "";
      }
    },
    mounted() {
      this.getSubclass()
      this.getClass()
    },
    methods: {
      async getSubclass() {
        this.loading = true;
        try {
          const res = await SubclassService.get(this.$route.params.classId, this.$route.params.subclassId);
          this.subclass = res.data;
        } catch (err) {
          const res = err.response;
          let errorText = "Could not get subclass, please refresh and try again";

          if (res && res.data.error) {
            errorText = res.data.error;
          }

          HelperService.errorToast(this.$toast, err, errorText)
        } finally {
          this.loading = false;
        }
      },
      async getClass() {
        this.loading = true;
        try {
          const res = await ClassService.get(this.$route.params.classId);
          this.classType = res.data;
        } catch (err) {
          const res = err.response;
          let errorText = "Could not get class, please refresh and try again";

          if (res && res.data.error) {
            errorText = res.data.error;
          }

          HelperService.errorToast(this.$toast, err, errorText)
        } finally {
          this.loading = false;
        }
      },
      async updateSubclass(updatedSubclass, image) {
        this.loading = true;
        try {
          if (image) {
            await SubclassService.uploadLogo(this.subclass.class_id, this.subclass.id, image)
          }

          const dto = {
            name: updatedSubclass.name,
            short_description: updatedSubclass.short_description,
          }

          const res = await SubclassService.update(this.subclass.class_id, this.subclass.id, dto)
          this.subclass = res.data;

          HelperService.successToast(this.$toast, "Subclass updated successfully")
          this.closeModals()
        } catch (err) {
          const res = err.response;
          let errorText = "Could not update subclass, please refresh and try again";

          if (res && res.data.error) {
            errorText = res.data.error;
          }

          HelperService.errorToast(this.$toast, err, errorText)
        } finally {
          this.loading = false;
        }
      },
      async deleteSubclass() {
        this.loading = true;
        try {
          await SubclassService.delete(this.subclass.class_id, this.subclass.id);

          HelperService.successToast(this.$toast, "Subclass deleted successfully")
          await this.$router.push({name: "class-details", params: {id: this.$route.params.classId}});
        } catch (err) {
          const res = err.response;
          let errorText = "Could not delete subclass, please refresh and try again";

          if (res && res.data.error) {
            errorText = res.data.error;
          }

          HelperService.errorToast(this.$toast, err, errorText)
        } finally {
          this.loading = false;
        }
      },
      closeModals() {
        this.showUpdateModal = false;
        this.showDeleteModal = false;
      },
    }
  }
</script>

<style scoped>

</style>