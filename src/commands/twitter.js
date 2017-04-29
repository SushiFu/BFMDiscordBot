import util from "util";
import twitterText from "twitter-text";

import discord from "../server/discord";
import logger from "../server/logger";
import twitterCtrl from "../controllers/twitter";

discord.onMessage(message => {
    if (message.content.startsWith("!add")) {
        const usertags = twitterText.extractMentions(message.content);
        twitterCtrl.saveTwitterUsers(usertags)
            .then(users => {
                if (users.length > 0) {
                    logger.info("Save:", users);
                    message = "";
                    users.forEach(user => message += "@" + user.userTag);
                    message += " saved !";
                    discord.sendDefault(message);
                    twitterCtrl.reloadStream(sendTweet);
                }
            })
            .catch(err => {
                logger.error(err);
            });
    }
});

function sendTweet(tweet) {
    const usertag = tweet.retweeted_status ? tweet.retweeted_status.user.screen_name : tweet.user.screen_name;
    const id = tweet.retweeted_status ? tweet.retweeted_status.id_str : tweet.id_str;
    const url = util.format("https://twitter.com/%s/status/%s", usertag, id);
    logger.info("Tweet:", url);
    discord.sendDefault(url);
}

twitterCtrl.reloadStream(sendTweet);
