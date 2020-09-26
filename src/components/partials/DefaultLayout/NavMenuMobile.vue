<template>
  <div class="relative">
    <button class="p-2" @click="isOpen = true">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="w-4 h-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>

    <div :class="menuAreaClasses" class="z-nav">
      <div
        class="w-screen h-screen absolute inset-0 bg-black bg-opacity-75 text-white py-4 flex flex-col justify-center"
      >
        <button class="absolute right-0 top-0 p-4" @click="isOpen = false">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="fill-current w-8 h-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div
          class="divide-y-2 divide-white divide-dashed divide-opacity-50 mx-4 flex flex-col"
        >
          <g-link to="/" class="" @click.native="isOpen = false">
            <div class="my-2 p-2 bg-white bg-opacity-25 text-xl">
              制作物一覧
            </div>
          </g-link>
          <g-link to="/profile/" class="" @click.native="isOpen = false">
            <div class="my-2 p-2 bg-white bg-opacity-25 text-xl">
              プロフィール
            </div>
          </g-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api';

export default defineComponent({
  setup() {
    const isOpen = ref(false);
    const menuAreaClasses = computed<string[]>(() => {
      const defaultClasses = [
        'h-screen',
        'fixed',
        'top-0',
        'overflow-hidden',
        'transition-menu',
        'duration-200',
        'ease-out',
      ];
      return isOpen.value
        ? defaultClasses.concat(['w-screen', 'left-0'])
        : defaultClasses.concat(['w-0', 'left-1/2']);
    });

    return {
      isOpen,
      menuAreaClasses,
    };
  },
});
</script>
