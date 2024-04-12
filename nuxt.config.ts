// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "nuxt-tiptap-editor"],
  tiptap: {
    prefix: "Tiptap", //prefix for Tiptap imports, composables not included
  },
  css: ["flowbite/dist/flowbite.css"],
  runtimeConfig: {
    appId: "",
    collection: "",
    db: "",
    serverApiKey: "",
  },
  app: {},
});
