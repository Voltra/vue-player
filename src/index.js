import VuePlayer from "@/components/VuePlayer";
import Player from "@/components/Player";
import Preview from "@/components/Preview";
import DailyMotionPlayer from "@/components/players/DailyMotionPlayer";
import FacebookPlayer from "@/components/players/FacebookPlayer";
import FilePlayer from "@/components/players/FilePlayer";
import KalturaPlayer from "@/components/players/KalturaPlayer";
import MixcloudPlayer from "@/components/players/MixcloudPlayer";
import SoundcloudPlayer from "@/components/players/SoundcloudPlayer";

export * from "./mixins/player";

export {
	// Meta player
	VuePlayer,

	// Helpers
	Player,
	Preview,

	// Players
	DailyMotionPlayer,
	FacebookPlayer,
	FilePlayer,
	KalturaPlayer,
	MixcloudPlayer,
	SoundcloudPlayer,
}
