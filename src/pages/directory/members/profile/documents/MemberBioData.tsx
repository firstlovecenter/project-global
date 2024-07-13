import ProfileAvatar from './components/ProfileAvatar'
import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  HStack,
  Table,
  Tbody,
  Td,
  Text,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react'
import { getHumanReadableDate } from '@jaedag/admin-portal-types'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from 'redux-config/store'
import ProfileIcon from '../../components/ProfileIcon'
import { FaPhone, FaWhatsapp } from 'react-icons/fa'
import { GiMailbox } from 'react-icons/gi'

const MemberBioData = () => {
  // const member = useSelector((state: RootState) => state.member.data)
  const navigate = useNavigate()
  const currentColorMode = useColorModeValue('light', 'dark')

  const fields = [
    {
      key: 'First Name',
      value: 'random',
    },
    {
      key: 'Middle Name',
      value: 'random',
    },
    {
      key: 'Last Name',
      value: 'random',
    },
    {
      key: 'Email',
      value: 'random',
    },
    {
      key: 'Phone Number',
      value: 'random',
    },
    {
      key: 'WhatsApp Number',
      value: 'random',
    },
    {
      key: 'Gender',
      value: 'random',
    },
    {
      key: 'Marital Status',
      value: 'random',
    },
    {
      key: 'Occupation',
      value: 'random',
    },
    {
      key: 'Employee Status',
      value: 'random',
    },
    {
      key: 'Date of Birth',
      value: 'random',
    },
  ]

  const colorGoldViaColorMode =
    currentColorMode === 'light' ? 'brandGold.500' : 'brandGold.300'

  return (
    <Container position={'relative'} alignSelf={'center'} padding={8}>
      <Center marginY={10} display={'flex'} gap={4}>
        <Avatar
          // src={member?.pictureUrl}
          // name={member?.firstName + ' ' + member?.lastName}
          size="xl"
          padding={2}
          borderWidth={3}
          borderStyle={'solid'}
          borderColor={colorGoldViaColorMode}
        />
        <Box>
          <Heading margin={0} mb={3} fontSize={'2xl'}>
            Kent Njeru
          </Heading>
          <Text fontSize="13px" color={colorGoldViaColorMode}>
            Uk Family Head
          </Text>
          <Text fontSize="13px" color={colorGoldViaColorMode}>
            London Campus Shepherd
          </Text>
        </Box>
      </Center>

      <Center marginY={5}>
        <HStack spacing={8}>
          <ProfileIcon
            icon={<FaWhatsapp />}
            label="Whatsapp"
            // onClick={
            //   () =>
            //   (window.location.href = `https://wa.me/${member?.phoneNumber}`)
            // }
          />
          <ProfileIcon
            icon={<FaPhone />}
            label="Phone"
            // onClick={
            //   () =>
            //   (window.location.href = `tel:${member?.phoneNumber}`)
            // }
          />
          <ProfileIcon
            icon={<GiMailbox />}
            label="Email"
            // onClick={
            //   () =>
            //   (window.location.href = `mailto:${member?.email}`)
            // }
          />
        </HStack>
      </Center>

      <Container bgColor={'brandTeal.300'} p={4} borderRadius={14} mt={10}>
        <Heading size={'sm'} m={0} mb={4}>
          Bio Data
        </Heading>
        {fields.map((field) => (
          <Flex
            key={field.key}
            justifyContent={'space-between'}
            p={'4px 0'}
            borderBottom={'1px solid'}
            borderColor={'whiteAlpha.400'}
          >
            <Text color="whiteAlpha.700" pl={0} pr={0}>
              {field.key}
            </Text>
            <Text pl={0} pr={0} width={'min-content'}>
              {field.value}
            </Text>
          </Flex>
        ))}
      </Container>
    </Container>
  )
}

export default MemberBioData
