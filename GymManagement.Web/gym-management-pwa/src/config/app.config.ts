import config from "./app.config.json";

export const AppConfig = {
  apiBaseUrl: config.apiBaseUrl,
  tokenKey: config.tokenKey,
  refreshTokenKey: config.refreshTokenKey

};
