import { Avatar, AvatarProps } from '@chakra-ui/react'
import { getCloudinaryPreset } from '@jaedag/admin-portal-react-core'

const CustomAvatar = (props: AvatarProps) => {
  const cloudinarySrc = getCloudinaryPreset(props.src ?? '')

  return <Avatar {...props} src={cloudinarySrc} />
}

export default CustomAvatar
