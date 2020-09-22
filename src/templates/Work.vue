<template>
  <div v-if="work" class="container mx-auto">
    <div class="grid grid-cols-2 gap-4">
      <carousel :images="work.screenshots" />
      <div class="py-2 space-y-1">
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
        <simple-lines-view :text="work.description" class="pt-6 pb-3" />
        <h2 class="text-xl font-bold">得られた経験</h2>
        <ul class="ml-6">
          <li v-for="ex in work.earnedExperiences" :key="ex">
            <puzzle-icon class="w-4 h-4 my-1 mr-2 absolute -ml-6" />
            <div class="whitespace-pre-wrap">{{ ex }}</div>
          </li>
        </ul>
        <h2 class="text-xl font-bold pt-6">使用している技術</h2>
        <div class="flex flex-wrap">
          <tech-tag v-for="tt in work.technologies" :key="tt" :label="tt" />
        </div>
        <template v-if="work.links && work.links.length > 0">
          <h2 class="text-xl font-bold pt-6">関連</h2>
          <template v-for="link in work.links">
            <ex-link
              v-if="link.url.startsWith('http')"
              :key="link.url"
              :href="link.url"
              class="flex flex-row items-center"
            >
              <export-icon />
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
        </template>
      </div>
    </div>
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
    earnedExperiences
    links {
      url
      label
    }
    screenshots (width: 640, height: 480, quality: 85)
  }
}
</page-query>

<script lang="ts">
import { usePageQuery } from '@/compat/gridsome-composition';
import { Work } from '@/types/Work';
import { computed, defineComponent } from '@vue/composition-api';

import TechTag from '@/components/partials/Work/TechTag.vue';
import SimpleLinesView from '@/components/common/content-viewer/SimpleLines.vue';
import PuzzleIcon from '@/components/common/icons/Puzzle.vue';
import InternalLink from '@/components/common/link/InternalLinkColored.vue';
import ExportIcon from '@/components/common/icons/Export.vue';
import GitHubIcon from '@/components/common/icons/GitHub.vue';

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

    return {
      work,
      urlDisplayText,
    };
  },
  components: {
    'tech-tag': TechTag,
    'simple-lines-view': SimpleLinesView,
    'puzzle-icon': PuzzleIcon,
    'export-icon': ExportIcon,
    'github-icon': GitHubIcon,
    'internal-link': InternalLink,
  },
});
</script>
