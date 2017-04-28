import { clientLogin } from "./server/discord";
import logger from "./server/logger";
import { isAlive as isMongoAlive } from "./server/mongo";

import "./commands/all";

isMongoAlive()
    .then(() => {
        logger.info("Mongo is alive");
        return clientLogin();
    })
    .then(() => {
        logger.info("BaleineBot is started");
    })
    .catch(err => {
        logger.error(err);
        process.exit(1);
    });