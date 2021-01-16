import '@redwoodjs/api'
import Discord from 'discord.js'

class Bot {
  constructor() {
    this.client = new Discord.Client()
    this.client.on('message', (message) => {
      if (!message.author.bot && message.mentions.has(this.client.user)) {
        message.channel.send('Cheetos!')
      }
    })
  }

  async start() {
    try {
      await this.client.login(process.env.BOT_TOKEN)
    } catch (err) {
      console.error('Error running bot', err)
    }
  }
}

const bot = new Bot()
bot.start()
