<template>
  <div class="container mx-auto px-2">
    <personal-info />
    <tech-info />
    <career-info class="mt-4" />
  </div>
</template>

<script lang="ts">
import CareerInfo from '@/components/partials/Profile/Career.vue';
import PersonalInfo from '@/components/partials/Profile/Personal.vue';
import TechnologiesInfo from '@/components/partials/Profile/Technologies.vue';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  metaInfo: {
    title: 'Profile',
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
