/**
 * whitelist controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::whitelist.whitelist",
  ({ strapi }) => ({})
);
