<template>
  <div class="w-full bg-character-sheet-header text-white py-8">
    <div class="mx-auto max-w-[1200px]">
      <router-link
        :to="{name: 'characters'}"
      >
        <c-button
          class="max-w-fit flex gap-1 mb-2 text-sm"
        >
          <feather-icon
            class="mb-[.125rem]"
            icon="ChevronLeftIcon"
          />
          Back to Characters
        </c-button>
      </router-link>
      <div class="flex items-center gap-4">
        <tooltip
          position="bottom"
          text="Upload Profile Picture"
        >
          <img
            :src="profilePictureURL"
            alt="Profile Picture"
            class="w-[100px] aspect-square border-2 border-fighter rounded cursor-pointer transition-200 hover:brightness-[125%] hover:bg-gray"
            @click="showUploadProfilePictureModal = true"
          >
        </tooltip>
        <div>
          <h1 class="text-2xl font-bold">{{ character.name }}</h1>
          <div class="text-sm text-gray-light">{{ character.pronouns && `${character.pronouns} | ` }}
            {{ character.race.name }} | {{ character.class.name }}
          </div>
          <div>Level {{ character.level }}</div>
        </div>
      </div>
    </div>

    <modal
      id="modal-upload-character-profile-picture"
      :visible="showUploadProfilePictureModal"
      class="text-black"
      size="md"
      title="Upload Profile Picture"
      @close="closeModals"
    >
      <upload-profile-picture-modal
        @close="closeModals"
        @update="uploadProfilePicture"
      />
    </modal>
  </div>
</template>

<script>
  import HelperService from "@/services/HelperService";
  import CButton from "@/components/ui/CustomButton.vue";
  import Tooltip from "@/components/ui/Tooltip.vue";
  import Modal from "@/components/ui/Modal.vue";
  import UploadProfilePictureModal from "@/views/characters/sections/UploadProfilePictureModal.vue";

  export default {
    name: 'CharacterSheetHeader',
    components: {UploadProfilePictureModal, Modal, Tooltip, CButton},
    props: {
      character: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        showUploadProfilePictureModal: false,
        loading: false,
      }
    },
    computed: {
      profilePictureURL() {
        if (this.$props.character.profile_picture) {
          return `${HelperService.getApiUrl()}/files/${
            this.$props.character.profile_picture.file_location
          }/${this.$props.character.profile_picture.filename}`;
        }

        return "";
      }
    },
    methods: {
      async uploadProfilePicture(profilePicture) {
        this.$emit('update', this.$props.character, profilePicture);
        this.closeModals()
      },
      closeModals() {
        this.showUploadProfilePictureModal = false;
      }
    }
  }
</script>

<style scoped>

</style>