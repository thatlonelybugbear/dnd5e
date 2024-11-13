import AdvancementConfig from "./advancement-config-v2.mjs";

/**
 * Configuration application for hit points.
 */
export default class HitPointsConfig extends AdvancementConfig {
  /** @override */
  static DEFAULT_OPTIONS = {
    classes: ["hit-points"]
  };

  /* -------------------------------------------- */

  /** @override */
  static PARTS = {
    config: {
      template: "systems/dnd5e/templates/advancement/advancement-controls-section.hbs"
    },
    hitPoints: {
      template: "systems/dnd5e/templates/advancement/hit-points-config.hbs"
    }
  };

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /** @inheritDoc */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.hitDie = this.advancement.hitDie;
    return context;
  }
}
