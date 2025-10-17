<template>
  <div class="flex items-center py-[8px] cursor-pointer leading-[1]">
    <!-- Equipped Indicator -->
    <div class="w-[40px]">
      <div v-if="$props.item.item.equippable">
        <div class="flex flex-wrap">
          <div
            :class="`w-[20px] h-[20px] min-w-[20px] m-[2px] cursor-pointer border ${$props.item.equipped ? 'border-fighter' : 'border-gray-light'} bg-[#10161A] relative`"
            @click="toggleItemEquipped"
          >
            <div
              :class="`absolute bg-fighter block w-[10px] h-[10px] top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] transition-200 ${$props.item.equipped ? 'scale-100' : 'scale-0'}`"
            />
          </div>
        </div>
      </div>
      <div
        v-else
        class="text-gray-light text-[18px] ml-[7px]"
      >
        --
      </div>
    </div>

    <!-- Name -->
    <div class="w-[200px]">
      <div class="cursor-pointer text-[14px] flex flex-col gap-1">
        <span
          v-if="itemRarity === 'Common'"
          class="text-common"
        >
          {{ $props.item.item.name }}
        </span>
        <span
          v-if="itemRarity === 'Uncommon'"
          class="text-uncommon"
        >
          {{ $props.item.item.name }}
        </span>
        <span
          v-if="itemRarity === 'Rare'"
          class="text-rare"
        >
          {{ $props.item.item.name }}
        </span>
        <span
          v-if="itemRarity === 'Very Rare'"
          class="text-very-rare"
        >
          {{ $props.item.item.name }}
        </span>
        <span
          v-if="itemRarity === 'Legendary'"
          class="text-legendary"
        >
          {{ $props.item.item.name }}
        </span>
        <span class="text-[11px] text-gray-light">{{ $props.item.item.origin }}</span>
      </div>
    </div>

    <!-- Weight -->
    <div class="overflow-hidden overflow-ellipsis w-[50px]">
      <span class="cursor-default">
        <span class="text-[14px] text-white">{{ $props.item.item.weight * $props.item.quantity }}</span>
        <span class="text-[12px] text-gray-light ml-[.188rem]">lb.</span>
      </span>
    </div>

    <!-- Quantity -->
    <div class="overflow-hidden overflow-ellipsis w-[35px]">
      <span class="cursor-default">
        <span class="text-[14px] text-white">{{ $props.item.quantity }}</span>
      </span>
    </div>

    <!-- Cost -->
    <div class="overflow-hidden overflow-ellipsis w-[50px]">
      <span class="cursor-default">
        <span class="text-[14px] text-white">{{ $props.item.item.cost * $props.item.quantity }}</span>
      </span>
    </div>

    <!-- Notes -->
    <div class="text-gray-light grow shrink basis-0 text-[11px]">{{ $props.item.item.notes }}</div>

  </div>
</template>

<script>
  import HelperService from "@/services/HelperService";
  import CharacterInventoryItemService from "@/services/CharacterInventoryItemService";

  export default {
    name: "ItemDisplay",
    props: {
      characterId: {
        type: Number,
        required: true
      },
      item: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        loading: false,
      }
    },
    computed: {
      itemRarity() {
        return this.$props.item.item.rarity;
      }
    },
    methods: {
      async toggleItemEquipped() {
        if (this.loading) return;

        this.loading = true;
        try {
          const dto = {
            equipped: !this.$props.item.equipped,
          }

          await CharacterInventoryItemService.update(this.$props.characterId, this.$props.item.id, dto)
          this.$emit('update')
        } catch (err) {
          const res = err.response;
          let errorText = "Could not update character inventory item, please refresh and try again";

          if (res && res.data.error) {
            errorText = res.data.error;
          }

          HelperService.errorToast(this.$toast, err, errorText)
        } finally {
          this.loading = false;
        }
      },
    }
  }
</script>