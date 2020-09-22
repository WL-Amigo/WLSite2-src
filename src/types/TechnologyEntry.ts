export type TechnologyEntry = {
  url: string;
  type: TechnologyCategory;
};

export type TechnologyCategory =
  | 'web-frontend'
  | 'language'
  | 'cloud-service'
  | 'backend'
  | 'general';
