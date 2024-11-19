type MonsterType = "small" | "large"
type MonsterSpecies =
    | 'bird wyvern'
    | 'brute wyvern'
    | 'elder dragon'
    | 'fanged beast'
    | 'fanged wyvern'
    | 'fish'
    | 'flying wyvern'
    | 'herbivore'
    | 'lynian'
    | 'neopteron'
    | 'piscine wyvern'
    | 'relict'
    | 'wingdrake';

interface SkillRankModifiers {
    affinity: number; // The percentage of the skill rank's affinity that is applied
    attack: number; // The amount of attack damage that is applied
    damageFire: number; // The amount of fire damage that is applied
    damageWater: number; // The amount of water damage that is applied
    damageIce: number; // The amount of ice damage that is applied
    damageThunder: number; // The amount of thunder damage that is applied
    damageDragon: number; // The amount of dragon damage that is applied
    defense: number; // The amount of defense that is applied
    health: number; // The amount of health that is applied
    sharpnessBonus: number; // The amount of sharpness that is applied
    resistAll: number; // The amount of resistance that is applied
    resistFire: number; // The amount of fire resistance that is applied
    resistWater: number; // The amount of water resistance that is applied
    resistIce: number; // The amount of ice resistance that is applied
    resistThunder: number; // The amount of thunder resistance that is applied
    resistDragon: number; // The amount of dragon resistance that is applied
}

interface SkillRank {
    id: number; // The ID of the skill rank
    slug: string; // A human readable unique identifier
    level: number; // The numeric level of the skill rank (starting at 1)
    description: string; // A text description of the skill rank
    skill: number; // The ID of the skill that the rank belongs to
    skillName: string; // The name of the skill that the rank belongs to
    modifiers: SkillRankModifiers; // See SkillRank Modifiers for more information
}

interface Skill {
    id: number; // The ID of the skill
    slug: string; // A human readable unique identifier
    name: string; // The name of the skill
    description: string; // A short description of the skill
    ranks: SkillRank[]; // An array of available ranks for the skill
}

interface Item {
    id: number; // The ID of the item
    name: string; // The name of the item
    description: string; // A short description of the item
    rarity: number; // The rarity of the item
    carryLimit: number; // The maximum number of the item that may be in the player's inventory; zero indicates that there is no limit, or that the limit is not yet available
    value: number; // The Zenny value of the item; zero indicates that value is not yet available
}
interface Protection {
    items: Item[]; // An array of items that can prevent the ailment
    skills: Skill[]; // An array of skills that can prevent the ailment
}

type RecoveryAction = "crouch" | "dodge";

interface Recovery {
    actions: RecoveryAction[]; // An array of actions that can be taken to remove the ailment
    items: Item[]; // An array of items that can remove the ailment
}

type ElementType = "fire" | "water" | "ice" | "thunder" | "dragon" | "blast" | "sleep" | "paralysis" | "poison" | "stun";
interface Ailment {
    id: number; // The ID of the ailment
    name: string; // The name of the ailment
    description: string; // A short description of the ailment
    recovery: Recovery; // An object describing methods to recover from the ailment
    protection: Protection; // An object describing methods for mitigating or preventing the ailment
}

interface MonsterResistance {
    element: ElementType; // The element the resistance applies to
    condition: string; // A text description of the condition under which the resistance applies (i.e. "covered in mud"), or null if the resistance is always active
}

interface MonsterWeakness {
    element: ElementType; // The element the weakness applies to
    stars: number; // The magnitude of the weakness; corresponds directly to the number of stars shown in the hunter's log in-game
    condition: string; // A text description of the condition under which the weakness applies (i.e. "covered in mud"), or null if the weakness is always active
}

