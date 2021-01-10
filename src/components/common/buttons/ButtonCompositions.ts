import { Ref, ComputedRef, computed } from '@vue/composition-api';
import { InfoLevel } from '../InfoLevel';

export function useButtonClasses(
  typeRef: Ref<InfoLevel>
): ComputedRef<string[]> {
  return computed(() => {
    const commonClasses = ['py-1', 'px-2', 'border-b-4', 'rounded'];
    switch (typeRef.value) {
      case 'neutral':
        return commonClasses;
      case 'primary':
        return commonClasses.concat([
          'bg-blue-500',
          'hover:bg-blue-400',
          'text-white',
          'border-blue-700',
          'hover:border-blue-500'
        ]);
    }
  });
}
