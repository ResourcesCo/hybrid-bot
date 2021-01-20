export const config = ({ apiKey }) => {
  if (apiKey === process.env.API_KEY) {
    return {
      botToken: process.env.BOT_TOKEN,
    }
  } else {
    throw new Error('config: Invalid API Key')
  }
}
