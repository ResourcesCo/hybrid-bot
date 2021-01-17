import EntrantsLayout from 'src/layouts/EntrantsLayout'
import EntrantCell from 'src/components/EntrantCell'

const EntrantPage = ({ id }) => {
  return (
    <EntrantsLayout>
      <EntrantCell id={id} />
    </EntrantsLayout>
  )
}

export default EntrantPage
