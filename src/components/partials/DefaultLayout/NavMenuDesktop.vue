<template>
  <div class="items-center justify-end space-x-4">
    <g-link
      to="/"
      class="block py-1 px-4 hover:shadow-md transition duration-200 rounded"
      exact-active-class="bg-blue-200"
    >
      制作物一覧
    </g-link>
    <g-link
      to="/profile/"
      class="block py-1 px-4 hover:shadow-md transition duration-200 rounded"
      exact-active-class="bg-blue-200"
    >
      プロフィール
    </g-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  setup() {
    return {};
  }
});
</script>
