<template>
  <a :href="href" rel="noopener noreferrer" target="_blank">
    <slot />
  </a>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: {
    href: {
      type: String,
      required: true
    }
  },
  setup() {
    return {};
  }
});
</script>
