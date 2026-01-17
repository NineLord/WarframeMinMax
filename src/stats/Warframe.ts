export type HealthValue = number;
export type ArmorValue = number;

export /** Like 100% */ type Percentage = number;
export type StrengthValue = Percentage;

export enum Stats {
	Health,
	Armor,

	Strength,
}

export interface WarframeStats {
	[Stats.Health]: HealthValue;
	[Stats.Armor]: ArmorValue;

	[Stats.Strength]: StrengthValue;
}