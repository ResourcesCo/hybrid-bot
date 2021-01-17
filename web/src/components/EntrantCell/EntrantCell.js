import Entrant from 'src/components/Entrant'

export const QUERY = gql`
  query FIND_ENTRANT_BY_ID($id: Int!) {
    entrant: entrant(id: $id) {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Entrant not found</div>

export const Success = ({ entrant }) => {
  return <Entrant entrant={entrant} />
}
