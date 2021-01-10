import { PropType } from '@vue/composition-api';

export function defineEnumProperty<T extends string>(defaultValue: T) {
  return {
    type: (String as unknown) as PropType<T>,
    default: defaultValue
  };
}
