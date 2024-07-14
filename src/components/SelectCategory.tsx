import React, { useState } from 'react'
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

interface Item {
  label: string
  subLabel: string
}
const SelectCategory: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<Item>({
    label: 'ACCRA',
    subLabel: 'CAMPUS ADMIN',
  })

  const items: { label: string; subLabel: string }[] = [
    { label: 'ACCRA', subLabel: 'CAMPUS ADMIN' },
    { label: 'FIRST LOVE', subLabel: 'DENOMINATION ADMIN' },
    { label: 'KUMASI', subLabel: 'CAMPUS ADMIN' },
  ]

  return (
    <Menu matchWidth>
      <MenuButton
        as={Button}
        rightIcon={<RiArrowDropDownLine />}
        colorScheme="brandTeal"
        color={'white'}
        width="100%"
        height="4rem"
        fontSize="1.25rem"
        borderRadius="0.5rem"
        _active={{ borderRadius: '0.5rem 0.5rem 0 0' }}
      >
        <Flex alignItems="center" gap={1}>
          <Icon as={FaChurch} mr={2} />
          <Box textAlign="left">
            <Text fontWeight={500}>{selectedItem?.label}</Text>
            <Text fontSize="10px" fontWeight={300} textTransform={'capitalize'}>
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
        {items.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => setSelectedItem(item)}
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
                  <Text fontSize="1.25rem" fontWeight={500}>
                    {item.label}
                  </Text>
                  <Text fontSize="10px" fontWeight={300}>
                    {item.subLabel}
                  </Text>
                </Box>
              </Flex>
              {selectedItem.label === item.label && <FaCheck />}
            </Flex>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default SelectCategory
