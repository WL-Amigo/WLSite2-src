<template>
  <div class="grid grid-cols-1 lg:grid-cols-3">
    <g-image src="@/assets/images/twitter-icon.png" class="my-16 mx-auto" />
    <div class="flex flex-col justify-center text-xl col-span-2 space-y-2">
      <h1 class="font-bold text-2xl">アミーゴ</h1>
      <div>
        <cake-icon class="inline mx-2 h-6 w-6" />
        <span class="align-middle">1992/06/26 ({{ age }} 才)</span>
      </div>
      <div>
        <mail-icon class="inline mx-2 h-6 w-6" />
        <span class="inline align-middle">white.luckers</span>
        <at-symbol-icon class="inline align-middle h-5 w-5 mx-1" />
        <span class="inline align-middle">gmail.com</span>
      </div>
      <div>
        <github-icon class="inline mx-2 h-6 w-6" />
        <ex-link href="https://github.com/WL-Amigo" class="inline align-middle"
          >WL-Amigo
        </ex-link>
      </div>
      <div>
        <twitter-icon class="inline mx-2 h-6 w-6" />
        <ex-link href="https://twitter.com/WL_Amigo" class="inline align-middle"
          >WL_Amigo
        </ex-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import CakeIcon from '@/components/common/icons/Cake.vue';
import MailIcon from '@/components/common/icons/Mail.vue';
import AtSymbolIcon from '@/components/common/icons/AtSymbol.vue';
import GitHubIcon from '@/components/common/icons/GitHub.vue';
import TwitterIcon from '@/components/common/icons/Twitter.vue';

function calcAge(): number {
  const currentDate = new Date(Date.now());
  const yearDiff = currentDate.getFullYear() - 1992;
  const monthDiff = currentDate.getMonth() - 5;
  const dateDiff = currentDate.getDate() - 26;
  return (
    yearDiff - (monthDiff > 0 || (monthDiff == 0 && dateDiff >= 0) ? 0 : 1)
  );
}

export default defineComponent({
  setup() {
    return {
      age: calcAge(),
    };
  },
  components: {
    'cake-icon': CakeIcon,
    'mail-icon': MailIcon,
    'at-symbol-icon': AtSymbolIcon,
    'github-icon': GitHubIcon,
    'twitter-icon': TwitterIcon,
  },
});
</script>
