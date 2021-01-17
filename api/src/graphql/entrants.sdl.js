export const schema = gql`
  type Entrant {
    id: Int!
    name: String
  }

  type Query {
    entrants: [Entrant!]!
    entrant(id: Int!): Entrant
  }

  input CreateEntrantInput {
    name: String
  }

  input UpdateEntrantInput {
    name: String
  }

  type Mutation {
    createEntrant(input: CreateEntrantInput!): Entrant!
    updateEntrant(id: Int!, input: UpdateEntrantInput!): Entrant!
    deleteEntrant(id: Int!): Entrant!
  }
`
