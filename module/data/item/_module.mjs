import BackgroundData from "./background.mjs";
import ClassData from "./class.mjs";
import EquipmentData from "./equipment.mjs";
import FeatData from "./feat.mjs";
import LootData from "./loot.mjs";
import SpellData from "./spell.mjs";
import SubclassData from "./subclass.mjs";
import WeaponData from "./weapon.mjs";

export {
  BackgroundData,
  ClassData,
  EquipmentData,
  FeatData,
  LootData,
  SpellData,
  SubclassData,
  WeaponData
};
export {default as ActionTemplate} from "./templates/action.mjs";
export {default as ActivatedEffectTemplate} from "./templates/activated-effect.mjs";
export {default as ItemDescriptionTemplate} from "./templates/item-description.mjs";
export {default as MountableTemplate} from "./templates/mountable.mjs";
export {default as PhysicalItemTemplate} from "./templates/physical-item.mjs";

export const config = {
  background: BackgroundData,
  class: ClassData,
  equipment: EquipmentData,
  feat: FeatData,
  loot: LootData,
  spell: SpellData,
  subclass: SubclassData,
  weapon: WeaponData
};