import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
} from '@chakra-ui/react'
import { FaChurch, FaCheck } from 'react-icons/fa'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { collection } from 'firebase/firestore'
import { useFirestore, useFirestoreCollectionData } from 'reactfire'
import { useUser } from 'contexts/UserContext'
import { RoleChurch } from 'types/types'
import { ApolloWrapper } from '@jaedag/admin-portal-react-core'
import useCustomColors from 'hooks/useCustomColors'

const SelectCategory: React.FC = () => {
  const { user, setCurrentUser } = useUser()
  const { yellow, gray, textPrimary, darkButtonBg } = useCustomColors()
  const { selectedProfile } = user

  const roleChurchesRef = collection(
    useFirestore(),
    'members',
    user.id,
    'roleChurches'
  )

  const {
    status,
    data,
    error: memError,
  } = useFirestoreCollectionData(roleChurchesRef)
  const roleChurches = data as RoleChurch[]

  const initialRole = selectedProfile
    ? {
        name: selectedProfile.name,
        level: selectedProfile.level,
        role: selectedProfile.role,
        id: selectedProfile.id,
      }
    : roleChurches[0]

  const [selectedItem, setSelectedItem] = useState<{
    label: string
    subLabel: string
    id: string
  }>({
    label: initialRole.name,
    subLabel: `${initialRole.level} ${initialRole.role}`,
    id: initialRole.id,
  })

  useEffect(() => {
    if (roleChurches) {
      setSelectedItem({
        label: initialRole.name,
        subLabel: `${initialRole.level} ${initialRole.role}`,
        id: initialRole.id,
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleChurches])

  console.log(
    '🚀 ~ file: SelectCategory.tsx:31 ~ useEffect ~ selectedItem:',
    selectedItem
  )
  return (
    <ApolloWrapper data={data} loading={status === 'loading'} error={memError}>
      <Menu matchWidth>
        <MenuButton
          as={Button}
          rightIcon={<RiArrowDropDownLine color={textPrimary} />}
          colorScheme={darkButtonBg}
          width="100%"
          height="4rem"
          fontSize="1.25rem"
          borderRadius="0.5rem"
          _active={{ borderRadius: '0.5rem 0.5rem 0 0' }}
        >
          <Flex alignItems="center" gap={1}>
            <Icon as={FaChurch} mr={2} color={yellow} />
            <Box textAlign="left">
              <Text fontWeight={500} textTransform={'uppercase'} color={yellow}>
                {selectedItem?.label}
              </Text>
              <Text
                fontSize="10px"
                fontWeight={300}
                textTransform={'uppercase'}
                color={gray}
              >
                {selectedItem?.subLabel}
              </Text>
            </Box>
          </Flex>
        </MenuButton>
        <MenuList
          border="none"
          width={'100%'}
          marginY={-2}
          p={0}
          borderRadius={'0 0 0.5rem 0.5rem'}
          overflow={'hidden'}
        >
          {roleChurches?.map((item) => (
            <MenuItem
              key={item.id}
              onClick={() => {
                setSelectedItem({
                  label: item.name,
                  subLabel: `${item.level} ${item.role}`,
                  id: item.id,
                })
                setCurrentUser({
                  ...user,
                  selectedProfile: item,
                })
              }}
              height="4rem"
              p={4}
            >
              <Flex
                alignItems="center"
                justifyContent="space-between"
                width="100%"
              >
                <Flex alignItems="center" gap={1}>
                  <Icon as={FaChurch} mr={2} />
                  <Box textAlign="left" flex={1}>
                    <Text
                      fontSize="1.25rem"
                      fontWeight={500}
                      textTransform={'uppercase'}
                    >
                      {item.name}
                    </Text>
                    <Text
                      fontSize="10px"
                      fontWeight={300}
                      textTransform={'uppercase'}
                    >
                      {item.level} {item.role}
                    </Text>
                  </Box>
                </Flex>
                {selectedItem.label === item.name && <FaCheck />}
              </Flex>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </ApolloWrapper>
  )
}

export default SelectCategory
