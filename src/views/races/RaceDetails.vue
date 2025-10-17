<template>
  <div>
    <router-link
      :to="{name: 'races'}"
      class="flex items-center gap-2 text-lg mb-4 nav-link"
    >
      <feather-icon
        icon="ChevronLeftIcon"
        size="32"
      />
      Back to Races
    </router-link>

    <div v-if="race">
      <div class="flex flex-col lg:flex-row-reverse gap-4">
        <div class="flex-grow sm:max-w-1/2 lg:max-w-1/4">
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
          :title="`${race.name} Details`"
          class="mb-4 flex-grow"
        >
          <div class="flex-between gap-4">
            <div class="self-start">
              <div class="mb-4 description">{{ race.short_description }}</div>
              <div class="text-sm sm:text-lg">
                <div class="flex gap-4">
                  <div class="font-bold flex-grow md:max-w-1/3 lg:max-w-1/4">Creature Type:</div>
                  <div>{{ race.creature_type }}</div>
                </div>
                <div class="flex gap-4">
                  <div class="font-bold flex-grow md:max-w-1/3 lg:max-w-1/4">Size:</div>
                  <div>{{ race.size }}</div>
                </div>
                <div class="flex gap-4">
                  <div class="font-bold flex-grow md:max-w-1/3 lg:max-w-1/4">Base Speed:</div>
                  <div>{{ race.base_speed }} ft.</div>
                </div>
              </div>
            </div>
            <img
              :alt="`${race.name} Logo`"
              :src="logoURL"
              class="hidden md:block w-full max-w-[100px] lg:max-w-[150px] xl:max-w-[200px] rounded-lg aspect-square object-cover"
            >
          </div>
        </card>
      </div>
    </div>

    <modal
      id="modal-update-race"
      :visible="showUpdateModal"
      size="md"
      title="Update Race"
      @close="closeModals"
    >
      <edit-race-modal
        :existing="race"
        @close="closeModals"
        @update="updateRace"
      />
    </modal>

    <modal
      id="modal-delete-race"
      :show-close="false"
      :visible="showDeleteModal"
      size="sm"
      title="Delete Race"
    >
      <delete-modal
        type="race"
        @close="closeModals"
        @delete="deleteRace"
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
  import DeleteModal from "@/components/modals/DeleteModal.vue";
  import EditRaceModal from "@/views/races/sections/EditRaceModal.vue";

  export default {
    name: "RaceDetails",
    components: {EditRaceModal, DeleteModal, Modal, CButton, Card},
    data() {
      return {
        race: null,
        loading: false,
        showUpdateModal: false,
        showDeleteModal: false,
      }
    },
    computed: {
      logoURL() {
        if (this.race.logo) {
          return `${HelperService.getApiUrl()}/files/${
            this.race.logo.file_location
          }/${this.race.logo.filename}`;
        }

        return "";
      }
    },
    mounted() {
      this.getRace()
    },
    methods: {
      async getRace() {
        this.loading = true;
        try {
          const res = await RaceService.get(this.$route.params.id);
          this.race = res.data;
        } catch (err) {
          const res = err.response;
          let errorText = "Could not get race, please refresh and try again";

          if (res && res.data.error) {
            errorText = res.data.error;
          }

          HelperService.errorToast(this.$toast, err, errorText)
        } finally {
          this.loading = false;
        }
      },
      async updateRace(updatedRace, logo) {
        this.loading = true;
        try {
          if (logo) {
            await RaceService.uploadLogo(this.race.id, logo)
          }

          const dto = {
            name: updatedRace.name,
            creature_type: updatedRace.creature_type,
            size: updatedRace.size,
            base_speed: updatedRace.base_speed,
            short_description: updatedRace.short_description,
          }

          const res = await RaceService.update(this.race.id, dto)
          this.race = res.data;

          HelperService.successToast(this.$toast, "Race updated successfully")
          this.closeModals()
        } catch (err) {
          const res = err.response;
          let errorText = "Could not update race, please refresh and try again";

          if (res && res.data.error) {
            errorText = res.data.error;
          }

          HelperService.errorToast(this.$toast, err, errorText)
        } finally {
          this.loading = false;
        }
      },
      async deleteRace() {
        this.loading = true;
        try {
          await RaceService.delete(this.race.id);

          HelperService.successToast(this.$toast, "Race deleted successfully")
          await this.$router.push({name: "races"})
        } catch (err) {
          const res = err.response;
          let errorText = "Could not delete race, please refresh and try again";

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