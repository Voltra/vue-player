import { playerMixin } from "./player";
import { configProps } from "../props";
import VueTypes from "vue-types";

export const metaPlayerMixin = {
	mixins: [playerMixin],
	props: {
		config: configProps,
		progressFrequency: VueTypes.number,
		activePlayer: VueTypes.oneOfType([
			VueTypes.object,
			VueTypes.string,
			VueTypes.func,
		]),
	},
};
