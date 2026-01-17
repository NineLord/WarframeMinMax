import {
	Armor,
	Shards, Shard, Size, Colors, Red, Blue,
} from '../src';

console.log(Armor.foo(
	315,
	true,
	new Shards(
		new Shard(Size.Tauforged, Blue.Armor),
		// new Shard(Size.Tauforged, Blue.Armor),
		new Shard(Size.Tauforged, Red.Strength),
	),
	true,
	true,
	true,
	true,
	false
));
