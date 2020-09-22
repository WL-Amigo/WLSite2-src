<template>
  <div class="w-full">
    <template v-for="(image, idx) in images">
      <g-image :key="idx" v-if="page === idx" :src="image" />
    </template>
    <div class="flex flex-row justify-center pt-2">
      <button
        v-for="(_, idx) in images"
        :key="idx"
        class="rounded-full w-4 h-4 mx-2 transition-colors duration-200 ease-out"
        :class="getIndicatorClasses(idx, page)"
        @click="page = idx"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from '@vue/composition-api';

export default defineComponent({
  props: {
    images: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  setup() {
    const page = ref(0);
    const getIndicatorClasses = (idx: number, currentPage: number) =>
      idx === currentPage ? ['bg-gray-600'] : ['bg-gray-300'];

    return {
      page,
      getIndicatorClasses,
    };
  },
});
</script>