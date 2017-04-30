import util from "util";
import twitterText from "twitter-text";

import discord from "../server/discord";
import logger from "../server/logger";
import twitterCtrl from "../controllers/twitter";

discord.onMessage(message => {
    if (message.content.startsWith("!add")) {
        addUsertags(message);
    }
    else if (message.content === "!list") {
        listUsertags();
    }
    else if (message.content.startsWith("!del")) {
        deleteUsertags(message);
    }
});

function addUsertags(message) {
    const usertags = twitterText.extractMentions(message.content);
    twitterCtrl.saveTwitterUsers(usertags)
        .then(users => {
            if (users.length > 0) {
                logger.info("Save:", users);
                let message = "";
                users.forEach(user => message += "@" + user.userTag);
                message += " saved !";
                discord.sendCmdDefault(message);
                twitterCtrl.reloadStream(sendTweet);
            }
        })
        .catch(err => logger.error(err));
}

function listUsertags() {
    twitterCtrl.listTwitterUsers()
        .then(users => {
            if (users.length > 0) {
                logger.info("List:", users);
                let message = "Following:\n";
                users.forEach(user => message += "@" + user.userTag + "\n");
                discord.sendCmdDefault(message);
            }
        })
        .catch(err => logger.error(err));
}

function deleteUsertags(message) {
    const usertags = twitterText.extractMentions(message.content);
    twitterCtrl.deleteTwitterUsers(usertags)
        .then(usertags => {
            if (usertags.length > 0) {
                logger.info("Delete:", usertags);
                let message = "";
                usertags.forEach(tag => message += "@" + tag);
                message += " deleted !";
                discord.sendCmdDefault(message);
                twitterCtrl.reloadStream(sendTweet);
            }
        })
        .catch(err => logger.error(err));
}

function sendTweet(tweet) {
    let msg = "";
    if (tweet.retweeted_status) {
        const rt = util.format("**RT par @%s**", tweet.user.screen_name);
        const usertag = tweet.retweeted_status.user.screen_name;
        const id = tweet.retweeted_status.id_str;
        const url = util.format("https://twitter.com/%s/status/%s", usertag, id);
        msg += rt + "\n" + url;
    }
    else {
        const usertag = tweet.user.screen_name;
        const id = tweet.id_str;
        const url = util.format("https://twitter.com/%s/status/%s", usertag, id);
        msg += url;
    }
    logger.info("Tweet:", msg);
    discord.sendDefault(msg);
}

twitterCtrl.reloadStream(sendTweet);
