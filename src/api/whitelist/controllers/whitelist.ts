/**
 * whitelist controller
 */

import { factories } from "@strapi/strapi";

import {
  validateAddWhitelistBody,
  validateCheckWhitelist,
  validateGenerateHash,
} from "./validation/whitelist";

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

    async check(ctx) {
      const body = ctx.request.body;
      await validateCheckWhitelist(body, "");

      const { address, phase } = body;

      try {
        const whitelistEntities = await strapi.entityService.findMany(
          "api::whitelist.whitelist",
          {
            filters: {
              address: {
                $containsi: address.toLowerCase(),
              },
              phase,
              blocked: false,
            },
            sort: { createdAt: "desc" },
          }
        );

        if (whitelistEntities.length === 0) {
          return ctx.send({ message: "Not in whitelist" }, 404);
        } else {
          return ctx.send({ message: "ok" }, 201);
        }
      } catch (err) {
        console.error("err, ", err);
        strapi.plugin("sentry").service("sentry").sendError(err);
        return ctx.send(err, 400);
      }
    },

    async generateHash(ctx) {
      const body = ctx.request.body;
      await validateGenerateHash(body, "");

      const { user } = ctx.state;
      const { phase } = body;

      const rootSigner = await strapi.entityService.findOne(
        "api::root-signer.root-signer",
        1
      );

      try {
        const whitelistEntities = await strapi.entityService.findMany(
          "api::whitelist.whitelist",
          {
            filters: {
              address: {
                $containsi: user.address.toLowerCase(),
              },
              phase,
              blocked: false,
            },
            sort: { createdAt: "desc" },
          }
        );
        if (whitelistEntities.length === 0) {
          return ctx.send({ message: "Not allowed." }, 404);
        }

        const hash = await strapi
          .service("api::whitelist.whitelist")
          .backendSign(
            {
              contract: "TutanCatMoon",
              address: user.address,
              phase,
            },
            rootSigner.privateKey
          );

        return ctx.send(
          {
            message: "ok",
            hash,
          },
          201
        );
      } catch (err) {
        console.error("err, ", err);
        strapi.plugin("sentry").service("sentry").sendError(err);
        return ctx.send(err, 400);
      }
    },
  })
);
