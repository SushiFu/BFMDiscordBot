import fs from "fs";
import discord from "../server/discord";
import logger from "../server/logger";

discord.onMessageEverywhere(message => {
    if (message.content.toLowerCase() === "la chance") {
        sendFile(message, "./assets/lachance.jpg");
    }
    else if (message.content.toLowerCase() === "issou") {
        sendFile(message, "./assets/issou.jpg");
    }
});

function sendFile(message, filepath) {
    fs.readFile(filepath, (err, data) => {
        message.channel.send("", {
            file: {
                attachment: data
            }
        }).then(() => {
            logger.info("Sent lachance.jpg");
        }).catch(err => {
            logger.error(err);
        });
    });
}