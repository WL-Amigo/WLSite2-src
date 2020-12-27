<template>
  <g-link
    class="overflow-hidden rounded w-full border-l border-r border-b-4 border-gray-500 shadow-sm hover:shadow-md transform hover:-translate-y-1 transition duration-200"
    :to="`/work/${work.id}`"
  >
    <g-image :src="work.banner" />
    <div class="bg-blue-700 text-white font-bold px-2">
      {{ t(work.category) }}
    </div>
    <div class="p-2">
      <h1 class="font-bold text-xl">
        {{ work.title }}
      </h1>
      <p class="text-sm">初出: {{ work.publishDate }}</p>
    </div>
  </g-link>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import { Work } from '@/types/Work';
import { useI18n } from '@/compat/vue-i18n-composable';

export default defineComponent({
  props: {
    work: {
      type: Object as PropType<Work>,
      required: true,
    },
  },
  setup() {
    const i18n = useI18n();
    return {
      t: i18n.t,
    };
  },
});
</script>
