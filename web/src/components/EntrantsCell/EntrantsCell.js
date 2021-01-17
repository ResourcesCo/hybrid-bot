import { Link, routes } from '@redwoodjs/router'

import Entrants from 'src/components/Entrants'

export const QUERY = gql`
  query ENTRANTS {
    entrants {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No entrants yet. '}
      <Link to={routes.newEntrant()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ entrants }) => {
  return <Entrants entrants={entrants} />
}
