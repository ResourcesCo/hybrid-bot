import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import EntrantForm from 'src/components/EntrantForm'

export const QUERY = gql`
  query FIND_ENTRANT_BY_ID($id: Int!) {
    entrant: entrant(id: $id) {
      id
      name
    }
  }
`
const UPDATE_ENTRANT_MUTATION = gql`
  mutation UpdateEntrantMutation($id: Int!, $input: UpdateEntrantInput!) {
    updateEntrant(id: $id, input: $input) {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ entrant }) => {
  const { addMessage } = useFlash()
  const [updateEntrant, { loading, error }] = useMutation(
    UPDATE_ENTRANT_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.entrants())
        addMessage('Entrant updated.', { classes: 'rw-flash-success' })
      },
    }
  )

  const onSave = (input, id) => {
    updateEntrant({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Entrant {entrant.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <EntrantForm
          entrant={entrant}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
