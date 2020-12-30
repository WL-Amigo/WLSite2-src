<template>
  <div class="w-full h-12 lg:h-16 relative cursor-pointer" @click="onClick">
    <g-image :src="gsrc" class="absolute inset-0 w-full h-full object-cover" />
    <div
      class="absolute inset-0 w-full h-full flex flex-row items-center justify-center lg:justify-start pl-0 lg:pl-8 bg-black bg-opacity-75 hover:bg-white hover:bg-opacity-75 transition-colors group"
    >
      <span
        class="text-white group-hover:text-black font-bold text-2xl lg:text-3xl"
        >{{ title }}</span
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: {
    gsrc: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  setup(_, ctx) {
    const onClick = () => ctx.emit('click');

    return {
      onClick,
    };
  },
});
</script>
