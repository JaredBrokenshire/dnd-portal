<template>
  <div class="m-0 text-gray-light text-[12px]">
    <svg
      v-if="$props.type === 'add'"
      class="h-[14px] w-[14px] mr-[2px] mt-[-2px] inline-flex align-middle"
      viewBox="0 0 24 24"
    >
      <path
        clip-rule="evenodd"
        d="M12.241 1.13253C12.0909 1.05 11.9091 1.05 11.759 1.13252L2.25904 6.35753C2.09927 6.4454 2 6.61329 2 6.79563V17.2044C2 17.3867 2.09927 17.5546 2.25904 17.6425L11.759 22.8675C11.9091 22.95 12.0909 22.95 12.241 22.8675L21.741 17.6425C21.9007 17.5546 22 17.3867 22 17.2044V6.79563C22 6.61329 21.9007 6.4454 21.741 6.35753L12.241 1.13253ZM10.5 6H13.5V10.5H18V13.5H13.5V18H10.5V13.5H6V10.5H10.5V6Z"
        fill="#00c680"
        fill-rule="evenodd"
      />
    </svg>

    <span class="ml-[2px]">{{ $props.text }}</span>
  </div>
</template>

<script>

  export default {
    name: "SavingThrowAdjustment",
    props: {
      type: {
        type: String,
        required: true
      },
      text: {
        type: String,
        required: true
      }
    }
  }
</script>

<style scoped>

</style>