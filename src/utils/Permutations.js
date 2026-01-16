class Permutations {

	/**
	 * @template V Variation
	 * @param {number} slots
	 * @param {Set<V>} variations
	 * @returns {Generator<Array<V>, undefined, ?>}
	 */
	static* withoutOrderInAllSlots(slots, variations) {
		const variationsArray = Array.from(variations);

		/** @typedef {number} WithoutOrderInAllSlotsIndex */
		/**
		 * @template V Variation
		 * @typedef {Array<V>} WithoutOrderInAllSlotsChoices */
		const /** @type {Array<[WithoutOrderInAllSlotsIndex, WithoutOrderInAllSlotsChoices]>} */ stack = [
			[variationsArray.length - 1, []],
		];

		while (stack.length > 0) {
			const [index, chosen] = stack.pop();
			if (chosen.length === slots) {
				yield chosen;
				continue;
			}

			for (let currentIndex = index; 0 <= currentIndex; --currentIndex) {
				stack.push([
					currentIndex,
					[variationsArray[currentIndex], ...chosen]
				]);
			}
		}
	}
}

