import { gql, request } from 'graphql-request'
import Discord from 'discord.js'

const configQuery = gql`
  query getConfig($apiKey: String!) {
    config(apiKey: $apiKey) {
      botToken
    }
  }
`

class Bot {
  constructor() {
    this.client = new Discord.Client()
    this.client.on('message', (message) => {
      if (!message.author.bot && message.mentions.has(this.client.user)) {
        message.channel.send('Cheetos!')
      }
    })
  }

  async loadConfig() {
    const apiBase = process.env.API_BASE
    const apiKey = process.env.API_KEY
    const data = await request(`${apiBase}/graphql`, configQuery, {
      apiKey,
    })
    this.botToken = data.config.botToken
  }

  async start() {
    try {
      await this.loadConfig()
      await this.client.login(this.botToken)
    } catch (err) {
      console.error('Error running bot', err)
    }
  }
}

const bot = new Bot()
bot.start()
