import discord from "../server/discord";
import logger from "../server/logger";
import imgCtrl from "../controllers/img";

discord.onMessageEverywhere(message => {
    imgCtrl.getCommandImage(message.content.trim().toLowerCase())
        .then(cmdImg => {
            if (cmdImg) {
                message.channel.send("", { file: cmdImg.url })
                    .then(() => {
                        logger.info(cmdImg.command + " image sent");
                    }).catch(err => logger.error(err));
            }
        })
        .catch(err => logger.error(err));
});

discord.onMessage(message => {
    if (message.content.startsWith("!imgAdd")) {
        create(message);
    }
    else if (message.content === "!imgList") {
        list();
    }
    else if (message.content.startsWith("!imgDel")) {
        remove(message);
    }
});

function create(message) {
    const split = message.content.split(" ");
    if (split.length === 3) {
        const command = split[1].trim().toLowerCase();
        const url = split[2].trim();
        imgCtrl.saveCommandImage(command, url)
            .then(cmdImg => {
                logger.info("Create image command:", cmdImg);
                discord.sendCmdDefault(command + " saved !");
            })
            .catch(err => logger.error(err));
    }
}

function list() {
    imgCtrl.listCommandImages()
        .then(cmds => {
            if (cmds.length > 0) {
                logger.info("List image commands:", cmds);
                let message = "Commands:\n";
                cmds.forEach(cmd => message += "- " + cmd.command + "\n");
                discord.sendCmdDefault(message);
            }
        })
        .catch(err => logger.error(err));
}

function remove(message) {
    const split = message.content.split(" ");
    if (split.length === 2) {
        const command = split[1].trim().toLowerCase();
        imgCtrl.deleteCommandImage(command)
            .then(cmd => {
                if (cmd) {
                    logger.info("Delete image command:", cmd);
                    discord.sendCmdDefault(cmd + " deleted !");
                }
            })
            .catch(err => logger.error(err));
    }
}