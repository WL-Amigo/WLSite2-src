<template>
  <external-link :href="href" class="text-blue-700 hover:text-blue-400">
    <slot />
  </external-link>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import LinkComponent from './SafeExternalLink.vue';

export default defineComponent({
  props: {
    href: {
      type: String,
      required: true
    }
  },
  setup() {
    return {};
  },
  components: {
    'external-link': LinkComponent
  }
});
</script>
