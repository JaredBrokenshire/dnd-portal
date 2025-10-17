<template>
  <div>
    <router-link
      :to="{name: 'classes'}"
      class="flex items-center gap-2 text-lg mb-4 nav-link"
    >
      <feather-icon
        icon="ChevronLeftIcon"
        size="32"
      />
      Back to Classes
    </router-link>

    <div v-if="classType">
      <div class="flex flex-col lg:flex-row-reverse gap-4">
        <div class="flex-grow lg:w-1/4">
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
          :title="`${classType.name} Details`"
          class="mb-4 flex-grow lg:w-3/4"
        >
          <div class="flex-between gap-4">
            <div class="flex-grow self-start">
              <div class="mb-4 description">{{ classType.short_description }}</div>
              <div class="text-sm sm:text-lg">
                <div class="flex gap-4">
                  <div class="font-bold flex-grow md:max-w-1/3 lg:max-w-1/4">Hit Die:</div>
                  <div>D{{ classType.hit_point_die_value }}</div>
                </div>
                <div class="flex gap-4">
                  <div class="font-bold flex-grow md:max-w-1/3 lg:max-w-1/4">Saves:</div>
                  <div>{{ classType.saves.join(" & ") }}</div>
                </div>
                <div class="flex gap-4">
                  <div class="font-bold flex-grow md:max-w-1/3 lg:max-w-1/4">Primary Ability:</div>
                  <div>{{ classType.primary_ability }}</div>
                </div>
              </div>
            </div>
            <img
              :alt="`${classType.name} Logo`"
              :src="logoURL"
              class="hidden md:block w-full max-w-[100px] lg:max-w-[150px] xl:max-w-[200px] rounded-lg aspect-square object-cover"
            >
          </div>
        </card>
      </div>

      <card
        class="mb-4"
        title="Subclasses"
      >
        <div class="flex flex-col md:flex-row justify-between md:items-end gap-2">
          <div class="flex-grow md:max-w-1/2 xl:max-w-1/3">
            <label>Search</label>
            <text-input
              v-model="filters.search"
              placeholder="Search by name"
              @input="getMoreSubclasses"
            />
          </div>

          <div class="flex gap-2">
            <div class="w-fit">
              <c-button @click="clearFilters">Clear Filters</c-button>
            </div>
            <div class="w-fit">
              <c-button
                variant="primary"
                @click="showCreateSubclassModal = true"
              >
                Create Subclass
              </c-button>
            </div>
          </div>
        </div>
      </card>

      <div v-if="totalCount > 0">
        <div class="grid-3 mb-8">
          <subclass-card
            v-for="subclass in subclasses"
            :key="subclass.id"
            :subclass="subclass"
          />
        </div>
      </div>

      <card
        v-else
        class="mb-4"
        title="No Records"
      >
        No Subclasses match your current filters.
      </card>
    </div>

    <modal
      id="modal-update-class"
      :visible="showUpdateModal"
      size="md"
      title="Update Class"
      @close="closeModals"
    >
      <edit-class-modal
        :existing="classType"
        @close="closeModals"
        @update="updateClass"
      />
    </modal>

    <modal
      id="modal-delete-class"
      :show-close="false"
      :visible="showDeleteModal"
      size="sm"
      title="Delete Class"
    >
      <delete-modal
        type="class"
        @close="closeModals"
        @delete="deleteClass"
      />
    </modal>

    <modal
      id="modal-create-subclass"
      :visible="showCreateSubclassModal"
      size="md"
      title="Create Subclass"
      @close="closeModals"
    >
      <create-subclass-modal
        :class-type="classType"
        @close="closeModals"
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
  import TextInput from "@/components/ui/input/TextInput.vue";
  import DeleteModal from "@/components/modals/DeleteModal.vue";
  import SubclassCard from "@/views/subclasses/sections/SubclassCard.vue";
  import EditClassModal from "@/views/classes/sections/EditClassModal.vue";
  import CreateSubclassModal from "@/views/subclasses/sections/CreateSubclassModal.vue";

  export default {
    name: "ClassDetails",
    components: {CreateSubclassModal, TextInput, SubclassCard, EditClassModal, DeleteModal, Modal, CButton, Card},
    data() {
      return {
        classType: null,
        loading: false,
        showUpdateModal: false,
        showDeleteModal: false,
        showCreateSubclassModal: false,
        subclasses: [],
        filters: {
          search: "",
          page: 0,
          page_size: 12,
        },
        currentPage: 1,
        totalCount: 0,
      }
    },
    computed: {
      logoURL() {
        if (this.classType.logo) {
          return `${HelperService.getApiUrl()}/files/${
            this.classType.logo.file_location
          }/${this.classType.logo.filename}`;
        }

        return "";
      }
    },
    mounted() {
      this.getClass()
      this.getSubclasses()
    },
    methods: {
      getMoreSubclasses(page) {
        this.currentPage = page;
        this.filters.page = page - 1
        this.getSubclasses()
      },
      async getSubclasses() {
        this.loading = true;
        try {
          const res = await SubclassService.list(this.$route.params.id, this.filters);
          this.subclasses = res.data.data;
          this.currentPage = res.data.meta.page;
          this.totalCount = res.data.meta.total_count;
        } catch (err) {
          const res = err.response;
          let errorText = "Could not get subclasses, please refresh and try again";

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
          const res = await ClassService.get(this.$route.params.id);
          this.classType = res.data;
          this.classType.saves = JSON.parse(this.classType.saves);
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
      async updateClass(updatedClass, logo, backgroundImage) {
        this.loading = true;
        try {
          if (logo) {
            await ClassService.uploadLogo(this.classType.id, logo)
          }

          if (backgroundImage) {
            await ClassService.uploadBackgroundImage(this.classType.id, backgroundImage)
          }

          const dto = {
            name: updatedClass.name,
            saves: JSON.stringify(updatedClass.saves),
            short_description: updatedClass.short_description,
            primary_ability: updatedClass.primary_ability,
            hit_point_die_value: updatedClass.hit_point_die_value,
          }

          const res = await ClassService.update(this.classType.id, dto)
          this.classType = res.data;
          this.classType.saves = JSON.parse(this.classType.saves);

          HelperService.successToast(this.$toast, "Class updated successfully")
          this.closeModals()
        } catch (err) {
          const res = err.response;
          let errorText = "Could not update class, please refresh and try again";

          if (res && res.data.error) {
            errorText = res.data.error;
          }

          HelperService.errorToast(this.$toast, err, errorText)
        } finally {
          this.loading = false;
        }
      },
      async deleteClass() {
        this.loading = true;
        try {
          await ClassService.delete(this.classType.id);

          HelperService.successToast(this.$toast, "Class deleted successfully")
          await this.$router.push({name: "classes"})
        } catch (err) {
          const res = err.response;
          let errorText = "Could not delete class, please refresh and try again";

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
        this.showCreateSubclassModal = false;
      },
      clearFilters() {
        this.filters = {
          search: "",
          page: 0,
          page_size: 12,
        }
        this.getMoreSubclasses(1);
      }
    }
  }
</script>

<style scoped>

</style>