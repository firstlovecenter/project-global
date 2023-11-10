import { Button, Stack } from '@chakra-ui/react'
import React from 'react'

function CreateUpdateLevel() {
  return (
    <form>
      <Stack>
        {/* <Input name="name" label="Name" />
          <Input name="leader" label="Leader" /> */}
        {/* conditionally render this for country form */}
        {/* <Input name="currency" label="Currency" />  */}

        <Button colorScheme="teal" variant="solid" size={'lg'}>
          Submit
        </Button>
      </Stack>
    </form>
  )
}

export default CreateUpdateLevel
