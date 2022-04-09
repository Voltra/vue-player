import { playerMixin } from "./player";
import { configProps, tagOrComponentProps } from "../props";
import VueTypes from "vue-types";

export const metaPlayerMixin = {
	mixins: [playerMixin],
	props: {
		config: configProps,
		progressFrequency: VueTypes.number,
		activePlayer: tagOrComponentProps,
	},
};
