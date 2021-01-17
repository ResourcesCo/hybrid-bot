import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import EntrantForm from 'src/components/EntrantForm'

import { QUERY } from 'src/components/EntrantsCell'

const CREATE_ENTRANT_MUTATION = gql`
  mutation CreateEntrantMutation($input: CreateEntrantInput!) {
    createEntrant(input: $input) {
      id
    }
  }
`

const NewEntrant = () => {
  const { addMessage } = useFlash()
  const [createEntrant, { loading, error }] = useMutation(
    CREATE_ENTRANT_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.entrants())
        addMessage('Entrant created.', { classes: 'rw-flash-success' })
      },
    }
  )

  const onSave = (input) => {
    createEntrant({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Entrant</h2>
      </header>
      <div className="rw-segment-main">
        <EntrantForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewEntrant
