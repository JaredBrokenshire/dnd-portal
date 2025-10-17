<template>
  <div
    :class="`flex-center bg-[#10161A] h-[21px] w-[21px] m-[2px] min-w-[20px] cursor-pointer hover:border-fighter hover:border-2 ${$props.used ? 'border-2 border-fighter' : 'border border-[#d8d8d8]'}`"
    @click="$emit('toggle-spell-slot-used', !$props.used)"
  >
    <div
      :class="`w-[10px] h-[10px] bg-fighter transition-200 ${$props.used ? 'scale-100' : 'scale-0'}`"
    />
  </div>
</template>

<script>
  export default {
    name: "SpellSlotIndicator",
    props: {
      used: {
        type: Boolean,
        default: false
      }
    },
  }
</script>

<style scoped>

</style>