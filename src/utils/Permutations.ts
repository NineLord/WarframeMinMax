type WithoutOrderInAllSlotsIndex = number;
type WithoutOrderInAllSlotsChoices<V> = Array<V>;

export class Permutations {

	/**
	 * @param slots
	 * @param variations Assumed that this is array of unique items.
	 */
	static* withoutOrderInAllSlots<V>(slots: number, variations: Array<V>): Generator<WithoutOrderInAllSlotsChoices<V>> {

		const stack: Array<[WithoutOrderInAllSlotsIndex, WithoutOrderInAllSlotsChoices<V>]> = [
			[variations.length - 1, []],
		];

		while (stack.length > 0) {
			const [index, chosen] = stack.pop()!;
			if (chosen.length === slots) {
				yield chosen;
				continue;
			}

			for (let currentIndex = index; 0 <= currentIndex; --currentIndex) {
				stack.push([
					currentIndex,
					[variations[currentIndex], ...chosen]
				]);
			}
		}
	}

	static* powerSet<E>(superSet: Array<E>): Generator<WithoutOrderInAllSlotsChoices<E>> {
		const length = superSet.length;
		const total = 1 << length;   // 2^length subsets

		for (let mask = 0; mask < total; ++mask) {
			const subset = [];

			for (let index = 0; index < length; ++index) {
				if (mask & (1 << index))
					subset.push(superSet[index]);
			}

			yield subset;
		}
	}
}
