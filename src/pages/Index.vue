<template>
  <work-list />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import WorkList from '@/components/WorkList.vue';
import { makeOGPTags } from '@/utils/metainfo/OGP';

export default defineComponent({
  metaInfo: {
    title: 'Works',
    meta: makeOGPTags({
      title: 'Works',
      description: 'アミーゴの制作物一覧',
    }),
  },
  components: {
    'work-list': WorkList,
  },
});
</script>
