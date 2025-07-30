declare module 'passport-shopify' {
  import { Strategy as PassportStrategy } from 'passport';
  import { Optional } from 'nx/src/project-graph/plugins';

  export interface StrategyOptions {
    clientID: string;
    clientSecret: string;
    callbackURL: string;
    shop: string;
    scope?: string[];
  }

  export interface Profile {
    id: string;
    profileUrl: string;

    [key: string]: Primitive;
  }

  export class Strategy extends PassportStrategy {
    constructor(
      options: StrategyOptions,
      verify: (
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: (
          error: Optional<string | Error>,
          user?: User,
          info?: { [key: string]: Primitive }
        ) => void
      ) => void
    );
  }
}