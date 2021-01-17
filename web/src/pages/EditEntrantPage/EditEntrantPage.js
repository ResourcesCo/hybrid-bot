import EntrantsLayout from 'src/layouts/EntrantsLayout'
import EditEntrantCell from 'src/components/EditEntrantCell'

const EditEntrantPage = ({ id }) => {
  return (
    <EntrantsLayout>
      <EditEntrantCell id={id} />
    </EntrantsLayout>
  )
}

export default EditEntrantPage
