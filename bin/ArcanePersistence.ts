import {
	Permutations,
	Armor,
	Shards, Shard, Size, Colors, Red, Blue,
	Mods,
	HealthValue, ArmorValue, Percentage, StrengthValue, Stats, WarframeStats,
} from '../src';

class ArcanePersistence {

	static readonly #THRESHOLD: ArmorValue = 1400;

	static calcArmorThreshold(base: ArmorValue, shards: Array<Shard | undefined>, isIncludeTransientFortitude: boolean) {
		if (shards.length > Shards.MAX_SHARDS)
			throw new Error("Can't accept more than 5 shards");
		if (shards.length < Shards.MAX_SHARDS)
			shards.push(undefined);

		const shardPermutationsGenerator = Permutations.withoutOrderInAllSlots(Shards.MAX_SHARDS, shards);

		const modsToInclude = [
			Mods.STAND_UNITED,
			Mods.BLIND_RAGE,
			Mods.UMBRAL_INTENSIFY,
			Mods.UMBRAL_VITALITY,
			Mods.UMBRAL_FIBER,
		];
		if (isIncludeTransientFortitude)
			modsToInclude.push(Mods.TRANSIENT_FORTITUDE);

		const modsPermutationsGenerator = Permutations.powerSet(modsToInclude);

		while (true) {
			const { value, done } = modsPermutationsGenerator.next();
			if (done)
				break;
			const mods = new Mods(value);
			const modsStats: WarframeStats = mods.toJSON();

			while (true) {
				const { value, done } = shardPermutationsGenerator.next();
				if (done)
					break;
				const shards = new Shards(value[0], value[1], value[2], value[3], value[4]);
				const shardsStats: WarframeStats = shards.toJSON();

				for (const isWarcryActive of [true, false]) {
					const result = Armor.calculate(base, modsStats[Stats.Armor], shardsStats[Stats.Armor], modsStats[Stats.Strength] + shardsStats[Stats.Strength], isWarcryActive);
					console.log(result);
				}
			}
		}
	}
}

ArcanePersistence.calcArmorThreshold(315, [
	new Shard(Size.Tauforged, Blue.Armor),
	new Shard(Size.Tauforged, Red.Strength),
], false);
