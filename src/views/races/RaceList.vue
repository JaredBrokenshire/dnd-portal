<template>
  <div>
    <card
      class="mb-4"
      title="Races"
    >
      <div class="flex-between gap-2">
        <div class="flex-grow">
          This page shows all races available for characters.
        </div>
        <div class="w-fit">
          <c-button
            variant="primary"
            @click="showCreateRaceModal = true"
          >
            Create Race
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
            @input="getMoreRaces"
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
        <race-card
          v-for="race in races"
          :key="race.id"
          :race="race"
        />
      </div>

      <pagination
        :current-page="currentPage"
        :total-pages="Math.ceil(totalCount / filters.page_size) "
        @page-changed="getMoreRaces"
      />
    </div>

    <card
      v-else
      title="No Records"
    >
      No Races match your current filters.
    </card>

    <modal
      id="modal-create-race"
      :visible="showCreateRaceModal"
      size="md"
      title="Create Race"
      @close="closeModals"
    >
      <create-race-modal @close="closeModals" />
    </modal>
  </div>
</template>

<script>
  import Card from "@/components/ui/Card.vue";
  import Modal from "@/components/ui/Modal.vue";
  import RaceService from "@/services/RaceService";
  import HelperService from "@/services/HelperService";
  import CButton from "@/components/ui/CustomButton.vue";
  import Pagination from "@/components/ui/Pagination.vue";
  import RaceCard from "@/views/races/sections/RaceCard.vue";
  import TextInput from "@/components/ui/input/TextInput.vue";
  import CreateRaceModal from "@/views/races/sections/CreateRaceModal.vue";

  export default {
    name: "RaceList",
    components: {CreateRaceModal, RaceCard, Pagination, CButton, TextInput, Modal, Card},
    data() {
      return {
        loading: false,
        races: [],
        currentPage: 1,
        totalCount: 0,
        filters: {
          page: 0,
          page_size: 12,
          search: "",
        },
        showCreateRaceModal: false,
      }
    },
    mounted() {
      this.getRaces()
    },
    methods: {
      getMoreRaces(page) {
        this.currentPage = page
        this.filters.page = page - 1
        this.getRaces()
      },
      async getRaces() {
        this.loading = true;
        try {
          const res = await RaceService.list(this.filters)
          this.races = res.data.data
          this.filters.page = this.currentPage - 1
          this.filters.page_size = res.data.meta.page_size
          this.totalCount = res.data.meta.total_count
        } catch (err) {
          const res = err.response;
          let errorText = "Could not get races, please refresh and try again";

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

        this.getMoreRaces(1)
      },
      closeModals() {
        this.showCreateRaceModal = false;
      }
    }
  }
</script>

<style scoped>

</style>