# NodeJS Telegram RSS Feed Channel Bot<!-- omit from toc -->

Ever wanted to have a bot that posts new RSS feed entries to a channel or group on telegram? Well, here you go.

## How to use<!-- omit from toc -->

1. setup a bot from telegram's @botfather accounts
2. check the build arguments the Dockerfile accepts and edit to your demands
3. setup a cronjob on your machine/server to run the docker container every 120 minutes or so
4. enjoy the news on telegram 🤗

- [Run using Docker](#run-using-docker)
  - [run (in a cron job maybe?)](#run-in-a-cron-job-maybe)
  - [Need to build it yourself?](#need-to-build-it-yourself)
  - [No Docker?](#no-docker)
- [Concepts / Good to know](#concepts--good-to-know)


### Dependencies

let's go easy on the dependencies, shall we?

- [rss-parser](https://www.npmjs.com/package/rss-parser)
- [Sequelize](https://sequelize.org/)
- [sqlite3](https://www.npmjs.com/package/sqlite3)
- [telegraf](https://www.npmjs.com/package/telegraf)

for all of the dev dependencies, see the package.json, but the most important ones are:

- [eslint](https://www.npmjs.com/package/eslint)
- [prettier](https://www.npmjs.com/package/prettier)
- [mocha](https://www.npmjs.com/package/mocha)

## Run using Docker

### run (in a cron job maybe?)

``` sh
docker run --rm \
  -v /path/to/telegram-rss-feed/db:/app/db \
  -e TELEGRAM_API_KEY=12345666:abcdefg \
  -e TELEGRAM_CHANNEL_OR_GROUP=your-channel-or-group \
  -e FEED_URL=https://test.test/awesomefeed.rss \
  ghcr.io/simonneutert/telegram-rss-feed:main
```

### Need to build it yourself?

``` sh
$ docker build . \
  -t mytelegramrssbot

$ docker run --rm \
  -v /path/to/telegram-rss-feed/db:/app/db \
  -e TELEGRAM_API_KEY=THIS123MY:TELEGRAMKEY \
  -e TELEGRAM_CHANNEL_OR_GROUP=@channel_or_groupnumber_on_telegram \
  -e FEED_URL=https://www.rss-feed.test/feed \
  mytelegramrssbot
```

### No Docker?

Make sure to set the ENV variables just as you need it.

``` sh
$ mkdir mytelegramrssbot
$ cd mytelegramrssbot
$ npm init
$ npm install telegram-rss-feed --save
$ touch index.js
```

```javascript
// content of index.js
const { Db } = require("telegram-rss-feed/lib/db");
const { parseFeed } = require("telegram-rss-feed/lib/parseFeed");
const { sendMessage } = require("telegram-rss-feed/lib/sendMessage");

Db.sync() // { force: true } will be useful if you need to start from scratch
  .then(() => {});

/**
 * this function auto calls itself in an async fashion
 */
(async () => {
  // you can also pass a custom function to handle the message sending
  await parseFeed(
    process.env.FEED_URL,
    sendMessage, {
      telegramApiKey: "12345666:abcdefg",
      telegramChannelOrGroup: "@your-channel-or-group",
    }
  );
})();
```

Then run it with:

```
$ node index.js
```

## Concepts / Good to know

- docker host volume persistant sqlite database that uses a unique constraint, to not send duplicates into the channel.
- public channel messaging, but your bot needs admin privileges
- will work out-of-the-box with any standard compliant modern rss feed supported by [rss-parser on npm](https://www.npmjs.com/package/rss-parser)
