import { SOCIAL_PLATFORMS } from '@src/constants/social-platforms';

type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
  selected?: boolean;
};

export const getSocialPlatformById = (
  socialPlatformId: string
): Optional<SocialPlatform> => {
  return SOCIAL_PLATFORMS.find(({ id }) => id === socialPlatformId);
};

export const getSocialPlatformDimensionById = (
  socialPlatformDimensionId: string
): Optional<SocialPlatformDimension> => {
  return SOCIAL_PLATFORMS.flatMap(({ dimensions }) => dimensions).find(
    ({ id }) => id === socialPlatformDimensionId
  );
};

export const getSocialPlatformSelectOptions = (): SelectOption[] => {
  const options: SelectOption[] = [
    {
      value: '',
      label: 'Select Platform',
      disabled: true,
    },
  ];

  options.push(
    ...SOCIAL_PLATFORMS.map((platform: SocialPlatform) => ({
      value: platform.id,
      label: platform.name,
    }))
  );

  return options;
};

export const getSocialPlatformDimensionSelectOptions = (
  socialPlatformId?: string
): SelectOption[] => {
  const socialPlatform = SOCIAL_PLATFORMS.find(
    ({ id }) => id === socialPlatformId
  );
  if (!socialPlatform) {
    return [];
  }

  const options: SelectOption[] = [
    {
      value: '',
      label: 'Select Dimension',
      disabled: true,
    },
  ];

  options.push(
    ...socialPlatform.dimensions.map((dimension: SocialPlatformDimension) => ({
      value: dimension.id,
      label: `${dimension.name} (${dimension.width}x${dimension.height})`,
    }))
  );

  return options;
};
