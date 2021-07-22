import { CheckCircleIcon, QuestionIcon } from '@chakra-ui/icons'
import { Button, CircularProgress, Stack, Text } from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'

const getTaskUrl = id => `http://localhost:8080/persons/${id}/tasks`
const getCompleteUrl = id => (taskId, taskName) =>
  `http://localhost:8080/persons/${id}/${taskName}/${taskId}`
const Person = ({ id, person }) => {
  const { name, age } = person

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      setTasks('loading')

      try {
        const reply = await axios.get(getTaskUrl(id))
        if (reply.data)
          setTasks(
            reply.data.map(task => ({
              ...task,
              complete: async () => {
                try {
                  const resp = await axios.post(getCompleteUrl(id)(task.id, task.name), {})
                  if (resp) setTasks([])
                } catch (err) {
                  console.error(err)
                }
              },
            })),
          )
      } catch (err) {
        setTasks([])
      }
    }
    getTasks()
  }, [id])

  return (
    <Stack direction="row" align="center">
      <Text w="8rem">{`${name}`}</Text>
      <Text w="2rem">{age}</Text>
      {typeof tasks === 'object' ? (
        tasks.length ? (
          <QuestionIcon color="orange.300" fontSize="large" />
        ) : (
          <CheckCircleIcon color="green.400" fontSize="large" />
        )
      ) : (
        <CircularProgress isIndeterminate size={6} />
      )}
      {tasks && typeof tasks === 'object' && tasks.length ? (
        <Button size="xs" colorScheme="red" onClick={tasks[0].complete}>
          Authorise underage
        </Button>
      ) : null}
    </Stack>
  )
}

export default Person
