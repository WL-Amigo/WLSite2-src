<template>
  <work-list />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import WorkList from '@/components/WorkList.vue';

export default defineComponent({
  metaInfo: {
    title: 'Works'
  },
  components: {
    'work-list': WorkList
  }
});
</script>
