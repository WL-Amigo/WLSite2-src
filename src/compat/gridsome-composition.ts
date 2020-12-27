import {
  getCurrentInstance,
  computed,
  ComputedRef,
} from '@vue/composition-api';

export function useStaticQuery<T>(): ComputedRef<T | null> {
  const vm = getCurrentInstance()?.proxy;
  return computed(() => {
    const vmLocal = vm;
    const staticQuery = vmLocal?.$static;
    if (!vmLocal || !staticQuery) {
      return null;
    }

    return staticQuery as T;
  });
}

export function usePageQuery<T>(): ComputedRef<T | null> {
  const vm = getCurrentInstance()?.proxy;
  return computed(() => {
    const vmLocal = vm;
    const pageQuery = vmLocal?.$page;
    if (!vmLocal || !pageQuery) {
      return null;
    }

    return pageQuery as T;
  });
}
