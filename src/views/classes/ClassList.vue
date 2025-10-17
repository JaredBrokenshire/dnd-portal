<template>
  <div>
    <card
      class="mb-4"
      title="Classes"
    >
      <div class="flex-between gap-2">
        <div class="flex-grow">
          This page shows all classes available for characters.
        </div>
        <div class="w-fit">
          <c-button
            variant="primary"
            @click="showCreateClassModal = true"
          >
            Create Class
          </c-button>
        </div>
      </div>
    </card>

    <card class="mb-4">
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-2">
        <div class="flex-grow md:max-w-1/2 xl:max-w-1/3">
          <label>Search</label>
          <text-input
            v-model="filters.search"
            placeholder="Search by name"
            @input="getMoreClasses"
          />
        </div>

        <div class="w-fit">
          <c-button @click="clearFilters">Clear Filters</c-button>
        </div>
      </div>
    </card>

    <div
      v-if="totalCount > 0"
    >
      <div class="grid-3 mb-8">
        <class-card
          v-for="classType in classes"
          :key="classType.id"
          :class-type="classType"
        />
      </div>

      <pagination
        :current-page="currentPage"
        :total-pages="Math.ceil(totalCount / filters.page_size) "
        @page-changed="getMoreClasses"
      />
    </div>

    <card
      v-else
      title="No Records"
    >
      No Classes match your current filters.
    </card>

    <modal
      id="modal-create-class"
      :visible="showCreateClassModal"
      size="md"
      title="Create Class"
      @close="closeModals"
    >
      <create-class-modal @close="closeModals" />
    </modal>
  </div>
</template>

<script>
  import Card from "@/components/ui/Card.vue";
  import Modal from "@/components/ui/Modal.vue";
  import ClassService from "@/services/ClassService";
  import HelperService from "@/services/HelperService";
  import CButton from "@/components/ui/CustomButton.vue";
  import Pagination from "@/components/ui/Pagination.vue";
  import TextInput from "@/components/ui/input/TextInput.vue";
  import ClassCard from "@/views/classes/sections/ClassCard.vue";
  import CreateClassModal from "@/views/classes/sections/CreateClassModal.vue";

  export default {
    name: "ClassList",
    components: {Pagination, CButton, TextInput, Modal, Card, ClassCard, CreateClassModal},
    data() {
      return {
        loading: false,
        classes: [],
        currentPage: 1,
        totalCount: 0,
        filters: {
          page: 0,
          page_size: 12,
          search: "",
        },
        showCreateClassModal: false,
      }
    },
    mounted() {
      this.getClasses()
    },
    methods: {
      getMoreClasses(page) {
        this.currentPage = page
        this.filters.page = page - 1
        this.getClasses()
      },
      async getClasses() {
        this.loading = true;
        try {
          const res = await ClassService.list(this.filters)
          this.classes = res.data.data
          this.filters.page = this.currentPage - 1
          this.filters.page_size = res.data.meta.page_size
          this.totalCount = res.data.meta.total_count
        } catch (err) {
          const res = err.response;
          let errorText = "Could not get classes, please refresh and try again";

          if (res && res.data.error) {
            errorText = res.data.error;
          }

          HelperService.errorToast(this.$toast, err, errorText)
        } finally {
          this.loading = false;
        }
      },
      clearFilters() {
        this.filters = {
          page: 0,
          page_size: 12,
          search: "",
        }

        this.getMoreClasses(1)
      },
      closeModals() {
        this.showCreateClassModal = false;
      }
    }
  }
</script>

<style scoped>

</style>