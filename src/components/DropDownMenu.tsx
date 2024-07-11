import React, { FC } from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { RxCaretRight } from 'react-icons/rx'
interface DropDownMenuProps {
  label: string
  options?: { name: string; link: string }[]
}

const DropDownMenu: FC<DropDownMenuProps> = ({ label, options }) => {
  const currentColorMode = useColorModeValue('light', 'dark')

  return (
    <Accordion allowToggle>
      <AccordionItem
        border={'none'}
        borderRadius={'8px'}
        bg={currentColorMode === 'light' ? 'brandTeal.500' : '#454D62'}
        color={'#ffffff'}
        py={1.5}
      >
        <h2>
          <AccordionButton justifyContent={'space-between'}>
            <Text>{label}</Text>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel>
          {options?.map(({ name, link }) => (
            <Flex
              key={name}
              p={1}
              justifyContent={'space-between'}
              borderBottom={'1px solid #96A7AF'}
              color={'#96A7AF'}
              my={2}
            >
              <Text>{name}</Text>
              <RxCaretRight />
            </Flex>
          ))}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

export default DropDownMenu
