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
        <figure class="relative w-full h-full">
          <transition
            :enter-class="enterTransitionClasses"
            enter-active-class="transition duration-200 transform-gpu"
            :leave-to-class="leaveTransitionClasses"
            leave-active-class="transition duration-200 transform-gpu"
          >
            <template v-for="(image, idx) in images">
              <img
                :src="image"
                :key="idx"
                v-if="idx === currentIndex"
                height="100%"
                width="100%"
                class="object-scale-down absolute inset-0 w-full h-full"
              />
            </template>
          </transition>
        </figure>
      </div>

      <div
        class="absolute left-0 top-0 w-8 lg:w-12 h-full flex flex-row items-center"
        v-if="isChangeButtonsVisible"
      >
        <div
          class="relative flex flex-row items-center justify-center h-16 lg:h-24 w-full bg-white bg-opacity-50 hover:bg-opacity-100 cursor-pointer"
          @click.stop="onPrev"
        >
          <chevron-left class="text-black w-8 h-8 lg:w-12 lg:h-12" />
        </div>
      </div>
      <div
        class="absolute right-0 top-0 w-8 lg:w-12 h-full flex flex-row items-center"
        v-if="isChangeButtonsVisible"
      >
        <div
          class="relative flex flex-row items-center justify-center h-16 lg:h-24 w-full bg-white bg-opacity-50 hover:bg-opacity-100 cursor-pointer"
          @click.stop="onNext"
        >
          <chevron-right class="text-black w-8 h-8 lg:w-12 lg:h-12" />
        </div>
      </div>
      <div class="absolute right-0 top-0 w-12 h-12 lg:w-16 lg:h-16">
        <div
          class="relative flex flex-row items-center justify-center w-full h-full bg-white bg-opacity-50 hover:bg-opacity-100 cursor-pointer"
          @click.stop="onClose"
        >
          <close class="text-black w-8 h-8 lg:w-12 lg:h-12" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  ref,
  watch,
} from '@vue/composition-api';
import ChevronLeft from '../icons/ChevronLeft.vue';
import ChevronRight from '../icons/ChevronRight.vue';
import XIcon from '../icons/X.vue';

const transitionClassesOriginRight = ['translate-x-1/4', 'opacity-0'].join(' ');
const transitionClassesOriginLeft = ['-translate-x-1/4', 'opacity-0'].join(' ');

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
    const enterTransitionClasses = ref(transitionClassesOriginRight);
    const leaveTransitionClasses = ref(transitionClassesOriginLeft);

    const currentIndex = ref(0);
    const onNext = () => {
      enterTransitionClasses.value = transitionClassesOriginRight;
      leaveTransitionClasses.value = transitionClassesOriginLeft;
      currentIndex.value = (currentIndex.value + 1) % props.images.length;
    };
    const onPrev = () => {
      enterTransitionClasses.value = transitionClassesOriginLeft;
      leaveTransitionClasses.value = transitionClassesOriginRight;
      currentIndex.value =
        (currentIndex.value - 1 + props.images.length) % props.images.length;
    };
    const isChangeButtonsVisible = computed(() => props.images.length > 1);

    const onClose = () => ctx.emit('update:isOpen', false);

    watch(
      () => props.isOpen,
      () => (currentIndex.value = props.indexOnMounted),
      { flush: 'pre' }
    );

    return {
      currentIndex,
      onNext,
      onPrev,
      onClose,
      isChangeButtonsVisible,
      enterTransitionClasses,
      leaveTransitionClasses,
    };
  },
  components: {
    'chevron-left': ChevronLeft,
    'chevron-right': ChevronRight,
    close: XIcon,
  },
});
</script>
