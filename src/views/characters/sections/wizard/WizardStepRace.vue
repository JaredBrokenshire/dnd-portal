<template>
  <div>
    <card
      v-if="$attrs.race_id !== 0 && selectedRace !== null"
      :title="selectedRace.name"
    >
      <div class="flex gap-4">
        <div class="flex-grow">
          <div>{{ selectedRace.short_description }}</div>
        </div>
        <div class="flex-center flex-col">
          <img
            :src="getRaceLogoUrl(selectedRace)"
            alt=""
            class="h-[100px] aspect-square rounded object-contain"
          >
          <c-button
            class="my-2"
            variant="danger"
            @click="toggleRemoveModal"
          >
            Remove Race
          </c-button>
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
              @input="getMoreRaces"
            />
          </div>
          <div class="w-fit">
            <c-button @click="clearFilters">Clear Filters</c-button>
          </div>
        </div>
      </card>

      <div
        v-for="race in races"
        :key="race.id"
        class="bg-white p-2 rounded flex-between gap-4 cursor-pointer transition-all outline outline-white hover:outline-gray-light"
        @click="selectRace(race)"
      >
        <div class="flex items-center gap-4">
          <img
            :src="getRaceLogoUrl(race)"
            alt=""
            class="w-[60px] h-[60px] rounded object-contain"
          >
          <h4 class="text-xl font-bold">
            {{ race.name }}
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
        v-if="races.length === 0"
        class="text-center text-2xl my-8"
      >
        No Races match your current filters
      </div>

    </div>

    <modal
      id="modal-confirm-add-race"
      :visible="showConfirmModal && !!selectedRace"
      size="md"
      title="CONFIRM ADD RACE"
      @close="closeModals"
    >
      <confirm-add-race-modal
        :race="selectedRace"
        @close="closeModals"
        @confirm="update"
      />
    </modal>


    <modal
      id="modal-confirm-remove-race"
      :visible="showRemoveModal"
      side="md"
      title="CONFIRM REMOVE RACE"
      @close="closeModals"
    >
      <delete-modal
        type="race"
        @close="closeModals"
        @delete="removeRace"
      />
    </modal>
  </div>
</template>

<script>
  import Card from "@/components/ui/Card.vue";
  import Modal from "@/components/ui/Modal.vue";
  import RaceService from "@/services/RaceService";
  import HelperService from "@/services/HelperService";
  import CButton from "@/components/ui/CustomButton.vue";
  import TextInput from "@/components/ui/input/TextInput.vue";
  import ConfirmAddRaceModal from "@/views/characters/sections/wizard/ConfirmAddRaceModal.vue";
  import DeleteModal from "@/components/modals/DeleteModal.vue";

  export default {
    name: 'WizardStepRace',
    components: {DeleteModal, ConfirmAddRaceModal, Modal, TextInput, Card, CButton},
    data() {
      return {
        races: [],
        loading: false,
        filters: {
          page: 0,
          page_size: 100,
          search: "",
        },
        selectedRace: null,
        showConfirmModal: false,
        showRemoveModal: false
      }
    },
    mounted() {
      this.getRaces();

      if (this.$attrs.race_id !== 0) {
        this.getRace()
      }
    },
    methods: {
      getMoreRaces(page) {
        this.filters.page = page - 1;
        this.getRaces()
      },
      async getRaces() {
        this.loading = true
        try {
          const res = await RaceService.list(this.filters)
          this.races = res.data.data || []
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
      async getRace() {
        this.loading = true
        try {
          const res = await RaceService.get(this.$attrs.race_id);
          this.selectedRace = res.data;
        } catch (err) {
          const res = err.response;
          let errorText = "Could not get race, please refresh and try again";

          if (res && res.data.error) {
            errorText = res.data.error;
          }

          HelperService.errorToast(this.$toast, err, errorText)
        } finally {
          this.loading = false
        }
      },
      getRaceLogoUrl(race) {
        if (race.logo) {
          return `${HelperService.getApiUrl()}/files/${
            race.logo.file_location
          }/${race.logo.filename}`;
        }
        return ""
      },
      selectRace(race) {
        this.selectedRace = race;
        this.showConfirmModal = true;
      },
      closeModals() {
        this.showConfirmModal = false;
        this.showRemoveModal = false;
      },
      update() {
        if (this.selectedRace) {
          this.$emit("update", {race_id: this.selectedRace.id});
        }
        this.closeModals()
      },
      clearFilters() {
        this.filters = {
          page: 0,
          page_size: 100,
          search: "",
        }

        this.getRaces()
      },
      toggleRemoveModal() {
        this.showRemoveModal = true;
      },
      removeRace() {
        this.$emit('update', {race_id: 0})
        this.closeModals()
      }
    }
  }
</script>

<style scoped>

</style>