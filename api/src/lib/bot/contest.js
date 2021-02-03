/**
 * @typedef {import('discord.js').Message} Message
 */

const enterRegex = /\benter (\S+)/
const drawRegex = /\bdraw\b/

export default {
  /**
   * @param {Message} message
   */
  match(message) {
    return enterRegex.test(message.content) || drawRegex.test(message.content)
  },
  /**
   * @param {Message} message
   */
  run(message) {
    if (enterRegex.test(message.content)) {
      const name = enterRegex.exec(message.content)[1]
      message.channel.send(`Entered ${name} (not really)`)
    } else if (drawRegex.test(message.content)) {
      message.channel.send('Draw not yet implemented')
    }
  },
}
