type Percentage = number; // like 100%
type ArmorValue = number;

export class Armor {

	static #WARCRY_BASE_ARMOR_BUFF: number = 50 / 100;

	/**
	 * @param {number} base Warframe's base armor.
	 * @param {boolean} isStandUnited If `true`, will include [Stand United] armor bonus.
	 */
	static foo(base: number, isStandUnited: boolean) {

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