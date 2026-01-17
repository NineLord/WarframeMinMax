import {HealthValue, ArmorValue, StrengthValue, WarframeStats, Stats} from "../stats/Warframe";

export class Shards {
	static readonly #MAX_SHARDS: number = 5;

	readonly #loadout: Array<Shard>;

	constructor(slot1?: Shard, slot2?: Shard, slot3?: Shard, slot4?: Shard, slot5?: Shard) {
		this.#loadout = [];
		if (slot1 !== undefined)
			this.#loadout.push(slot1);
		if (slot2 !== undefined)
			this.#loadout.push(slot2);
		if (slot3 !== undefined)
			this.#loadout.push(slot3);
		if (slot4 !== undefined)
			this.#loadout.push(slot4);
		if (slot5 !== undefined)
			this.#loadout.push(slot5);
	}

	static get MAX_SHARDS(): number {
		return this.#MAX_SHARDS;
	}

	toStats(): WarframeStats {
		const result = {
			[Stats.Health]: 0,
			[Stats.Armor]: 0,
			[Stats.Strength]: 0,
		};

		for (const shard of this.#loadout) {
			switch (shard.power) {
				case Power.Armor:
					result[Stats.Armor] += shard.toValue();
					break;
				case Power.Strength:
					result[Stats.Strength] += shard.toValue();
					break;
				default:
					throw new Error(`Unknown shard color: ${shard.power}`);
			}
		}

		return result;
	}

	toJSON() {
		const result: Record<string, number> = {};
		for (const shard of this.#loadout) {
			const name = shard.toJSON();
			if (result.hasOwnProperty(name))
				result[name] += 1;
			else
				result[name] = 1;
		}
		return result;
	}
}

export class Shard {
	readonly #size: Size;
	readonly #power: Power;

	constructor(size: Size, power: Power) {
		this.#size = size;
		this.#power = power;
	}

	get power(): Power {
		return this.#power;
	}

	toValue(): HealthValue | ArmorValue | StrengthValue {
		switch (this.#power) {
			case Power.Armor:
				switch (this.#size) {
					case Size.Tauforged:
						return 225 as ArmorValue;
					case Size.Regular:
						return 150 as ArmorValue;
					default:
						throw new Error(`Unknown size: ${this.#size}`);
				}
			case Power.Strength:
				switch (this.#size) {
					case Size.Tauforged:
						return 15 as StrengthValue;
					case Size.Regular:
						return 10 as StrengthValue;
					default:
						throw new Error(`Unknown size: ${this.#size}`);
				}
			default:
				throw new Error(`Unrecognized shard power: ${this.#power}`);
		}
	}

	toJSON() {
		return `${Size[this.#size]} ${this.#power}`;
	}
}

export enum Size {
	Tauforged,
	Regular,
}

export enum Power {
	Armor = "Blue Armor",
	Strength = "Red Strength",
}