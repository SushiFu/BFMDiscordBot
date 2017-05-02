import Discord from "discord.js";
import config from "./config";

const client = new Discord.Client();

/**
 * Login Discord Bot
 * @returns {Promise}
 */
function clientLogin() {
    return client.login(config.DISCORD_TOKEN);
}

/**
 * Register message listener on DISCORD_CMD_CHAN_ID
 * @param {Function} callback 
 */
function onMessage(callback) {
    client.on("message", message => {
        if (message.channel.id === config.DISCORD_CMD_CHAN_ID) {
            callback(message);
        }
    });
}

/**
 * Register message listener on every channels
 * @param {Function} callback 
 */
function onMessageEverywhere(callback) {
    client.on("message", message => {
        callback(message);
    });
}

/**
 * Send message on cmd channel
 * @param {String} message
 * @returns {Promise}
 */
function sendCmdDefault(message) {
    return client.channels.get(config.DISCORD_CMD_CHAN_ID).sendMessage(message);
}

/**
 * Send message on default channel
 * @param {String} message
 * @returns {Promise}
 */
function sendDefault(message) {
    return client.channels.get(config.DISCORD_CHAN_ID).sendMessage(message);
}

export default { client, clientLogin, onMessage, onMessageEverywhere, sendDefault, sendCmdDefault };