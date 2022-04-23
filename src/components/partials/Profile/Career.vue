<template>
  <div>
    <h1 class="text-center text-3xl">経歴</h1>
    <div class="relative space-y-4">
      <div
        class="ml-20 relative"
        v-for="career in careerList"
        :key="career.description"
      >
        <div
          class="absolute h-full w-20 -ml-20 flex flex-row items-center justify-center"
        >
          <div class="relative h-12 w-12 text-gray-700">
            <div
              class="absolute rounded-full border-2 border-gray-400 bg-white h-12 w-12"
            />
            <office-building-icon
              v-if="career.type === 'company'"
              class="absolute inset-0 m-3 h-6 w-6"
            />
            <academic-cap-icon
              v-if="career.type === 'school'"
              class="absolute inset-0 m-3 h-6 w-6"
            />
          </div>
        </div>
        <div>
          <div class="text-gray-500" v-if="career.toYear && career.toMonth">
            {{ career.toYear }}-{{ `0${career.toMonth.toFixed(0)}`.slice(-2) }}
          </div>
          <div class="text-gray-500" v-else>継続中</div>
          <div class="text-lg">
            {{ career.description }}
          </div>
          <div class="text-gray-500">
            {{ career.fromYear }}-{{
              `0${career.fromMonth.toFixed(0)}`.slice(-2)
            }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AcademicCapIcon from '@/components/common/icons/AcademicCap.vue';
import OfficeBuildingIcon from '@/components/common/icons/OfficeBuilding.vue';
import { defineComponent } from '@vue/composition-api';

type CareerEntry = {
  type: 'school' | 'company';
  description: string;
  toYear?: number;
  toMonth?: number;
  fromYear: number;
  fromMonth: number;
};

const CareerList: CareerEntry[] = [
  {
    type: 'company',
    description:
      '物流部門向けシステム開発 ウェブフロントエンドエンジニア (TypeScript/React)',
    fromYear: 2021,
    fromMonth: 7,
  },
  {
    type: 'company',
    description:
      '不動産業者向けシステム開発 フロントエンドエンジニア (C#/WPF, React 等)',
    toYear: 2021,
    toMonth: 6,
    fromYear: 2018,
    fromMonth: 4,
  },
  {
    type: 'school',
    description: '東京工業大学院 情報工学系 情報工学コース 修士卒',
    toYear: 2018,
    toMonth: 3,
    fromYear: 2016,
    fromMonth: 4,
  },
  {
    type: 'school',
    description: '東京工業大学 第5類 情報工学科',
    toYear: 2016,
    toMonth: 3,
    fromYear: 2012,
    fromMonth: 4,
  },
  {
    type: 'school',
    description: '神奈川県立神奈川総合高等学校 個性化コース',
    toYear: 2011,
    toMonth: 3,
    fromYear: 2008,
    fromMonth: 4,
  },
];

export default defineComponent({
  setup() {
    return {
      careerList: CareerList,
    };
  },
  components: {
    'academic-cap-icon': AcademicCapIcon,
    'office-building-icon': OfficeBuildingIcon,
  },
});
</script>
