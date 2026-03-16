import DependentDocumentMixin from "./dependent.mjs";
import SystemFlagsMixin from "./flags.mjs";

/**
 * Mixin used to share some logic between Actor & Item documents.
 * @template {foundry.abstract.Document} T
 * @param {typeof T} Base  The base document class to wrap.
 * @returns {typeof SystemDocument}
 * @mixin
 */
export default function SystemDocumentMixin(Base) {
  class SystemDocument extends DependentDocumentMixin(SystemFlagsMixin(Base)) {

    /* -------------------------------------------- */
    /*  Properties                                  */
    /* -------------------------------------------- */

    /**
     * Rule active effects grouped by type and then key.
     * @type {AppliedRulesMap}
     */
    appliedRules = this.appliedRules;

    /* -------------------------------------------- */

    /** @inheritDoc */
    get _systemFlagsDataModel() {
      return this.system?.metadata?.systemFlagsModel ?? null;
    }

    /* -------------------------------------------- */
    /*  Data Preparation                            */
    /* -------------------------------------------- */

    /**
     * Clear cached data.
     * @protected
     */
    _clearCachedValues() {
      this.appliedRules = new AppliedRulesMap();
    }

    /* -------------------------------------------- */

    /** @inheritDoc */
    prepareData() {
      this._clearCachedValues();
      super.prepareData();
    }
  }
  return SystemDocument;
}


/* -------------------------------------------- */

/**
 * @extends {Map<string, Map<string, ChangeData[]>>}
 */
class AppliedRulesMap extends Map {
  /** @inheritDoc */
  get(key) {
    if ( !key ) return;
    if ( key.includes(":") ) {
      const [target, type] = key.split(":", 2);
      return super.get(target)?.get(type);
    }
    return super.get(key);
  }

  /* -------------------------------------------- */

  /**
   * Get just the rule values for a provided key.
   * @property {string} key  Rule target and type separated by a colon (e.g. "attack:bonus").
   * @returns {any[]}
   */
  getValues(key) {
    return this.get(key)?.map(c => c.value) ?? [];
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  set(key, value) {
    if ( !key ) return this;
    if ( key.type && key.key ) {
      const type = key.type.split(".")[1];
      if ( !this.has(key.key) ) super.set(key.key, new Map());
      if ( this.get(key.key).has(type) ) this.get(key.key).get(type).push(key);
      else this.get(key.key).set(type, [key]);
    } else {
      super.set(key, value);
    }
    return this;
  }
}
