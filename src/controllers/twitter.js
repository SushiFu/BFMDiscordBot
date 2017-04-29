import twitter from "../server/twitter";
import TwitterUser from "../models/twitter-user";

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
            stream.on("tweet", tweet => {
                callback(tweet);
            });
        });
}

export default { saveTwitterUsers, reloadStream };
