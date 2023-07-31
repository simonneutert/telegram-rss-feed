# NodeJS Telegram RSS Feed Channel Bot

1. setup a bot from telegram's @botfather accounts
2. check the build arguments the Dockerfile accepts and edit to your demands

## Docker

1. build

``` sh
$ docker build . \
  --build-arg telegram_key=THIS123MY:TELEGRAMKEY \
  --build-arg TELEGRAM_CHANNEL_OR_GROUP=@mypublic_TELEGRAM_CHANNEL_OR_GROUPnick \
  --build-arg feed_url=https://www.rss-feed.test/feed \
  -t mytelegramrssbot
```

2. run (in a cron job maybe?)

``` sh
$ docker run --rm -v /path/to/telegram-rss-feed/db:/app/db mytelegramrssbot node index.js
```

## Concept / Good to know

- docker host volume persistant sqlite database that uses a unique constraint, to not send duplicates into the channel.
- public channel messaging, but your bot needs admin privileges
- will work out-of-the-box with any standard compliant modern rss feed supported by [rss-parser on npm](https://www.npmjs.com/package/rss-parser)