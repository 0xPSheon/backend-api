module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: "local",
      sizeLimit: 25 * 1024 * 1024,
    },
  },
  "strapi-blurhash": {
    enabled: true,
    config: {
      regenerateOnUpdate: true,
    },
  },
  "import-export-entries": {
    enabled: true,
    config: {},
  },
});
