import discord from "./server/discord";
import logger from "./server/logger";
import { isAlive as isMongoAlive } from "./server/mongo";

import "./commands/all";

isMongoAlive()
    .then(() => {
        logger.info("Mongo is alive");
        return discord.clientLogin();
    })
    .then(() => {
        logger.info("BFMBaleine is started");
    })
    .catch(err => {
        logger.error(err);
        process.exit(1);
    });