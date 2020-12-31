<template>
  <div v-if="work" class="container mx-auto">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div class="w-full">
        <carousel
          :images="work.screenshots"
          @click="onOpenScreenshotFullscreenCarousel($event)"
        />
        <div
          class="pt-6 space-y-2"
          v-if="work.highlightAssets && work.highlightAssets.length > 0"
        >
          <highlight-asset-button
            v-for="(asset, idx) in work.highlightAssets"
            :key="asset.title"
            :gsrc="asset.imagePath"
            :title="asset.title"
            @click="onOpenHighlightAssetsCarousel(idx)"
          />
        </div>
      </div>
      <div class="py-2 space-y-6">
        <div class="space-y-1">
          <h1 class="text-3xl font-bold">{{ work.title }}</h1>
          <p>
            初出: {{ work.publishDate }}
            <span v-if="work.state === 'ongoing'" class="text-blue-700">
              ― 継続中
            </span>
          </p>
          <div class="flex flex-row items-center space-x-4">
            <ex-link-button v-if="work.url" :href="work.url" type="primary">
              {{ urlDisplayText }}
            </ex-link-button>
            <ex-link
              v-if="work.github && work.github.length > 0"
              :href="work.github"
            >
              <github-icon class="w-6 h-6 fill-current inline align-middle" />
              <span class="inline ml-2 align-middle">GitHub</span>
            </ex-link>
          </div>
        </div>

        <simple-lines-view :text="work.description" />

        <div v-if="work.functionalities && work.functionalities.length > 0">
          <h2 class="text-xl font-bold mb-1 flex flex-row items-center">
            <puzzle-icon class="w-6 h-6 mr-1" />
            機能
          </h2>
          <ul class="ml-6 list-disc list-outside">
            <li v-for="func in work.functionalities" :key="func">{{ func }}</li>
          </ul>
        </div>

        <div v-if="work.improvements && work.improvements.length > 0">
          <h2 class="text-xl font-bold mb-1 flex flex-row items-center">
            <trending-up-icon class="w-6 h-6 mr-1" />
            工夫・改善点
          </h2>
          <ul class="ml-6 list-disc list-outside">
            <li v-for="impr in work.improvements" :key="impr">{{ impr }}</li>
          </ul>
        </div>

        <div v-if="work.impact && work.impact.length > 0">
          <h2 class="text-xl font-bold mb-1 flex flex-row items-center">
            <speakerphone-icon class="w-6 h-6 mr-1" />
            反響
          </h2>
          <ul class="ml-6 list-disc list-outside">
            <li v-for="impact in work.impact" :key="impact">{{ impact }}</li>
          </ul>
        </div>

        <div class="space-y-1">
          <h2 class="text-xl font-bold mb-1 flex flex-row items-center">
            <sparkles-icon class="w-6 h-6 mr-1" />
            得られた経験
          </h2>
          <ul class="ml-6 list-disc list-outside">
            <li v-for="ex in work.earnedExperiences" :key="ex">{{ ex }}</li>
          </ul>
        </div>

        <div class="space-y-1">
          <h2 class="text-xl font-bold mb-1 flex flex-row items-center">
            <cog-icon class="w-6 h-6 mr-1" />
            使用している技術
          </h2>
          <div class="flex flex-wrap">
            <tech-tag v-for="tt in work.technologies" :key="tt" :label="tt" />
          </div>
        </div>

        <div v-if="work.links && work.links.length > 0">
          <h2 class="text-xl font-bold mb-1 flex flex-row items-center">
            <link-icon class="w-6 h-6 mr-1" />
            関連
          </h2>
          <template v-for="link in work.links">
            <ex-link
              v-if="link.url.startsWith('http')"
              :key="link.url"
              :href="link.url"
              class="flex flex-row items-center ml-6"
            >
              <export-icon class="h-4 w-4 -ml-6 absolute" />
              <span>{{ link.label }}</span>
            </ex-link>
            <internal-link
              :to="link.url"
              :key="link.url"
              v-if="link.url.startsWith('/')"
              class="block"
            >
              {{ link.label }}
            </internal-link>
          </template>
        </div>
      </div>
    </div>

    <fullscreen-carousel
      :images="carouselSources"
      :indexOnMounted="carouselIndexToShow"
      :isOpen.sync="isFullscreenCarouselOpened"
    />
  </div>
