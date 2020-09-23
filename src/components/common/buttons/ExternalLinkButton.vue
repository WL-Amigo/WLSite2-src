<template>
  <external-link
    :href="href"
    :class="buttonClasses"
    class="inline-flex flex-row items-center"
  >
    <export-icon class="w-4 h-4 mr-1" />
    <slot />
  </external-link>
</template>

<script lang="ts">
import { defineComponent, toRef } from '@vue/composition-api';
import { defineEnumProperty } from '@/utils/vue/props';
import { InfoLevel } from '../InfoLevel';
import { useButtonClasses } from './ButtonCompositions';
import ExternalLinkComponent from '../link/SafeExternalLink.vue';

import ExportIcon from '@/components/common/icons/Export.vue';

export default defineComponent({
  props: {
    href: String,
    type: defineEnumProperty<InfoLevel>('neutral'),
  },
  setup(props) {
    return {
      buttonClasses: useButtonClasses(toRef(props, 'type')),
    };
  },
  components: {
    'export-icon': ExportIcon,
    'external-link': ExternalLinkComponent,
  },
});
</script>
