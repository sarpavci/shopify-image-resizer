export const getUserFromProfile = (
  profile: Record<string, Primitive>
): User => {
  return {
    id: profile.id as number,
    storeDomain: profile.profileUrl as string,
    displayName: profile.displayName as string,
    username: profile.username as string,
  };
};