interface User {
  id: number | string;
  storeDomain: string;
  accessToken?: string;
  refreshToken?: string;
  displayName: string;
  username: string;
}
