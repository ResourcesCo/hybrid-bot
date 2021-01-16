# hybrid-bot

This is a serverless/serverful Discord bot in [Redwood][redwood].

Discord bots need a process running, with a client connection. It is a lot like
pgbouncer which provides a serverless application access to the database.

# Running

First, copy `.env.example` to `.env`, and set `DATABASE_URL` and
`TEST_DATABASE_URL`.

Then, create a bot on Discord with the send messages permission, and copy the
bot token, and place it in `.env`.

To run the bot, run `yarn rw build api && yarn workspace api start-bot`.

# How it works

The bot runs inside of the API. It is not a serverless function, but is in `lib`.

The Discord.js client library is installed in the API using Yarn workspaces:

```bash
yarn workspace api add discord.js
```

The server is in `api/src/lib/bot/index.js`. The following line in it loads the
`.env` and initializes [Redwood][redwood]:

```jsx
import '@redwoodjs/api'
```

This is added to scripts in `api/package.json`:

```
  "scripts": {
    "start-bot": "node dist/lib/bot"
  }
```

# Todo

- Use the Redwood app, including serverless functions, to do something useful,
  and show them running neatly side-by-side!
- Document deployment of the serverless portion to Netlify/Vercel and the
  serverful portion to DigitalOcean/Vultr
- Add deployment to the build step
- Keep track of the bot status in the database, and let admin administrate it
  in the app
- Add a word about making the entire app serverful
- Investigate self-hosted serverless with OpenFaaS

# Demo

There is a bot called `@hybrid-bot` running in the
[Resources.co Discord community][discord-community]. It will reply when you
mention it.

[discord-community]: https://discord.gg/BSjufZhFsM
[redwood]: https://redwoodjs.com/
