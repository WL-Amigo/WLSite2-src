<template>
  <g-link :to="to" :class="buttonClasses">
    <slot />
  </g-link>
</template>

<script lang="ts">
import { defineComponent, PropType, toRef } from '@vue/composition-api';
import { Route } from 'vue-router';
import { defineEnumProperty } from '@/utils/vue/props';
import { InfoLevel } from '../InfoLevel';
import { useButtonClasses } from './ButtonCompositions';

export default defineComponent({
  props: {
    to: Object as PropType<Route>,
    type: defineEnumProperty<InfoLevel>('neutral')
  },
  setup(props) {
    return {
      buttonClasses: useButtonClasses(toRef(props, 'type'))
    };
  }
});
</script>
