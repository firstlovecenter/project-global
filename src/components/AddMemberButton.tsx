import { Button } from '@chakra-ui/react'
import useCustomColors from 'hooks/useCustomColors'
import { useNavigate } from 'react-router-dom'

const AddMemberButton = () => {
  const navigate = useNavigate()
  const { yellow } = useCustomColors()

  return (
    <Button
      variant={'ghost'}
      onClick={() => navigate('/directory/register-member')}
      fontSize={'sm'}
      fontWeight={'300'}
      p={1}
      color={yellow}
    >
      Add Member
    </Button>
  )
}

export default AddMemberButton
