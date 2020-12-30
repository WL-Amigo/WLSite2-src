<template>
  <div class="w-full">
    <div class="w-full group relative">
      <template v-for="(image, idx) in images">
        <div class="flex flex-row justify-center" :key="idx">
          <g-image v-if="page === idx" :src="image" />
        </div>
      </template>
      <div
        class="lg:opacity-0 group-hover:opacity-100 transition-opacity absolute inset-0 w-full h-full"
      >
        <div
          class="absolute left-0 top-0 w-8 lg:w-12 h-full flex flex-row items-center"
        >
          <div
            class="flex flex-row justify-center items-center h-1/2 w-full bg-white bg-opacity-75 lg:bg-opacity-25 hover:bg-opacity-75 transition-colors cursor-pointer text-black"
            @click.stop="onPrev"
          >
            <chevron-left class="w-6 h-6 lg:w-8 lg:h-8" />
          </div>
        </div>
        <div
          class="absolute right-0 top-0 w-8 lg:w-12 h-full flex flex-row items-center"
        >
          <div
            class="flex flex-row justify-center items-center h-1/2 w-full bg-white bg-opacity-75 lg:bg-opacity-25 hover:bg-opacity-75 transition-colors cursor-pointer text-black"
            @click.stop="onNext"
          >
            <chevron-right class="w-6 h-6 lg:w-8 lg:h-8" />
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-row justify-center pt-2">
      <button
        v-for="(_, idx) in images"
        :key="idx"
        class="rounded-full w-4 h-4 mx-2 transition-colors duration-200 ease-out focus:outline-none"
        :class="getIndicatorClasses(idx, page)"
        @click="page = idx"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from '@vue/composition-api';
import ChevronLeft from '../icons/ChevronLeft.vue';
import ChevronRight from '../icons/ChevronRight.vue';

export default defineComponent({
  props: {
    images: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  setup(props) {
    const page = ref(0);
    const getIndicatorClasses = (idx: number, currentPage: number) =>
      idx === currentPage ? ['bg-gray-600'] : ['bg-gray-300'];
    const onNext = () => {
      page.value = (page.value + 1) % props.images.length;
    };
    const onPrev = () => {
      page.value = (page.value + props.images.length - 1) % props.images.length;
    };

    // props.images を監視して、変更があったらインデックスを0に戻すようにする
    watch(
      () => props.images,
      () => (page.value = 0),
      { flush: 'pre' }
    );

    return {
      page,
      onNext,
      onPrev,
      getIndicatorClasses,
    };
  },
  components: {
    'chevron-left': ChevronLeft,
    'chevron-right': ChevronRight,
  },
});
</script>
