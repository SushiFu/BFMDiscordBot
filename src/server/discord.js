import Discord from "discord.js";
import config from "./config";

const client = new Discord.Client();

/**
 * @returns {Promise}
 */
export function clientLogin() {
    return client.login(config.DISCORD_TOKEN);
}

export default client;