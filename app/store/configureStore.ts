import configureStoreProd from "./configureStore.production";
import configureStoreDev from "./configureStore.development";

export const configureStore =
	process.env.NODE_ENV === "production"
		? configureStoreProd
		: configureStoreDev;
