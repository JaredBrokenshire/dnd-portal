<template>
  <div class="w-[107px] h-[34px] relative flex items-center mb-[5px] cursor-pointer">
    <div class="absolute top-0 bottom-0 left-0 right-0 overflow-hidden">
      <svg viewBox="0 0 116.1 34">
        <g transform="translate(-683.000000, -651.000000)">
          <path
            d="M789.8,651h-22l-0.3,0.2c-1.2,0.8-2.3,1.7-3.2,2.7h-75.6l-0.3,0.4c-0.7,1.2-3,4.5-4.9,5.4 l-0.5,0.2l0,16.1l0.5,0.2c1.8,0.9,4.1,4.2,4.9,5.4l0.3,0.4h75.6c1,1,2.1,1.9,3.2,2.7l0.3,0.2h21.9l0.3-0.2c5.6-3.8,9-10,9-16.8 s-3.4-13-9-16.8L789.8,651z M797.1,668c0,5.8-2.9,11.2-7.6,14.5h-10.3c-4.7-2.1-11.1-3.2-14.3-3.8c-2.3-3-3.7-6.8-3.7-10.7v0 c0-3.9,1.3-7.7,3.7-10.7c3.1-0.6,9.5-1.7,14.3-3.8h10.3C794.3,656.8,797.1,662.2,797.1,668L797.1,668z M752.8,655.6 c0.8,0.7,2.5,1.8,5.7,2.1c-0.9,1.5-3,5.5-3,10.3s2,8.8,3,10.3c-3.2,0.3-4.9,1.4-5.7,2.1h-55.4c-3.1-1.1-11.1-4.5-12.9-9.3l0-6.2 c1.9-4.8,9.9-8.1,12.9-9.3H752.8z M759.6,657.8c0.6,0,1.3,0,2,0c-1.8,3.1-2.8,6.6-2.8,10.3v0c0,3.7,1,7.2,2.9,10.3 c-0.7,0-1.3-0.1-2,0c-0.6-1-3.1-5.2-3.1-10.2S759,658.8,759.6,657.8L759.6,657.8z M768.9,682.5c-1.1-0.8-2.1-1.7-3-2.6 c2.4,0.5,5.1,1.3,8.3,2.6H768.9L768.9,682.5z M762.2,679.3c0.3,0.4,0.5,0.7,0.8,1.1h-8.5C755.9,679.7,758.3,678.9,762.2,679.3 L762.2,679.3z M689.3,680.4c-0.7-1.1-2.8-4.1-4.9-5.4v-1.9c2.3,3.4,7.1,5.9,10.4,7.3H689.3L689.3,680.4z M684.4,661 c2.1-1.3,4.2-4.3,4.9-5.4h5.5c-3.3,1.4-8,3.9-10.4,7.3V661L684.4,661z M763,655.6c-0.3,0.4-0.5,0.7-0.8,1.1 c-3.9,0.4-6.3-0.4-7.7-1.1H763z M765.9,656.1c0.9-1,1.9-1.9,3-2.6h5.3C771,654.8,768.2,655.6,765.9,656.1L765.9,656.1z"
            fill="#972e2e80"
          />
        </g>
      </svg>
    </div>

    <h3 class="sr-only">{{ $props.ability }} Saving Throw</h3>

    <!-- Proficiency Indicator -->
    <div class="relative w-[5px]">
      <span :aria-label="$props.proficient ? 'Proficient' : 'Not Proficient'">
        <span class="cursor-default">
          <svg
            v-if="$props.proficient"
            class="absolute top-[-50%] left-[-3px] translate-y-[-50%] inline-flex h-[10px] w-[10px]"
            viewBox="0 0 10 10"
          >
            <g data-name="Layer 2">
              <g data-name="v1">
                <circle
                  cx="5"
                  cy="5"
                  fill="#972e2e"
                  r="5"
                />
              </g>
            </g>
          </svg>

          <span
            v-else
            class="absolute top-[-50%] left-[-3px] translate-y-[-50%] bg-[#333] border border-dashed border-gray inline-flex w-[10px] h-[10px] rounded-full"
          />
        </span>
      </span>
    </div>

    <div class="flex-1 text-[12px] font-bold uppercase text-center text-white">
      <abbr
        :title="$props.ability"
        aria-hidden="true"
      >
        {{ $props.ability.substring(0, 3) }}
      </abbr>
    </div>

    <div class="cursor-pointer text-center w-[40px] text-[14px]">
      <button class="bg-transparent w-[42px] h-[36px] border-none text-white">
        <span class="inline-flex items-center mb-1">
          <span class="text-gray text-[.75rem] mr-[.063rem]">{{ $props.modifier >= 0 ? '+' : '-' }}</span>
          <span>{{ $props.modifier }}</span>
        </span>
      </button>

      <svg
        class="h-[36px] w-[36px] absolute top-[-2px] left-[71px] block fill-transparent transition-200 hover:fill-[#972e2e20]"
        viewBox="0 0 41 36"
      >
        <path
          d="M10.8724 1H30.3426C30.9246 1 31.4467 1.15738 31.8408 1.45807C35.0159 3.88086 40 9.69489 40 18C40 26.3051 35.0159 32.1191 31.8408 34.5419C31.4467 34.8426 30.9246 35 30.3426 35H10.8724C10.1907 35 9.57613 34.7818 9.1371 34.3765C6.08124 31.555 1.5 25.4781 1.5 18C1.5 10.5219 6.08124 4.44504 9.1371 1.62354C9.57613 1.21818 10.1907 1 10.8724 1Z"
          stroke="#972e2e00"
          stroke-width="1"
        />
      </svg>

    </div>
  </div>
</template>

<script>
  export default {
    name: "SavingThrowDisplay",
    props: {
      ability: {
        type: String,
        required: true
      },
      proficient: {
        type: Boolean,
        default: false
      },
      modifier: {
        type: Number,
        required: true
      }
    },
  }
</script>

<style scoped>

</style>