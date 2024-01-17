/**
 * whitelist router
 */

import { factories } from "@strapi/strapi";

const defaultRouter = factories.createCoreRouter("api::whitelist.whitelist");

const customRouter = (defaultRouter, customRoutes = []) => {
  let routes;
  return {
    get prefix() {
      return defaultRouter.prefix;
    },
    get routes() {
      if (!routes) routes = customRoutes.concat(defaultRouter.routes);
      return routes;
    },
  };
};

const customRoutes = [
  {
    method: "POST",
    path: "/whitelist/clean",
    handler: "whitelist.clean",
    config: {
      policies: [],
      prefix: "",
    },
  },
  {
    method: "POST",
    path: "/whitelist/add",
    handler: "whitelist.add",
    config: {
      policies: [],
      prefix: "",
    },
  },
  {
    method: "POST",
    path: "/whitelist/check",
    handler: "whitelist.check",
    config: {
      policies: [],
      prefix: "",
    },
  },
  {
    method: "POST",
    path: "/whitelist/hash",
    handler: "whitelist.generateHash",
    config: {
      policies: [],
      prefix: "",
    },
  },
];

export default customRouter(defaultRouter, customRoutes);
