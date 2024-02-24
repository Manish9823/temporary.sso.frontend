// import { env } from "node:process";
// import { env } from 'meta';

export const appConfig = {
    VITE_SSO_BACKEND: import.meta.env.VITE_SSO_BACKEND,
    VITE_AFTER_LOGIN_REDIRECT_TO: import.meta.env.VITE_AFTER_LOGIN_REDIRECT_TO,
}

export const registryConfig = {
    registryName: import.meta.env.VITE_REGISTRY_NAME,
    logUrl: import.meta.env.VITE_REGISTRY_LOGO_URL,
};