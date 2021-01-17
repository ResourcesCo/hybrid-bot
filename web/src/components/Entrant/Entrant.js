import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes, navigate } from '@redwoodjs/router'

import { QUERY } from 'src/components/EntrantsCell'

const DELETE_ENTRANT_MUTATION = gql`
  mutation DeleteEntrantMutation($id: Int!) {
    deleteEntrant(id: $id) {
      id
    }
  }
`

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
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

const Entrant = ({ entrant }) => {
  const { addMessage } = useFlash()
  const [deleteEntrant] = useMutation(DELETE_ENTRANT_MUTATION, {
    onCompleted: () => {
      navigate(routes.entrants())
      addMessage('Entrant deleted.', { classes: 'rw-flash-success' })
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete entrant ' + id + '?')) {
      deleteEntrant({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Entrant {entrant.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{entrant.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{entrant.name}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editEntrant({ id: entrant.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(entrant.id)}
        >
          Delete
        </a>
      </nav>
    </>
  )
}

export default Entrant
