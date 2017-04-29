import discord from "../server/discord";

discord.onMessage(message => {
    if (message.content === "!ping") {
        discord.sendDefault("pong");
    }
});