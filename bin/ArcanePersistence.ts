import fs from 'fs';
import {
	Permutations,
	Armor,
	Shards, Shard, Size, Power,
	Mods,
	HealthValue, ArmorValue, Percentage, StrengthValue, Stats, WarframeStats,
} from '../src';

type CalcArmorThresholdResult = { value: ArmorValue } & Record<string, boolean | number>;

class ArcanePersistence {

	static readonly #THRESHOLD: ArmorValue = 1400;

	static calcArmorThreshold(base: ArmorValue, shards: Array<Shard | undefined>, isIncludeTransientFortitude: boolean): Array<CalcArmorThresholdResult> {
		//#region Shards generator
		if (shards.length > Shards.MAX_SHARDS)
			throw new Error("Can't accept more than 5 shards");
		if (shards.length < Shards.MAX_SHARDS)
			shards.push(undefined);
		//#endregion

		//#region Mods generator
		const modsToInclude = [
			Mods.STAND_UNITED,
			Mods.BLIND_RAGE,
			Mods.UMBRAL_INTENSIFY,
			Mods.UMBRAL_VITALITY,
			Mods.UMBRAL_FIBER,
		];
		if (isIncludeTransientFortitude)
			modsToInclude.push(Mods.TRANSIENT_FORTITUDE);
		//#endregion

		const result = [];

		const modsPermutationsGenerator = Permutations.powerSet(modsToInclude);
		while (true) {
			const { value: value1, done } = modsPermutationsGenerator.next();
			if (done)
				break;
			const mods = new Mods(value1);
			const modsStats: WarframeStats = mods.toStats();
			// console.debug(`Mods :: ${JSON.stringify(mods)}`);

			const shardPermutationsGenerator = Permutations.withoutOrderInAllSlots(Shards.MAX_SHARDS, shards);
			while (true) {
				const { value: value2, done } = shardPermutationsGenerator.next();
				if (done)
					break;
				const shards = new Shards(value2[0], value2[1], value2[2], value2[3], value2[4]);
				const shardsStats: WarframeStats = shards.toStats();
				// console.debug(`Shards :: ${JSON.stringify(shards)}`);

				for (const isWarcryActive of [true, false]) {
					const armor: ArmorValue = Armor.calculate(base, modsStats[Stats.Armor], shardsStats[Stats.Armor], modsStats[Stats.Strength] + shardsStats[Stats.Strength], isWarcryActive);
					if (armor >= ArcanePersistence.#THRESHOLD)
						result.push(ArcanePersistence.#generateResult(armor, isWarcryActive, mods, shards));
				}
			}
		}

		return result;
	}

	static #generateResult(armor: ArmorValue, isWarcryActive: boolean, mods: Mods, shards: Shards): CalcArmorThresholdResult {
		let result: CalcArmorThresholdResult = {
			value: armor,
			Warcry: isWarcryActive,
			"Tauforged Blue Armor": 0,
			"Tauforged Red Strength": 0,
			"Stand United": false,
			"Blind Rage": false,
			"Umbral Intensify": false,
			"Umbral Vitality": false,
			"Umbral Fiber": false,
		};

		result = mods.toJSON().reduce((accumulator: CalcArmorThresholdResult, current) => {
			accumulator[current] = true;
			return accumulator;
		}, result);

		for (const [shardName, count] of Object.entries(shards.toJSON()))
			result[shardName] = count;

		return result;
	}
}

function main() {
	const result: Array<CalcArmorThresholdResult> = ArcanePersistence.calcArmorThreshold(315, [
		new Shard(Size.Tauforged, Power.Armor),
		new Shard(Size.Tauforged, Power.Strength),
	], false)
		.sort((a, b) => a.value - b.value);

	console.table(result);

	let csv = `${Object.keys(result[0]).join(',')},\n`;
	for (const row of result)
		csv += `${Object.values(row).join(',')},\n`;

	fs.writeFileSync('./output.csv', csv);
}

main();
