const pathApi = '/api/v1';

const routes = {
  mainPagePath: () => '/',
  loginPagePath: () => '/login',
  loginPath: () => [pathApi, 'login'].join('/'),
};

export default routes;
