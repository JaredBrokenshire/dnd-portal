<template>
  <div class="flex-center">
    <div class="text-center">
      <h1 class="text-xl font-bold">404 Page Not Found</h1>
      The page you were looking for could not be found
      <c-button @click="home">Home</c-button>
    </div>
  </div>
</template>

<script>

  import CButton from "@/components/ui/CustomButton.vue";

  export default {
    name: "Error404",
    components: {CButton},
    methods: {
      home() {
        this.$router.push("/")
      }
    }
  }
</script>

<style scoped>

</style>