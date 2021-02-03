# hybrid-bot

This is a serverless/serverful Discord bot in [Redwood][redwood].

Discord bots need a process running, with a client connection. It is a lot like
pgbouncer which provides a serverless application access to the database.

# Running

## Server

There needs to be an API server instance running. It needs the following
environment variables:

- `DATABASE_URL`
- `BOT_TOKEN`
- `API_KEY`

The `DATABASE_URL` environment variable needs to be set to a postgres database.
Here is a local example:

```
DATABASE_URL=postgres://postgres@localhost:5432/hybrid_bot?connection_limit=1
```

Here is a DigitalOcean example. This is for a pgbouncer. Be sure to set it up
in the DigitalOcean dashboard.

```
postgres://myusername:mypassword@my-project-db-do-user-7575757-0.a.db.ondigitalocean.com:25252/mydbname?sslmode=require&connection_limit=1
```

reate a bot on Discord with the send messages permission, and copy the
bot token, and place it in `.env`.

Finally, set `API_KEY` to a random string that will also be used by the bot.

## Bot

The bot only needs the `API_BASE` and `API_KEY` environment variables. It uses
those to get its configuration, which includes the Discord bot token.

To build the bot, run:

```bash
yarn rw build api
```

Where the bot will be running, set the `API_KEY` and `API_BASE` environment
variables. The `API_KEY` needs to be the same as the API server's `API_KEY`
environment variable.

To run the bot:

```bash
yarn workspace api start-bot
```

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
[Resources.co Discord community][discord-community]. It understands these
commands:

- `@hybrid-bot snack` - will print out a random snack
- `@hybrid-bot enter <name>` - will enter a name in a drawing (not yet implemented)
- `@hybrid-bot draw` - will draw a random name (not yet implemented)

[discord-community]: https://discord.gg/BSjufZhFsM
[redwood]: https://redwoodjs.com/
