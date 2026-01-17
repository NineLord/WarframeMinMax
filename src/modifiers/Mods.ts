import { Stats, WarframeStats } from '../stats/Warframe';

class Mod {

	readonly #name: string;
	readonly #stat: Stats;
	readonly #value: number;

	constructor(name: string, stat: Stats, value: number) {
		this.#name = name;
		this.#stat = stat;
		this.#value = value;
	}

	get name(): string {
		return this.#name;
	}

	get stat(): Stats {
		return this.#stat;
	}

	getValue(_setBonus?: number): number {
		return this.#value;
	}

	toJSON() {
		return this.#name;
	}

}

class Umbral extends Mod {

	readonly #bonusValue: Array<number>;

	constructor(name: string, stat: Stats, value: number, bonusValue: Array<number>) {
		super(name, stat, value);
		this.#bonusValue = bonusValue;
	}

	getValue(setBonus: number): number {
		return super.getValue() + this.#bonusValue[setBonus - 1];
	}
}

export class Mods {
	static UMBRAL_INTENSIFY = new Umbral("Umbral Intensify", Stats.Strength, 44, [0, 55, 77]);
	static UMBRAL_VITALITY = new Umbral("Umbral Vitality", Stats.Health, 100, [0, 130, 180]);
	static UMBRAL_FIBER = new Umbral("Umbral Fiber", Stats.Armor, 100, [0, 130, 180]);

	static BLIND_RAGE = new Mod("Blind Rage", Stats.Strength, 99);
	static TRANSIENT_FORTITUDE = new Mod("Transient Fortitude", Stats.Strength, 55);

	static STAND_UNITED = new Mod("Stand United", Stats.Armor, 25);

	readonly #loadout: Array<Mod>;
	readonly #umbralCount: number;

	constructor(loadout: Array<Mod>) {
		let umbralCount = 0;
		this.#loadout = Object.values(
				loadout.reduce((accumulator: Record<string, Mod>, current) => {
					accumulator[current.name] = current;
					if (current instanceof Umbral)
						++umbralCount;
					return accumulator;
				}, {})
		);
		this.#umbralCount = umbralCount;
	}

	toStats(): WarframeStats {
		const result = {
			[Stats.Health]: 0,
			[Stats.Armor]: 0,
			[Stats.Strength]: 0,
		};

		for (const mod of this.#loadout)
			result[mod.stat] += mod.getValue(mod instanceof Umbral ? this.#umbralCount : undefined);

		return result;
	}

	toJSON() {
		return this.#loadout.map(mod => mod.toJSON());
	}
}
