/**
 * @typedef {import('discord.js').Message} Message
 */

const snacks = ['Cheetos!', 'Almonds', 'Apple', 'Orange']

export default {
  /**
   * @param {Message} message
   */
  match(message) {
    return /\bsnack\b/.test(message.content)
  },
  /**
   * @param {Message} message
   */
  run(message) {
    message.channel.send(snacks[Math.floor(Math.random() * snacks.length)])
  },
}
