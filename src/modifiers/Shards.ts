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

	toJSON(): WarframeStats {
		const result = {
			[Stats.Health]: 0,
			[Stats.Armor]: 0,
			[Stats.Strength]: 0,
		};

		for (const shard of this.#loadout) {
			switch (shard.color) {
				case Blue.Armor:
					result[Stats.Armor] += shard.toValue();
					break;
				case Red.Strength:
					result[Stats.Strength] += shard.toValue();
					break;
				default:
					throw new Error(`Unknown shard color: ${shard.color}`);
			}
		}

		return result;
	}
}

export class Shard {
	readonly #size: Size;
	readonly #color: Colors;

	constructor(size: Size, color: Colors) {
		this.#size = size;
		this.#color = color;
	}

	get color(): Colors {
		return this.#color;
	}

	toValue(): HealthValue | ArmorValue | StrengthValue {
		switch (this.#color) {
			case Blue.Armor:
				switch (this.#size) {
					case Size.Tauforged:
						return 225 as ArmorValue;
					case Size.Regular:
						return 150 as ArmorValue;
					default:
						throw new Error(`Unknown size: ${this.#size}`);
				}
			case Red.Strength:
				switch (this.#size) {
					case Size.Tauforged:
						return 15 as StrengthValue;
					case Size.Regular:
						return 10 as StrengthValue;
					default:
						throw new Error(`Unknown size: ${this.#size}`);
				}
			default:
				throw new Error(`Unrecognized shard size: ${this.#size}`);
		}
	}
}

export enum Size {
	Tauforged,
	Regular,
}

export type Colors = Blue | Red;

export enum Blue {
	Armor,
}

export enum Red {
	Strength,
}