/**
 * whitelist controller
 */

import { factories } from "@strapi/strapi";

import { validateAddWhitelistBody } from "./validation/whitelist";

export default factories.createCoreController(
  "api::whitelist.whitelist",
  ({ strapi }) => ({
    async clean(ctx) {
      await strapi.db.query("api::whitelist.whitelist").deleteMany({
        where: {},
      });

      return ctx.send("ok", 201);
    },

    async add(ctx) {
      const body = ctx.request.body;
      await validateAddWhitelistBody(body, "");

      const existedEntries = await strapi.entityService.findMany(
        "api::whitelist.whitelist",
        {
          filters: {
            phase: body.phase,
            address: {
              $containsi: body.address,
            },
          },
        }
      );

      if (existedEntries.length === 0) {
        await strapi.entityService.create("api::whitelist.whitelist", {
          data: {
            phase: body.phase,
            address: body.address.toLowerCase(),
            description: body.description,
          },
        });
      }

      return ctx.send("ok", 201);
    },
  })
);
