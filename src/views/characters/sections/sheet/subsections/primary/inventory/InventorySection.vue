<template>
  <div class="flex flex-col mb-8">
    <div class="flex items-center border-b border-[#c5313166] mb-[10px] text-[14px]">
      <div class="flex grow shrink basis-0 font-bold uppercase">
        <div class="flex items-center cursor-pointer">
          <!-- Equip Button -->
          <div class="w-[40px]">
            <div v-if="$props.showEquipButton">Stuff</div>
          </div>
          <div class="text-white w-[200px] uppercase">{{ title }} <span class="text-gray-light">({{ $props.items.length }})</span></div>
          <div class="flex items-center w-[135px]">
            <span>
              <span class="text-white font-bold">{{ sectionWeight }}&nbsp;</span>
              <span class="text-gray-light lowercase">lb.</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <item-display
        v-for="(item, index) in $props.items"
        :key="`item-display-${index}`"
        :item="item"
        :character-id="$props.characterId"
        @update="$emit('update')"
      />
    </div>
  </div>
</template>

<script>
  import ItemDisplay from "@/views/characters/sections/sheet/subsections/primary/inventory/ItemDisplay.vue";

  export default {
    name: "InventorySection",
    components: {ItemDisplay},
    props: {
      title: {
        type: String,
        required: true
      },
      items: {
        type: Array,
        required: true
      },
      showEquipButton: {
        type: Boolean,
        default: false
      },
      characterId: {
        type: Number,
        required: true
      }
    },
    computed: {
      sectionWeight() {
        let weight = 0.0
        for (const item of this.$props.items) {
          weight += item.item.weight * Math.max(item.quantity, 1)
        }
        return weight
      }
    }
  }
</script>