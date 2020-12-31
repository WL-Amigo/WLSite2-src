<template>
  <div class="container mx-auto">
    <personal-info />
    <tech-info class="mt-4 lg:mt-0" />
    <career-info class="mt-4" />
  </div>
</template>

<script lang="ts">
import CareerInfo from '@/components/partials/Profile/Career.vue';
import PersonalInfo from '@/components/partials/Profile/Personal.vue';
import TechnologiesInfo from '@/components/partials/Profile/Technologies.vue';
import { defineComponent } from '@vue/composition-api';
import { makeOGPTags } from '@/utils/metainfo/OGP';

export default defineComponent({
  metaInfo: {
    title: 'Profile',
    meta: makeOGPTags({
      title: 'Profile',
      description: 'アミーゴについて、経験のある技術など',
    }),
  },
  setup() {
    return {};
  },
  components: {
    'personal-info': PersonalInfo,
    'career-info': CareerInfo,
    'tech-info': TechnologiesInfo,
  },
});
</script>
