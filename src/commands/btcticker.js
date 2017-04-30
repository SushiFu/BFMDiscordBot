import discord from "../server/discord";
import logger from "../server/logger";

import btctickerCtrl from "../controllers/btcticker";

btctickerCtrl.scheduleScrapping(sendNews);

function sendNews(news) {
    news.forEach(item => {
        logger.info("BitcoinTicker:", item);
        const msg = "**Bitcoin Ticker**\n" + item.content + " " + item.source + "\n" + item.url;
        discord.sendDefault(msg);
    });
}