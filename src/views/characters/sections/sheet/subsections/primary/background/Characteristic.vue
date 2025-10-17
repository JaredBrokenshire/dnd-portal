<template>
  <div class="characteristics__item">
    <p class="characteristics__item-title">{{ $props.title }}</p>
    <p class="characteristics__item-content">{{ $props.content || '--' }}</p>
  </div>
</template>

<script>
  export default {
    name: "Characteristic",
    props: {
      title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        default: '--',
      }
    }
  }
</script>

<style scoped>

</style>