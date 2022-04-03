import { playerMixin } from "./player";
import { shape, object, func, string, array, bool } from "vue-types";
import { configProps } from "../props";

export const metaPlayerMixin = {
	mixins: [playerMixin],
	props: {
		config: configProps,
	},
};
