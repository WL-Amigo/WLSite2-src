<template>
  <div class="container mx-auto">
    <h1 class="text-3xl mb-4">依存パッケージのライセンス一覧</h1>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
      <div
        class="flex flex-row items-center"
        v-for="dl in depsLicenses"
        :key="dl.name"
      >
        <cube class="w-5 h-5" />
        <div class="ml-1">
          <ex-link :href="dl.url">{{ dl.name }}</ex-link>
          <span class="ml-2">({{ dl.license }})</span>
        </div>
      </div>
    </div>

    <h1 class="text-3xl mb-4">アセットのライセンス一覧</h1>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div
        class="flex flex-row items-center"
        v-for="al in assetsLicenses"
        :key="al.name"
      >
        <cube class="w-5 h-5" />
        <div class="ml-1">
          <ex-link :href="al.url">{{ al.name }}</ex-link>
          <span class="ml-2">({{ al.license }})</span>
        </div>
      </div>
    </div>
  </div>
</template>

<static-query>
query {
  assetsLicenses: allLicenses(filter: {category: { eq: "asset"}}) {
    edges {
      node {
        name, license, url
      }
    }
  }
  depsLicenses: allLicenses(filter: {category: {eq: "dependency"}}) {
    edges {
      node {
        name, license, url
      }
    }
  }
}
</static-query>

<script lang="ts">
import { useStaticQuery } from '@/compat/gridsome-composition';
import Cube from '@/components/common/icons/Cube.vue';
import { defineComponent, computed } from '@vue/composition-api';

// TODO: Gridsome Server と型定義を共有
type License = {
  name: string;
  license: string;
  url: string;
};

type StaticQueryType = {
  assetsLicenses: {
    edges: {
      node: License;
    }[];
  };
  depsLicenses: {
    edges: {
      node: License;
    }[];
  };
};

export default defineComponent({
  setup() {
    const staticQuery = useStaticQuery<StaticQueryType>();
    const assetsLicenses = computed(() =>
      staticQuery.value?.assetsLicenses.edges.map((e) => e.node)
    );
    const depsLicenses = computed(() =>
      staticQuery.value?.depsLicenses.edges.map((e) => e.node)
    );

    return {
      assetsLicenses,
      depsLicenses,
    };
  },
  components: {
    cube: Cube,
  },
});
</script>
