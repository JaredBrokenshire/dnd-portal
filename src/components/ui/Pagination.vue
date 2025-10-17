<template>
  <div
    v-if="pages.length > 1"
    class="flex items-center justify-center gap-4 mt-4"
  >
    <div class="w-fit">
      <c-button
        :disabled="currentPage === 1"
        variant="primary"
        @click="changePage(currentPage - 1)"
      >
        Prev
      </c-button>
    </div>

    <button
      v-for="page in pages"
      :key="page"
      :class="[
        'px-3 py-1 rounded-md border text-lg font-bold cursor-pointer transition-all',
        currentPage === page ? 'bg-primary text-white border-primary-dark' : 'border-primary hover:bg-primary-light'
      ]"
      @click="changePage(page)"
    >
      {{ page }}
    </button>

    <div class="w-fit">
      <c-button
        :disabled="currentPage === totalPages"
        variant="primary"
        @click="changePage(currentPage + 1)"
      >
        Next
      </c-button>
    </div>
  </div>
</template>

<script>
  import CButton from "@/components/ui/CustomButton.vue";

  export default {
    name: 'Pagination',
    components: {CButton},
    props: {
      currentPage: {
        type: Number,
        required: true
      },
      totalPages: {
        type: Number,
        required: true
      },
      maxVisiblePages: {
        type: Number,
        default: 5
      }
    },
    computed: {
      pages() {
        const half = Math.floor(this.maxVisiblePages / 2);
        let start = Math.max(this.currentPage - half, 1);
        let end = start + this.maxVisiblePages - 1;

        if (end > this.totalPages) {
          end = this.totalPages;
          start = Math.max(end - this.maxVisiblePages + 1, 1);
        }

        const range = [];
        for (let i = start; i <= end; i++) {
          range.push(i);
        }
        return range;
      }
    },
    methods: {
      changePage(page) {
        if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
          this.$emit('page-changed', page);
        }
      }
    }
  };
</script>
