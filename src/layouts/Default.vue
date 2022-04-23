<template>
  <div>
    <nav class="flex items-center justify-between flex-wrap bg-white p-4">
      <g-link to="/" class="flex items-center flex-shrink-0">
        <img src="@/assets/images/logo.svg" alt="logo" class="h-8 w-8 mr-2" />
        <span class="font-semibold text-xl tracking-tight">
          WhiteLuckBringers
        </span>
      </g-link>
      <nav-menu-mobile class="lg:hidden" />
      <nav-menu-desktop class="hidden lg:flex" />
    </nav>
    <div class="px-2">
      <slot />
    </div>
    <div class="text-center py-8 text-gray-600">
      <span>&copy; 2022 Amigo (WhiteLuckBringers)</span>
      <span class="mx-2">-</span>
      <g-link to="/licenses" class="underline hover:text-gray-800"
        >licenses
      </g-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import NavMenuMobile from '@/components/partials/DefaultLayout/NavMenuMobile.vue';
import NavMenuDesktop from '@/components/partials/DefaultLayout/NavMenuDesktop.vue';

export default defineComponent({
  setup() {
    return {};
  },
  components: {
    'nav-menu-mobile': NavMenuMobile,
    'nav-menu-desktop': NavMenuDesktop,
  },
});
</script>
