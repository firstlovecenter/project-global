import React, { useState } from 'react'
import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  VStack,
} from '@chakra-ui/react'
import { FaChevronDown } from 'react-icons/fa'
import FileUpload from './components/FileUpload'
import { useForm } from 'react-hook-form'
import useCustomColors from 'hooks/useCustomColors'

const fields = [
  {
    key: 'Car Title',
    link: '/',
    // value: member.housesOwned,
    lastUpdated: 'unknown',
  },
  {
    key: 'Car Picture',
    link: '/',
    lastUpdated: 'unknown',
  },
  {
    key: 'Residence Document',
    link: '/',
    lastUpdated: 'unknown',
  },
  {
    key: 'Residence Picture',
    // lastUpdated: member.carsOwned,
    link: '/',
    lastUpdated: 'unknown',
  },
]

const UploadMemberDocuments = () => {
  const [selectedItem, setSelectedItem] = useState('Select document type')
  const { control } = useForm()
  const { menuBtnBg } = useCustomColors()

  return (
    <Container
      maxW="container.xl"
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      p={8}
      height={'100vh'}
    >
      <Center>
        <Heading>Upload Documents</Heading>
      </Center>
      <VStack
        maxW="container.xl"
        mt={10}
        p={0}
        alignItems={'center'}
        width={'100%'}
      >
        <Menu matchWidth>
          <MenuButton
            as={Button}
            width={'100%'}
            p={7}
            pl={2}
            pr={3}
            display={'flex'}
            justifyContent={'space-between'}
            rightIcon={<FaChevronDown fontSize={'0.875rem'} />}
            bg={menuBtnBg}
            textAlign={'left'}
            color={'whiteAlpha.900'}
            _active={{ borderRadius: '0.5rem 0.5rem 0 0' }}
            fontWeight={400}
            fontSize={'1.25rem'}
          >
            {selectedItem}
          </MenuButton>
          <MenuList
            border="none"
            marginY={-2}
            width={'100%'}
            p={'0.5rem 0'}
            borderRadius={'0 0 0.5rem 0.5rem'}
            overflow={'hidden'}
          >
            {fields.map(({ key }) => (
              <MenuItem
                key={key}
                p={2}
                justifyContent={'space-between'}
                borderBottom={'2px solid'}
                onClick={() => setSelectedItem(key)}
                borderColor={'whiteAlpha.200'}
                fontWeight={400}
                fontSize={'1.25rem'}
              >
                {key}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </VStack>
      <Box mt={'auto'} width={'100%'} mb={10}>
        <FileUpload
          name={selectedItem}
          uploadPreset="preset"
          //eslint-disable-next-line @typescript-eslint/no-empty-function
          setValue={() => {}}
          control={control}
          errors={{}}
        />
      </Box>
    </Container>
  )
}

export default UploadMemberDocuments
