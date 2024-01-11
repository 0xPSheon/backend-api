/**
 * whitelist validator
 */

import { yup, validateYupSchema } from "@strapi/utils";

const addWhitelistBodySchema = yup.object().shape({
  phase: yup.string().required(),
  address: yup.string().required(),
  description: yup.string().optional(),
});
export const validateAddWhitelistBody = validateYupSchema(
  addWhitelistBodySchema
);
