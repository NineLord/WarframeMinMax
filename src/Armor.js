class Armor {

    /** @typedef {number} Percentage like 100%. */

    static #WARCRY_BASE_ARMOR_BUFF = 50 / 100;

    /**
     * @param {number} base Warframe's base armor.
     * @param {boolean} isStandUnited If `true`, will include [Stand United] armor bonus.
     */
    static foo(base, isStandUnited, ) {

    }

    /**
     * Same calculation for [Valkyr] and any Warframe with this subsume.
     * @param {number} base Warframe's base armor.
     * @param {Percentage} mods Armor bonus from mods.
     * @param {Percentage} strength Warframe's strength.
     * @returns {number} The Warframe's armor after activating [Warcry].
     */
    static #warcry(base, mods, strength) {
        return (
                base * (
                    100 + mods + (Armor.#WARCRY_BASE_ARMOR_BUFF * strength)
                )
            )
            / 100;
    }
}