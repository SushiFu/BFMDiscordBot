import twitter from "../server/twitter";
import TwitterUser from "../models/twitter-user";

import logger from "../server/logger";

/**
 * Get twitter user id by usertag
 * @param {String} usertag
 * @returns {Promise}
 */
function getUserId(usertag) {
    return new Promise((resolve, reject) => {
        if (usertag.startsWith("@")) {
            usertag = usertag.substring(1);
        }
        twitter.get("users/show", { screen_name: usertag }, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data.id_str);
            }
        });
    });
}

/**
 * Save twitter user
 * @param {String} usertag
 * @returns {Promise}
 */
function saveTwitterUser(usertag) {
    return getUserId(usertag)
        .then(id => {
            return TwitterUser.create(id, usertag);
        });
}

/**
 * Save multiple twitter users
 * @param {String[]} usertags
 * @returns {Promise}
 */
function saveTwitterUsers(usertags) {
    const saving = [];
    usertags.forEach(tag => saving.push(saveTwitterUser(tag)));
    return Promise.all(saving);
}

/**
 * Delete twitter user
 * @param {String} usertag
 * @returns {Promise}
 */
function deleteTwitterUser(usertag) {
    return TwitterUser.delete(usertag);
}

/**
 * Delete multiple twitter users
 * @param {String[]} usertags
 * @returns {Promise}
 */
function deleteTwitterUsers(usertags) {
    const deleting = [];
    usertags.forEach(tag => deleting.push(deleteTwitterUser(tag)));
    return Promise.all(deleting);
}

/**
 * List all twitter users
 * @returns {Promise}
 */
function listTwitterUsers() {
    return TwitterUser.all();
}

let stream;
/**
 * Reload Twitter follow stream
 * @param {Function} callback 
 */
function reloadStream(callback) {
    if (stream) {
        stream.stop();
    }
    TwitterUser
        .all()
        .then(users => users.map(user => user.userId))
        .then(ids => {
            stream = twitter.stream("statuses/filter", { follow: ids });
            stream.on("tweet", tweet => filterTweet(tweet, callback));
        });
}

/**
 * Filter tweet
 * @param {Object} tweet
 * @param {Function} callback 
 */
function filterTweet(tweet, callback) {
    logger.debug("Receive Tweet from:", tweet.user.screen_name);
    listTwitterUsers()
        .then(users => {
            let ids = users.map(user => user.userId);
            if (ids.includes(tweet.user.id_str)) {
                callback(tweet);
            }
        })
        .catch(err => logger.error(err));
}

export default { saveTwitterUsers, listTwitterUsers, deleteTwitterUsers, reloadStream };
