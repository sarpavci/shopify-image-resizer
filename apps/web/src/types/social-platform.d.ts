interface SocialPlatform {
  id: string;
  name: string;
  dimensions: SocialPlatformDimension[];
}

interface SocialPlatformDimension {
  id: string;
  name: string;
  width: number;
  height: number;
}
