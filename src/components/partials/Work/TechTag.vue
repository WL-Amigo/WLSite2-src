<template>
  <external-link
    :href="href"
    class="rounded bg-blue-200 hover:bg-blue-300 px-2 mr-1 mb-1 flex flex-row items-center text-blue-900"
  >
    <export-icon v-if="href.length > 0" />
    <span class="inline">{{ label }}</span>
  </external-link>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import ExportIcon from '@/components/common/icons/Export.vue';
import ExternalLinkComponent from '@/components/common/link/SafeExternalLink.vue';
import TechnologiesDict from '@/assets/embeddedContents/Technologies.yaml';

export default defineComponent({
  props: {
    label: {
      type: String,
      required: true
    }
  },
  setup(props) {
    return {
      href: TechnologiesDict[props.label]?.url ?? ''
    };
  },
  components: {
    'export-icon': ExportIcon,
    'external-link': ExternalLinkComponent
  }
});
</script>
