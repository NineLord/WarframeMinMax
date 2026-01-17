import {Red, Blue, Shard, Shards} from '../Shards';

/** Like 100% */ type Percentage = number;
type ArmorValue = number;

export class Armor {

	static #WARCRY_BASE_ARMOR_BUFF: number = 50 / 100;

	/*
	 * @param base Warframe's base armor.
	 * @param isStandUnited If `true`, will include [Stand United] armor bonus.
	 * @param shards
	 */
	static foo(base: number, isStandUnited: boolean, shards: Shards, isRage: boolean, isUmbraIntensify: boolean, isUmbraVitality: boolean, isUmbraFiber: boolean, isWarcry: boolean) {
		const { Armor: shardsArmor, Strength: shardsStength } = shards.toJSON();
		let modsArmor = isStandUnited ? 25 : 0;
		let modsStrength = isRage ? 99 : 0;
		if (isUmbraFiber) {
			if (isUmbraVitality) {
				if (isUmbraIntensify) {
					modsArmor += 180;
					modsStrength += 77;
				} else {
					modsArmor += 130;
					modsStrength += 0;
				}
			} else {
				if (isUmbraIntensify) {
					modsArmor += 130;
					modsStrength += 55;
				} else {
					modsArmor += 100;
					modsStrength += 0;
				}
			}
		} else {
			if (isUmbraVitality) {
				if (isUmbraIntensify) {
					modsArmor += 0;
					modsStrength += 55;
				} else {
					modsArmor += 0;
					modsStrength += 0;
				}
			} else {
				if (isUmbraIntensify) {
					modsArmor += 0;
					modsStrength += 30;
				} else {
					modsArmor += 0;
					modsStrength += 0;
				}
			}
		}

		if (isWarcry)
			return Armor.#warcry(base, modsArmor, modsStrength + shardsStength) + shardsArmor;
		else
			return ((base * (100 + modsArmor)) / 100) + shardsArmor;
	}

	/**
	 * Same calculation for [Valkyr] and any Warframe with this subsume.
	 * @param base Warframe's base armor.
	 * @param mods Armor bonus from mods.
	 * @param strength Warframe's strength.
	 * @return The Warframe's armor after activating [Warcry].
	 */
	static #warcry(base: ArmorValue, mods: Percentage, strength: Percentage): ArmorValue {
		return (
				base * (
					100 + mods + (Armor.#WARCRY_BASE_ARMOR_BUFF * strength)
				)
			)
			/ 100;
	}
}