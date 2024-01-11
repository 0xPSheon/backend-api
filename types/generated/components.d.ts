import type { Schema, Attribute } from '@strapi/strapi';

export interface ProjectPhase extends Schema.Component {
  collectionName: 'components_project_phases';
  info: {
    displayName: 'Phase';
  };
  attributes: {
    phaseId: Attribute.String & Attribute.Required;
    phaseStage: Attribute.Integer & Attribute.Required;
    displayName: Attribute.String & Attribute.Required;
    description: Attribute.String;
    priceInEth: Attribute.Float & Attribute.Required;
    maxMintPerAddress: Attribute.Integer & Attribute.DefaultTo<3>;
    totalSupply: Attribute.Integer & Attribute.DefaultTo<1>;
    startedAt: Attribute.DateTime & Attribute.Required;
    finishedAt: Attribute.DateTime & Attribute.Required;
    revealed: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'project.phase': ProjectPhase;
    }
  }
}
