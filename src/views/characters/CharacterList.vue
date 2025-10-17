<template>
  <div>
    <card
      class="mb-4"
      title="Characters"
    >
      <div class="flex-between gap-2">
        <div class="flex-grow">
          This page shows all characters.
        </div>
        <div class="w-fit">
          <c-button variant="primary">
            <router-link :to="{name: 'character-builder'}">
              Create Character
            </router-link>
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
            @input="getMoreCharacters"
          />
        </div>

        <div class="w-fit">
          <c-button @click="clearFilters">Clear Filters</c-button>
        </div>
      </div>
    </card>

    <div v-if="totalCount > 0">
      <div class="grid-3 mb-8">
        <character-card
          v-for="character in characters"
          :key="character.id"
          :character="character"
        />
      </div>

      <pagination
        :current-page="currentPage"
        :total-pages="Math.ceil(totalCount / filters.page_size) "
        @page-changed="getMoreCharacters"
      />
    </div>

    <card
      v-else
      title="No Records"
    >
      No Characters match your current filters.
    </card>
  </div>
</template>

<script>
  import Card from "@/components/ui/Card.vue";
  import HelperService from "@/services/HelperService";
  import CButton from "@/components/ui/CustomButton.vue";
  import Pagination from "@/components/ui/Pagination.vue";
  import CharacterService from "@/services/CharacterService";
  import TextInput from "@/components/ui/input/TextInput.vue";
  import CharacterCard from "@/views/characters/sections/CharacterCard.vue";

  export default {
    name: "CharacterList",
    components: {CharacterCard, Pagination, TextInput, CButton, Card},
    data() {
      return {
        loading: false,
        characters: [],
        currentPage: 1,
        totalCount: 0,
        filters: {
          page: 0,
          page_size: 12,
          search: "",
        },
        showCreateCharacterModal: false,
      }
    },
    mounted() {
      this.getCharacters()
    },
    methods: {
      getMoreCharacters(page) {
        this.currentPage = page;
        this.filters.page = page - 1
        this.getCharacters()
      },
      async getCharacters() {
        this.loading = true;
        try {
          const res = await CharacterService.list(this.filters)
          this.characters = res.data.data
          this.filters.page = res.data.meta.page
          this.filters.page_size = res.data.meta.page_size
          this.totalCount = res.data.meta.total_count
        } catch (err) {
          const res = err.response;
          let errorText = "Could not get characters, please refresh and try again";

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
        this.getMoreCharacters(1)
      },
      closeModals() {
        this.showCreateCharacterModal = false;
      }
    }
  }
</script>

<style scoped>

</style>