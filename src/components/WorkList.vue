<template>
  <div class="container mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      <work-card v-for="work in works" :key="work.title" :work="work" />
    </div>
  </div>
</template>

<static-query>
query {
  allWork(sortBy: "publishDate") {
    edges {
      node {
        id
        title
        publishDate
        state
        category
        technologies
        banner (width: 800, height: 400, quality: 85)
      }
    }
  }
}
</static-query>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';
import WorkCard from './partials/WorkList/WorkCard.vue';
import { useStaticQuery } from '@/compat/gridsome-composition';
import { Work } from '@/types/Work';

type AllWorkQuery = {
  allWork: {
    edges: {
      node: Work;
    }[];
  };
};

export default defineComponent({
  setup(props, ctx) {
    const staticQuery = useStaticQuery<AllWorkQuery>();
    return {
      works: computed<Work[]>(() => {
        const staticQueryLocal = staticQuery.value;
        if (!staticQueryLocal) {
          return [];
        }
        return staticQueryLocal.allWork.edges.map((e) => e.node);
      }),
    };
  },
  components: {
    'work-card': WorkCard,
  },
});
</script>
