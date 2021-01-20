export const schema = gql`
  type Config {
    botToken: String
  }

  type Query {
    config(apiKey: String!): Config
  }
`
