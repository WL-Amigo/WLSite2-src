import { GridsomeImage } from './Gridsome';

export interface Work {
  // YAML データの内容
  id: string;
  title: string;
  publishDate: string; // yyyy-mm 形式
  state?: 'ongoing' | 'discontinued' | null;
  url?: string;
  github?: string;
  category: WorkCategory;
  technologies: string[];
  description: string;
  highlightAssets?: {
    title: string;
    path: string;
    // GraphQL Layer への読み込み時に拡張
    imagePath: GridsomeImage;
  }[];
  functionalities: string[];
  improvements: string[];
  impact: string[];
  earnedExperiences: string[];
  links?: {
    label: string;
    url: string;
  }[];
  // 以下は GraphQL Layer への読み込み時に追加
  banner: string;
  screenshots: GridsomeImage[];
  originalScreenshots: string[];
}

export type WorkCategory = 'website' | 'webapp' | 'desktopapp';
