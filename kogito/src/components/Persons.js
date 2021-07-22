import { Stack } from '@chakra-ui/react'
import Person from './Person'

const Persons = ({ db }) => {
  return (
    <Stack>
      {db.map(({ id, person }) => (
        <Person key={id} id={id} person={person} />
      ))}
    </Stack>
  )
}

export default Persons
