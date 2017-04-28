import discord from "../server/discord";

discord.on("message", message => {
    if (message.content === "ping") {
        message.channel.sendMessage("pong");
    }
});