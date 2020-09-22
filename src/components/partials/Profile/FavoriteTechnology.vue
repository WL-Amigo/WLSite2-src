<template>
  <div
    class="border-l border-t border-r border-b-2 border-gray-600 rounded p-2 divide-y divide-gray-600"
  >
    <h2 class="text-xl px-2 pb-2">
      {{ favorite.name }}
    </h2>
    <div class="px-2 p-2">
      <p>使用経験: {{ favorite.experience }}</p>
    </div>
    <div class="px-2 p-2">
      <h3>出来ること</h3>
      <ul class="list-disc list-outside pl-6">
        <li v-for="ability in favorite.abilities" :key="ability">
          {{ ability }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import { FavoriteTechnology } from '@/types/FavoriteTechnology';

export default defineComponent({
  props: {
    favorite: {
      type: Object as PropType<FavoriteTechnology>,
      required: true
    }
  },
  setup() {
    return {};
  }
});
</script>