</template>

<page-query>
query($id: ID!) {
  work(id: $id) {
    title
    publishDate
    state
    url
    github
    category
    technologies
    description
    highlightAssets { title, path, imagePath(width: 640, fit: cover) }
    functionalities
    improvements
    impact
    earnedExperiences
    links {
      url
      label
    }
    screenshots (width: 640, height: 480, quality: 85, fit: contain, background: "#FFF")
    originalScreenshots
  }
}
</page-query>

<script lang="ts">
import { usePageQuery } from '@/compat/gridsome-composition';
import { Work } from '@/types/Work';
import { computed, defineComponent, ref } from '@vue/composition-api';

import TechTag from '@/components/partials/Work/TechTag.vue';
import SimpleLinesView from '@/components/common/content-viewer/SimpleLines.vue';
import PuzzleIcon from '@/components/common/icons/Puzzle.vue';
import InternalLink from '@/components/common/link/InternalLinkColored.vue';
import ExportIcon from '@/components/common/icons/Export.vue';
import GitHubIcon from '@/components/common/icons/GitHub.vue';
import HighlightAssetButton from '@/components/partials/Work/HighlightAssetButton.vue';
import SparklesIcon from '@/components/common/icons/Sparkles.vue';
import SpeakerPhoneIcon from '@/components/common/icons/SpeakerPhone.vue';
import TrendingUpIcon from '@/components/common/icons/TrendingUp.vue';
import CogIcon from '@/components/common/icons/Cog.vue';
import Link from '@/components/common/icons/Link.vue';
import FullscreenCarousel from '@/components/common/carousel/FullscreenCarousel.vue';

type WorkQuery = {
  work: Work;
};

export default defineComponent({
  metaInfo() {
    const workQuery = this.$page as WorkQuery;
    return {
      title: `${workQuery.work.title} 作品紹介`,
    };
  },
  setup() {
    const workQuery = usePageQuery<WorkQuery>();
    const work = computed(() => workQuery.value?.work);
    const urlDisplayText = computed(() => {
      const category = work.value?.category;
      if (!category) {
        return '';
      }

      switch (category) {
        case 'website':
          return 'サイトへ';
        case 'webapp':
          return 'アプリへ';
        case 'desktopapp':
          return '特設サイトへ';
      }
    });

    const carouselSources = ref<string[]>([]);
    const carouselIndexToShow = ref(0);
    const isFullscreenCarouselOpened = ref(false);
    const onOpenHighlightAssetsCarousel = (idx: number) => {
      carouselSources.value =
        work.value?.highlightAssets?.map((a) => a.path) ?? [];
      carouselIndexToShow.value = idx;
      isFullscreenCarouselOpened.value = true;
    };
    const onOpenScreenshotFullscreenCarousel = (idx: number) => {
      carouselSources.value = work.value?.originalScreenshots ?? [];
      carouselIndexToShow.value = idx;
      isFullscreenCarouselOpened.value = true;
    };

    return {
      work,
      urlDisplayText,
      carouselSources,
      carouselIndexToShow,
      isFullscreenCarouselOpened,
      onOpenHighlightAssetsCarousel,
      onOpenScreenshotFullscreenCarousel,
    };
  },
  components: {
    'tech-tag': TechTag,
    'highlight-asset-button': HighlightAssetButton,
    'simple-lines-view': SimpleLinesView,
    'sparkles-icon': SparklesIcon,
    'speakerphone-icon': SpeakerPhoneIcon,
    'trending-up-icon': TrendingUpIcon,
    'puzzle-icon': PuzzleIcon,
    'cog-icon': CogIcon,
    'link-icon': Link,
    'export-icon': ExportIcon,
    'github-icon': GitHubIcon,
    'internal-link': InternalLink,
    'fullscreen-carousel': FullscreenCarousel,
  },
});
</script>
