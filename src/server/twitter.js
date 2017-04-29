import Twit from "twit";
import config from "./config";

const twitter = new Twit({
    consumer_key: config.TWITTER_CONSUMER_KEY,
    consumer_secret: config.TWITTER_CONSUMER_SECRET,
    access_token: config.TWITTER_TOKEN,
    access_token_secret: config.TWITTER_TOKEN_SECRET
});

export default twitter;