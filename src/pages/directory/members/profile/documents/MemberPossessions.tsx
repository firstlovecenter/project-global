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
import ProfileInfoCard from '../../components/ProfileInfoCard'
import useCustomColors from 'hooks/useCustomColors'

const MemberPossessions = () => {
  const member = useSelector((state: RootState) => state.member.data)
  const { yellow } = useCustomColors()
  const navigate = useNavigate()
  const currentColorMode = useColorModeValue('light', 'dark')

  console.log('🚀 ~ file: MemberPossessions.tsx:8 ~ member:', member)

  const fields:
    | { key: string; link: string; lastUpdated: string }[]
    | undefined = []

  const colorGoldViaColorMode =
    currentColorMode === 'light' ? 'brandGold.400' : 'brandGold.200'
  const colorTealViaColorMode =
    currentColorMode === 'light' ? 'brandTeal.500' : 'brandTeal.400'

  return (
    <>
      <Container position={'relative'} alignSelf={'center'} padding={8}>
        <Button
          variant={'ghost'}
          position={'absolute'}
          top={5}
          right={5}
          onClick={() => navigate('/member/documents/possessions/edit')}
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
            borderColor={yellow}
          />
          <Box>
            <Heading margin={0} mb={3} fontSize={'2xl'}>
              {member?.firstName + ' ' + member?.lastName}
            </Heading>
            <Text fontSize="13px" color={yellow}>
              Uk Family Head
            </Text>
            <Text fontSize="13px" color={yellow}>
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
                (window.location.href = `https://wa.me/${member?.whatsappNumber}`)
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

        <ProfileInfoCard title="Possessions">
          <Flex
            bgColor={'brandTeal.300'}
            p={'0 32px'}
            borderRadius={10}
            minHeight={350}
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            gap={2}
          >
            {fields.length > 0 ? (
              fields.map((field) => (
                <Button
                  key={field.key}
                  alignItems={'center'}
                  justifyContent={'flex-start'}
                  gap={4}
                  height={'auto'}
                  p={'6px'}
                  variant={'ghost'}
                  minWidth={'100%'}
                  borderRadius={'none'}
                  borderBottom={'1px solid'}
                  borderColor={'whiteAlpha.300'}
                >
                  <Box
                    width={50}
                    height={50}
                    borderRadius={'10px'}
                    bg={colorTealViaColorMode}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    fontSize={'2xl'}
                    color={colorGoldViaColorMode}
                  >
                    AB
                  </Box>
                  <Box textAlign={'left'}>
                    <Text pl={0} pr={0}>
                      {field.key}
                    </Text>
                    <Text pl={0} pr={0} fontSize={'13px'}>
                      {field.lastUpdated}
                    </Text>
                  </Box>
                </Button>
              ))
            ) : (
              <Text color={yellow}>You have no possession documents</Text>
            )}
          </Flex>
          <Button
            p={6}
            mt={5}
            onClick={() => navigate('/member/documents/possessions/upload')}
            minWidth={'100%'}
          >
            Upload Files
          </Button>
        </ProfileInfoCard>
      </Container>
    </>
  )
}

export default MemberPossessions
