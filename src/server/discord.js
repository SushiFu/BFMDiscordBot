import Discord from "discord.js";
import config from "./config";

const client = new Discord.Client();

client.login(config.DISCORD_TOKEN);

export default client;