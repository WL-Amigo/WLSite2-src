<template>
  <div class="space-y-2">
    <h1 class="text-center text-3xl">技術</h1>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
      <favorite-tech
        v-for="fav in favoriteTechnologies"
        :key="fav.name"
        :favorite="fav"
      />
    </div>

    <h2 class="text-xl">使ったことのある技術一覧</h2>
    <h3>ウェブフロントエンド系</h3>
    <div class="flex flex-row flex-wrap">
      <tech-tag
        v-for="entry in techTypeToLabelsMap['web-frontend']"
        :key="entry"
        :label="entry"
      />
    </div>
    <h3>バックエンド系</h3>
    <div class="flex flex-row flex-wrap">
      <tech-tag
        v-for="entry in techTypeToLabelsMap['backend']"
        :key="entry"
        :label="entry"
      />
    </div>
    <h3>クラウドサービス</h3>
    <div class="flex flex-row flex-wrap">
      <tech-tag
        v-for="entry in techTypeToLabelsMap['cloud-service']"
        :key="entry"
        :label="entry"
      />
    </div>
    <h3>言語</h3>
    <div class="flex flex-row flex-wrap">
      <tech-tag
        v-for="entry in techTypeToLabelsMap['language']"
        :key="entry"
        :label="entry"
      />
    </div>
    <h3>汎用性のある技術</h3>
    <div class="flex flex-row flex-wrap">
      <tech-tag
        v-for="entry in techTypeToLabelsMap['general']"
        :key="entry"
        :label="entry"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { TechnologyCategory } from '@/types/TechnologyEntry';
import FavoriteTechnologyComponent from './FavoriteTechnology.vue';
import TechnologiesData from '@/assets/embeddedContents/Technologies.yaml';
import FavoriteTechnologiesData from '@/assets/embeddedContents/FavoriteTechnologies.yaml';
import TechTagComponent from '../Work/TechTag.vue';

const TechnologiesDataEntries = Object.entries(TechnologiesData);
type TypeToTechDataEntriesMapType = {
  [K in TechnologyCategory]: string[];
};
const TechTypeToLabelsMap: TypeToTechDataEntriesMapType = {
  'web-frontend': [],
  'cloud-service': [],
  backend: [],
  language: [],
  general: [],
};

for (const entry of TechnologiesDataEntries) {
  TechTypeToLabelsMap[entry[1].type].push(entry[0]);
}

export default defineComponent({
  setup() {
    return {
      favoriteTechnologies: FavoriteTechnologiesData,
      techTypeToLabelsMap: TechTypeToLabelsMap,
    };
  },
  components: {
    'favorite-tech': FavoriteTechnologyComponent,
    'tech-tag': TechTagComponent,
  },
});
</script>
