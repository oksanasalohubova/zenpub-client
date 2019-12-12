export const PHOENIX_SOCKET_ENDPOINT =
  process.env.REACT_APP_PHOENIX_SOCKET_ENDPOINT;
export const GRAPHQL_ENDPOINT = process.env.REACT_APP_GRAPHQL_ENDPOINT;
export const NODE_ENV = process.env.NODE_ENV;
export const PUBLIC_URL = process.env.PUBLIC_URL;
export const SENTRY_KEY = process.env.SENTRY_KEY || '';

export const APP_NAME = 'MoodleNet';
export const INSTANCE_DESCRIPTION =
  'This instance of MoodleNet is currently invite-only.';
export const INVITE_ONLY_TEXT =
  'Please note, signups on this instance are currently invite-only.';

export const IS_DEV = NODE_ENV === 'development';

export const locales = ['en_GB', 'en_US', 'es_ES', 'es_MX', 'fr_FR', 'eu'];
IS_DEV &&
  console.log(`-environment-
${Object.keys(process.env)
    .map(key => `${key}=${process.env[key]}`)
    .join('\n')}
-------------
`);
