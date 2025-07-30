type AuthMeResponse = {
  user: Omit<User, 'accessToken' | 'refreshToken'>;
};
