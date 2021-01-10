declare module '@/assets/embeddedContents/Technologies.yaml' {
  import { TechnologyEntry } from '@/types/TechnologyEntry';
  const dict: Record<string, TechnologyEntry>;
  export default dict;
}

declare module '@/assets/embeddedContents/FavoriteTechnologies.yaml' {
  import { FavoriteTechnology } from '@/types/FavoriteTechnology';
  const list: FavoriteTechnology[];
  export default list;
}
