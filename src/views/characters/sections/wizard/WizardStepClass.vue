<template>
  <div>
    <card v-if="$attrs.class_id !== 0 && selectedClass !== null">
      <div class="py-4 mb-4 border-y border-gray-light flex-between">
        <div>
          <div class="font-bold text-2xl">Character Level: {{ $attrs.level }}</div>
          <div>{{ $attrs.advancement_type }} Advancement</div>
        </div>
        <div class="flex items-center gap-4">
          <div class="min-w-fit">
            <div class="">Max Hit Points: {{ $attrs.level * selectedClass.hit_point_die_value }}</div>
            <div>
              Hit Die: 1d{{ selectedClass.hit_point_die_value }}
            </div>
          </div>
          <c-button
            class="text-xs max-w-[8rem]"
            variant="primary"
          >
            Manage HP
          </c-button>
        </div>
      </div>
      <div class="flex-between">
        <div class="flex items-center gap-4">
          <img
            :src="getClassLogoUrl(selectedClass)"
            alt=""
            class="w-[60px] h-[60px] rounded object-contain"
          >
          <div class="text-2xl font-bold">{{ selectedClass.name }}</div>
        </div>

        <div class="flex items-center gap-4">
          <div class="font-bold">Level</div>
          <number-input
            v-model="level"
            :max="20"
            :min="1"
            :show-buttons="false"
            @input="update"
          />
          <div
            class="aspect-square transition-all hover:bg-gray-light rounded cursor-pointer"
            @click="toggleRemoveModal"
          >
            <feather-icon
              class="text-danger"
              icon="XIcon"
              size="32"
            />
          </div>
        </div>
      </div>
    </card>
    <div
      v-else
      class="flex flex-col gap-2"
    >
      <card class="mb-4">
        <div class="flex flex-col md:flex-row justify-between md:items-end gap-2">
          <div class="flex-grow md:max-w-1/2 ">
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
        v-for="classType in classes"
        :key="classType.id"
        class="bg-white p-2 rounded flex-between gap-4 cursor-pointer transition-all outline outline-white hover:outline-gray-light"
        @click="selectClass(classType)"
      >
        <div class="flex items-center gap-4">
          <img
            :src="getClassLogoUrl(classType)"
            alt=""
            class="w-[60px] h-[60px] rounded object-contain"
          >
          <h4 class="text-xl font-bold">
            {{ classType.name }}
          </h4>
        </div>

        <feather-icon
          class="text-primary"
          icon="ChevronRightIcon"
          size="32"
          stroke-width="2"
        />
      </div>

      <div
        v-if="classes.length === 0"
        class="text-center text-2xl my-8"
      >
        No Classes match your current filters
      </div>
    </div>

    <modal
      id="modal-confirm-add-class"
      :visible="showConfirmModal && !!selectedClass"
      size="md"
      title="CONFIRM ADD CLASS"
      @close="closeModals"
    >
      <confirm-add-class-modal
        :class-type="selectedClass"
        @close="closeModals"
        @confirm="update"
      />
    </modal>

    <modal
      id="modal-confirm-remove-class"
      :visible="showRemoveModal"
      side="md"
      title="CONFIRM REMOVE CLASS"
      @close="closeModals"
    >
      <delete-modal
        type="class"
        @close="closeModals"
        @delete="removeClass"
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
  import TextInput from "@/components/ui/input/TextInput.vue";
  import ConfirmAddClassModal from "@/views/characters/sections/wizard/ConfirmAddClassModal.vue";
  import NumberInput from "@/components/ui/input/NumberInput.vue";
  import DeleteModal from "@/components/modals/DeleteModal.vue";

  export default {
    name: 'WizardStepClass',
    components: {DeleteModal, NumberInput, TextInput, Card, CButton, ConfirmAddClassModal, Modal},
    data() {
      return {
        classes: [],
        loading: false,
        filters: {
          page: 0,
          page_size: 100,
          search: "",
        },
        showConfirmModal: false,
        showRemoveModal: false,
        selectedClass: null,
        level: this.$attrs.level
      }
    },
    mounted() {
      this.getClasses()

      if (this.$attrs.class_id !== 0) {
        this.getClass(this.$attrs.class_id);
      }
    },
    methods: {
      getMoreClasses(page) {
        this.filters.page = page - 1;
        this.getClasses()
      },
      async getClasses() {
        this.loading = true;
        try {
          const res = await ClassService.list(this.filters)
          this.classes = res.data.data || []
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
      async getClass(id) {
        this.loading = true
        try {
          const res = await ClassService.get(id)
          this.selectedClass = res.data
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
      getClassLogoUrl(classType) {
        if (classType.logo) {
          return `${HelperService.getApiUrl()}/files/${
            classType.logo.file_location
          }/${classType.logo.filename}`;
        }
        return ""
      },
      selectClass(classType) {
        this.selectedClass = classType;
        this.showConfirmModal = true;
      },
      closeModals() {
        this.showConfirmModal = false;
        this.showRemoveModal = false;
      },
      update() {
        if (this.selectedClass) {
          this.$emit("update", {level: this.level, class_id: this.selectedClass.id});
        }
        this.closeModals()
      },
      clearFilters() {
        this.filters = {
          page: 0,
          page_size: 100,
          search: "",
        }

        this.getClasses()
      },
      removeClass() {
        this.selectedClass = null;
        this.closeModals()
        this.$emit("update", {level: 1, class_id: 0});
      },
      toggleRemoveModal() {
        this.showRemoveModal = true;
      }
    }
  }
</script>

<style scoped>

</style>