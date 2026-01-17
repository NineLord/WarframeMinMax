import { ArmorValue, Percentage } from './stats/Warframe';

export class Armor {

	static #BASE_STRENGTH: Percentage = 100;
	static #WARCRY_BASE_ARMOR_BUFF: number = 50 / 100; // The same value for Valkyr and when it's being subsume.

	/**
	 * Calculate the final armor the Warframe will have.
	 * @param base Warframe's base armor.
	 * @param mods Armor bonus from mods.
	 * @param shards Armor bonus from shards.
	 * @param strength Warframe's strength (if `isWarcryActive` is `false`, then this value does not matter to the calculation).
	 * @param isWarcryActive If `true`, assumes the [Warcry] is also active (same calculation for [Valkyr] and any Warframe with this subsume).
	 * @return The Warframe's final armor value.
	 */
	static calculate(base: ArmorValue, mods: Percentage, shards: ArmorValue, strength: Percentage, isWarcryActive: boolean): ArmorValue {
		const warcryBonus = isWarcryActive ? Armor.#WARCRY_BASE_ARMOR_BUFF * (Armor.#BASE_STRENGTH + strength) : 0;
		return (
			(
				base * (
					100 + mods + warcryBonus
				)
			) / 100
		) + shards;
	}
}