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

const checkWhitelistSchema = yup.object().shape({
  address: yup
    .string()
    .matches(/^0x[a-fA-F0-9]{40}$/, "Password check your address")
    .required(),
  phase: yup.mixed().oneOf(["Free Mint", "Public Sale"]).required(),
});
export const validateCheckWhitelist = validateYupSchema(checkWhitelistSchema);

const checkGenerateHashSchema = yup.object().shape({
  phase: yup.mixed().oneOf(["Free Mint", "Public Sale"]).required(),
  quantity: yup.number().min(1).required(),
});
export const validateGenerateHash = validateYupSchema(checkGenerateHashSchema);
