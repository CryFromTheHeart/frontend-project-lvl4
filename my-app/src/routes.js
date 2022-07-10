const pathApi = '/api/v1';

const routes = {
  mainPagePath: () => '/',
  loginPagePath: () => '/login',
  loginPath: () => [pathApi, 'login'].join('/'),
  getDataPath: () => [pathApi, 'data'].join('/'),
  signupApiPath: () => [pathApi, 'signup'].join('/'),
  signupPath: () => '/signup',
};

export default routes;
