<template>
  <component
    :is="layout"
    id="app"
    class="d-flex flex-column"
  >
    <template #default>
      <router-view />
    </template>
  </component>
</template>

<script>
  const LayoutHeader = () => import('@/layouts/LayoutHeader.vue')
  const LayoutFull = () => import('@/layouts/LayoutFull.vue')

  export default {
    name: "App",
    components: {
      // Layouts
      LayoutHeader,
      LayoutFull,
    },
    computed: {
      layout() {
        if (this.$route.meta.layout === 'full') return 'layout-full'
        return `layout-header`
      },
    }
  }
</script>

<style>
</style>