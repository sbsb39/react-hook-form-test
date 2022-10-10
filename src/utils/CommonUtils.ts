export const EnvironmentTypes = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  DEV_SERVER: 'dev-server'
};

/**
 * 로컬(DevServer) 개발 환경 여부
 */
export const isDevServer = (): boolean => {
  return !!process.env.WEBPACK_DEV_SERVER || process.env.ENV_TYPE === 'dev-server';
};