type RewardConditionType = "carve" | "investigation" | "mining" | "palico" | "plunderblade" | "reward" | "siege reward" | "shiny" | "track" | "wound";
interface RewardCondition {
    type: RewardConditionType; // The type identifier of the condition
    subtype: string; // A text description of the condition's subtype (i.e. "body" or "tail" for the carve type)
    rank: number; // The mission rank required to obtain the reward
    quantity: number; // The number of items granted if the condition is met
    chance: number; // The percent chance the reward will be granted if the condition is met (whole number between 1 and 100)
}
interface MonsterReward {
    id: number; // The ID of the reward
    item: Item; // The item granted by the reward
    conditions: RewardCondition[]; // An array of conditions that cause the reward to be granted
}
interface Monster {
    id: number; // The ID of the monster
    name: string; // The name of the monster
    type: MonsterType; // The monster's category
    species: MonsterSpecies; // The monster's species
    description: string; // A brief description of the monster
    elements: ElementType[]; // An array of elements used by the monster
    ailments: Ailment[]; // An array of ailments inflicted by the monster
    locations: Location[]; // An array of locations where the monster can be found
    resistances: MonsterResistance[]; // An array of the monster's elemental resistances
    weaknesses: MonsterWeakness[]; // An array of the monster's elemental weaknesses
    rewards: MonsterReward[]; // An array of the possible rewards / drops from the monster
}

interface CraftingCost {
    quantity: number // The quantity of the item needed for the craft
    item: Item // The item to be consumed during crafting
}
interface WeaponCraftingInfo {
    craftable: boolean; // Indicates whether or not the weapon may be directly crafted
    previous: number | null; // The ID of the weapon that this weapon is upgraded from, or null if nothing upgrades into this weapon
    branches: number[]; // An array of IDs that the weapon may be upgraded into
    craftingMaterials: CraftingCost[]; // An array containing the material cost to create the weapon; will always be empty if craftable is false
    upgradeMaterials: CraftingCost[]; // An array containing the material cost to upgrade the weapon identified by previous into this weapon; will always be empty if previous is null
}

interface WeaponAssets {
    icon?: string // The weapon's icon
    image: string // An image showing the weapon's in game model
}
interface WeaponElement {
    type: ElementType; // The element's damage type
    damage: number; // The power of the element
    hidden: boolean; // Indicates whether or not the element is a hidden element
}
interface Slot {
    rank: number; // The rank of the slot
}
interface Attack {
    display: number; // The attack value of the weapon that's displayed in game
    raw: number; // The true raw attack value of the weapon
}

interface WeaponAttributes {
    affinity?: number; // The affinity of the weapon
    defense?: number; // Some weapons (namely "gunlance" types) augment player defense; such weapons indicate that with this field
}

interface WeaponSharpness {
    red: number; // The number of normal hits the weapon can make at red sharpness
    orange: number; // The number of normal hits the weapon can make at orange sharpness
    yellow: number; // The number of normal hits the weapon can make at yellow sharpness
    green: number; // The number of normal hits the weapon can make at green sharpness
    blue: number; // The number of normal hits the weapon can make at blue sharpness
    white: number; // The number of normal hits the weapon can make at white sharpness
    purple: number; // The number of normal hits the weapon can make at purple sharpness
}
type EldersealType = "low" | "average" | "high";

type WeaponType = "great-sword" | "dual-blades" | "lance" | "charge-blade" | "heavy-bowgun" | "long-sword" | "sword-and-shield" | "hunting-horn" | "gunlance" | "insect-glaive" | "light-bowgun" | "bow" | "hammer" | "switch-axe";

type DamageType = "blunt" | "piercing" | "slashing" | "sever";

interface Weapon {
    id: number; // The ID of the weapon
    slug: string; // A human readable unique identifier
    name: string; // The name of the weapon
    type: WeaponType; // The weapon's type
    rarity: number; // The rarity of the weapon
    attack: Attack; // Contains information about the attack values of the weapon
    slots: Slot[]; // An array containing slot information for the weapon
    elements: WeaponElement[]; // An array containing element damage info for the weapon
    crafting: WeaponCraftingInfo; // Contains crafting information for the weapon
    assets: WeaponAssets; // Contains information about weapon UI assets (such as preview images)
    durability: WeaponSharpness[]; // An array of sharpness information, ordered by handicraft level; base sharpness can always be found at index 0
    elderseal: EldersealType; // The elderseal type attributed to the weapon
    damageType: DamageType; // The primary damage type dealt by the weapon
    attributes?: WeaponAttributes; // See WeaponAttributes for more information  
}
