import { Title, HostUrl } from './Site';

export const DefaultOGP = {
  description: '色々制作サークル WhiteLuckBringers',
  title: Title,
  twitter: '@WL_Amigo',
  cardImageUrl: HostUrl + '/ogimage.jpg',
  url: HostUrl + '/',
} as const;
