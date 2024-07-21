import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  HStack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from 'redux-config/store'
import ProfileIcon from '../../components/ProfileIcon'
import { FaPhone, FaWhatsapp } from 'react-icons/fa'
import { GiMailbox } from 'react-icons/gi'
import { formatDate } from 'globalUtils'

const MemberBioData = () => {
  const member = useSelector((state: RootState) => state.member.data)
  const navigate = useNavigate()
  const currentColorMode = useColorModeValue('light', 'dark')

  const fields = [
    {
      key: 'First Name',
      value: member?.firstName,
    },
    {
      key: 'Middle Name',
      value: member?.middleName || 'n/a',
    },
    {
      key: 'Last Name',
      value: member?.lastName,
    },
    {
      key: 'Email',
      value: member?.email,
    },
    {
      key: 'Phone Number',
      value: member?.phoneNumber,
    },
    {
      key: 'WhatsApp Number',
      value: member?.whatsappNumber,
    },
    {
      key: 'Gender',
      value: member?.gender,
    },
    {
      key: 'Marital Status',
      value: member?.maritalStatus,
    },
    {
      key: 'Occupation',
      value: member?.occupation,
    },
    {
      key: 'Employee Status',
      value: member?.occupation ? 'Employed' : 'Unemployed',
    },
    {
      key: 'Date of Birth',
      value: formatDate(member?.dateOfBirth),
    },
  ]

  const colorGoldViaColorMode =
    currentColorMode === 'light' ? 'brandGold.400' : 'brandGold.200'

  return (
    <Container position={'relative'} alignSelf={'center'} padding={8}>
      <Button
        variant={'ghost'}
        position={'absolute'}
        top={5}
        right={5}
        onClick={() => navigate('/member/documents/bio-data/edit')}
        p={0}
      >
        Edit
      </Button>
      <Center marginY={10} display={'flex'} gap={4}>
        <Avatar
          src={member?.pictureUrl}
          size="xl"
          padding={1}
          borderWidth={2}
          borderStyle={'solid'}
          borderColor={colorGoldViaColorMode}
        />
        <Box>
          <Heading margin={0} mb={3} fontSize={'2xl'}>
            {member?.firstName + ' ' + member?.lastName}
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
            onClick={() =>
              (window.location.href = `https://wa.me/${member?.phoneNumber}`)
            }
          />
          <ProfileIcon
            icon={<FaPhone />}
            label="Phone"
            onClick={() =>
              (window.location.href = `tel:${member?.phoneNumber}`)
            }
          />
          <ProfileIcon
            icon={<GiMailbox />}
            label="Email"
            onClick={() => (window.location.href = `mailto:${member?.email}`)}
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
            p={'6px 0'}
            borderBottom={'1px solid'}
            borderColor={'whiteAlpha.300'}
          >
            <Text color="whiteAlpha.700" pl={0} pr={0}>
              {field.key}
            </Text>
            <Text pl={0} pr={0} width={'fit-content'}>
              {field.value}
            </Text>
          </Flex>
        ))}
      </Container>
    </Container>
  )
}

export default MemberBioData
