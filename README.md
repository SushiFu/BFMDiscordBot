# La Baleine Discord Bot

## Features
- Twitter Following
- ...

## Prerequisites
#### Optimize for VSCode
- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org) & [npm](https://www.npmjs.com/)
- [Yarn](https://yarnpkg.com)

### Setup (before anything else)
```bash
$ yarn install
# You also need to set some vars in .env file, you could also use export
$ echo "DISCORD_TOKEN={YOUR_MAGIC_TOKEN}" > .env
$ echo "DISCORD_CHAN_ID={YOUR_MAGIC_TOKEN}" > .env
$ echo "DISCORD_CMD_CHAN_ID={YOUR_MAGIC_TOKEN}" > .env
$ echo "TWITTER_CONSUMER_KEY={YOUR_MAGIC_TOKEN}" > .env
$ echo "TWITTER_CONSUMER_SECRET={YOUR_MAGIC_TOKEN}" > .env
$ echo "TWITTER_TOKEN={YOUR_MAGIC_TOKEN}" > .env
$ echo "TWITTER_TOKEN_SECRET={YOUR_MAGIC_TOKEN}" > .env
```

### Build
```bash
$ yarn build #or run Build Task in VSCode
```

### ESLint
```bash
$ yarn lint
```

### Launch in Dev (w/ nodemon)
```bash
$ yarn start #build automatically before starting
```

<!--### Test
```bash
$ yarn test #or run Test Task in VSCode
```-->