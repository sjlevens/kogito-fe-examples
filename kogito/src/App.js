import {
  Box,
  Button,
  Center,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text,
} from '@chakra-ui/react'
import axios from 'axios'
import { useState } from 'react'
import Persons from './components/Persons'

function App() {
  const [name, setName] = useState('')
  const [age, setAge] = useState(15)
  const [db, setDb] = useState([])

  const onSubmit = async () => {
    const resp = await axios.post('http://localhost:8080/persons', {
      person: {
        age,
        name,
      },
    })

    setDb([...db, resp.data])
  }

  console.log(db)

  return (
    <Box>
      <Center h="100vh">
        <Stack>
          <Stack direction="row" align="center">
            <Text color="messenger.500" width="6rem" fontWeight="semibold">
              Name
            </Text>
            <Input width="15rem" value={name} onChange={e => setName(e.target.value)} />
          </Stack>
          <Stack direction="row" align="center">
            <Text color="messenger.500" width="6rem" fontWeight="semibold">
              Age
            </Text>
            <NumberInput
              width="15rem"
              min={10}
              max={120}
              value={age}
              onChange={value => setAge(value)}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Stack>
          <Button onClick={onSubmit} colorScheme="messenger" variant="solid">
            Submit
          </Button>
        </Stack>
        <Box
          display={db.length ? 'block' : 'none'}
          position="fixed"
          right={5}
          borderRadius="md"
          p="5"
          border="1px solid lightgrey"
          width="30rem"
        >
          <Persons db={db} />
        </Box>
      </Center>
    </Box>
  )
}

export default App
