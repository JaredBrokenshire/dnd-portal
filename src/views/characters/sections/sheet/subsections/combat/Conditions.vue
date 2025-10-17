<template>
  <div
    class="border-l border-[#c5313166] cursor-pointer grow shrink basis-0 min-w-0 overflow-hidden relative px-[10px]"
  >
    <div class="uppercase font-bold text-gray-light text-[13px]">Conditions</div>

    <div class="max-h-[57px] overflow-hidden">
      <div class="text-gray-light text-[12px]">Add Active Conditions</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Conditions",
    props: {
      character: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style scoped>

</style>