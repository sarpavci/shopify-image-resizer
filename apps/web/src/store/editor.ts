import { create } from 'zustand';

import { MediaNode } from '@src/queries/get-product-medias';

type EditorStore = {
  error?: string;
  setError: (error: string) => void;

  selectedImage?: MediaNode;
  setSelectedImage: (selectedImage?: MediaNode) => void;

  selectedSocialPlatform?: SocialPlatform;
  setSelectedSocialPlatform: (selectedSocialPlatform?: SocialPlatform) => void;

  selectedSocialPlatformDimension?: SocialPlatformDimension;
  setSelectedSocialPlatformDimension: (selectedSocialPlatformDimension?: SocialPlatformDimension) => void;

  previewImage?: UploadedImage;
  setPreviewImage: (previewImage?: UploadedImage) => void;
};

export const useEditorStore = create<EditorStore>((set) => ({
  error: undefined,
  setError: (error: string) => set({ error }),

  selectedImage: undefined,
  setSelectedImage: (selectedImage?: MediaNode) =>
    set({
      selectedImage,
      error: undefined,
      previewImage: undefined,
    }),

  selectedSocialPlatform: undefined,
  setSelectedSocialPlatform: (selectedSocialPlatform?: SocialPlatform) =>
    set({
      selectedSocialPlatform,
      error: undefined,
      previewImage: undefined,
      selectedSocialPlatformDimension: undefined,
    }),

  selectedSocialPlatformDimension: undefined,
  setSelectedSocialPlatformDimension: (selectedSocialPlatformDimension?: SocialPlatformDimension) =>
    set({
      selectedSocialPlatformDimension,
      error: undefined,
      previewImage: undefined,
    }),

  previewImage: undefined,
  setPreviewImage: (previewImage?: UploadedImage) =>
    set({
      previewImage,
      error: undefined,
      selectedSocialPlatform: undefined,
      selectedSocialPlatformDimension: undefined,
    }),
}));
