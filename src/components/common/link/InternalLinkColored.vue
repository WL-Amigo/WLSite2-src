<template>
  <g-link :to="to" class="text-blue-700 hover:text-blue-400">
    <slot />
  </g-link>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>
