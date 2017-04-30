import scrapeIt from "scrape-it";
import schedule from "node-schedule";

const BITCOIN_TICKER_URL = "http://bitcointicker.co/news/";
/**
 * @returns {Promise}
 */
function scrape() {
    return scrapeIt(BITCOIN_TICKER_URL, {
        news: {
            listItem: "#item > div",
            data: {
                content: {
                    selector: "div:nth-child(2) > span",
                    convert: s => s.substring(1)
                },
                source: "div:nth-child(2) > a",
                url: {
                    selector: "div:nth-child(2) > a",
                    attr: "href"
                },
                date: {
                    selector: "div:nth-child(3) > span:nth-child(2)",
                    convert: x => new Date(x)
                }
            }
        }
    });
}

let lastSend = new Date();
/**
 * Launch scrapping scheduler
 */
function scheduleScrapping(callback) {
    schedule.scheduleJob("*/5 * * * *", () => {
        scrape()
            .then(res => {
                const sorted = res.news.sort((item1, item2) => item1.date - item2.date);
                const news = sorted.filter(item => item.date > lastSend);
                lastSend = sorted[sorted.length - 1].date;
                callback(news);
            });
    });
}

export default { scheduleScrapping };