import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/EntrantsCell'

const DELETE_ENTRANT_MUTATION = gql`
  mutation DeleteEntrantMutation($id: Int!) {
    deleteEntrant(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
}

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const EntrantsList = ({ entrants }) => {
  const { addMessage } = useFlash()
  const [deleteEntrant] = useMutation(DELETE_ENTRANT_MUTATION, {
    onCompleted: () => {
      addMessage('Entrant deleted.', { classes: 'rw-flash-success' })
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete entrant ' + id + '?')) {
      deleteEntrant({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {entrants.map((entrant) => (
            <tr key={entrant.id}>
              <td>{truncate(entrant.id)}</td>
              <td>{truncate(entrant.name)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.entrant({ id: entrant.id })}
                    title={'Show entrant ' + entrant.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editEntrant({ id: entrant.id })}
                    title={'Edit entrant ' + entrant.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete entrant ' + entrant.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(entrant.id)}
                  >
                    Delete
                  </a>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EntrantsList
