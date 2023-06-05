import { Button, Stack } from '@chakra-ui/react'
import { Input } from '@jaedag/admin-portal-react-core'
import { Field, Formik } from 'formik'
import React from 'react'

function CreateUpdateLevel() {
  return (
    <Formik
      initialValues={{ name: '', leader: '' }}
      onSubmit={() => console.log('hello')}
    >
      <form>
        <Stack>
          <Input name="name" label="Name" />
          <Input name="leader" label="Leader" />
          {/* conditionally render this for country form */}
          {/* <Input name="currency" label="Currency" />  */}

          <Button colorScheme="teal" variant="solid" size={'lg'}>
            Submit
          </Button>
        </Stack>
      </form>
    </Formik>
  )
}

export default CreateUpdateLevel
