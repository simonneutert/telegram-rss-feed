# NodeJS Telegram RSS Feed Channel Bot

1. setup a bot from telegram's @botfather accounts
2. check the build arguments the Dockerfile accepts and edit to your demands
3. setup a cronjob maybe
4. enjoy 🤗

## Docker

### run (in a cron job maybe?)

``` sh
docker run --rm \
  -v /path/to/telegram-rss-feed/db:/app/db \
  -e TELEGRAM_API_KEY=12345666:abcdefg \
  -e TELEGRAM_CHANNEL_OR_GROUP=your-channel-or-group \
  -e FEED_URL=https://test.test/awesomefeed.rss \
  ghcr.io/simonneutert/telegram-rss-feed:main node index.js
```

### Need to build it yourself?

``` sh
$ docker build . \
  --build-arg telegram_key=THIS123MY:TELEGRAMKEY \
  --build-arg telegram_channel_or_group=@channel_or_groupnumber_on_telegram \
  --build-arg feed_url=https://www.rss-feed.test/feed \
  -t mytelegramrssbot
```

``` sh
$ docker run --rm \
  -v /path/to/telegram-rss-feed/db:/app/db \
  mytelegramrssbot node index.js
```

## Concept / Good to know

- docker host volume persistant sqlite database that uses a unique constraint, to not send duplicates into the channel.
- public channel messaging, but your bot needs admin privileges
- will work out-of-the-box with any standard compliant modern rss feed supported by [rss-parser on npm](https://www.npmjs.com/package/rss-parser)
