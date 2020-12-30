<template>
  <transition
    enter-class="opacity-0"
    enter-active-class="transition duration-200 transform-gpu"
    leave-to-class="opacity-0"
    leave-active-class="transition duration-200 transform-gpu"
  >
    <div
      class="z-modal bg-black bg-opacity-50 fixed top-0 left-0 h-full w-full"
      @click="onClose"
      v-if="isOpen"
    >
      <div
        class="relative w-full h-full lg:p-8 flex flex-row justify-center items-center"
      >
        <transition
          enter-class="translate-x-full opacity-0"
          enter-active-class="transition duration-200 transform-gpu"
          leave-to-class="-translate-x-full opacity-0"
          leave-active-class="transition duration-200 transform-gpu"
        >
          <template v-for="(image, idx) in images">
            <g-image v-if="idx === currentIndex" :src="image" :key="idx" />
          </template>
        </transition>
      </div>

      <div
        class="absolute left-0 top-0 w-4 h-full"
        v-if="isChangeButtonsVisible"
      >
        <div
          class="relative flex flex-row items-center h-1/2 bg-white bg-opacity-50 hover:bg-opacity-100"
          @click.stop="onPrev"
        >
          <chevron-left />
        </div>
      </div>
      <div
        class="absolute right-0 top-0 w-4 h-full"
        v-if="isChangeButtonsVisible"
      >
        <div
          class="relative flex flex-row items-center h-1/2 bg-white bg-opacity-50 hover:bg-opacity-100"
          @click.stop="onNext"
        >
          <chevron-right />
        </div>
      </div>
      <div class="absolute right-0 top-0 w-12 h-12 lg:w-16 lg:h-16">
        <div
          class="relative flex flex-row items-center justify-center w-full h-full bg-white bg-opacity-50 hover:bg-opacity-100"
          @click.stop="onClose"
        >
          <close class="text-black w-8 h-8 lg:w-12 lg:h-12" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from '@vue/composition-api';
import ChevronLeft from '../icons/ChevronLeft.vue';
import ChevronRight from '../icons/ChevronRight.vue';
import XIcon from '../icons/X.vue';

export default defineComponent({
  props: {
    images: {
      type: Array as PropType<string[]>,
      required: true,
    },
    indexOnMounted: {
      type: Number,
      required: true,
    },
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, ctx) {
    const currentIndex = ref(0);
    const onNext = () => {
      currentIndex.value = (currentIndex.value + 1) % props.images.length;
    };
    const onPrev = () => {
      currentIndex.value =
        (currentIndex.value - 1 + props.images.length) % props.images.length;
    };
    const isChangeButtonsVisible = computed(() => props.images.length > 1);

    const onClose = () => ctx.emit('update:isOpen', false);

    return {
      currentIndex,
      onNext,
      onPrev,
      onClose,
      isChangeButtonsVisible,
    };
  },
  components: {
    'chevron-left': ChevronLeft,
    'chevron-right': ChevronRight,
    close: XIcon,
  },
});
</script>
