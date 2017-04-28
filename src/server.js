import discord from "./server/discord";
import logger from "./server/logger";

discord.on("ready", () => {
    logger.info("BaleineBot is started");
});

discord.on("message", message => {
    if (message.content === "hello") {
        message.reply("world");
    }
});