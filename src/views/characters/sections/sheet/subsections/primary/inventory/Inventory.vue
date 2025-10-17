<template>
  <div class="h-full max-h-full min-h-0">
    <section class="flex flex-col max-h-full w-full h-[600px]">
      <h2 class="sr-only">Inventory</h2>

      <div class="flex-between text-white border-b border-fighter-faded mb-[10px] pb-[10px]">
        <div class="text-[14px] font-bold uppercase">Weight Carried: {{ totalWeight }} <span class="lowercase text-gray-light">lb.</span> </div>

        <!-- TODO: Money Section -->
      </div>

      <div class="flex flex-col min-h-0 grow shrink basis-0">
        <div class="flex flex-col min-h-0">
          <div class="overflow-y-auto">
            <div class="flex text-gray-light w-full">
              <div class="font-bold text-[10px] pb-[5px] uppercase w-[40px]">Active</div>
              <div class="font-bold text-[10px] pb-[5px] uppercase w-[200px]">Name</div>
              <div class="font-bold text-[10px] pb-[5px] uppercase w-[50px]">Weight</div>
              <div class="font-bold text-[10px] pb-[5px] uppercase w-[35px]">QTY</div>
              <div class="font-bold text-[10px] pb-[5px] uppercase w-[50px]">Cost (GP)</div>
              <div class="font-bold text-[10px] pb-[5px] uppercase grow shrink basis-0">Notes</div>
            </div>

            <inventory-section
              v-for="key in inventoryMap.keys()"
              :key="`inventory-section-${key}`"
              :items="inventoryMap.get(key)"
              :title="key"
              :character-id="$props.character.id"
              @update="$emit('update')"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import InventorySection from "@/views/characters/sections/sheet/subsections/primary/inventory/InventorySection.vue";

  export default {
    name: "Inventory",
    components: {InventorySection},
    props: {
      character: {
        type: Object,
        required: true
      }
    },
    computed: {
      inventoryMap() {
        const map = new Map()

        for (const item of this.$props.character.inventory) {
          if (map.keys().toArray().includes(item.location)) {
            map.get(item.location).push(item)
          } else {
            map.set(item.location, [item])
          }
        }

        return map
      },
      totalWeight() {
        let weight = 0.0

        for (const item of this.$props.character.inventory) {
          weight += item.item.weight * Math.max(item.quantity, 1)
        }
        return Math.round(weight * 10) / 10
      }
    },
  }
</script>

<style scoped>

</style>